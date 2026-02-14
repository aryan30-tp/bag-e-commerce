const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const {generateToken}= require('../utils/generateToken')
const express= require('express');
const userModel = require('../models/user-model');
const {isLoggedIn}= require('../middlewares/isLoggedIn')
const flash= require('connect-flash')

module.exports.registerUser = async function(req,res){
try{
 
    let {email,fullname,password}= req.body

    let user= await userModel.findOne({email: email})

    if (user){
        req.flash("error", "User already exists")
        return res.redirect("/")
    }

    else{

    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(password, salt, async (err,hash)=>{
            if (err){
                console.error(err.message)
            }
            else{
                let user= await userModel.create({
                    email,
                    fullname,
                    password: hash
                })

                let token= generateToken(user)
                
                res.cookie("token",token)
                req.flash("success", "Registration successful!")
                res.redirect("/shop")


            }
        })
    })
}
    
}catch(err){
    console.log(err.message)
    res.status(500).send(err.message)
}}



module.exports.loginUser = async function(req,res){
    try{
        let {email, password} = req.body
        let user= await userModel.findOne({email: email})
        if (!user){
            req.flash("error", "Email or password is incorrect")
            return res.redirect("/")
        }
        bcrypt.compare(password, user.password, (err, result)=>{
                if (result){
                    let token= generateToken(user)
                    res.cookie("token",token)
                    req.flash("success", "Login successful!")
                    res.redirect("/shop")
                }
                else{
                    req.flash("error", "Email or password is incorrect")
                    res.redirect("/")
                }
            
        })
    }catch(err){
        console.log(err.message)
    }
}



module.exports.logoutUser= function(req,res,isLoggedIn){
    res.clearCookie("token")
    req.flash("success", "Logout successful")
    res.redirect("/")
}

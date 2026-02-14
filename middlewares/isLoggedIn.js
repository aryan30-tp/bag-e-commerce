const jwt= require('jsonwebtoken')
const express= require('express');
const userModel = require('../models/user-model');


module.exports.isLoggedIn=async function(req,res,next){
    if (!req.cookies.token){
        req.flash('error', 'You must be logged in to access this page')
        return res.redirect('/users/login')
    }

    try{
        let decoded= jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user= await userModel.findOne({email: decoded.email}).select("-password")
        req.user= user
        next();
    }catch(err){
        req.flash("error", "Something went wrong, please login again")
        return res.redirect('/')
    }

    
}
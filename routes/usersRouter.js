const express= require('express');
const userModel = require('../models/user-model');
const router= express.Router();
const {registerUser, loginUser, logoutUser}= require('../controllers/authcontroller')

router.get('/register', (req,res)=>{
    res.render('register')
})

router.get('/login', (req,res)=>{
    let error= req.flash('error')
    res.render('login', {error})
})

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

module.exports= router
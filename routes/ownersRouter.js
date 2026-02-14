const express= require('express');
const router= express.Router();
const ownerModel= require('../models/owner-models')

if (process.env.NODE_ENV==="development"){
router.post('/create', (req,res)=>{
    res.send("hswhhs")
})}


router.post('/', async (req,res)=>{
let owners= await ownerModel.find()
if (owners.length>0){
    return res.status(503).send("owners already exist")
}

let {fullname, email, password}= req.body
let createdowner= await ownerModel.create({
    fullname,
    email,
    password,
})
res.send("Owner created successfully")
})

router.get('/admin',(req,res)=>{
    let success= req.flash("success")
    res.render('createproducts', {success})
})


module.exports= router
const express= require('express');
const app= express();
const router= express.Router();
const ownerModel= require('../models/owner-models')

router.get('/', async (req,res)=>{
let owners= await ownerModel.find()
if (owners.length>0){
    return res.status(503).send("owners already exist")
}

let {fullname, email, password}= req.body
res.send("we can create a new owner")
let createdowner= await ownerModel.create({
    fullname,
    email,
    password,
})
})

if (process.env.NODE_ENV==="development"){
router.post('/create', (req,res)=>{
    res.send("hswhhs")
})}

module.exports= router
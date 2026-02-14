const express= require('express');
const router= express.Router();
const upload= require('../config/multer-config')
const productModel= require('../models/product-model')
const flash= require('connect-flash')

router.post('/create',upload.single('image'), async (req,res)=>{

try{let product= await productModel.create({
    image: req.file.buffer,
    name: req.body.name,
    price: req.body.price,
    discount: req.body.discount,
    bgColor: req.body.bgColor,
    panelcolor: req.body.panelcolor,
    textcolor: req.body.textcolor
})

req.flash("success", "Product created successfully")
res.redirect('/owners/admin')
}catch(err){
    res.status(500).send("Error creating product")
}
})

module.exports= router
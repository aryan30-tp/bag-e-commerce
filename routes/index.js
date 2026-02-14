const express= require('express');
const router= express.Router();
const {isLoggedIn}= require('../middlewares/isLoggedIn')
const flash= require('connect-flash')
const productModel= require('../models/product-model')
const userModel= require('../models/user-model')

router.get('/', (req,res)=>{
    let error= req.flash('error')
    res.render('index', {error})
})


router.get("/shop", isLoggedIn,async (req,res)=>{
    let products= await productModel.find()
    let success= req.flash("success")
    res.render('shop', {products, success})

})

router.get('/addtocart/:id', isLoggedIn, async (req,res)=>{
    let user= await userModel.findOne({email: req.user.email})
    // Check if product already in cart
    let existingItem = user.cart.find(item => item.product.toString() === req.params.id)
    if(existingItem){
        existingItem.quantity += 1
    } else {
        user.cart.push({product: req.params.id, quantity: 1})
    }
    await user.save()
    req.flash("success", "Product added to cart successfully")
    res.redirect('/shop')
})

router.get("/cart", isLoggedIn, async(req,res)=>{
    let user= await userModel.findOne({email: req.user.email}).populate('cart.product')
    
    // Filter out any invalid cart items (deleted products or old schema format)
    user.cart = user.cart.filter(item => item.product && item.product._id)
    await user.save()
    
    let bill = 20; // delivery fee
    if(user.cart.length > 0){
        bill = user.cart.reduce((sum, item) => sum + ((Number(item.product.price) - Number(item.product.discount)) * item.quantity), 0) + 20;
    }
    res.render('cart', {user, bill})
})

router.get('/cart/increase/:id', isLoggedIn, async (req,res)=>{
    let user= await userModel.findOne({email: req.user.email})
    let item = user.cart.find(item => item.product.toString() === req.params.id)
    if(item) item.quantity += 1
    await user.save()
    res.redirect('/cart')
})

router.get('/cart/decrease/:id', isLoggedIn, async (req,res)=>{
    let user= await userModel.findOne({email: req.user.email})
    let item = user.cart.find(item => item.product.toString() === req.params.id)
    if(item && item.quantity > 1) {
        item.quantity -= 1
    } else {
        user.cart = user.cart.filter(item => item.product.toString() !== req.params.id)
    }
    await user.save()
    res.redirect('/cart')
})

router.get('/cart/remove/:id', isLoggedIn, async (req,res)=>{
    let user= await userModel.findOne({email: req.user.email})
    user.cart = user.cart.filter(item => item.product.toString() !== req.params.id)
    await user.save()
    req.flash("success", "Item removed from cart")
    res.redirect('/cart')
})

module.exports= router;
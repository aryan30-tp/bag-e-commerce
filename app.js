const express= require('express');
const app= express();
const userModel= require('./models/user-model')
const productModel= require('./models/product-model')
const path= require('path')
const cookieParser= require('cookie-parser');
const { urlencoded } = require('body-parser');

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')


app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.listen(8080)
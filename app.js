const express= require('express');
const app= express();
const userModel= require('./models/user-model')
const productModel= require('./models/product-model')
const ownerModel= require('./models/owner-models')
const db= require('./configs/mongoose-connection')
const path= require('path')
const cookieParser= require('cookie-parser');
const { urlencoded } = require('body-parser');
const ownersRouter= require('./routes/ownersRouter')
const usersRouter= require('./routes/usersRouter')
const productsRouter= require('./routes/productsRouter')

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')


app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)

app.listen(8080)
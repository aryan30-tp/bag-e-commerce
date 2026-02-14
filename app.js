const express= require('express');
const app= express();
const userModel= require('./models/user-model')
const productModel= require('./models/product-model')
const ownerModel= require('./models/owner-models')
const db= require('./config/mongoose-connection')
const path= require('path')
const cookieParser= require('cookie-parser');
const { urlencoded } = require('body-parser');
const ownersRouter= require('./routes/ownersRouter')
const usersRouter= require('./routes/usersRouter')
const productsRouter= require('./routes/productsRouter')
require('dotenv').config()
const expressSession= require('express-session')
const flash= require('connect-flash')
const index= require('./routes/index')


app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_KEY
    })
)
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.use("/", index)
app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)

app.listen(8080)
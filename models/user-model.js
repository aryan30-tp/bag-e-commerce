const mongoose= require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/scratch')

const userSchema= mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: String,
    password: String,
    cart: { 
        type: Array ,
        default: []
    },
    isAdmin: Boolean,
    orders: { 
        type: Array ,
        default: []
    },
    contact: Number,
    picture: String
})


module.exports= mongoose.model('users', userSchema)  
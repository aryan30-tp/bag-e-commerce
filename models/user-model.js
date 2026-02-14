const mongoose= require('mongoose');



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
    cart: [{ 
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    
    contact: Number,
    picture: String
})


module.exports= mongoose.model('users', userSchema)  
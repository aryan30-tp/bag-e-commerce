const mongoose= require('mongoose');
const dbgr= require("debug")("development:mongoose")
const config= require("config")
const MONGODB_URI= config.get("MONGODB_URI")

mongoose
.connect(`${config.get("MONGODB_URI")}/scratch`)
.then(function(){
    dbgr('connected to database');
})
.catch(function(err){
    dbgr(err);
})

module.exports= mongoose.connection
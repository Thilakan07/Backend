const mongoose=require("mongoose")

let sc=mongoose.Schema;
const loginSchema = new sc({
    username:String,
    password:String,
});

var loginmodel=mongoose.model("login",loginSchema)

module.exports=loginmodel;
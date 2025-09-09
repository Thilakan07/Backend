const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://Thilu:Thilu1@sample.rkxdbkz.mongodb.net/sampleDB?retryWrites=true&w=majority&appName=Sample")
.then(()=>{console.log("Working Thilu")})
.catch(err =>console.log(err))
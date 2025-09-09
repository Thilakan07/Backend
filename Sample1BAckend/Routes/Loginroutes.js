
const app=require('express').Router()

const loginmodel = require('../Model/Login');


app.post ('/loginview',async (request,response)=>{
    const{ username,password}= request.body;
    // console.log(request.body)
    // try
    //     {
        const user =await loginmodel.findOne({username,password});
        console.log(user)
        if(user)
            {
            response.json({success:true,message:'Login successful'});
            }
           else
            {
                    response.json({success:false,message:'Invalid password and username'});

            }
        // }
        // catch(error)
        // {
        //             response.status(500).json({success:false,message:'Error during login'});
                                   
        // }
});

module.exports = app
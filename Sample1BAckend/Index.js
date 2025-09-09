const express = require('express');
const app = express();


const db = require("./Connection/DBconnection")
const loginrouter = require('./Routes/Loginroutes')




app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());


app.use("/login", loginrouter)




app.get('/', (request, response) => {
  response.send('Hai');
});



app.listen(8000,(request,response)=>{


    console.log("port is running at 8000")



})
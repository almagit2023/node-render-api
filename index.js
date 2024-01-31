const express = require('express');
const app = express()
const config = require('dotenv').config();
const port  = process.env.PORT || 5006


app.use(middleWare)

function middleWare(req, res, next){
    console.log("Middleware Started");
    next();
}

app.get('/', (req, res)=>{
  res.send("Welcome to my Node Server....")
})


app.get('/home',(req, res)=>{
  res.send("<h1>Welcome to HOME page</h1>")
})


app.listen(port, (error)=>{
  if(error){
    console.log("Error occurred...")
  }

  console.log(`Server listening to port : ${port}`)
})
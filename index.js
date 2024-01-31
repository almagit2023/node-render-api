const express = require('express');
const app = express()
const config = require('dotenv').config();
const port  = process.env.PORT || 5006
const jsonData = require('./jsonData')

const Product = require('./models/productModels')
const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URL;
const cors = require('cors')


app.use(middleWare)
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


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

app.get('/api/data', (req, res)=>{
  res.json(jsonData);
})


const connectToMongo = async () => {
  try {
    await mongoose.connect(mongo_uri).then(() => {
      console.log("Connected To DB successfully...");
      app.listen(port, () => {
        console.log(`Server listening to PORT : ${port}`);
      });
    });
  } catch (error) {
    console.log("Error connecting to DB");
    console.log(error)
  }
};


connectToMongo();


// Create a product route
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get All products route
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

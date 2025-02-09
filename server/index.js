require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const easyinvoice = require('easyinvoice');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config/mongoose-connection')
const path = require('path');
const userModel = require("./models/usermodel");
const productModel = require("./models/productmodel");
const adminModel =require("./models/ownermodel");
const secretKey = 'sitaram';
const Stripe = require('stripe');

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const stripe = Stripe('sk_test_51QlNZkE9sXHqPRmjEjMn54PoOmzT97avunj4YApToNY82IliUYm4Gx4Xu2RR2T1BLyKWbXSDlFgg8rJSM45kdpWM00pavasxfg'); 
// app.post('/addtocart', async (req, res) => {
//     const { id } = req.body;
//     try {
//         carts.push(id);
//         console.log(id)
//         res.status(201).send({ message: 'done'});
//     } catch (error) {
//         res.status(500).send({ message: 'Error registering user', error });
//     }

// });


app.get('/api/jevlry', async(req, res) => {
    try {
        let data = await productModel.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get('/api/jevlry/:_id', async(req, res) => {
    const productId = req.params._id;  
    try {
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; 
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd', 
      payment_method_types: ['card'],
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
});





app.post('/api/users/register', async (req, res) => {
    try {
      const { name, email, password,picture,cardNumber,expirationDate,cvv,billingAddress}= req.body;
      console.log(req.body);
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async(err, hash) => {
          const newUser = await userModel.create({
            name,
            email,
            password:hash,
            picture,
            cardNumber,
            expirationDate,
            cvv,
            billingAddress,
          })
          const token = jwt.sign({ _id: newUser._id }, secretKey);
          res.json({ token });
        })
    })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password}= req.body;
    const existingAdmin = await adminModel.findOne({ email, password });
    if (existingAdmin) {
      return res.status(200);
    }
    else{
      res.json({ error: 'not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


const authToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.token = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};


app.get("/api/user/data", authToken,async (req,res)=>{    
    let user = await userModel.findById(req.token._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });

})


app.listen(3000);


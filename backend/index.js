const express = require('express');
const app = express();

const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config/mongoose-connection')
const cookieParser = require('cookie-parser');
const path = require('path');
const userModel = require("./models/usermodel")
const jevlry = require('./jewellry.json');

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let carts=[0];
app.post('/addtocart', async (req, res) => {
    const { id } = req.body;
    try {
        carts.push(id);
        console.log(id)
        res.status(201).send({ message: 'done'});
    } catch (error) {
        res.status(500).send({ message: 'Error registering user', error });
    }
});


app.get('/api/jevlry', (req, res) => {
    res.json(jevlry);
});
app.get('/api/jevlry/:id', (req, res) => {
    const Id = parseInt(req.params.id);
    const product = jevlry.find(m => m.id === Id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.get('/api/jevlry/cart', (req, res) => {
    const product = carts.map(c=>jevlry.find(m => m.id === c));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.post('/createuser', async (req, res) => {
    const { name, email, password, address } = req.body;
    try {
        const is_user = await userModel.findOne({ email });
        if (is_user) return res.send('User already exists');
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async(err, hash) => {
                let craeteduser = await userModel.create({
                    name: name,
                    email: email,
                    password: hash,
                    address:address
                })
            })
        })
        res.status(201).send({ message: 'created!'});
    } catch (error) {
        res.status(500).send({ message: 'Error registering user', error });
    }
});




app.listen(3000);


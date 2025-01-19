// require('dotenv').config();

const mongoose = require('mongoose');
// console.log(process.env.MONGO_URL);

// mongoose.connect(`mongodb+srv://akshaydhola3527:HCk0ccwFKomLCwgb@jvlry.sladi.mongodb.net/?retryWrites=true&w=majority&appName=Jvlry`);
mongoose.connect(`mongodb://127.0.0.1:27017/jvlry`);
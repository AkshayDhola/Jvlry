const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/jvlry`);

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    carts: [],
    address:String
})

module.exports = mongoose.model("user", userSchema);
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  picture: String,
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true }, // Format: MM/YYYY
  cvv: { type: String, required: true },
  billingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  isDelete:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("user", userSchema);
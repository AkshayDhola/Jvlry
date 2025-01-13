const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model("owner", ownerSchema);
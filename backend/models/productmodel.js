const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/jvlry`);

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
      type: Number,
      default: 0,
    }
});

module.exports= mongoose.model('product', productSchema);
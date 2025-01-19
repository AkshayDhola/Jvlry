const mongoose = require('mongoose');

// mongoose.connect(`mongodb://127.0.0.1:27017/jvlry`);

const productSchema = new mongoose.Schema({
    title: String,
    metal: String,
    size: {
      type:[],
    },
    weight:Number,
    price:Number,
    img:String,
    review:[
      {
        userID:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"user"
        },
        rating:Number,
      }

    ]
});

module.exports= mongoose.model('product', productSchema);
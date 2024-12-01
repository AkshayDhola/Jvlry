const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/jvlry`);

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    payment_mode: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash'],
        required: true
    },
    is_payment: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    is_return: {
        type: Boolean,
        default: false
    }
});

module.exports= mongoose.model('product', productSchema);
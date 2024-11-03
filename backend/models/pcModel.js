const mongoose = require('mongoose');

const PCSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    components: {
        CPU: String,
        Motherboard: String,
        RAM: String,
        Storage: String,
        GPU: String,
        Case: String,
        'Power Supply': String
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Processing'
    }
});

module.exports = mongoose.model('PC', PCSchema);
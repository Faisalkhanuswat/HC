const mongoose = require('mongoose');

const Token = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
})

const verifyToken = mongoose.model('verifyToken', Token);
module.exports = verifyToken;
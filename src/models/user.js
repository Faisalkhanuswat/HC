const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

 const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Incorrect Email Format')
            }
        }
    },
    phone: {
        type: Number,
        trim: true
    },
    city: {
        type: String
    },
    address: {
        type: String,
    },
    dob: {
        type: Date,
        default: ""
    },
    password: {
        type: String,
        trim: true,
        minlength: 6
    },
    role: {
        type: String,
        default: "student"
    },
    verified: {
        typeof: Boolean,
        default: false
    },
    avatar:{
        type: Buffer
    }
 },{
    timestamp: true
 })

userSchema.pre('save', async function(next){
    if(this.isModefied('password')){
        bcrypt.hash(this.password, 8);
    }
})
 const User = mongoose.model('User', userSchema);
 module.exports = User;
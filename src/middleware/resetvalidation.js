const {checkSchema} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const resetValidation = checkSchema({
    newPassword: {
        custom: {
            options: async(value, {req})=>{
                var user = await User.findOne({email: req.body.email});
                var isSame = await bcrypt.compare(value, user.password);
                if(isSame){
                    throw new Error('Password must be different from old one.');
                }
            }
        },
        isLength: {
            options: {
                min: 6,
                max: 12
            },
            errorMessage: 'password must be 6 to 12 character long'
        }

    },
    cPassword: {
        custom: {
            options: async (value, {req})=>{
                if(value !== req.body.newPassword){
                    throw new Error('Password not matched');
                }
            }
        }
    }
})
module.exports = resetValidation;
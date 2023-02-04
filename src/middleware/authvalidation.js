const {checkSchema} = require('express-validator');
const User = require('../models/user');

    // const signinValidation = [
    //     check('fullName').not().isEmpty().trim().escape().withMessage('Field cannot be Empty'),
    //     check('email').isEmail().normalizeEmail().custom(async value=>{
    //         return await User.find({email: value}).then(user=>{
    //             if(user.length > 0){
    //                return Promise.reject('Email already exist');
    //             }
    //         })
    //     }),
    //     check('phone').isMobilePhone().trim().not().isEmpty().withMessage('Field cannot be Empty'),
    //     check('city').trim().not().isEmpty(),
    //     check('dob').not().isEmpty().trim(),
    //     check('address').not().isEmpty().trim(),
    //     check('password').isLength({min: 6, max:16}).withMessage('password must be 6 to 16 character long'),
    //     check('confirmPassword').custom(async(value, { req })=>{
    //         if (value !== req.body.password){
    //             throw new Error('password not matched');
    //         }
    //     })
        
    // ]

    const signinValidation = checkSchema({
        fullName: {
            trim: true,
            escape: true,
            errorMessage: 'Field is empty or invalid',
            notEmpty: true
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            custom: {
                options: async value=>{
                    return await User.find({email: value}).then(user=>{
                        if(user.length > 0){
                            return Promise.reject('Email already exist');
                        }
                    })
                }
            }
        },
        phone: {
            isMobilePhone: true,
            trim: true,
            notEmpty: true,
            errorMessage: 'Field is empty or invalid'
        },
        city: {
            notEmpty: true,
            trim: true,
            errorMessage: 'Field is empty or invalid'
        },
        dob: {
            notEmpty: true,
            trim: true,
            errorMessage: 'Field is empty or invalid'
        },
        address: {
            notEmpty: true,
            trim: true,
            errorMessage: 'Field is empty or invalid'
        },
        password: {
            isLength: {
                options: {
                    min: 6,
                    max: 12
                },
                errorMessage: 'password must be 6 to 12 character long'
            }

        },
        confirmPassword: {
            custom: {
                options: async (value, {req})=>{
                    if(value !== req.body.password){
                        throw new Error('Password not matched');
                    }
                }
            }
        }
    })

module.exports = signinValidation;
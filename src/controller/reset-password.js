const express = require('express');
const {validationResult} = require('express-validator');
const User = require('../models/user');
const crypto = require('crypto');

const restToken = require('../models/resettoken');
const { type } = require('os');

module.exports = {
    forgot: async (req, res)=>{
        res.render('reset-password',{
            title: 'Forgot Password',
            reset: false
        })
    },
    postForgot: async (req, res)=>{
        try {
            var user = await User.findOne({email: req.body.mailAddress});
            if(!user){
                return res.render('reset-password', {
                    reset: false,
                    title: 'Forgot Password',
                    msg: "User not found!",
                    type: 'danger'
                })
            }
            var token = crypto.randomBytes(32).toString('hex');
            await restToken.findOne({email: req.body.mailAddress})
             ? await restToken.findOneAndUpdate({email: req.body.mailAddress}, {$set: {token}})
             : await restToken({token, email: req.body.mailAddress}).save();
             return res.render('reset-password', {
                reset: false,
                title: 'Forgot Password',
                successmsg: "Reset link send to your email account",
                type: 'success'
             })
        } catch (error) {
            res.redirect('/500');
        }
    }
}
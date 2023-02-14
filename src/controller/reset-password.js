const express = require('express');
const {validationResult} = require('express-validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const resetToken = require('../models/resettoken');
const {sendResetEmail} = require('../controller/mailservice');

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
                req.flash('error', {message: "User not found!", type: 'danger'})
                return res.redirect('/forgot-password');
            }
            var isToken = await resetToken.find({email: req.body.mailAddress});
            if(isToken.length > 0){
                req.flash('error', {message: "Link has already sent. Please check your Email", type: 'danger'})
                return res.redirect('/forgot-password');
            }
            var token = await crypto.randomBytes(32).toString('hex');
            await resetToken.findOne({email: req.body.mailAddress})
             ? await resetToken.findOneAndUpdate({email: req.body.mailAddress}, {$set: {token}})
             : await resetToken({token, email: req.body.mailAddress}).save();

             await sendResetEmail(req.body.mailAddress, token);
             req.flash('success', "Reset link send to your email address");
             return res.redirect('/forgot-password');
        } catch (error) {
            res.redirect('/500');
        }
    },
    reset: async (req, res)=>{
        try {
            var token = req.query.token;
            var isToken = await resetToken.findOne({token});
            if(isToken){
              return  res.render('reset-password',{
                    title: 'Reset Password',
                    reset: true,
                    email: isToken.email
                })
            }
            req.flash('expired', 'Token Tempered or Expired!');
            return res.redirect('/forgot-password');
        } catch (error) {
            console.log(error.message)
            res.redirect('/500');
        }
            
    },
    doreset: async (req, res)=>{
        try {
            const errors = validationResult(req);
            const userToken = await resetToken.findOne({email: req.body.email});
            if(!userToken){
                return res.status(400).redirect('/reset-password?token=');
            }
            if(!errors.isEmpty()){
                req.flash('error', {message: errors.errors[0].msg, type: 'danger'});
                return res.status(400).redirect('/reset-password?token='+ userToken.token);
            }
            const hash = await bcrypt.hash(req.body.newPassword, 8);
            await User.findOneAndUpdate({email: req.body.email}, {$set: {password: hash}});
            await resetToken.findOneAndDelete({email: req.body.email});
            req.flash('alert', {message: "Password Updated Successfully", type: 'success'});
            return res.status(200).redirect('/login');
        } catch (error) {
            console.log(error.message)
            res.redirect('/500');
        }
    }
}
const express = require('express');
const {validationResult} = require('express-validator');
const User = require('../models/user');
module.exports= {
    login: (req, res)=>{
        res.render('Login',{
            title: 'Login'
        });
    },
    signup: (req, res)=>{
        res.render('signup',{
            title: 'Signup'
        });
    },
    blog: (req, res)=>{
        res.render('blog',{
            title: 'Blog'
        });
    },
    doSignup: async (req, res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                olddata = req.body;
                delete olddata.password;
                delete olddata.confirmPassword;
                res.locals.oldData = olddata;
                const errorsObj = {};
                errors.errors.forEach(e => {
                    errorsObj[e.param] = e.msg;
                });
                return res.status(400).render('signup',{
                    title: 'Signup',
                    errorsObj
                });
            }
            const newUser = new User({
                name: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                city: req.body.city,
                address: req.body.address,
                dob: req.body.dob,
                password: req.body.password
            })
            await newUser.save();
            req.flash('alert', {message: 'Account create Successfully',type: 'success' });
            return res.status(201).redirect('/login');
        } catch (error) {
            res.status(500).send({
                error: error.message
              });
        }
    },
    doLogin: async (req, res)=>{
        req.body.remember ? req.session.cookie.originalMaxAge = 1000 * 60 * 60 * 5 : req.session.cookie.expires= false;
        return res.status(200).redirect('/dashboard');
    },
    logout: async (req, res, next)=>{
        req.logout(err=>{
            if(err){
                return next(err);
            }
            res.redirect('/login');
        })
    }
}
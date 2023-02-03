const express = require('express');
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
    doSignup: (req, res)=>{
        res.send(req.body);
    }
}
const express = require('express');

const router = new express.Router();

const userController = require('../controller/user');
const dashboardController = require('../controller/dashboard');
const resetController = require('../controller/reset-password');
const signinValidation = require('../middleware/authvalidation');
const {isAuthenticated, isLoggedin}= require('../middleware/Auth');
const passportAuth = require('../middleware/passport');

router.get('/Login',isLoggedin, userController.login);
router.get('/Signup',isLoggedin, userController.signup);
router.get('/Blog', userController.blog);
router.get('/dashboard',isAuthenticated, dashboardController.dashboard);
router.get('/logout', isAuthenticated, userController.logout);
router.get('/forgot-password', isLoggedin, resetController.forgot);

router.post('/signup', signinValidation, userController.doSignup);
router.post('/login', passportAuth, userController.doLogin);
router.post('/forgot-password', resetController.postForgot);


module.exports = router;
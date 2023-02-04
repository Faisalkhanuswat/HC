const express = require('express');

const router = new express.Router();

const userController = require('../controller/user')
const signinValidation = require('../middleware/authvalidation');

router.get('/Login', userController.login);
router.get('/Signup', userController.signup);
router.get('/Blog', userController.blog);

router.post('/signup', signinValidation, userController.doSignup);


module.exports = router;
const express = require('express');

const router = new express.Router();

const userController = require('../controller/user')

router.get('/Login', userController.login);
router.get('/Signup', userController.signup);
router.get('/Blog', userController.blog);

router.post('/signup', userController.doSignup);


module.exports = router;
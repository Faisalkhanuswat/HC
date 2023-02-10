const express = require('express');
const User = require('../models/user');

module.exports= {
dashboard: async (req, res)=>{
    res.render('dashboard/dashboard',{
        title: 'Dashboard'
    });
}
}
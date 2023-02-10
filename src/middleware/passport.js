const passport = require('passport');
require('../controller/passport');

module.exports = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
})
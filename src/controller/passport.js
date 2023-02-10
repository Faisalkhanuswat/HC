const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
const user = require('./user');

passport.use(new LocalStrategy({usernameField: 'emailAddress', passwordField: 'password'},
async (email, password, done)=>{
    User.findOne({email}, (err, user)=>{
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: "No user found! Try different one"});
        }
        bcrypt.compare(password, user.password, (error, ismatch)=>{
            if(error){
                return done(error);
            }
            if (!ismatch){
                return done(null, false, {message: "Incorect Password"});
            }
            return done(null, user);
        });
    });
}
))
passport.serializeUser((user, done)=>{
    done(null, user.id);
})
passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    })
})
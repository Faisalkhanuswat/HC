const express = require('express');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongostore = require('connect-mongo');

const app = new express();
require('dotenv').config();
require('./db/conn');
const routes = require('./routers/routes');
const { initialize } = require('passport');

const port = process.env.port || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, '../templates/partials');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partials);

app.use(cookieParser(process.env.SECRET));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' },
  store: mongostore.create({
    mongoUrl: process.env.DB_URL,
    ttl: 1000 * 60 * 60 * 5
  })
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
let title, logo;
app.use(async (req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.alert = req.flash("alert");
  res.locals.error = req.flash("error");
  res.locals.expired = req.flash('expired');
  res.locals.user = req.user;
  
    // site title and logo
    // const setting = await Setting.findOne();
    // title = setting.collegeName;
    // logo = setting.logoPath;
    next();
  });
// app.use(function(req, res, next) { 
//   res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//    next();
//  });
app.use(routes);

// -----------------Helpers------------------
hbs.registerHelper({
  ifEqual: function(arg1, arg2, block){
  if(arg1 == arg2){
    return block.fn(this);
  }
  return block.inverse(this);
},
site_title: function(){
  return title || process.env.SITE_TITLE;
},
site_logo: function(){
  return title || process.env.SITE_LOGO;
}
})
app.listen(`${port}`, ()=>{
    console.log(`Server is up on ${port}`)
})
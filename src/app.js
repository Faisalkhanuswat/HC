const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = new express();
require('dotenv').config();
require('./db/conn');
const routes = require('./routers/routes')

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

app.use(routes);

app.listen(`${port}`, ()=>{
    console.log(`Server is up on ${port}`)
})
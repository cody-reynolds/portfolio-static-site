const express = require('express');
const app = express();
const pug = require('pug');
const data = require('./data.json');

//Sets the view engine to pug
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index');
});

//Sets the listener to port 3000
app.listen(3000, () => {
    console.log("App is live on localhost:3000")
});
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

// Set public path
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', function (req, res) {
  res.render('home', { title: 'Home', path: 'home' })
})

// Content Pages
app.get('/about', function (req, res) {
  res.render('about', { title: 'About', path: 'about' })
})

app.get('/contact', function (req, res) {
  res.render('page', { title: 'Contact', path: 'contact' })
})

app.get('/toys', function (req, res) {
  res.render('toys', { title: 'Toys', path: 'toys' })
})

// Toy pages
app.get('/spirograph', function (req, res) {
  res.render('spirograph', { title: 'Spirograph', path: 'spirograph',  theScripts: []})
})

app.get('/rainyblobs', function (req, res) {
  res.render('blobs', { title: 'Rainy blobs', path: 'blobs', theScripts:[]})
})

app.get('/ripple', function (req, res) {
  res.render('ripple', { title: 'Ripple', path: 'ripple', theScripts:[]})
})

app.get('/pewpew', function (req, res) {
  res.render('pewpew', { title: 'PewPew', path: 'pewpew', theScripts:[]})
})


// Server stuff

var socket = require('socket.io');
var io = socket(server);

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});

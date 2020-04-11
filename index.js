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

// Toy pages
app.get('/spirograph', function (req, res) {
  res.render('spirograph', { title: 'Spirograph', path: 'spirograph',  theScripts: ["buttons", "buttonsmobile", "colorbuttons", "colorbuttonsmobile"]})
})

// Toy pages
app.get('/blobs', function (req, res) {
  res.render('blobs', { title: 'Blobs', path: 'blobs', theScripts:[]})
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

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});

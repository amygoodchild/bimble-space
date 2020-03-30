const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

// Set public path
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', function (req, res) {
  res.render('home', { title: 'home' })
})

// Toy pages
app.get('/spirograph', function (req, res) {
  res.render('spirograph', { title: 'spirograph', theScripts: ["buttons", "buttonsmobile", "colorbuttons", "colorbuttonsmobile"]})
})

// Content Pages
app.get('/about', function (req, res) {
  res.render('page', { title: 'about' })
})

app.get('/contact', function (req, res) {
  res.render('page', { title: 'contact' })
})

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});

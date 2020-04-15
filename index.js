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

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection: ' + socket.id);

  socket.on('aNewDot',
      function(data) {
        // Data comes in as whatever was sent, including objects
        //console.log("Received: 'new dot' " + data.x + " " + data.y);

        // Send it to all other clients
        socket.broadcast.emit('aNewDot', data);

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });

}

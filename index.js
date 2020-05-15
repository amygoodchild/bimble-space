const express = require('express');
var http = require('http');
const app = express();
const path = require('path');

var enforce = require('express-sslify');
app.use(enforce.HTTPS({ trustProtoHeader: true }))


app.set('view engine', 'pug');
app.set('views', './views');

// Set public path
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', function (req, res) {
  res.render('home', { title: 'Home', path: 'home' })
})

// Content Pages
app.get('/more', function (req, res) {
  res.render('more', { title: 'More', path: 'more' })
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

app.get('/swooshhidden', function (req, res) {
  res.render('pewpew', { title: 'Swoosh', path: 'pewpew', theScripts:[]})
})

app.get('/flock', function (req, res) {
  res.render('pewpew', { title: 'Flock', path: 'pewpew', theScripts:[]})
})

app.get('/swoosh', function (req, res) {
  res.render('swoosh', { title: 'Swoosh', path: 'swoosh', theScripts:[]})
})

// Server stuff

var socket = require('socket.io');

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});

var io = socket(server);
var ownID;
var otherID;
var numUsers = 0;
var unMatched = [];
var matches = [];
var room;

var pairMessages = [];

pairMessages[0] = "Like bees";
pairMessages[1] = "A friend!";
pairMessages[2] = "Which one of you is the evil twin?";
pairMessages[3] = "social closening!";
pairMessages[4] = "a quaranteam.";

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection: ' + socket.id);

  // Manage user numbers
  numUsers++;
  let data = { numUsers : numUsers}
  // Ask the client to tell us what room it's in (i.e. which toy it's playing - future proofing for when there are multiple toys)
  socket.emit('whatsyourinfo', data);

  // Hear back from the client what room it's in.
  socket.on('myinfo', function(data) {
    socket.join(data.room);
    let newUser = new User(data.room, data.width, data.height, socket.id);
    room = data.room;
    if (newUser.room == "swoosh"){

      // When a client joins swoosh, add its object to the array of un matched users
      unMatched.push(newUser);
      matcher();
    }
  });



  function matcher(){// If we've got 2 users in the unmatched list, make them a match
    if (unMatched.length>=2){
      // add to Match array
      let newMatch = new Match(unMatched[0], unMatched[1]);
      matches.push(newMatch);
      let pairMessage;

      let randomNumber = Math.random();
      for (let i = 0; i<pairMessages.length;i++){
        if (randomNumber<=1/pairMessages.length*(i+1)){
          pairMessage = pairMessages[i];
          break;
        }
      }

      // Let them know they're matched and who they matched with
      let data = { otherUser: newMatch.user2.id, whoami: "user 1", myid: newMatch.user1.id, message: pairMessage,
                    otherWidth: newMatch.user2.width, otherHeight: newMatch.user2.height
                  }
      io.to(newMatch.user1.id).emit('matched', data);

      data = { otherUser: newMatch.user1.id, whoami: "user 2", myid: newMatch.user2.id, message: pairMessage,
                  otherWidth: newMatch.user1.width, otherHeight: newMatch.user1.height
                }
      io.to(newMatch.user2.id).emit('matched', data);


      // Remove them from the un matched array
      unMatched.splice(0,2);
      //console.log("matcher");
      //console.log("matched: " + matches);
      //console.log("unmatched: " + unMatched);
    }
  }

  // On Disconnection
  socket.on('disconnect', function() {
    console.log(socket.id + " has disconnected");

    // Manage user numbers
    numUsers--;
    let others = { numUsers : numUsers}
    //socket.broadcast.emit('updateUsers', others);

    let found = false;
    if (room == "swoosh"){
      for (let i = 0; i< unMatched.length; i++){
        if (unMatched[i].id == socket.id){
          unMatched.splice(i,1);
          found = true;
          //console.log("not matched disconnected");
          break;

        }
      }
      if (!found){
        //console.log("matched disconnected");
        for (let i = 0; i < matches.length; i++){
          if (matches[i].user1.id == socket.id){
            io.to(matches[i].user2.id).emit('unmatched', '');
            unMatched.push(matches[i].user2);
            matches.splice(i, 1);
            matcher();
          }
          else if (matches[i].user2.id == socket.id){
            io.to(matches[i].user1.id).emit('unmatched', '');
            unMatched.push(matches[i].user1);
            matches.splice(i, 1);
            matcher();
          }
        }
      }
    }
  });

  socket.on('aNewBoid', function(data) {
      io.to(data.otherUser).emit('aNewBoid', data);
  });

  socket.on('iResized', function(data) {
      io.to(data.otherUser).emit('theyResized', data);
  });


}

class User{
  constructor(room, width, height, id){
    this.room = room;
    this.height = height;
    this.width = width;
    this.id = id;
  }
}

class Match{
  constructor(user1, user2){
    this.user1 = user1;
    this.user2 = user2;
  }
}

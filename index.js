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

app.get('/blend', function (req, res) {
  res.render('blend-holding', { title: 'Blend', path: 'blend-holding', theScripts:[]})
})


app.get('/rotate', function (req, res) {
  res.render('rotate', { title: 'Rotate', path: 'rotate', theScripts:[]})
})

app.get('/rotatemulti', function (req, res) {
  res.render('rotatemulti', { title: 'Rotate - Multi', path: 'rotatemulti', theScripts:[]})
})

app.get('/rotatecanvas', function (req, res) {
  res.render('rotate-tidied', { title: 'Rotate - Multi', path: 'rotate-tidied', theScripts:[]})
})

app.get('/linesidea', function (req, res) {
  res.render('linesidea', { title: 'Lines', path: 'linesidea', theScripts:[]})
})

app.get('/shader', function (req, res) {
  res.render('shader', { title: 'Shader', path: 'shader', theScripts:[]})
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
var numPairingUsers = 0;
var toMatch = [];
var doNotMatch = [];
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
  let data = { numUsers : numUsers, numPairingUsers: numPairingUsers}
  socket.emit('onJoin', data);

  // Hear back from the client what room it's in.
  socket.on('matchMe', function(data) {
    console.log("matchme");
    numPairingUsers++;
    socket.join(data.room);
    let newUser = new User(data.room, data.width, data.height, socket.id);
    room = data.room;
    // When a client joins swoosh, add its object to the array of un matched users
    toMatch.push(newUser);
    matcher();
  });

  function matcher(){
    console.log("matcher run");
    let matchFound = false;

    for (let i=0; i<toMatch.length;i++){
      for (let j=0; j<toMatch.length; j++){
        if (i!=j && toMatch[i].room == toMatch[j].room){
          // add to Match array
          let newMatch = new Match(toMatch[i], toMatch[j]);
          matches.push(newMatch);
          let pairMessage;
          let randomNumber = Math.random();
          for (let k = 0; k<pairMessages.length;k++){
            if (randomNumber<=1/pairMessages.length*(k+1)){
              pairMessage = pairMessages[k];
              break;
            }
          }
          // Let them know they're matched and who they matched with
          let data = { partnerID: newMatch.user2.id, whoami: "user 1", myid: newMatch.user1.id, message: pairMessage,
                        partnerWidth: newMatch.user2.width, partnerHeight: newMatch.user2.height
                      }
          io.to(newMatch.user1.id).emit('matched', data);

          data = { partnerID: newMatch.user1.id, whoami: "user 2", myid: newMatch.user2.id, message: pairMessage,
                      partnerWidth: newMatch.user1.width, partnerHeight: newMatch.user1.height
                    }
          io.to(newMatch.user2.id).emit('matched', data);

          // Remove them from the un matched array
          toMatch.splice(i,1);
          if (j>i){
            toMatch.splice(j-1,1);
          }
          else{
            toMatch.splice(j,1);
          }
          console.log("matched: " + matches);
          console.log("toMatch: " + toMatch);
          break;
        }
        if (matchFound){
          break;
        }
      }
      if (matchFound){
        break;
      }
    }
  }

  // On Disconnection
  socket.on('disconnect', function() {
    console.log(socket.id + " has disconnected");

    // Manage user numbers
    numUsers--;
    let others = { numUsers : numUsers}
    //socket.broadcast.emit('updateUsers', others);

    let foundInToMatch = false;

    for (let i = 0; i < toMatch.length; i++){
      if (toMatch[i].id == socket.id){
        toMatch.splice(i,1);
        found = true;
        numPairingUsers--;
        break;
      }
    }
    if (!foundInToMatch){
      for (let i = 0; i < matches.length; i++){
        if (matches[i].user1.id == socket.id){
          io.to(matches[i].user2.id).emit('unMatched', '');
          toMatch.push(matches[i].user2);
          matches.splice(i, 1);
          matcher();
          numPairingUsers--;
        }
        else if (matches[i].user2.id == socket.id){
          io.to(matches[i].user1.id).emit('unMatched', '');
          toMatch.push(matches[i].user1);
          matches.splice(i, 1);
          matcher();
          numPairingUsers--;
        }
      }
    }

  });

  socket.on('sendNewPoint', function(data) {
      console.log(data.partnerID);
      io.to(data.partnerID).emit('passNewPoint', data);
  });

  socket.on('sendNewSetting', function(data) {
      io.to(data.partnerID).emit('passSetting', data);
  });

  socket.on('aNewBoid', function(data) {
      io.to(data.otherUser).emit('aNewBoid', data);
      //console.log("boid drawing");
  });

  socket.on('sendNewSize', function(data) {
      io.to(data.partnerID).emit('passResize', data);
  });

  socket.on('sendPoints', function(data) {
    //console.log("received");
    io.to(data.otherUser).emit('otherUserPoints', data);
  });


  socket.on('goSolo', function(data) {
    console.log("user " + socket.id + " " + data.choice + " state: " + data.state);
    if (data.state == "paired"){
      numPairingUsers--;
      for (let i = 0; i < matches.length; i++){
        if (matches[i].user1.id == socket.id){
          io.to(matches[i].user2.id).emit('unMatched', '');
          toMatch.push(matches[i].user2);
          matches.splice(i, 1);
          matcher();

        }
        else if (matches[i].user2.id == socket.id){
          io.to(matches[i].user1.id).emit('unMatched', '');
          toMatch.push(matches[i].user1);
          matches.splice(i, 1);
          matcher();
        }
      }
    }
    else {
      console.log("removing from to pair list");
      numPairingUsers--;
      for (let i = 0; i< toMatch.length; i++){
        if (toMatch[i].id == socket.id){
          toMatch.splice(i,1);
          console.log("removed");
          break;
        }
      }
    }
  });

  socket.on('sendGoodbye', function(data) {
    io.to(data.otherUser).emit('goodbye', '');
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

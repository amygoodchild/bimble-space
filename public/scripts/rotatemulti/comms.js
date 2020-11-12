function initiateServer(){
  // Connects to server for comms
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    ps.socket = io.connect('http://localhost:3000');
  }
  else{                                                   // CAUTION!!!!!!
    ps.socket = io.connect('https://desolate-dusk-28350.herokuapp.com/');
  }
  ps.socket.on('matched', matched);
  ps.socket.on('otherUserDrawingRotate', otherUserDrawing);
  ps.socket.on('otherUserSettingRotate', otherUserSetting);
  ps.socket.on('unMatched', unmatched);
  ps.socket.on('theyResized', theyResized);
  ps.socket.on('otherUserPoints', otherUserPoints);
}

/*/////////////
*
* Functions to send a message
*
*//////////////



//
function sendMyPoints(){
  //var newLocation = new Location(50, 100, true, 50, 1, true);
  //newLocation.setupLocation();
  var data = {
    points : ps.locations,
    otherUser : ps.otherUser
  }
  ps.socket.emit('sendPoints', data);
}

function sendNewPoints(){
  var data = {
    x : ps.locations[ps.locations.length-1].x,
    y : ps.locations[ps.locations.length-1].y,
    draw : ps.locations[ps.locations.length-1].draw,
    size: ps.locations[ps.locations.length-1].size,
    colorChoice : ps.locations[ps.locations.length-1].colorChoice,
    clockwise : ps.locations[ps.locations.length-1].spinClockwise,
    otherUser : ps.otherUser
  }

  //console.log(data);
  ps.socket.emit('sendNewPoints', data);

  ps.myDrawCount++;
  //console.log("me: " + p.myDrawCount);
}



/*/////////////
*
* Functions when a message is received
*
*//////////////

// When you get a new partner
function matched(data){
  console.log("I am: " + data.whoami);
  console.log("My id is: " + data.myid);
  console.log("Matched with: " + data.otherUser);

  $(".pairingDrawer").css("display", "none");
  $("#pairedButtons").css("display", "block");

  ps.pairCounter++;
  //gtag('event', "Pairing", {
  //   'event_category': "Rotate",
  //   'event_label': ps.pairCounter
  //});

  $("#infoContent").html("You're paired up - " + data.message);
  ps.otherWidth = data.otherWidth;    // map up the screen widths
  ps.otherHeight = data.otherHeight;

  ps.otherUser = data.otherUser;
  ps.matchState = "paired";
}

// When your partner leaves
function unmatched(data){
  console.log("Unmatched :(");

   $(".pairingDrawer").css("display", "none");
   $("#searchingButtons").css("display", "block");

  let randomNumber = ps.random(0,1);   // to pick a lone message
  for (let i = 0; i<=ps.loneMessages.length;i++){
    if (randomNumber<=1/ps.loneMessages.length*(i+1)){
      $("#infoContent").html("Partner left.<br>Finding you a new friend...");
      break;
    }
  }
  ps.wrapWidth = ps.width; // set the wrap with back to our own
  ps.wrapHeight = ps.height;
  ps.matched = false;
  //gtag('event', "Unpairing", {
  //  'event_category': "Rotate",
  //  'event_label': ps.pairCounter
  //});

  ps.matchState = "searching";

  if(ps.otherLocations.length > 0){
    ps.otherLocations.splice(0,ps.otherLocations.length);
  }
}

// Partner has new points to add
function otherUserDrawing(data){
  ps.otherDrawCount++;
  //console.log("otheruser: " + p.otherDrawCount);

  let xposition = data.x/ps.otherWidth * ps.width;
  let yposition = data.y/ps.otherHeight * ps.height;

  var newLocation = new Location(xposition, yposition, data.draw, data.size, data.colorChoice, data.clockwise);
  newLocation.setupLocation();
  ps.otherLocations.push(newLocation);

  if (!data.draw){
    for (let i = 0; i<ps.otherLocations.length;i++){
      ps.otherLocations[i].rotate = true;
    }
  }
  //console.log("received");
}

// Get partner's points
function otherUserPoints(data){
  for (let i = ps.otherLocations.length; i < data.points.length; i++){
    let xposition = data.points[i].x/ps.otherWidth * ps.width;
    let yposition = data.points[i].y/ps.otherHeight * ps.height;

    var newLocation = new Location(xposition, yposition, data.points[i].draw, data.points[i].size, data.points[i].colorChoice, data.points[i].spinClockwise);
    newLocation.setupLocation();
    ps.otherLocations.push(newLocation);
  }
}


// ^^ Shouldn't need both of these i think?

// When partner changes a setting
function otherUserSetting(data){
  if (data.variable == "background color"){
    ps.chosenBackground = data.value;
    if (ps.backgroundOpacity == 0){
      ps.backgroundFade = true;
      ps.backgroundFadeCount = ps.frameCount;
    }

    if (data.value == 0){
      $(".menuText").removeClass("blackText");
      $("#bgColorsMenu").children(".menuIcon").removeClass("blackBorder");
      $("#penColorsMenu").children(".menuIcon").removeClass("blackBorder");
      $(".penColorButton").removeClass("blackBorder");
      $(".bgColorButton").removeClass("blackBorder");
    }
    else{
      $(".menuText").addClass("blackText");
      $("#bgColorsMenu").children(".menuIcon").addClass("blackBorder");
      $("#penColorsMenu").children(".menuIcon").addClass("blackBorder");
      $(".penColorButton").addClass("blackBorder");
      $(".bgColorButton").addClass("blackBorder");
    }

    let theClass;
    for (let i=0; i<5;i++){
      theClass = "bgColor" + i;
      $("#bgColorsMenu").children(".menuIcon").removeClass(theClass);
    }
    theClass = "bgColor" + data.value;
    $("#bgColorsMenu").children(".menuIcon").addClass(theClass);

  }
  if (data.variable == "background opacity"){
    $(".trailLengthButton").removeClass("sliderButtonSelected");
    $("#" + data.id).addClass("sliderButtonSelected");

    ps.backgroundOpacity = ps.backgroundOpacitys[data.value];

    let message = "Trail length changed to " + data.value;
    ps.addNotification(message);

  }
  if (data.variable == "rotate speed"){
    $(".speedButton").removeClass("sliderButtonSelected");
    $("#" + data.id).addClass("sliderButtonSelected");
    ps.angleA = ps.radians(ps.speeds[data.value]);

    let message = "Speed changed to " + data.value;
    ps.addNotification(message);
  }
  if (data.variable == "clear"){
    clearPoints();
    let message = "Canvas cleared";
    ps.addNotification(message);
  }
}

// Partner changed their screen size
function theyResized(data){
  ps.otherWidth = data.newWidth;    // map up the screen widths
  ps.otherHeight = data.newHeight;
}

class CommsHandler{
  constructor(){
    // Connects to server for comms
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      this.socket = io.connect('http://localhost:3000');
    }
    else{                                                   // CAUTION!!!!!!
      this.socket = io.connect('https://desolate-dusk-28350.herokuapp.com/');
    }
    this.socket.on('matched', matched);
    this.socket.on('passNewPoint', partnerNewPoint);
    this.socket.on('otherUserSettingRotate', otherUserSetting);
    this.socket.on('unMatched', unmatched);
    this.socket.on('theyResized', theyResized);

    this.matchState = "solo";
    this.partnerID = "test";

    console.log("constructor");

    this.partnerWidth;
    this.partnerHeight; //////////////////////////////
  }


  search(matchState){
    console.log("searching");
    this.matchState = matchState;
    if (this.matchState == "searching"){
      let sendData = {
        room : "rotate",
        width : ps.width,
        height : ps.height,
        pair: true
      }
      this.socket.emit('matchMe', sendData);
    }
    else{
      this.matchState = "solo";
    }
  }


  sendNewPoint(x, y, draw, size, colorChoice, clockwise){
    let id = this.partnerID;
    let data = {
      partnerID : id,
      x : x,
      y : y,
      draw : draw,
      size: size,
      colorChoice : colorChoice,
      clockwise : clockwise
    }
    this.socket.emit('sendNewPoint', data);
  }

  sendSettingChange(setting, value, cssID){
    let id = this.partnerID;
    var data = {
      setting : setting,
      value: value,
      cssID: cssID,
      otherUser : id
    }
    ps.socket.emit('sendSettingChange', data);
  }
}

function partnerNewPoint(data){
  let xposition = data.x/ps.commsHandler.partnerWidth * ps.width;
  let yposition = data.y/ps.commsHandler.partnerHeight * ps.height;
  ps.pointsHandler.newPartnerPoint(xposition, yposition, data.draw, data.size, data.colorChoice, data.clockwise);
}


function matched(data){
  console.log("I am: " + data.whoami);
  console.log("My id is: " + data.myid);
  console.log("Matched with: " + data.otherUser);

  $(".pairingDrawer").css("display", "none");
  $("#pairedButtons").css("display", "block");

  $("#infoContent").html("You're paired up - " + data.message);

  ps.commsHandler.partnerWidth = data.otherWidth;    // map up the screen widths
  ps.commsHandler.partnerHeight = data.otherHeight;

  ps.commsHandler.partnerID = data.otherUser;
  this.matchState = "paired";
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

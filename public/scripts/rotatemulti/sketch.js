var landscape;
  if ($( window ).height() < $( window ).width()){
    landscape = true;
    console.log("landscape");
  }
  else{
    landscape = false;
    console.log("portrait");

  }

  $(window).blur(function () {
      //do something
       console.log("You left this tab");
  });

  $(window).focus(function () {
        //do something
         console.log("You are in this tab");
  });


  $( window ).resize(function() {
    if (ps.windowHeight < ps.windowWidth){
      landscape = true;
      $("#menu").css("width", "55px");
      $("#menu").css("height", "100%");
      $(".menuButtonClosed").css("display", "inline-block");
      $(".menuButtonOpen").css("display", "none");
      $(".menuButtonClosedMobile").css("display", "none");
      $(".menuButtonOpenMobile").css("display", "none")

      newToyWidth =  ps.windowWidth - 55;
      newToyHeight = ps.windowHeight;
    }
    else{
      landscape = false;

      $("#menu").css("height", "50px");
      $("#menu").css("width", "100%");
      $(".menuButtonClosedMobile").css("display", "inline-block");
      $(".menuButtonOpenMobile").css("display", "none");
      $(".menuButtonClosed").css("display", "none");
      $(".menuButtonOpen").css("display", "none");

      newToyWidth =  ps.windowWidth;
      newToyHeight = ps.windowHeight - 50;

    }

    $("#theToyContainer").css({ 'width': newToyWidth });
    $("#theToyContainer").css({ 'height': newToyHeight });
    ps.resizeCanvas(parseInt($("#theToyContainer").width()), parseInt($("#theToyContainer").height()));

    data = {
      newWidth : newToyWidth,
      newHeight : newToyHeight,
      otherUser : ps.otherUser
    }

    ps.socket.emit('iResized', data);


  });


function sortOutWindowResize(){

}

const rotateSketch = ( p ) => {

//  p.boids = [];
//  p.idleCounting = false;
  p.frameRateLerp = 30;  // For displaying framerate more smoothly/readably
  p.disableFriendlyErrors = true; // Supposed to improve p5js performance... *shrug*
  p.debugMode = false;    // debug and stuff for measuring time taken

  p.prevMillis;
  p.newMillis;
  p.milliAngle;

  p.myDrawCount = 0;
  p.otherDrawCount = 0;

  p.angle = 1;
  p.locations = [];
  p.otherLocations = [];
  p.lerpMouseX;
  p.lerpMouseY;
  p.penSize = 2;
  p.backgroundOpacity = 0;
  p.backgroundOpacitys;
  p.speeds;
  p.bgOpacityToUse;
  p.penLerp = 0.25;
  p.spinClockwise = true;
  p.rotationDivision = 2.5;
  p.targetRotationDivision = 2.5;
  p.clearLines = false;

  p.chosenGradient = 0;
  p.chosenBackground = 0;
  p.gradients = [];
  p.backgrounds = [];

  p.angleA = p.radians(0.7);
  p.vector1 = new p.createVector(0, -10);
  p.drawing = false;
  p.changedBg;

  p.tx = 7;
  p.ty = 100;

  p.noDraw = false;
  p.drawOpen = false;

  p.otherWidth;          // Partner's screen size, so we can map movement from different resolutions
  p.otherHeight;
  p.matchState = "noPartner";
  p.otherUser;
  p.pairCounter = 0;
  p.loneMessages = [];

  p.maxIdle = 3000;
  p.lastNotIdle = 0;

  p.setup = () => {
    //p.frameRate(5);
    // Connects to server for comms
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      p.socket = io.connect('http://localhost:3000');
    }
    else{
      p.socket = io.connect('https://desolate-dusk-28350.herokuapp.com/');
    }

    // Set up some options
    p.colorMode(p.RGB,255,255,255,100);
    p.noStroke();
    p.angleMode(p.DEGREES);

    //p.frameRate(1);  // for debugging

    // Creates the canvas
    if (p.int(p.windowWidth) > p.int(p.windowHeight)){    // landscape
      p.theWidth = p.int(p.windowWidth) - 55;
      p.theHeight = p.int(p.windowHeight);
      p.rippleCanvas = p.createCanvas(p.theWidth, p.theHeight);

    }
    else{                                               // portrait
      p.theWidth = p.int(p.windowWidth);
      p.theHeight = p.int(p.windowHeight) - 50;
      p.rippleCanvas = p.createCanvas(p.theWidth, p.theHeight);
    }

    p.rippleCanvas.parent('theToyContainer');

    p.lerpMouseX = p.width/2;
    p.lerpMouseY = p.height/2;

    p.gradients[0] = new PenGradient(115, 191, 229, 229, 115, 229);
    p.gradients[1] = new PenGradient(254, 31, 234,255, 206, 25);
    p.gradients[2] = new PenGradient(196, 233, 0, 25, 255, 245);
    p.gradients[3] = new PenGradient(233, 0, 0, 44, 25, 255);
    p.gradients[4] = new PenGradient(160, 0, 233, 255, 25, 149);

    p.backgrounds[0] = p.color(15,15,15);
    p.backgrounds[1] = p.color(255,255,255);
    p.backgrounds[2] = p.color('#f9ccff');
    p.backgrounds[3] = p.color('#ccedff');
    p.backgrounds[4] = p.color('#fdffcc');

    p.background(p.backgrounds[0]);

    // hee hee.
    p.loneMessages[0] = "Like a spider";
    p.loneMessages[1] = "such as a monk";
    p.loneMessages[2] = "much like the moon";
    p.loneMessages[3] = "deep";
    p.loneMessages[4] = "hope you're having a nice time";

    p.socket.on('matched', p.matched);
    p.socket.on('otherUserDrawingRotate', p.otherUserDrawing);
    p.socket.on('otherUserSettingRotate', p.otherUserSetting);
    p.socket.on('unMatched', p.unmatched);          // Lets us know we've been unmatched (the other person left)
    p.socket.on('theyResized', p.theyResized);
    p.socket.on('otherUserPoints', p.otherUserPoints);


    if (landscape){
      p.penSizes = [0, 8, 10, 15, 30, 60, 100];
      p.speeds = [0, 0.2, 0.55, 0.7, 1.5, 2.0];
    }

    else {
      p.penLerp = 0.35;
      p.penSizes = [0, 3, 5, 8, 10, 30, 60];
      p.speeds = [0, 0.2, 0.55, 0.7, 1.5, 2.0];

      //p.speeds = [0, 0.4, 0.8, 1.5, 1.9, 2.6];
    }

    p.backgroundOpacitys = [100, 100, 70, 30, 14, 6, 0];
  };


  p.matched = (data) =>{
     console.log("I am: " + data.whoami);
     console.log("My id is: " + data.myid);
     console.log("Matched with: " + data.otherUser);

     $(".pairingDrawer").css("display", "none");
     $("#pairedButtons").css("display", "block");

     p.pairCounter++;
     //gtag('event', "Pairing", {
     //   'event_category': "Rotate",
     //   'event_label': p.pairCounter
     //});

     $("#infoContent").html("You're paired up - " + data.message);
     p.otherWidth = data.otherWidth;    // map up the screen widths
     p.otherHeight = data.otherHeight;

     p.otherUser = data.otherUser;
     p.matchState = "paired";
  }

  p.unmatched = (data) =>{
    console.log("Unmatched :(");

     $(".pairingDrawer").css("display", "none");
     $("#searchingButtons").css("display", "block");

    let randomNumber = p.random(0,1);   // to pick a lone message
    for (let i = 0; i<=p.loneMessages.length;i++){
      if (randomNumber<=1/p.loneMessages.length*(i+1)){
        $("#infoContent").html("Partner left.<br>Finding you a new friend...");
        break;
      }
    }
    p.wrapWidth = p.width; // set the wrap with back to our own
    p.wrapHeight = p.height;
    p.matched = false;
    //gtag('event', "Unpairing", {
    //  'event_category': "Rotate",
    //  'event_label': p.pairCounter
    //});

    p.matchState = "searching";

    if(p.otherLocations.length > 0){
      p.otherLocations.splice(0,p.otherLocations.length);
    }
  }


  p.draw = () => {

    p.newMillis = p.millis();

    p.moveNotificationsUp();

    if (p.chosenBackground == 0){
      p.blendMode(p.DIFFERENCE);
      p.bgOpacityToUse = p.backgroundOpacity;
    }
    else if (p.chosenBackground == 1){
      p.blendMode(p.ADD);
      p.bgOpacityToUse = p.backgroundOpacity/15;
    }
    else{
      p.blendMode(p.BLEND);
      p.bgOpacityToUse = p.backgroundOpacity/3.5;
    }


    p.fill(p.red(p.backgrounds[p.chosenBackground]),p.green(p.backgrounds[p.chosenBackground]),p.blue(p.backgrounds[p.chosenBackground]),p.bgOpacityToUse);
    p.noStroke();
    p.rect(0,0,p.width,p.height);


    p.blendMode(p.BLEND);


    if (p.canvasClick()){
      p.getNewPoints();
    }

    p.milliAngle = ((p.angleA/16) * (p.newMillis - p.prevMillis))/2;
    //p.milliAngle = p.angleA/3;
    //console.log("milli: " + p.milliAngle);
    //console.log("angle: " + p.angleA);
    //console.log("--");
    if (p.matchState == "paired" && p.otherLocations.length > 0){
      for (let j=0;j<2;j++){
        p.updateOtherPoints();
        p.deleteOtherPoints();
        p.drawOtherPoints();
      }
    }

    if (p.locations.length > 0){
      //p.drawPointsWithTrails();
      for (let j=0;j<2;j++){
        p.updatePoints();
        p.deletePoints();
        p.drawPoints();
      }
    }

    if (p.clearLines){
      if(p.locations.length > 0){
        p.locations.splice(0,p.locations.length);
      }
      if(p.otherLocations.length > 0){
        p.otherLocations.splice(0,p.otherLocations.length);
      }
      p.clearLines = false;
      p.backgroundFade = true;
      p.backgroundFadeCount = p.frameCount;
    }

    if (p.backgroundFade){
      p.background(p.red(p.backgrounds[p.chosenBackground]),p.green(p.backgrounds[p.chosenBackground]),p.blue(p.backgrounds[p.chosenBackground]),30);

    }
    if (p.frameCount > p.backgroundFadeCount +60){
      p.backgroundFade = false;
    }

    if (p.noDrawSoon && p.millis > p.noDrawTime + 500){
      p.noDraw = false;
      p.noDrawSoon = false;
    }

    if(p.debugMode){
      if (p.frameCount % 5 == 0){
        p.frameRateLerp = p.lerp(p.frameRateLerp, p.frameRate(), 1.0);
      }
      //p.fill(0,0,0);
      //p.rect(80,0,40,90);
      p.fill(0,0,100);
      p.textSize(50);
      p.text(p.int(p.frameRateLerp), 230, 200);
      p.textSize(20);
      p.text("framerate:", 85, 200);
    }



    if (p.lastNotIdle + p.maxIdle < p.millis()){
      //console.log("idle");
    }

    if(p.mouseIsPressed){

      p.lastNotIdle = p.millis();
      //console.log(p.lastNotIdle);
    }

    //p.tx +=0.01;
    //p.ty +=0.01;

    p.prevMillis = p.millis();
  };

  p.sendMyPoints = () =>{
    //var newLocation = new Location(50, 100, true, 50, 1, true);
    //newLocation.setupLocation();
    var data = {
      points : p.locations,
      otherUser : p.otherUser
    }
    p.socket.emit('sendPoints', data);
    //console.log("sending");
  }

  p.otherUserPoints = (data) =>{

    for (let i = p.otherLocations.length; i < data.points.length; i++){
      let xposition = data.points[i].x/p.otherWidth * p.width;
      let yposition = data.points[i].y/p.otherHeight * p.height;

      var newLocation = new Location(xposition, yposition, data.points[i].draw, data.points[i].size, data.points[i].colorChoice, data.points[i].spinClockwise);
      newLocation.setupLocation();
      p.otherLocations.push(newLocation);
    }
  }

  p.canvasClick = () => {
    if (!landscape){
      if (p.mouseY > ps.height - 70){
        return false;
      }
      else if (p.drawOpen){
        return false;
      }
      else{
        return true;
      }
    }
    else{
      return true;
    }
  };

  p.deleteOtherPoints = () => {
    if (p.otherLocations.length > 800){
      p.otherLocations.splice(0,1);
    }
  };

  p.deletePoints = () => {
    if (p.locations.length > 800){
      p.locations.splice(0,1);
    }
  };




  p.otherUserSetting = (data) => {
    if (data.variable == "background color"){
      p.chosenBackground = data.value;
      if (p.backgroundOpacity == 0){
        p.backgroundFade = true;
        p.backgroundFadeCount = p.frameCount;
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

      p.backgroundOpacity = p.backgroundOpacitys[data.value];

      let message = "Trail length changed to " + data.value;
      p.addNotification(message);

    }
    if (data.variable == "rotate speed"){
      $(".speedButton").removeClass("sliderButtonSelected");
      $("#" + data.id).addClass("sliderButtonSelected");
      ps.angleA = ps.radians(p.speeds[data.value]);

      let message = "Speed changed to " + data.value;
      p.addNotification(message);
    }
    if (data.variable == "clear"){
      ps.clearLines = true;
      let message = "Canvas cleared";
      p.addNotification(message);
    }

  }

    p.theyResized = (data) =>{
      p.otherWidth = data.newWidth;    // map up the screen widths
      p.otherHeight = data.newHeight;
    }

  p.getNewPoints = () => {

    p.lerpMouseX = p.lerp(p.lerpMouseX, p.mouseX, p.penLerp);
    p.lerpMouseY = p.lerp(p.lerpMouseY, p.mouseY, p.penLerp);

    if(p.mouseIsPressed && p.mouseX > 0 && !p.noDraw){
      if (!p.drawing){
        p.lerpMouseX = p.mouseX;
        p.lerpMouseY = p.mouseY;
        p.drawing = true;
      }
      var newLocation = new Location(p.lerpMouseX, p.lerpMouseY, true, p.penSize, p.chosenGradient, p.spinClockwise);
      newLocation.setupLocation();
      p.locations.push(newLocation);

      //if(p.matchState == "paired"){
      //  p.sendNewPoints();
      //}
    }

    if(!p.mouseIsPressed && p.drawing){
      p.drawing = false;
      var newLocation = new Location(p.mouseX, p.mouseY, false, p.penSize, p.chosenGradient, p.spinClockwise);
      p.locations.push(newLocation);

      //if(p.matchState == "paired"){
      //  p.sendNewPoints();
      //}

      if(p.matchState == "paired"){
        p.sendMyPoints();
      }
    }
  }

  p.drawPoints = () => {
    p.stroke(255,0,100);
    p.strokeWeight(p.locations[0].size);
    let chosenColor1 = p.color(p.gradients[p.locations[0].colorChoice].hue1, p.gradients[p.locations[0].colorChoice].sat1, p.gradients[p.locations[0].colorChoice].bri1);
    let chosenColor2 = p.color(p.gradients[p.locations[0].colorChoice].hue2, p.gradients[p.locations[0].colorChoice].sat2, p.gradients[p.locations[0].colorChoice].bri2);

    p.noFill();
    p.beginShape()
    for (let i=1; i<p.locations.length;i++){
      if (p.locations[i].draw){
        let thisColor = p.lerpColor(chosenColor1, chosenColor2, p.map(i, 0, p.locations.length, 0, 1));
        p.stroke(thisColor);
        p.vertex(p.locations[i].x, p.locations[i].y);
      }
      else if (i < p.locations.length-1){
        p.endShape();
        p.strokeWeight(p.locations[i+1].size);
        p.beginShape();
      }

      if (i%2==0 && i > 0 && i < p.locations.length-1){
        p.endShape();
        p.strokeWeight(p.locations[i+1].size);
        chosenColor1 = p.color(p.gradients[p.locations[i+1].colorChoice].hue1, p.gradients[p.locations[i+1].colorChoice].sat1, p.gradients[p.locations[i+1].colorChoice].bri1);
        chosenColor2 = p.color(p.gradients[p.locations[i+1].colorChoice].hue2, p.gradients[p.locations[i+1].colorChoice].sat2, p.gradients[p.locations[i+1].colorChoice].bri2);
        let thisColor = p.lerpColor(chosenColor1, chosenColor2, p.map(i, 0, p.locations.length, 0, 1));
        p.stroke(thisColor);
        p.beginShape();
        if (p.locations[i].draw){
          p.vertex(p.locations[i].x, p.locations[i].y);
        }
      //  console.log("break");
      }

    }
    p.endShape();
  }



  p.drawOtherPoints = () => {
    p.stroke(255,0,100);
    p.strokeWeight(p.otherLocations[0].size);
    let chosenColor1 = p.color(p.gradients[p.otherLocations[0].colorChoice].hue1, p.gradients[p.otherLocations[0].colorChoice].sat1, p.gradients[p.otherLocations[0].colorChoice].bri1);
    let chosenColor2 = p.color(p.gradients[p.otherLocations[0].colorChoice].hue2, p.gradients[p.otherLocations[0].colorChoice].sat2, p.gradients[p.otherLocations[0].colorChoice].bri2);

    p.noFill();
    p.beginShape()
    for (let i=1; i<p.otherLocations.length;i++){
      if (p.otherLocations[i].draw){
        let thisColor = p.lerpColor(chosenColor1, chosenColor2, p.map(i, 0, p.otherLocations.length, 0, 1));
        p.stroke(thisColor);
        p.vertex(p.otherLocations[i].x, p.otherLocations[i].y);

      }
      else if (i < p.otherLocations.length-1){
        p.endShape();
        p.strokeWeight(p.otherLocations[i+1].size);
        p.beginShape();
      }

      if (i%2==0 && i > 0 && i < p.otherLocations.length-1){
        p.endShape();
        p.strokeWeight(p.otherLocations[i+1].size);
        chosenColor1 = p.color(p.gradients[p.otherLocations[i+1].colorChoice].hue1, p.gradients[p.otherLocations[i+1].colorChoice].sat1, p.gradients[p.otherLocations[i+1].colorChoice].bri1);
        chosenColor2 = p.color(p.gradients[p.otherLocations[i+1].colorChoice].hue2, p.gradients[p.otherLocations[i+1].colorChoice].sat2, p.gradients[p.otherLocations[i+1].colorChoice].bri2);
        let thisColor = p.lerpColor(chosenColor1, chosenColor2, p.map(i, 0, p.otherLocations.length, 0, 1));
        p.stroke(thisColor);
        p.beginShape();
        if (p.otherLocations[i].draw){
          p.vertex(p.otherLocations[i].x, p.otherLocations[i].y);
        }
      //  console.log("break");
      }

    }
    p.endShape();
  }


  p.updateOtherPoints = () => {
      for (let i=0; i<p.otherLocations.length;i++){
        p.otherLocations[i].update();
      }
  }

  p.updatePoints = () => {
      for (let i=0; i<p.locations.length;i++){
        p.locations[i].update();
      }
  }



  p.keyPressed = () => {
    p.backgroundFade = true;
    p.backgroundFadeCount = p.frameCount;
  }



  p.addNotification = (message) => {

      // Adds an element to the document
      var n = document.getElementById("notification");
      var newElement = document.createElement("div");

      newElement.setAttribute('class', "notificationMessage");
      let newID = p.int(p.random(0,50000));
      newElement.setAttribute('id', newID);
      newElement.innerHTML = message;
      n.appendChild(newElement);
  }


  p.moveNotificationsUp = () => {
      //notifications = document.getElementById("notification").children;
      //console.log(notifications);

        $('#notification').children().each(function () {
          let newBottom = $(this).css("bottom");
          newBottom = parseInt(newBottom.substring(0,newBottom.length -2));
          newBottom += 2;
          $(this).css("bottom", newBottom + "px");

          let newOpacity = $(this).css("opacity");
          newOpacity = parseFloat(newOpacity);
          newOpacity -= 0.01;
          $(this).css("opacity", newOpacity);

          if (newBottom > 300){
            $(this).remove();
          }
        });


  }

  class TestObj{
    constructor(x, y, draw, size, colorChoice, clockwise){
      this.x = x;
      this.y = y;
      this.draw = draw;
      this.size = size;
      this.colorChoice = colorChoice;
      this.clockwise = clockwise;

      this.position;
      this.VectorLocation;
      this.angleB;
      this.spinClockWise;
      this.distanceFromCentre;

      this.setup = false;
  	}

    setupLocation(){
      this.position = p.createVector(this.x,this.y);       // mouseposition
      this.draw = this.draw;
      this.size = this.size;
      this.colorChoice = this.colorChoice;
      this.vectorLocation = p.createVector(this.x - p.width/2, this.y - p.height/2); // from centre
      this.angleB = p.vector1.angleBetween(this.vectorLocation);
      this.spinClockwise = this.clockwise;

      this.distanceFromCentre = p.dist(p.width/2, p.height/2, this.x, this.y);
      this.setup = true;

    }
  }


  class Location{
    constructor(x, y, draw, size, colorChoice, clockwise){
      this.x = x;
      this.y = y;
      this.draw = draw;
      this.size = size;
      this.colorChoice = colorChoice;
      this.spinClockwise = clockwise;
      this.vectorLocationX = this.x - p.width/2;
      this.vectorLocationY = this.y - p.height/2;

      this.angleB;
      this.distanceFromCentre;

      this.setup = false;
  	}

    setupLocation(){
      let tempVec = p.createVector(this.vectorLocationX, this.vectorLocationY);

      this.angleB = p.vector1.angleBetween(tempVec);
      this.distanceFromCentre = p.dist(p.width/2, p.height/2, this.x, this.y);
      this.setup = true;

    }

    update(){
      if (!this.setup){
        this.setupLocation();
      }

      this.x = p.width/2 + (this.distanceFromCentre * p.sin(p.degrees(this.angleB + p.milliAngle)));
      this.y = p.height/2 - (this.distanceFromCentre * p.cos(p.degrees(this.angleB + p.milliAngle)));

      if (this.spinClockwise){
        this.angleB += p.milliAngle;
      }
      else{
        this.angleB -= p.milliAngle;
      }
    }
  }

  class PenGradient{
    constructor(hue1, sat1, bri1, hue2, sat2, bri2){
      this.hue1 = hue1;
      this.sat1 = sat1;
      this.bri1 = bri1;
      this.hue2 = hue2;
      this.sat2 = sat2;
      this.bri2 = bri2;
    }

  }



}



var ps = new p5(rotateSketch);

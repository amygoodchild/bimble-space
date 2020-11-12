/*
*
* Rotate as drawing
*
*/

const rotateSketch = function(p){
  //p.idleCounting = false;
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

  p.drawOpen = false;

  p.otherWidth;          // Partner's screen size, so we can map movement from different resolutions
  p.otherHeight;
  p.matchState = "noPartner";
  p.otherUser;
  p.pairCounter = 0;
  p.loneMessages = [];

  p.maxIdle = 3000;
  p.lastNotIdle = 0;

  p.setup = function() {
    //p.frameRate(5);
    initiateServer();
    setupMessages();
    initiateCanvas();
    setupColors();
    setupPens();
  };

  p.draw = function(){
    // Animate the notifications about settings being changed by partner
    moveNotificationsUp();

    // Draw the background (in function because of complex stuff with blend modes)
    drawBackground();

    // If the mouse is clicked on the canvas, add points to array
    if (canvasClick()){
      getNewPoints();
    }

    calculateMilliAngle();

    // Manage my point array and draw them
    if (p.matchState == "paired" && p.otherLocations.length > 0){
      updateOtherPoints();
      deleteOtherPoints();
      drawOtherPoints();
    }
    // Manage partner's point array and draw them
    if (p.locations.length > 0){
      updatePoints();
      deletePoints();
      drawPoints();
    }

    if(p.debugMode){
      debugMode();
    }

    if (p.lastNotIdle + p.maxIdle < p.millis()){
      //console.log("idle");
    }

    //if(p.matchState == "paired" ){
    //  p.sendMyPoints();
    //}
  };


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


}



var ps = new p5(rotateSketch);

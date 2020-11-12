
const rotateSketch = function(p){
  //p.idleCounting = false;
  p.frameRateLerp = 30;  // For displaying framerate more smoothly/readably
  p.disableFriendlyErrors = false; // Supposed to improve p5js performance... *shrug*
  p.debugMode = false;    // debug and stuff for measuring time taken

  p.drawOpen = false;

  p.canvasHandler;
  p.commsHandler;
  p.pointsHandler;
  p.settingHandler;

  p.setup = function() {
    //p.frameRate(1);

    p.commsHandler = new CommsHandler();
    p.canvasHandler = new CanvasHandler();
    p.pointsHandler = new PointsHandler();
    p.settingHandler = new SettingHandler();

  };

  p.draw = function(){
    // Animate the notifications about settings being changed by partner
    moveNotificationsUp();

    // Draw the background (in function because of complex stuff with blend modes)
    drawBackground();

    p.pointsHandler.deletePoints();

    //for (let i = 0; i< 5; i++){
      p.pointsHandler.updatePoints();
      p.pointsHandler.drawPoints();
    //}


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

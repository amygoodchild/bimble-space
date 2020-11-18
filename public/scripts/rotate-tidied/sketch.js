const rotateSketch = function(p){
  //p.idleCounting = false;
  p.frameRateLerp = 30;  // For displaying framerate more smoothly/readably
  p.disableFriendlyErrors = false; // Supposed to improve p5js performance... *shrug*
  p.debugMode = false;    // debug and stuff for measuring time taken

  //p.drawOpen = false;

  p.canvasHandler;
  p.commsHandler;
  p.pointsHandler;
  p.settingHandler;
  p.commsUI;
  p.settingUI;
  p.idleHandler;

  p.setup = function() {
    //p.frameRate(1);
    //console.log("a");
    p.commsHandler = new CommsHandler();
    //console.log("b");
    p.canvasHandler = new CanvasHandler();
  //  console.log("c");
    p.pointsHandler = new PointsHandler();
  //  console.log("d");
    p.settingHandler = new SettingHandler();
    //console.log("e");
    p.commsUI = new CommsUI();
    //console.log("f");
    p.settingUI = new SettingUI();
    //console.log("g");
    p.idleHandler = new IdleHandler();
  };

  p.draw = function(){

    // Animate the notifications about settings being changed by partner
    moveNotificationsUp();

    // Draw the background (in function because of complex stuff with blend modes)
    p.canvasHandler.drawBackground();

    p.pointsHandler.deletePoints();

    p.pointsHandler.calcAngle();

    for (let i = 0; i < 3; i++){
      p.pointsHandler.updatePoints();
      p.pointsHandler.drawPoints();
    }

    if(p.debugMode){
      p.canvasHandler.debugMode();
    }

  };

  p.mouseDragged = () => {
    p.pointsHandler.mouseEvent(true);
  }

  p.mouseReleased = () => {
    p.pointsHandler.mouseEvent(false);
  }

}

var ps = new p5(rotateSketch);

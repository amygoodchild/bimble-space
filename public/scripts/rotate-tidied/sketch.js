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

  p.newPointThisFrame = false;

  p.setup = function() {
    p.commsHandler = new CommsHandler();
    p.canvasHandler = new CanvasHandler();
    p.pointsHandler = new PointsHandler();
    p.settingHandler = new SettingHandler();
    p.commsUI = new CommsUI();
    p.settingUI = new SettingUI();
    p.idleHandler = new IdleHandler();
  };

  p.draw = function(){

    p.newPointThisFrame = false;
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

  p.mousePressed = () => {
    p.pointsHandler.mouseEvent(true);
  }
  p.mouseDragged = () => {
    p.pointsHandler.mouseEvent(true);
  }

  p.mouseReleased = () => {
    p.pointsHandler.mouseEvent(false);
  }

}

var ps = new p5(rotateSketch);

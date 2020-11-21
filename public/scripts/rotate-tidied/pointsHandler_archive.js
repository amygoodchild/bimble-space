/*$(window).blur(function () {
    //do something
});

$(window).focus(function () {
      //do something
});
*/
class PointsHandler{
  constructor(){
    this.points = [];
    this.partnerPoints = [];

    this.mousePressed = false;
    this.mouseXLerped = ps.mouseX;
    this.mouseYLerped = ps.mouseY;

    if (ps.canvasHandler.landscape){
      this.lerpAmount = 0.01;
    }
    else {
      this.lerpAmount = 0.2;
    }

    this.lastTime = 0;
    this.rotateAngle = 0;
    this.angleLerpAmount = 0.4;
    this.awayTracker = false;
  }

  mouseEvent(down){
    if (down){
      this.mousePressed = true;
      this.newPoint(this.mousePressed);
      ps.idleHandler.setActivity();
    }
    else{
      this.mousePressed = false;
      this.newPoint(this.mousePressed);
      ps.idleHandler.setActivity();
      $("#idleWarning").css("display", "none");
      $("#idleNotification").css("display", "none");
    }
  }

  newPartnerPoint(xposition, yposition, draw, size, colorChoice, clockwise){
    var newPoint = new Point(xposition, yposition, draw, size, colorChoice, clockwise);
    this.partnerPoints.push(newPoint);
  }

  catchUpMobileMouse(){
    this.mouseXLerped = ps.mouseX;
    this.mouseYLerped = ps.mouseY;
  }

  newPoint(pressed){
    this.lastNotIdle = ps.millis();
    let toDraw;
    let createPoint = true;

    if(pressed){
      toDraw = true;
      let distance = ps.dist(ps.mouseX, ps.mouseY, ps.pmouseX, ps.pmouseY);
      if (distance < 2){
        //createPoint = false;
      }
    }
    else{
      toDraw = false;
    }

    this.mouseXLerped = ps.lerp(this.mouseXLerped, ps.mouseX, this.lerpAmount);
    this.mouseYLerped = ps.lerp(this.mouseYLerped, ps.mouseY, this.lerpAmount);

    if (createPoint){
      var newPoint = new Point(this.mouseXLerped, this.mouseYLerped, toDraw,
                          ps.settingHandler.currentPen.getSize(), ps.settingHandler.currentPen.getGradient(), ps.settingHandler.currentCanvas.getClockwise());
      this.points.push(newPoint);

      if(ps.commsHandler.getMatchState()){
        ps.commsHandler.sendNewPoint(this.mouseXLerped, this.mouseYLerped, toDraw,
                          ps.settingHandler.currentPen.getSize(), ps.settingHandler.currentPen.getGradient(), ps.settingHandler.currentCanvas.getClockwise());
      }
    }
    //console.log(this.points.length);

  }

  calcAngle(){
    let timePassed = ps.millis() - this.lastTime;
    this.lastTime = ps.millis();
    let ratio = (timePassed/0.016)/1000;
    this.rotateAngle = ps.lerp(this.rotateAngle, ratio * ps.settingHandler.speeds[ps.settingHandler.currentCanvas.getSpeed()], this.angleLerpAmount);
  }

  updatePoints(){
    this.mouseXLerped = ps.lerp(this.mouseXLerped, ps.mouseX, this.lerpAmount);
    this.mouseYLerped = ps.lerp(this.mouseYLerped, ps.mouseY, this.lerpAmount);
    for (let i=0; i<this.points.length;i++){
      this.points[i].update();
    }
    for (let i=0; i<this.partnerPoints.length;i++){
      this.partnerPoints[i].update();
    }
  }

  deletePoints(){
    let maxPointsToUse = ps.settingHandler.maxPoints;
    if(this.partnerPoints.length ==0){
      maxPointsToUse = ps.settingHandler.maxPoints*2;
    }

    if (this.points.length > maxPointsToUse){
      let overflow = this.points.length - maxPointsToUse;
      this.points.splice(0,overflow);
    }
    if (this.partnerPoints.length > ps.settingHandler.maxPoints){
      let overflow = this.partnerPoints.length - ps.settingHandler.maxPoints;
      this.partnerPoints.splice(0,overflow);
    }
  }

  deleteAllPoints(){
    if(this.points.length > 0){
      this.points.splice(0,this.points.length);
    }
    if(this.partnerPoints.length > 0){
      this.partnerPoints.splice(0,this.partnerPoints.length);
    }
  }

  partnerUnmatched(){
    if(this.partnerPoints.length > 0){
      this.partnerPoints.splice(0,this.partnerPoints.length);
    }
  }

  drawCombinedPoints(){
    for (let i=0; i<ps.max(this.partnerPoints.length,this.points.length);i++){
      if (i < this.partnerPoints.length){
        if (this.partnerPoints[i].draw == true){
          let chosenColor1 = ps.color(ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].hue1,
                                     ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].sat1,
                                     ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].bri1);

          let chosenColor2 = ps.color(ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].hue2,
                                     ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].sat2,
                                     ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].bri2);

          let thisColor = ps.lerpColor(chosenColor1, chosenColor2, ps.map(i, 0, ps.max(150,this.points.length), 0, 1));
          ps.fill(thisColor);
          ps.noStroke();
          ps.ellipse(this.partnerPoints[i].x, this.partnerPoints[i].y, ps.settingHandler.penSizes[this.partnerPoints[i].size])
          //ps.line(this.partnerPoints[i].x, this.partnerPoints[i].y,
          //this.partnerPoints[i-1].x, this.partnerPoints[i-1].y,)
        }
      }
      if (i < this.points.length){
        if (this.points[i].draw == true){
          let chosenColor1 = ps.color(ps.settingHandler.gradients[this.points[i].colorChoice].hue1,
                                     ps.settingHandler.gradients[this.points[i].colorChoice].sat1,
                                     ps.settingHandler.gradients[this.points[i].colorChoice].bri1);

          let chosenColor2 = ps.color(ps.settingHandler.gradients[this.points[i].colorChoice].hue2,
                                     ps.settingHandler.gradients[this.points[i].colorChoice].sat2,
                                     ps.settingHandler.gradients[this.points[i].colorChoice].bri2);

          let thisColor = ps.lerpColor(chosenColor1, chosenColor2, ps.map(i, 0, ps.max(150,this.points.length), 0, 1));

          ps.fill(thisColor);
          ps.noStroke();
          ps.ellipse(this.points[i].x, this.points[i].y, ps.settingHandler.penSizes[this.points[i].size]);
          //ps.line(this.points[i].x, this.points[i].y,
          //this.points[i-1].x, this.points[i-1].y,)
        }
      }
    }
  }

  drawPoints(){
    for (let i=0; i<this.partnerPoints.length;i++){
      if (this.partnerPoints[i].draw == true){
        let chosenColor1 = ps.color(ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].hue1,
                                   ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].sat1,
                                   ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].bri1);

        let chosenColor2 = ps.color(ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].hue2,
                                   ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].sat2,
                                   ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].bri2);

        let thisColor = ps.lerpColor(chosenColor1, chosenColor2, ps.map(i, 0, ps.max(150,this.points.length), 0, 1));
        ps.fill(thisColor);
        ps.noStroke();
        ps.ellipse(this.partnerPoints[i].x, this.partnerPoints[i].y, ps.settingHandler.penSizes[this.partnerPoints[i].size])
        //ps.line(this.partnerPoints[i].x, this.partnerPoints[i].y,
        //this.partnerPoints[i-1].x, this.partnerPoints[i-1].y,)
      }
    }

    for (let i=0; i<this.points.length;i++){
      if (this.points[i].draw == true){
        let chosenColor1 = ps.color(ps.settingHandler.gradients[this.points[i].colorChoice].hue1,
                                   ps.settingHandler.gradients[this.points[i].colorChoice].sat1,
                                   ps.settingHandler.gradients[this.points[i].colorChoice].bri1);

        let chosenColor2 = ps.color(ps.settingHandler.gradients[this.points[i].colorChoice].hue2,
                                   ps.settingHandler.gradients[this.points[i].colorChoice].sat2,
                                   ps.settingHandler.gradients[this.points[i].colorChoice].bri2);

        let thisColor = ps.lerpColor(chosenColor1, chosenColor2, ps.map(i, 0, ps.max(150,this.points.length), 0, 1));

        ps.fill(thisColor);
        ps.noStroke();
        ps.ellipse(this.points[i].x, this.points[i].y, ps.settingHandler.penSizes[this.points[i].size]);
        //ps.line(this.points[i].x, this.points[i].y,
        //this.points[i-1].x, this.points[i-1].y,)
      }
    }

  }

  clearPoints(){
    if(this.points.length > 0){
      this.points.splice(0,this.points.length);
    }
    if(this.partnerPoints.length > 0){
      this.partnerPoints.splice(0,this.partnerPoints.length);
    }
    ps.backgroundFade = true;
    ps.backgroundFadeCount = ps.frameCount;
  }
}

class Point{
  constructor(x, y, draw, size, colorChoice, clockwise){
    this.x = x;
    this.y = y;
    this.draw = draw;
    this.size = size;
    this.colorChoice = colorChoice;
    this.spinClockwise = clockwise;
    this.distanceFromCentre = this.dist();

    let opp = this.x - ps.width/2;
    let adj = ps.height/2 - this.y;
    let ratio = opp/adj;

    this.angle = Math.atan(ratio);

    if (this.y > ps.height/2){
      this.angle += Math.PI;
    }
  }

  dist(){
    let a = Math.abs(this.x - ps.width/2);
    let b = Math.abs(this.y - ps.height/2);
    return Math.sqrt(a*a + b*b);
  }

  update(){
    this.x = ps.width/2 + (this.distanceFromCentre * Math.sin(this.angle));
    this.y = ps.height/2 - (this.distanceFromCentre * Math.cos(this.angle));

    if (ps.settingHandler.currentCanvas.getClockwise()){
      //this.angle += ps.settingHandler.speeds[ps.settingHandler.currentCanvas.getSpeed()];
      this.angle = (this.angle + ps.pointsHandler.rotateAngle) % 360;
    }
    else{
      //this.angle -= ps.settingHandler.speeds[ps.settingHandler.currentCanvas.getSpeed()];
      this.angle = (this.angle - ps.pointsHandler.rotateAngle) % 360;
    }

  }
}

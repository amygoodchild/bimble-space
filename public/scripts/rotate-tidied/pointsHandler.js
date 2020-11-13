$(document).ready(function(){

  var mouseIsDown = false;

  /*$("#theToyContainer")
  .mousedown(function() {
    mouseIsDown = true;
  })
  .mousemove(function() {
    if(mouseIsDown){
      ps.pointsHandler.mouseEvent(true);
    }
  })
  .mouseleave(function() {
    if (mouseIsDown){
      ps.pointsHandler.mouseEvent(false);
    }
  })
  .mouseup(function() {
    mouseIsDown = false;
    ps.pointsHandler.mouseEvent(false);
  });*/
});

class PointsHandler{
  constructor(){
    this.points = [];
    this.partnerPoints = [];

    this.angleA = 0.012;
    this.newMillis = ps.millis();
    this.prevMillis = ps.millis();
    this.milliAngle = ((this.angleA/16) * (this.newMillis - this.prevMillis));
    this.mousePressed = false;

    this.idle = false;
    this.lastNotIdle = ps.millis();

    this.mouseXLerped = ps.mouseX;
    this.mouseYLerped = ps.mouseY;

    this.drawOptions = {
      penSize: 3,
      chosenGradient: 1,
      spinClockwise: true
    };
  }

  mouseEvent(down){
    if (down){
      this.mousePressed = true;
      this.newPoint(this.mousePressed);
    }
    else{
      this.mousePressed = false;
      this.newPoint(this.mousePressed);
    }
  }

  newPartnerPoint(xposition, yposition, draw, size, colorChoice, clockwise){
    var newPoint = new Point(xposition, yposition, draw, size, colorChoice, clockwise);
    this.partnerPoints.push(newPoint);
  }

  newPoint(pressed){
    this.lastNotIdle = ps.millis();
    let toDraw;

    if(pressed){
      toDraw = true;
    }
    else{
      toDraw = false;
    }
    this.mouseXLerped = ps.lerp(this.mouseXLerped, ps.mouseX, 0.1);
    this.mouseYLerped = ps.lerp(this.mouseYLerped, ps.mouseY, 0.1);

    var newPoint = new Point(this.mouseXLerped, this.mouseYLerped, toDraw,
                        this.drawOptions.penSize, this.drawOptions.chosenGradient, this.drawOptions.spinClockwise);
    this.points.push(newPoint);

    ps.commsHandler.sendNewPoint(this.mouseXLerped, this.mouseYLerped, toDraw,
                        this.drawOptions.penSize, this.drawOptions.chosenGradient, this.drawOptions.spinClockwise);

    //(x, y, draw, size, colorChoice, clockwise)

  }

  updatePoints(){
        this.mouseXLerped = ps.lerp(this.mouseXLerped, ps.mouseX, 0.03);
        this.mouseYLerped = ps.lerp(this.mouseYLerped, ps.mouseY, 0.03);
    for (let i=0; i<this.points.length;i++){
      this.points[i].update(this.angleA);
    }
    for (let i=0; i<this.partnerPoints.length;i++){
      this.partnerPoints[i].update(this.angleA);
    }
  }

  deletePoints(){
    if (this.points.length > 300){
      let overflow = this.points.length - 300;
      this.points.splice(0,overflow);
    }
    if (this.partnerPoints.length > 300){
      let overflow = this.partnerPoints.length - 300;
      this.partnerPoints.splice(0,overflow);
    }
  }

  drawPoints(){
    for (let i=1; i<this.points.length;i++){
      ps.strokeWeight(8);
      if (this.points[i].draw == true && this.points[i-1].draw){

        let chosenColor1 = ps.color(ps.settingHandler.gradients[this.points[i].colorChoice].hue1,
                                   ps.settingHandler.gradients[this.points[i].colorChoice].sat1,
                                   ps.settingHandler.gradients[this.points[i].colorChoice].bri1);

        let chosenColor2 = ps.color(ps.settingHandler.gradients[this.points[i].colorChoice].hue2,
                                   ps.settingHandler.gradients[this.points[i].colorChoice].sat2,
                                   ps.settingHandler.gradients[this.points[i].colorChoice].bri2);

        let thisColor = ps.lerpColor(chosenColor1, chosenColor2, ps.map(i, 0, ps.max(300,this.points.length), 0, 1));

        ps.stroke(thisColor);
        ps.line(this.points[i].x, this.points[i].y,
        this.points[i-1].x, this.points[i-1].y,)
      }
    }
    for (let i=1; i<this.partnerPoints.length;i++){
      ps.strokeWeight(8);
      if (this.partnerPoints[i].draw == true && this.partnerPoints[i-1].draw){
        let chosenColor1 = ps.color(ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].hue1,
                                   ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].sat1,
                                   ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].bri1);

        let chosenColor2 = ps.color(ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].hue2,
                                   ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].sat2,
                                   ps.settingHandler.gradients[this.partnerPoints[i].colorChoice].bri2);

        let thisColor = ps.lerpColor(chosenColor1, chosenColor2, ps.map(i, 0, ps.max(300,this.points.length), 0, 1));

        ps.stroke(thisColor);
        ps.line(this.partnerPoints[i].x, this.partnerPoints[i].y,
        this.partnerPoints[i-1].x, this.partnerPoints[i-1].y,)
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

  update(milliAngle){
    this.x = ps.width/2 + (this.distanceFromCentre * Math.sin(this.angle));
    this.y = ps.height/2 - (this.distanceFromCentre * Math.cos(this.angle));

    if (this.spinClockwise){
      this.angle += milliAngle;
    }
    else{
      this.angle -= milliAngle;
    }

  }
}

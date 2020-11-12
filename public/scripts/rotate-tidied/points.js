
function calculateMilliAngle(){
  ps.newMillis = ps.millis();
  ps.milliAngle = ((ps.angleA/16) * (ps.newMillis - ps.prevMillis));
  ps.prevMillis = ps.millis();
}

// Return function to check if a click was on the canvas
function canvasClick(){
  if (!landscape){
    if (ps.mouseY > ps.height - 70){
      return false;
    }
    else if (ps.drawOpen){
      return false;
    }
    else{
      return true;
    }
  }
  else{
    return true;
  }
}

// Adding points to the location array
function getNewPoints(){
  ps.lerpMouseX = ps.lerp(ps.lerpMouseX, ps.mouseX, ps.penLerp);
  ps.lerpMouseY = ps.lerp(ps.lerpMouseY, ps.mouseY, ps.penLerp);
  if(ps.mouseIsPressed && ps.mouseX > 0){
    ps.lastNotIdle = ps.millis();
    if (!ps.drawing){
      ps.lerpMouseX = ps.mouseX;
      ps.lerpMouseY = ps.mouseY;
      ps.drawing = true;
    }
    var newLocation = new Location(ps.lerpMouseX, ps.lerpMouseY, true, ps.penSize, ps.chosenGradient, ps.spinClockwise);
    newLocation.setupLocation();
    ps.locations.push(newLocation);

    if(ps.matchState == "paired"){
      sendNewPoints();
    }
  }
  if(!ps.mouseIsPressed && ps.drawing){
    ps.drawing = false;
    var newLocation = new Location(ps.mouseX, ps.mouseY, false, ps.penSize, ps.chosenGradient, ps.spinClockwise);
    ps.locations.push(newLocation);
    if(ps.matchState == "paired"){
      sendNewPoints();
    }
    for (let i = 0; i<ps.locations.length;i++){
      ps.locations[i].rotate = true;
    }
  }
}

// Moving my points
function updatePoints(){
  for (let i=0; i<ps.locations.length;i++){
    ps.locations[i].update();
  }
}

// Moving partner's points
function updateOtherPoints(){
  for (let i=0; i<ps.otherLocations.length; i++){
    ps.otherLocations[i].update();
  }
}

// Delete my points (if too many)
function deletePoints(){
  if (ps.locations.length > 800){
    ps.locations.splice(0,1);
  }
}

// Delete my partner's points (if too many)
function deleteOtherPoints(){
  if (ps.otherLocations.length > 800){
    ps.otherLocations.splice(0,1);
  }
}

// Draw my points
function drawPoints(){
  ps.stroke(255,0,100);
  ps.strokeWeight(ps.locations[0].size);
  let chosenColor1 = ps.color(ps.gradients[ps.locations[0].colorChoice].hue1, ps.gradients[ps.locations[0].colorChoice].sat1, ps.gradients[ps.locations[0].colorChoice].bri1);
  let chosenColor2 = ps.color(ps.gradients[ps.locations[0].colorChoice].hue2, ps.gradients[ps.locations[0].colorChoice].sat2, ps.gradients[ps.locations[0].colorChoice].bri2);

  ps.noFill();
  ps.beginShape()
  for (let i=1; i<ps.locations.length;i++){
    if (ps.locations[i].draw){
      let thisColor = ps.lerpColor(chosenColor1, chosenColor2, ps.map(i, 0, ps.locations.length, 0, 1));
      ps.stroke(thisColor);
      ps.vertex(ps.locations[i].x, ps.locations[i].y);
    }
    else if (i < ps.locations.length-1){
      ps.endShape();
      ps.strokeWeight(ps.locations[i+1].size);
      ps.beginShape();
    }

    if (i%2==0 && i > 0 && i < ps.locations.length-1){
      ps.endShape();
      ps.strokeWeight(ps.locations[i+1].size);
      chosenColor1 = ps.color(ps.gradients[ps.locations[i+1].colorChoice].hue1, ps.gradients[ps.locations[i+1].colorChoice].sat1, ps.gradients[ps.locations[i+1].colorChoice].bri1);
      chosenColor2 = ps.color(ps.gradients[ps.locations[i+1].colorChoice].hue2, ps.gradients[ps.locations[i+1].colorChoice].sat2, ps.gradients[ps.locations[i+1].colorChoice].bri2);
      let thisColor = ps.lerpColor(chosenColor1, chosenColor2, ps.map(i, 0, ps.locations.length, 0, 1));
      ps.stroke(thisColor);
      ps.beginShape();
      if (ps.locations[i].draw){
        ps.vertex(ps.locations[i].x, ps.locations[i].y);
      }
    //  console.log("break");
    }

  }
  ps.endShape();
}

// Draw my partner's points
function drawOtherPoints(){
  ps.stroke(255,0,100);
  ps.strokeWeight(ps.otherLocations[0].size);
  let chosenColor1 = ps.color(ps.gradients[ps.otherLocations[0].colorChoice].hue1, ps.gradients[ps.otherLocations[0].colorChoice].sat1, ps.gradients[ps.otherLocations[0].colorChoice].bri1);
  let chosenColor2 = ps.color(ps.gradients[ps.otherLocations[0].colorChoice].hue2, ps.gradients[ps.otherLocations[0].colorChoice].sat2, ps.gradients[ps.otherLocations[0].colorChoice].bri2);

  ps.noFill();
  ps.beginShape()
  for (let i=1; i<ps.otherLocations.length;i++){
    if (ps.otherLocations[i].draw){
      let thisColor = ps.lerpColor(chosenColor1, chosenColor2, ps.map(i, 0, ps.otherLocations.length, 0, 1));
      ps.stroke(thisColor);
      ps.vertex(ps.otherLocations[i].x, ps.otherLocations[i].y);

    }
    else if (i < ps.otherLocations.length-1){
      ps.endShape();
      ps.strokeWeight(ps.otherLocations[i+1].size);
      ps.beginShape();
    }

    if (i%2==0 && i > 0 && i < ps.otherLocations.length-1){
      ps.endShape();
      ps.strokeWeight(ps.otherLocations[i+1].size);
      chosenColor1 = ps.color(ps.gradients[ps.otherLocations[i+1].colorChoice].hue1, ps.gradients[ps.otherLocations[i+1].colorChoice].sat1, ps.gradients[ps.otherLocations[i+1].colorChoice].bri1);
      chosenColor2 = ps.color(ps.gradients[ps.otherLocations[i+1].colorChoice].hue2, ps.gradients[ps.otherLocations[i+1].colorChoice].sat2, ps.gradients[ps.otherLocations[i+1].colorChoice].bri2);
      let thisColor = ps.lerpColor(chosenColor1, chosenColor2, ps.map(i, 0, ps.otherLocations.length, 0, 1));
      ps.stroke(thisColor);
      ps.beginShape();
      if (ps.otherLocations[i].draw){
        ps.vertex(ps.otherLocations[i].x, ps.otherLocations[i].y);
      }
    //  console.log("break");
    }

  }
  ps.endShape();
}

function clearPoints(){
  if(ps.locations.length > 0){
    ps.locations.splice(0,ps.locations.length);
  }
  if(ps.otherLocations.length > 0){
    ps.otherLocations.splice(0,ps.otherLocations.length);
  }
  ps.backgroundFade = true;
  ps.backgroundFadeCount = ps.frameCount;
}

class Location{
  constructor(x, y, draw, size, colorChoice, clockwise){
    this.x = x;
    this.y = y;
    this.draw = draw;
    this.rotate = false;
    this.size = size;
    this.colorChoice = colorChoice;
    this.spinClockwise = clockwise;
    this.vectorLocationX = this.x - ps.width/2;
    this.vectorLocationY = this.y - ps.height/2;

    this.angleB;
    this.distanceFromCentre;

    this.setup = false;
  }
  setupLocation(){
    let tempVec = ps.createVector(this.vectorLocationX, this.vectorLocationY);

    this.angleB = ps.vector1.angleBetween(tempVec);
    this.distanceFromCentre = ps.dist(ps.width/2, ps.height/2, this.x, this.y);
    this.setup = true;

  }

  update(){
    if (!this.setup){
      this.setupLocation();
    }

    if (this.rotate){
      this.x = ps.width/2 + (this.distanceFromCentre * ps.sin(ps.degrees(this.angleB + ps.milliAngle)));
      this.y = ps.height/2 - (this.distanceFromCentre * ps.cos(ps.degrees(this.angleB + ps.milliAngle)));

      if (this.spinClockwise){
        this.angleB += ps.milliAngle;
      }
      else{
        this.angleB -= ps.milliAngle;
      }
    }
  }
}

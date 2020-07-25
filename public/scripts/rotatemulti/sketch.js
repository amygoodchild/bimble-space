var landscape;
  if ($( window ).height() < $( window ).width()){
    landscape = true;
    console.log("landscape");
  }
  else{
    landscape = false;
    console.log("portrait");
  }

  $( window ).resize(function() {
    if ($( window ).height() < $( window ).width()){
      landscape = true;
      $("#menu").css("width", "55px");
      $("#menu").css("height", "100%");
      $(".menuButtonClosed").css("display", "inline-block");
      $(".menuButtonOpen").css("display", "none");
      $(".menuButtonClosedMobile").css("display", "none");
      $(".menuButtonOpenMobile").css("display", "none")

      newToyWidth =  $(window).width() - 55;
      newToyHeight = $(window).height();
    }
    else{
      landscape = false;

      $("#menu").css("height", "50px");
      $("#menu").css("width", "100%");
      $(".menuButtonClosedMobile").css("display", "inline-block");
      $(".menuButtonOpenMobile").css("display", "none");
      $(".menuButtonClosed").css("display", "none");
      $(".menuButtonOpen").css("display", "none");

      newToyWidth =  $(window).width();
      newToyHeight = $(window).height() - 50;

    }

    $("#theToyContainer").css({ 'width': newToyWidth });
    $("#theToyContainer").css({ 'height': newToyHeight });
    ps.resizeCanvas(parseInt($("#theToyContainer").width()), parseInt($("#theToyContainer").height()));

    data = {
      newWidth : newToyWidth,
      newHeight : newToyHeight,
      otherUser : ps.otherUser
    }

  });


function sortOutWindowResize(){

}

const rotateSketch = ( p ) => {

//  p.boids = [];
//  p.idleCounting = false;

  p.angle = 1;
  p.locations = [];
  p.lerpMouseX;
  p.lerpMouseY;
  p.penSize = 2;
  p.backgroundOpacity = 0;
  p.bgOpacityToUse;
  p.penLerp = 0.3;
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

  p.setup = () => {
  //  p.frameRate(1);


    // Set up some options
    p.colorMode(p.RGB,255,255,255,100);
    p.noStroke();
    p.angleMode(p.DEGREES);

    //p.frameRate(1);  // for debugging

    // Creates the canvas
    if (p.int(p.windowWidth) > p.int(p.windowHeight)){    // landscape
      p.theWidth = p.int(p.windowWidth) - 55 - 125;
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

    console.log(p.theWidth);
    console.log(p.width);


  };


  p.draw = () => {

    if (p.chosenBackground == 0){
      p.blendMode(p.DIFFERENCE);
      p.bgOpacityToUse = p.backgroundOpacity *2.5;
    }
    else if (p.chosenBackground == 1){
      p.blendMode(p.ADD);
      p.bgOpacityToUse = p.backgroundOpacity/5;
    }
    else{
      p.blendMode(p.BLEND);
      p.bgOpacityToUse = p.backgroundOpacity;
    }


    p.fill(p.red(p.backgrounds[p.chosenBackground]),p.green(p.backgrounds[p.chosenBackground]),p.blue(p.backgrounds[p.chosenBackground]),p.bgOpacityToUse);
    p.noStroke();
    p.rect(0,0,p.width,p.height);

    //p.rotateCanvas();

    p.blendMode(p.BLEND);

    p.getNewPoints();
    if (p.locations.length > 0){
      //p.drawPointsWithTrails();
      p.updatePoints();
      p.deletePoints();
      p.drawPoints();
    }

    if (p.clearLines && p.locations.length > 0){
      p.locations.splice(0,p.locations.length);
      p.clearLines = false;
      p.backgroundFade = true;
      p.backgroundFadeCount = p.frameCount;
    }

    if (p.backgroundFade){
      p.background(p.red(p.backgrounds[p.chosenBackground]),p.green(p.backgrounds[p.chosenBackground]),p.blue(p.backgrounds[p.chosenBackground]),25);
      console.log("background");
    }
    if (p.frameCount > p.backgroundFadeCount +120){
      p.backgroundFade = false;
    }



  };


  p.deletePoints = () => {
    if (p.locations.length > 800){
      p.locations.splice(0,1);
    }
  }

  p.getNewPoints = () => {

    p.lerpMouseX = p.lerp(p.lerpMouseX, p.mouseX, p.penLerp);
    p.lerpMouseY = p.lerp(p.lerpMouseY, p.mouseY, p.penLerp);

    if(p.mouseIsPressed && p.mouseX > 0){
      var newLocation = new Location(p.lerpMouseX, p.lerpMouseY, true, p.penSize);
      p.locations.push(newLocation);
      p.drawing = true;
    }

    if(!p.mouseIsPressed && p.drawing == true){
      p.drawing = false;
      var newLocation = new Location(p.mouseX, p.mouseY, false, p.penSize);
      p.locations.push(newLocation);
    }
  }


  p.drawPointsWithTrails = () => {

    for (let j = p.locations[0].positions.length; j>0; j--){

      p.stroke(255,0,100);
      p.strokeWeight(p.locations[0].size);
      p.noFill();
      p.beginShape()
      for (let i=1; i<p.locations.length;i++){
        if(p.locations[i].positions.length > j){
          if (p.locations[i].draw){
            let opacity = p.map(j, 1, 15, 0, 100);
            let chosenColor1 = p.color(p.gradients[p.chosenGradient].hue1, p.gradients[p.chosenGradient].sat1, p.gradients[p.chosenGradient].bri1, opacity);
            let chosenColor2 = p.color(p.gradients[p.chosenGradient].hue2, p.gradients[p.chosenGradient].sat2, p.gradients[p.chosenGradient].bri2, opacity);
            let thisColor = p.lerpColor(chosenColor1, chosenColor2, p.map(i, 0, p.locations.length, 0, 1));
            p.stroke(thisColor);
            p.vertex(p.locations[i].positions[j].x, p.locations[i].positions[j].y);
          }
          else if (i < p.locations.length-1){
            p.endShape();
            p.strokeWeight(p.locations[i+1].size);
            p.beginShape();
          }

          if (i%2==0 && i > 0 && i < p.locations.length-1){
            p.endShape();
            p.strokeWeight(p.locations[i+1].size);
            let opacity = p.map(j, 1, 15, 0, 100);
            let chosenColor1 = p.color(p.gradients[p.chosenGradient].hue1, p.gradients[p.chosenGradient].sat1, p.gradients[p.chosenGradient].bri1, opacity);
            let chosenColor2 = p.color(p.gradients[p.chosenGradient].hue2, p.gradients[p.chosenGradient].sat2, p.gradients[p.chosenGradient].bri2, opacity);
            let thisColor = p.lerpColor(chosenColor1, chosenColor2, p.map(i, 0, p.locations.length, 0, 1));
            p.stroke(thisColor);
            p.beginShape();
            if (p.locations[i].draw){
              p.vertex(p.locations[i].positions[j].x, p.locations[i].positions[j].y);
            }
          //  console.log("break");
          }
        }
      }
      p.endShape();
    }
  }

  p.drawPoints = () => {

    p.stroke(255,0,100);
    p.strokeWeight(p.locations[0].size);
    p.noFill();
    p.beginShape()
    for (let i=1; i<p.locations.length;i++){
      if (p.locations[i].draw){
        let chosenColor1 = p.color(p.gradients[p.chosenGradient].hue1, p.gradients[p.chosenGradient].sat1, p.gradients[p.chosenGradient].bri1);
        let chosenColor2 = p.color(p.gradients[p.chosenGradient].hue2, p.gradients[p.chosenGradient].sat2, p.gradients[p.chosenGradient].bri2);
        let thisColor = p.lerpColor(chosenColor1, chosenColor2, p.map(i, 0, p.locations.length, 0, 1));
        p.stroke(thisColor);
        p.vertex(p.locations[i].position.x, p.locations[i].position.y);
      }
      else if (i < p.locations.length-1){
        p.endShape();
        p.strokeWeight(p.locations[i+1].size);
        p.beginShape();
      }

      if (i%2==0 && i > 0 && i < p.locations.length-1){
        p.endShape();
        p.strokeWeight(p.locations[i+1].size);
        let chosenColor1 = p.color(p.gradients[p.chosenGradient].hue1, p.gradients[p.chosenGradient].sat1, p.gradients[p.chosenGradient].bri1);
        let chosenColor2 = p.color(p.gradients[p.chosenGradient].hue2, p.gradients[p.chosenGradient].sat2, p.gradients[p.chosenGradient].bri2);
        let thisColor = p.lerpColor(chosenColor1, chosenColor2, p.map(i, 0, p.locations.length, 0, 1));
        p.stroke(thisColor);
        p.beginShape();
        if (p.locations[i].draw){
          p.vertex(p.locations[i].position.x, p.locations[i].position.y);
        }
      //  console.log("break");
      }

    }
    p.endShape();
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


  class Location{
    constructor(x, y, draw, size){
      this.position = p.createVector(x,y);       // mouseposition

      this.draw = draw;
      this.size = size;
      this.vectorLocation = p.createVector(x - p.width/2, y - p.height/2); // from centre
      this.angleB = p.vector1.angleBetween(this.vectorLocation);

      //this.positions = [];
      //this.positions[0] = this.position;

      this.distanceFromCentre = p.dist(p.width/2, p.height/2, x, y);

      //if (this.first == 1){
        /*console.log("vec x: " + this.vectorLocation.x);
        console.log("vec y: " + this.vectorLocation.y);
        console.log("angleb: " + this.angleB);
        console.log("angleb + anglea: " + (this.angleB + p.angleA));
        console.log("distance: " + this.distanceFromCentre);
        console.log("p.sin(this.angleB + p.angleA) : " + p.sin(p.degrees(this.angleB + p.angleA)));
        console.log("vector x: " + (this.distanceFromCentre * p.sin(p.degrees(this.angleB + p.angleA))));
        console.log("vector y: " + (this.distanceFromCentre * p.cos(p.degrees(this.angleB + p.angleA))));*/
    //  }
  	}

    update(){

      this.position.x = p.width/2 + (this.distanceFromCentre * p.sin(p.degrees(this.angleB + p.angleA)));
      this.position.y = p.height/2 - (this.distanceFromCentre * p.cos(p.degrees(this.angleB + p.angleA)));

      if (p.spinClockwise){                        
        this.angleB += p.angleA;
      }
      else{
        this.angleB -= p.angleA;
      }
    }

  	display(){
      p.fill(255,0,100);
      p.ellipse(this.position.x, this.position.y, 10,10);

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


  p.rotateCanvas = () => {
    p.rotationDivision = p.lerp(p.rotationDivision, p.targetRotationDivision, 0.1);

    if (p.backgroundFade){
    p.background(p.red(p.backgrounds[p.chosenBackground]),p.green(p.backgrounds[p.chosenBackground]),p.blue(p.backgrounds[p.chosenBackground]),40);
    }
    if (p.frameCount > p.backgroundFadeCount + 10){
      p.backgroundFade = false;
    }

    if (p.clearLines && p.locations.length > 0){
      p.locations.splice(0,p.locations.length);
      p.clearLines = false;
      p.backgroundFade = true;
      p.backgroundFadeCount = p.frameCount;
    }

    p.lerpMouseX = p.lerp(p.lerpMouseX, p.mouseX, p.penLerp);
    p.lerpMouseY = p.lerp(p.lerpMouseY, p.mouseY, p.penLerp);

    if(p.mouseIsPressed && p.mouseX > 0){
      var newLocation = new Location(p.lerpMouseX, p.lerpMouseY, true, p.penSize);
      p.locations.push(newLocation);
    }
    else if (p.locations.length > 1){
      var newLocation = new Location(p.lerpMouseX, p.lerpMouseY, false);
      p.locations.push(newLocation);
    }



    if (p.locations.length > 500){
      p.locations.splice(0,1);
    }

    for (let j=0; j<3;j++){
      for (let i=0; i<p.locations.length-1;i++){
        p.push();
          if (p.locations[i].draw){
            p.translate(p.width/2, p.height/2);
            if (p.spinClockwise){
              p.rotate((p.locations.length-i)/p.rotationDivision);
            }
            else{
              p.rotate(-(p.locations.length-i)/p.rotationDivision);
            }
            p.translate(-(p.width/2), -(p.height/2));

            let chosenColor1 = p.color(p.gradients[p.chosenGradient].hue1, p.gradients[p.chosenGradient].sat1, p.gradients[p.chosenGradient].bri1);
            let chosenColor2 = p.color(p.gradients[p.chosenGradient].hue2, p.gradients[p.chosenGradient].sat2, p.gradients[p.chosenGradient].bri2);

            let thisColor = p.lerpColor(chosenColor1, chosenColor2, p.map(i, 0, p.locations.length, 0, 1));

            p.stroke(thisColor);

            //p.stroke(p.map(i, 0, p.locations.length, p.gradients[p.chosenGradient].hue1,p.gradients[p.chosenGradient].hue2),
                     //p.map(i, 0, p.locations.length, p.gradients[p.chosenGradient].sat1,p.gradients[p.chosenGradient].sat2),
                     //p.map(i, 0, p.locations.length, p.gradients[p.chosenGradient].bri1,p.gradients[p.chosenGradient].bri2)
                   //);

            p.strokeWeight(p.locations[i].size);
            //  p.noStroke();
            p.line(p.locations[i].position.x, p.locations[i].position.y, p.locations[i+1].position.x, p.locations[i+1].position.y);
            //p.ellipse(p.locations[i].position.x, p.locations[i].position.y, 4,4);
          }
        p.pop();
      }
    }
  }


}



var ps = new p5(rotateSketch);

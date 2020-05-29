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

  p.setup = () => {
  //  p.frameRate(1);


    // Set up some options
    p.colorMode(p.HSB,360,100,100, 100);
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


      p.background(300,10,100);

    p.lerpMouseX = p.width/2;
    p.lerpMouseY = p.height/2;

  };


  p.draw = () => {
    p.background(300,10,100,1);

    p.lerpMouseX = p.lerp(p.lerpMouseX, p.mouseX, 0.5);
    p.lerpMouseY = p.lerp(p.lerpMouseY, p.mouseY, 0.5);

    if(p.mouseIsPressed){
      var newLocation = new Location(p.lerpMouseX, p.lerpMouseY, true);
      p.locations.push(newLocation);
    }
    else if (p.locations.length > 1){
      var newLocation = new Location(p.lerpMouseX, p.lerpMouseY, false);
      p.locations.push(newLocation);
    }

    if (p.locations.length > 1000){
      p.locations.splice(0,1);
    }

    //p.push();

  //  p.translate(p.width/2, p.height/2);
  //  p.rotate(p.PI/p.angle);
  //  p.translate(-(p.width/2), -(p.height/2));

    for (let i=0; i<p.locations.length-1;i++){
      p.push();
        if (p.locations[i].draw){
          p.translate(p.width/2, p.height/2);

          //var rotationDivision = p.map(p.dist(p.locations[i].position.x, p.locations[i].position.y, p.locations[i+1].position.x, p.locations[i+1].position.y), 0,100,0.5,1000);
          //console.log(rotationDivision);

          var rotationDivision = 2.5;

          p.rotate((p.locations.length-i)/rotationDivision);
          p.translate(-(p.width/2), -(p.height/2));

          p.stroke(p.map(i, 0, p.locations.length, 200,300),50,90,70);
          p.fill(p.map(i, 0, p.locations.length, 300,200),50,100,70);
          //p.strokeWeight(3);
          p.noStroke();
          //p.line(p.locations[i].position.x, p.locations[i].position.y, p.locations[i+1].position.x, p.locations[i+1].position.y);
          p.ellipse(p.locations[i].position.x, p.locations[i].position.y, 4,4);
        }

        //
        //p.ellipse(p.mouseX, p.mouseY, 20,20);
      p.pop();
    //  console.log(p.locations[i].position.x);
    }

    p.angle += 0.1;

    //p.angle = p.angle%1;
    //p.pop();
  };


  class Location{
    constructor(x, y, draw){
      this.position = p.createVector(x,y);       // mouseposition
      this.draw = draw;
  	}

    update(){
    }

  	display(){
  	}
  }


}



var ps = new p5(rotateSketch);

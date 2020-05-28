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

  p.angle = 0;
  p.locations = [];

  p.setup = () => {


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

    p.background(0,0,0);

  };


  p.draw = () => {
    p.background(0,0,0,2);

    if(p.mouseIsPressed){
      var newLocation = new Location(p.mouseX, p.mouseY);
      p.locations.push(newLocation);
      p.angle += 0.0015;
    }
    else{
      p.angle += 0.001;
    }

    if (p.locations.length > 1000){
      p.locations.splice(0,1);
    }


    for (let i=0; i<p.locations.length-1;i++){
      p.push();
        p.translate(p.width/2, p.height/2);
        p.rotate(p.angle*i);
        p.translate(-(p.width/2), -(p.height/2));
        p.stroke(p.map(i, 0, p.locations.length, 200,300),70,100,40);
        //p.ellipse(p.locations[i].position.x, p.locations[i].position.y, 20,20);
        p.strokeWeight(3);
        p
        p.line(p.locations[i].position.x, p.locations[i].position.y, p.locations[i+1].position.x, p.locations[i+1].position.y);
        //p.ellipse(p.mouseX, p.mouseY, 20,20);
      p.pop();
    //  console.log(p.locations[i].position.x);
    }



  };


  class Location{
    constructor(x, y){
      this.position = p.createVector(x,y);       // mouseposition
  	}

    update(){
    }

  	display(){
  	}
  }


}



var ps = new p5(rotateSketch);

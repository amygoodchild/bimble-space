let type = "WebGL"
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
  }

  PIXI.utils.sayHello(type)
  var app;

  var xPosition = 0.0;

class ColorCollection{
  constructor(a, b, c, pa, pb, pc){
    this.colorA = a;
    this.colorB = b;
    this.colorC = c;
    this.pA = pa;
    this.pB = pa+pb;
    this.pC = pa+pb+pc;
  }
}

class MyVector{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  add(vector){
    return new MyVector(this.x + vector.x, this.y + vector.y);
  }
}

class Position{
  constructor(x, y, d){
    this.x = x;
    this.y = y;
    this.d = d;
  }
}

class Circle{
  constructor(x, y, xoff, yoff, speed, dx, dy, diameter, maxDiameter, color){
    this.position = new MyVector(x, y);
    this.velocity = new MyVector(dx,dy);
    this.acceleration = new MyVector(0,0);
    this.xoff = xoff;
    this.yoff = yoff;
    this.speed = speed;
    this.diameter = diameter;
    this.diameterGrowing = true;
    this.maxDiameter = maxDiameter;
    this.color = color;
    this.age = 0;
    this.previousPositions = [];

    this.r = 2.0;
    this.maxSpeed = 8;
    this.maxForce = 0.03;
  }

  compareCircles(){
    let steer = new MyVector(0,0,0);
    let steerCount = 0;

    for (let i=0; i<circles.length; i++){
      if(this.position != circles[i].position){
        let d =  p.dist(pews[i].position.x, p.pews[i].position.y, p.pews[j].position.x, p.pews[j].position.y);

      }
    }
  }

  applyForce(force){
    this.acceleration.add(force);
  }

  update(){
    this.position = this.position.add(this.velocity);
    let tempX = noise.perlin2(this.xoff, this.yoff) * 5;
    let tempY = noise.perlin2(this.yoff, this.xoff) * 5;

    let tempVector = new MyVector(tempX, tempY);
    this.position = this.position.add(tempVector);
    this.xoff+= 0.01;
    this.yoff+= 0.01;

    if (this.diameterGrowing){
      this.diameter+=0.5;
      if(this.diameter>this.maxDiameter){
        this.diameterGrowing = false;
      }
    }
    else{
      this.diameter-=0.08;
    }

    this.previousPositions.push(new Position(this.position.x, this.position.y, this.diameter));

    while (this.previousPositions.length > fadeLength){
      if (this.previousPositions.length > 0){
        this.previousPositions.splice(0,1);
      }
    }


  }

  display(){
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(this.color, 1);
    graphics.drawCircle(this.position.x, this.position.y, this.diameter);
    graphics.endFill();

    for (let i = 0; i< this.previousPositions.length; i++){
      let opacity = (0.2/this.previousPositions.length)*i;
      graphics.beginFill(this.color, opacity);
      graphics.drawCircle(this.previousPositions[i].x, this.previousPositions[i].y, this.previousPositions[i].d);
      graphics.endFill();
    }
  }
}

var clicking = false;

var circles = [];
var spawnProbability = 0.75;
var duplicates = 5;
var maxCircles = 250;

var maxSize = 13;
var minSize = 4;
var fadeLength = 5;

var previousMouseX = 0;
var previousMouseY = 0;

var spawnPositionSpread = 10;
var wiggleAmount = 100;

var huePicker = 0;
var colorCollections = [];
var colorChoice = 0;

var socket;

var desiredSeparation = 25;
var neighborDist = 50;

colorCollections[0] = new ColorCollection( '0xe2d810', '0xd9138a', '0x12a4d9', 0.33, 0.33, 0.33 );
colorCollections[1] = new ColorCollection( '0xfff0e1', '0xff6e53', '0xffc13b', 0.10, 0.45, 0.45 );
colorCollections[2] = new ColorCollection( '0x4eff5d', '0xd9f8b1', '0x1b6535', 0.45, 0.15, 0.40 );
colorCollections[3] = new ColorCollection( '0xe75874', '0xbe1558', '0xfbcbc9', 0.10, 0.80, 0.10 );
colorCollections[4] = new ColorCollection( '0x8a307f', '0x4493ff', '0xff48a7', 0.15, 0.70, 0.15 );
colorCollections[5] = new ColorCollection( '0xfbcbc9', '0xffea04', '0xf33ca4', 0.20, 0.35, 0.45 );
colorCollections[6] = new ColorCollection( '0xffb312', '0x85cfb4', '0xed186b', 0.33, 0.33, 0.33 );
colorCollections[7] = new ColorCollection( '0xeecce7', '0x33f2dc', '0x55b7d2', 0.20, 0.40, 0.40 );
colorCollections[8] = new ColorCollection( '0x79cbb8', '0x500472', '0xddcb1c', 0.33, 0.33, 0.33 );
colorCollections[9] = new ColorCollection( '0x1fbfb8', '0x11587e', '0x1978a5', 0.33, 0.33, 0.33 );
colorCollections[10] = new ColorCollection( '0xda000f','0xff7e00', '0xffd800', 0.33, 0.33, 0.33 );
colorCollections[11] = new ColorCollection( '0x1b2d34','0x00ffda', '0xffca00', 0.33, 0.33, 0.33 );

const graphics = new PIXI.Graphics();

$(document).ready(function(){

  if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    socket = io.connect('http://localhost:3000');
    console.log("local!");
  }
  else{
    socket = io.connect('https://desolate-dusk-28350.herokuapp.com/');
    console.log("not local!");
  }

  //socket.on('aNewDot', otherUserDraws);


  if(window.innerWidth > window.innerHeight){
    console.log("landscape");
    //Create a Pixi Application
    var theWidth = window.innerWidth -55;
    var theHeight = window.innerHeight;
    app = new PIXI.Application({width: theWidth, height: theHeight,
      antialias: true,
      transparent: false, // default: false
      resolution: 1       // default: 1
      });
  }
  else{
    console.log("portrait");
    var theWidth = window.innerWidth;
    var theHeight = window.innerHeight - 50;
    app = new PIXI.Application({width: theWidth, height: theHeight,
      antialias: true,
      transparent: false, // default: false
      resolution: 1       // default: 1
      });
  }

  //Add the canvas that Pixi automatically created for you to the HTML document
  document.getElementById("theToyContainer").appendChild(app.view);


  app.renderer.backgroundColor = 0x040404;
  app.stage.interactive = true;
  app.stage.on('pointermove', moving);
  document.addEventListener('mousedown', nowClicking);
  document.addEventListener('mouseup', notClicking );


  // run the render loop
  animateCircles();

  function animateCircles() {
      graphics.clear();

      for(let i = 0; i< circles.length; i++){
        //let start = Date.now();
        circles[i].update();
        //let elapsed =  Date.now() - start;
        //console.log("Update took: " + elapsed);

        //circles[i].compare();
        //start = Date.now();
        //circles[i].display();
        //elapsed = Date.now() - start;
        //console.log("Display took: " + elapsed);
      }

      for (var i = circles.length; i > 0; i--){
        if (circles[i-1].diameter < 0){
          circles.splice(i-1,1);
        }
      }
      //app.render(graphics);

      displayCircles();

  }

  function displayCircles(){
    for(let i = 0; i< circles.length; i++){
      circles[i].display();
    }

    requestAnimationFrame( animateCircles );
  }

    app.stage.addChild(graphics);

});


function nowClicking(e){
  clicking = true;
}

function moving(e){

  let pos = e.data.global;
  let start = Date.now()
  if (clicking && circles.length < maxCircles){
    let mouseDirection = new MyVector(myMap(e.data.global.x - previousMouseX, -300, 300, -80,80), myMap(e.data.global.y - previousMouseY, -300, 300, -80, 80));
    //let mouseDirection = new MyVector(1,0);

    for (let i = 0; i< duplicates; i++){
      if (Math.random()<= spawnProbability){
        let probability = Math.random();
        let tempColor;

        if (probability<= colorCollections[colorChoice].pA){
          tempColor = colorCollections[colorChoice].colorA;
        }
        else if (probability <= colorCollections[colorChoice].pB){
          tempColor = colorCollections[colorChoice].colorB;
        }
        else{
          tempColor = colorCollections[colorChoice].colorC;
        }

        let temp1 = e.data.global.x - spawnPositionSpread;
        let temp2 = e.data.global.x + spawnPositionSpread;
        let temp3 = e.data.global.y - spawnPositionSpread;
        let temp4 = e.data.global.y + spawnPositionSpread;

        let newDot = new Circle (myRandom(temp1, temp2),
                            myRandom(temp3, temp4),
                            myRandom(0,1000), myRandom(0,1000), 0.05,
                            mouseDirection.x, mouseDirection.y,
                            5, myRandom(minSize,maxSize),
                            tempColor);

        circles.push(newDot);

        //console.log("x: " + temp);
        //console.log(myRandom(-10,10));


      }
    }
  }

  let elapsed =  Date.now() - start;
  console.log("Creation took: " + elapsed);

  previousMouseX = e.data.global.x;
  previousMouseY = e.data.global.y;

}



function notClicking(e){
  clicking = false;
}

function myRandom(min, max){
  return Math.random() * (max - min) + min;
}

function myMap(value, min, max, newMin, newMax){
  return (value - min) * (newMax - newMin) / (max - min) + newMin;
}

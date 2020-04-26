let type = "WebGL"
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
  }

  PIXI.utils.sayHello(type)

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

var clicking = false;

var circles = [];
var spawnProbability = 0.25;
var duplicates = 3;

var maxSize = 26;
var minSize = 8;

var previousMouseX = 0;
var previousMouseY = 0;


var spawnPositionSpread = 10;
var wiggleAmount = 5;

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
    var app = new PIXI.Application({width: theWidth, height: theHeight,
      antialias: true,
      transparent: false, // default: false
      resolution: 1       // default: 1
      });
  }
  else{
    console.log("portrait");
    var theWidth = window.innerWidth;
    var theHeight = window.innerHeight - 50;
    var app = new PIXI.Application({width: theWidth, height: theHeight,
      antialias: true,
      transparent: false, // default: false
      resolution: 1       // default: 1
      });
  }

  //Add the canvas that Pixi automatically created for you to the HTML document
  document.getElementById("theToyContainer").appendChild(app.view);
  const graphics = new PIXI.Graphics();

  app.renderer.backgroundColor = 0x040404;
  app.stage.interactive = true;
  app.stage.on('pointermove', moving);
  document.addEventListener('mousedown', nowClicking);
  document.addEventListener('mouseup', notClicking );


  app.ticker.add(() => {
    //xPosition++;
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.clear();
    graphics.beginFill(0xffffff, 1);

    for(let i = 0; i< 2000; i++){
      graphics.drawCircle(xPosition, i*4, 2);
    }
    graphics.endFill();

  });

    app.stage.addChild(graphics);

});

function nowClicking(e){
  clicking = true;
  console.log("now clicking");
}

function moving(e){

  let pos = e.data.global;

  console.log("moving");

  if (clicking){
    //let mouseDirection = p5.createVector(p5.map(e.data.global.x - previousMouseX, -300, 300, -20,20), p5.map(e.data.global.y - previousMouseY, -300, 300, -20, 20));
    let mouseDirection = new Vector(1,0);
    console.log(mouseDirection);
    console.log("clicking");
  }

  previousMouseX = e.data.global.x;
  previousMouseY = e.data.global.y;

}



function notClicking(e){
  clicking = false;
}

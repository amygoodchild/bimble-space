// Spirograph!

// Spirograph objects
let stencil
let mover;
let penColor;
let penSize;
let canvasColor = "#ffffff";
let animationSpeed;
let playing = true;
let rainbow = false;
let hue;
let helpOpen = false;

// Do multiple points per frame to get around browser slowness
let perFrame;

function preload() {
  moonBold = loadFont('../fonts/Moon Bold.otf');
	moonLight = loadFont('../fonts/Moon Light.otf');
}

function setup() {

	colorMode(HSB, 255);
	frameRate(60);


  textFont(moonBold);

	let theWidth = int(windowWidth);
	let theHeight = int(windowHeight);

	if (windowWidth > windowHeight){
  	var canvas = createCanvas(theWidth-55, theHeight);
	}
	else{
		var canvas = createCanvas(theWidth, theHeight-55);
	}
	canvas.parent('theToyContainer');
	background('#ffffff');

	stencil = new Stencil();
  mover = new Mover();

	if (windowWidth < windowHeight){
		createColorButtonsMobile();
		createOtherButtonsMobile();
	}
	else{
		createColorButtons();
		createOtherButtons();
	}


  if(windowWidth<900){
    perFrame = 4;
  }
  else if (windowWidth <1025){
    perFrame = 10;
  }
  else{
  	perFrame = 40;
  }



  penColor = color(0,0,0);
  penSize = 3.0;
  hue =0;

  animationSpeed = 300;



}

function draw() {


    if (playing){
   		for (let i = 0; i<perFrame; i++){
	   		stencil.move();
	   		mover.move();
		    stencil.display();
		    mover.display();
		}
	}

	hue= (hue+0.5)%255;
	if (rainbow){
	    penColor = color(hue,200,250);
	}




	if (windowWidth < windowHeight){
		fill('#ffffff');
		rect(0,0,width,45);
		rect(0,height-210,width,210);

		drawColorButtonsMobile();
		drawOtherButtonsMobile();
	}
	else{
		fill('#ffffff');
		rect(0,0,110,height);
		rect(111,0,160,height);
		drawColorButtons();
    drawOtherButtons();
	}


	if (helpOpen){
		drawHelp();
	}
}

class Stencil{
	constructor(){
		this.x = width/2;
		this.y = height/2;
		this.diameter = width/2;
		this.diameterTarget = width/2;
		this.angle = 0;

		if (windowWidth < 1200){
			this.speed = 0.005;
		}
		else{
			this.speed = 0.001;
		}
	}

	move(){
		this.angle += this.speed;
		let sizeGap = this.diameterTarget - this.diameter;
		sizeGap = sizeGap / animationSpeed;
		this.diameter += sizeGap;
		//this.diameter = this.diameterTarget;
	}

	display(){
		noFill();
		strokeWeight(2);
		//ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}

class Mover{
	constructor(){
		this.x = width/2;
		this.y = height/2;
		this.diameter = random(0,stencil.diameter);
		this.diameterTarget = this.diameter;
		this.angle= 0;
		this.speed = 0.01;
		this.xOffset = -10;
		this.yOffset = -10;
	}

	move(){
		this.angle = -stencil.angle*(stencil.diameter/2)/(this.diameter/2);
		let sizeGap = this.diameterTarget - this.diameter;
		sizeGap = sizeGap / (animationSpeed*10);
		this.diameter += sizeGap;

		//this.diameter = this.diameterTarget;
	}

	display(){
		push();

		if (windowWidth < 900){
			translate(width/2, height/2-100);
		}
		else{
			translate(((width-271)/2)+271, height/2);
		}


		rotate(stencil.angle);
		translate(stencil.diameter/2 - this.diameter/2, 0);
		translate(this.xOffset, this.yOffset);
		rotate(this.angle);

		noFill();
		strokeWeight(1);
		//ellipse(0, 0, this.diameter, this.diameter);

		stroke(penColor);
		strokeWeight(penSize);
		point(this.diameter/2,0);
		pop();
	}
}


function drawHelp(){
	fill("#ffffff");
	stroke("#000000");
	strokeWeight(1);
	rect( 321, 50, 500, 600);
	noStroke();



}

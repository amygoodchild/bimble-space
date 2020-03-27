// Spirograph!

// Spirograph objects
let stencil
let mover;
let penColor;
let penSize;
let animationSpeed;
let playing = true;
let rainbow = false;
let hue;

// Do multiple points per frame to get around browser slowness
let perFrame;


function setup() {

	colorMode(HSB, 255);
  var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('theToyContainer');
	background('#ffffff');


  createColorButtons();
	createOtherButtons();

	if (windowWidth < 900){
		createColorButtonsMobile();
		createOtherButtonsMobile();

	}
	else{
		createColorButtons();
		createOtherButtons();
	}


    stencil = new Stencil();
    mover = new Mover();

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


    //text(windowWidth, 10, 400);
    //print(windowWidth);
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
		strokeWeight(1);
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
			translate(width/2+150, height/2);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#fffffff');
}

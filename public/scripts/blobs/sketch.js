
const blobSketch = ( b ) => {
  b.x = 0;
  b.blobs = [];
  b.numBlobs = 50;

  b.setup = () => {

    b.noStroke();
    b.colorMode(b.HSB,255);

    b.theWidth = b.int(b.windowWidth);
    b.theHeight = b.int(b.windowHeight);

    if (b.theWidth > b.theHeight){
      b.blobCanvas = b.createCanvas(b.theWidth-55, b.theHeight);
    }
    else{
      b.blobCanvas = b.createCanvas(b.theWidth, b.theHeight-50);
    }

    b.blobCanvas.parent('theToyContainer');

    for (let i = 0; i < b.numBlobs; i++) {
      b.blobs[i] = new Blob();
    }


    //b.x = i % b.cols;
    //b.y = b.int(i / b.cols);

  };

  b.draw = () => {
    b.background(0,0,255);
    for (let i = 0; i < b.numBlobs; i++) {
      b.blobs[i].move();
      b.blobs[i].display();
    }

    for (let i = 0; i < 1; i++) {
      b.blobs[i].debug();
    }
  };


  class Blob{
  	constructor(){
  		this.x = b.int(b.random(0,b.width));
  		this.y = b.int(b.random(-50,b.height+50));
      this.diameter = b.int(b.random(5,20))*2;

      //this.x = 0;
      //this.y = 0;
      //this.diameter = 10;
      //this.speed = b.random(0.2,1.2);
      this.speed = 1;
      this.bottomPosition = b.createVector(this.x, this.y + (this.diameter / 2));
      this.index = b.int((this.bottomPosition.y * b.width) + this.bottomPosition.x);
      this.bump = false;
      console.log("x: " + this.x + " y: " + this.y + " diam: " + this.diameter);
  	}

  	move(){
  		this.y += this.speed;
      this.bottomPosition = b.createVector(this.x, this.y + (this.diameter / 2));
      this.index = b.int((this.bottomPosition.y * b.width) + this.bottomPosition.x);

      if(this.y > b.height + 50){
        this.x = b.int(b.random(0,b.width));
    		this.y = b.int(b.random(-100,-50));
        this.diameter = b.int(b.random(5,20))*2;

        console.log("x: " + this.x + " y: " + this.y + " diam: " + this.diameter);

        //this.speed = b.random(0.2,1.2);
      }

      if (ls.platforms[this.index] > 0){
        this.bump = true;
        //console.log("bump: " + this.index);
      }
      else{
        //console.log("no bump: " + this.bump);
        this.bump = false;
      }
  	}

    debug(){
      //console.log("index: " + this.index + " this pixel: " + ls.platforms[this.index] );

      //b.fill(30,100,255);
      //b.ellipse(this.bottomPosition.x, this.bottomPosition.y, 40, 40);
      //console.log("tracked: " + this.index);
    }

  	display(){
      b.fill(0,0,0);
  		b.ellipse(this.x, this.y, this.diameter, this.diameter);

      if (this.bump == true){
        b.fill(255,255,255);
        console.log("a bump found!!");
      }
      else{
        b.fill(100,100,255);
        //console.log("no bump found!!");
      }
      b.ellipse(this.bottomPosition.x, this.bottomPosition.y, 15, 15);
  	}
  }

};


const lineSketch = ( l ) => {
  l.x = 0;
  l.platforms = [];

  l.setup = () => {
    l.noStroke();
    l.colorMode(l.HSB,255);

    l.theWidth = l.int(l.windowWidth);
    l.theHeight = l.int(l.windowHeight);

    if (l.theWidth > l.theHeight){
      l.blobCanvas = l.createCanvas(l.theWidth-55, l.theHeight);
    }
    else{
      l.blobCanvas = l.createCanvas(l.theWidth, l.theHeight-50);
    }

    l.blobCanvas.parent('theToyContainer');

    l.numPixels = l.width * l.height;

    for (let i = 0; i < l.numPixels; i++){
      l.platforms[i] = 0;
    }



  };

  l.draw = () => {

    if (l.mouseIsPressed){
      l.fill(180, 200,200);
      l.rect(l.mouseX,l.mouseY, 10, 10);
      var count = 0;
      for (let i = l.mouseX; i < l.mouseX+10; i++){
        for (let j = l.mouseY; j < l.mouseY+10; j++){
          l.index = l.int((j * l.width) + i);
          l.platforms[l.index] = 1;
          //console.log("count: " + count + " x: " + i + " y: " + j + " index: " + l.index);
        }
      }

    }

  };




};



var bs = new p5(blobSketch);
var ls = new p5(lineSketch);

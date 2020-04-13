
const blobSketch = ( b ) => {
  b.x = 0;
  b.blobs = [];
  b.numBlobs = 100;

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
  		this.x = b.random(0,b.width);
  		this.y = b.random(-50,b.height+50);
      this.diameter = b.random(10,45);
      //this.speed = b.random(0.2,1.2);
      this.speed = 1;
      this.bottomPosition = b.createVector(this.x, this.y + (this.diameter / 2));
      this.index = b.int((this.bottomPosition.y * b.width) + this.bottomPosition.x);
      this.bump = false;

  	}

  	move(){
  		this.y += this.speed;
      this.bottomPosition = b.createVector(this.x, this.y + (this.diameter / 2));
      this.index = b.int((this.bottomPosition.y * b.width) + this.bottomPosition.x);

      if(this.y > b.height + 50){
        this.x = b.random(0,b.width);
    		this.y = b.random(-100,-50);
        this.diameter = b.random(10,45);
        //this.speed = b.random(0.2,1.2);
      }

      if (ls.platforms[this.index] > 0){
        this.bump = true;
        console.log("bump");
      }
      else{
        this.bump = false;
      }
  	}

    debug(){
      //console.log("index: " + this.index + " this pixel: " + ls.platforms[0] );

      b.fill(30,100,255);
      b.ellipse(this.bottomPosition.x, this.bottomPosition.y, 40, 40);
      console.log(this.index);
    }

  	display(){
      b.fill(0,0,0);
  		b.ellipse(this.x, this.y, this.diameter, this.diameter);

      if (this.bump){
        b.fill(255,255,255);
      }
      else{
        b.fill(100,100,255);
      }
      b.ellipse(this.bottomPosition.x, this.bottomPosition.y, 10, 10);
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
      l.fill(20, 255,255);
      l.rect(l.mouseX,l.mouseY, 20, 20);

      for (let i = l.mouseX; i < l.mouseX+20; i++){
        for (let j = l.mouseY; j < l.mouseY+20; j++){
          l.index = l.int((j * l.width) + i);
          l.platforms[l.index] = 1;
        }
      }

    }

  };




};



var bs = new p5(blobSketch);
var ls = new p5(lineSketch);

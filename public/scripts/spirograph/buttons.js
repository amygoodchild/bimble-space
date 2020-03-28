// Other buttons

let outerRadiusDown;
let outerRadiusUp;
let innerRadiusDown;
let innerRadiusUp;

let penSizeUp;
let penSizeDown;

let speedDown;
let speedUp;
let stop;
let saveSpeed;

let makeBlank;
let randomiser;

let startHeight = 15;


function createOtherButtons(){

	textSize(15);
	penSizeUp = new Clickable();
  penSizeUp.locate(220,startHeight+10);
	penSizeUp.cornerRadius = 0;
	penSizeUp.strokeWeight = 1;
	penSizeUp.width = 40;
	penSizeUp.height = 40;
	penSizeUp.text = ">";
	penSizeUp.onPress = function(){
	   penSize += 1;
	}

	penSizeDown = new Clickable();
  penSizeDown.locate(120,startHeight+10);
	penSizeDown.cornerRadius = 0;
	penSizeDown.strokeWeight = 1;
	penSizeDown.width = 40;
	penSizeDown.height = 40;
	penSizeDown.text = "<";
	penSizeDown.onPress = function(){
		if (penSize >1){
			penSize -= 1;
		}
	}


	outerRadiusDown = new Clickable();
  outerRadiusDown.locate(120,startHeight+100);
	outerRadiusDown.cornerRadius = 0;
	outerRadiusDown.strokeWeight = 1;
	outerRadiusDown.width = 40;
	outerRadiusDown.height = 40;
	outerRadiusDown.text = "<";
	outerRadiusDown.onPress = function(){
		if (stencil.diameterTarget >10){
			stencil.diameterTarget -= 10;

			if(!playing){
				stencil.diameter = stencil.diameterTarget;
			}
		}
	}

	outerRadiusUp = new Clickable();
    outerRadiusUp.locate(220,startHeight+100);
	outerRadiusUp.cornerRadius = 0;
	outerRadiusUp.strokeWeight = 1;
	outerRadiusUp.width = 40;
	outerRadiusUp.height = 40;
	outerRadiusUp.text = ">";
	outerRadiusUp.onPress = function(){
		if (stencil.diameterTarget <width){
			stencil.diameterTarget += 10;

			if(!playing){
				stencil.diameter = stencil.diameterTarget;
			}
		}
	}



	innerRadiusDown = new Clickable();
    innerRadiusDown.locate(120,startHeight+190);
	innerRadiusDown.cornerRadius = 0;
	innerRadiusDown.strokeWeight = 1;
	innerRadiusDown.width = 40;
	innerRadiusDown.height = 40;
	innerRadiusDown.text = "<";
	innerRadiusDown.onPress = function(){
		if (mover.diameterTarget >10){
			mover.diameterTarget -= 10;

			if(!playing){
				mover.diameter = mover.diameterTarget;
			}
		}
	}

	innerRadiusUp = new Clickable();
    innerRadiusUp.locate(220,startHeight+190);
	innerRadiusUp.cornerRadius = 0;
	innerRadiusUp.strokeWeight = 1;
	innerRadiusUp.width = 40;
	innerRadiusUp.height = 40;
	innerRadiusUp.text = ">";
	innerRadiusUp.onPress = function(){
		if (mover.diameterTarget < width){
			mover.diameterTarget += 10;

			if(!playing){
				mover.diameter = mover.diameterTarget;
			}
		}
	}


	speedDown = new Clickable();
    speedDown.locate(120,startHeight+280);
	speedDown.cornerRadius = 0;
	speedDown.strokeWeight = 1;
	speedDown.width = 40;
	speedDown.height = 40;
	speedDown.text = "<";
	speedDown.onPress = function(){
		if (stencil.speed >0.0005){
			stencil.speed -= 0.0005;
		}
	}

	speedUp = new Clickable();
    speedUp.locate(220,startHeight+280);
	speedUp.cornerRadius = 0;
	speedUp.strokeWeight = 1;
	speedUp.width = 40;
	speedUp.height = 40;
	speedUp.text = ">";
	speedUp.onPress = function(){
		if (stencil.speed <0.1){
			stencil.speed += 0.0005;
		}
	}

	stop = new Clickable();
    stop.locate(120,startHeight+330);
	stop.cornerRadius = 0;
	stop.strokeWeight = 1;
	stop.width = 140;
	stop.height = 40;
	stop.text = "Pause";
	stop.onPress = function(){

		if(playing){
			print("hi");
			playing = false;
		    this.text = "Go";
		    stencil.diameter = stencil.diameterTarget;
	        mover.diameter = mover.diameterTarget;
		}
		else{
			playing = true;
			this.text = "Pause";
		}

	}


  makeBlank = new Clickable();
  makeBlank.locate(120,startHeight+450);
	makeBlank.cornerRadius = 0;
	makeBlank.strokeWeight = 1;
	makeBlank.width = 140;
	makeBlank.height = 40;
	makeBlank.text = "Clear Canvas";
	makeBlank.onPress = function(){
		fill('#ffffff');
	    rect(272,0,width-272,height);

	    stencil.diameter = stencil.diameterTarget;
	    mover.diameter = mover.diameterTarget;
	}

  makeBlank = new Clickable();
  makeBlank.locate(120,startHeight+450);
	makeBlank.cornerRadius = 0;
	makeBlank.strokeWeight = 1;
	makeBlank.width = 140;
	makeBlank.height = 40;
	makeBlank.text = "Clear Canvas";
	makeBlank.onPress = function(){
		fill('#ffffff');
	    rect(272,0,width-272,height);

	    stencil.diameter = stencil.diameterTarget;
	    mover.diameter = mover.diameterTarget;
	}


	randomiser = new Clickable();
	randomiser.locate(120,startHeight+400);
	randomiser.cornerRadius = 0;
	randomiser.strokeWeight = 1;
	randomiser.width = 140;
	randomiser.height = 40;
	randomiser.text = "Randomise Pattern";
	randomiser.onPress = function(){
		//fill('#ffffff');
	   // rect(242,0,width-237,height);
		penSize = int(random(1,10));
		stencil.diameter = random(40, width-300);
		stencil.diameterTarget = stencil.diameter;
		mover.diameter = random(10,stencil.diameter);
		mover.diameterTarget = mover.diameter;
	}




}







function drawOtherButtons(){


	penSizeUp.draw();
  penSizeDown.draw();

  outerRadiusDown.draw();
  outerRadiusUp.draw();

  innerRadiusDown.draw();
  innerRadiusUp.draw();

  speedDown.draw();
  speedUp.draw();
  stop.draw();

  randomiser.draw();
  makeBlank.draw();

	fill('#000000');
  textAlign(LEFT, CENTER);
	text('Pen Size', 120, startHeight);
	textAlign(CENTER, CENTER);
	text(penSize, 190, startHeight+30);


  textAlign(LEFT, CENTER);
	text('Outer Radius', 120, startHeight+90);
  textAlign(CENTER, CENTER);
	text(int((stencil.diameterTarget)/2), 190, startHeight+120);

  textAlign(LEFT, CENTER);
  text('Inner Radius', 120, startHeight+180);
  textAlign(CENTER, CENTER);
	text(int((mover.diameterTarget)/2), 190, startHeight+210);

  textAlign(LEFT, CENTER);
	text('Speed', 120, startHeight+270);
	textAlign(CENTER, CENTER);
	text(nf(stencil.speed,1,4), 190, startHeight+300);

}

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

let startHeight = 25;

function createOtherButtons(){



	penSizeUp = new Clickable();
  penSizeUp.locate(215,startHeight+10);
	penSizeUp.cornerRadius = 4;
	penSizeUp.strokeWeight = 1;
	penSizeUp.stroke = "#525252";
	penSizeUp.width = 40;
	penSizeUp.height = 40;
	penSizeUp.text = " +";
	penSizeUp.onPress = function(){
	   penSize += 1;
	}
	penSizeUp.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	penSizeUp.onOutside = function(){
		this.color = "#d6d6d6";
		cursor(ARROW);
	}

	penSizeDown = new Clickable();
  penSizeDown.locate(125,startHeight+10);
	penSizeDown.cornerRadius = 4;
	penSizeDown.strokeWeight = 1;
	penSizeDown.stroke = "#525252";
	penSizeDown.width = 40;
	penSizeDown.height = 40;
	penSizeDown.text = " -";
	penSizeDown.onPress = function(){
		if (penSize >1){
			penSize -= 1;
		}
	}
	penSizeDown.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	penSizeDown.onOutside = function(){
		this.color = "#d6d6d6";
		cursor(ARROW);
	}

	outerRadiusDown = new Clickable();
  outerRadiusDown.locate(125,startHeight+100);
	outerRadiusDown.cornerRadius = 4;
	outerRadiusDown.stroke = "#525252";
	outerRadiusDown.strokeWeight = 1;
	outerRadiusDown.width = 40;
	outerRadiusDown.height = 40;
	outerRadiusDown.text = " -";
	outerRadiusDown.onPress = function(){
		if (stencil.diameterTarget >10){
			stencil.diameterTarget -= 10;

			if(!playing){
				stencil.diameter = stencil.diameterTarget;
			}
		}
	}
	outerRadiusDown.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	outerRadiusDown.onOutside = function(){
		this.color = "#d6d6d6";
		cursor(ARROW);
	}

	outerRadiusUp = new Clickable();
  outerRadiusUp.locate(215,startHeight+100);
	outerRadiusUp.cornerRadius = 4;
	outerRadiusUp.strokeWeight = 1;
	outerRadiusUp.stroke = "#525252";
	outerRadiusUp.width = 40;
	outerRadiusUp.height = 40;
	outerRadiusUp.text = " +";
	outerRadiusUp.onPress = function(){
		if (stencil.diameterTarget <width){
			stencil.diameterTarget += 10;

			if(!playing){
				stencil.diameter = stencil.diameterTarget;
			}
		}
	}
	outerRadiusUp.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	outerRadiusUp.onOutside = function(){
		this.color = "#d6d6d6";
		cursor(ARROW);
	}



	innerRadiusDown = new Clickable();
  innerRadiusDown.locate(125,startHeight+190);
	innerRadiusDown.cornerRadius = 4;
	innerRadiusDown.strokeWeight = 1;
	innerRadiusDown.stroke = "#525252";
	innerRadiusDown.width = 40;
	innerRadiusDown.height = 40;
	innerRadiusDown.text = " -";
	innerRadiusDown.onPress = function(){
		if (mover.diameterTarget >10){
			mover.diameterTarget -= 10;

			if(!playing){
				mover.diameter = mover.diameterTarget;
			}
		}
	}
	innerRadiusDown.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	innerRadiusDown.onOutside = function(){
		this.color = "#d6d6d6";
		cursor(ARROW);
	}

	innerRadiusUp = new Clickable();
    innerRadiusUp.locate(215,startHeight+190);
	innerRadiusUp.cornerRadius = 4;
	innerRadiusUp.strokeWeight = 1;
	innerRadiusUp.stroke = "#525252";
	innerRadiusUp.width = 40;
	innerRadiusUp.height = 40;
	innerRadiusUp.text = " +";
	innerRadiusUp.onPress = function(){
		if (mover.diameterTarget < width){
			mover.diameterTarget += 10;

			if(!playing){
				mover.diameter = mover.diameterTarget;
			}
		}
	}
	innerRadiusUp.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	innerRadiusUp.onOutside = function(){
		this.color = "#d6d6d6";
		cursor(ARROW);
	}


	speedDown = new Clickable();
  speedDown.locate(125,startHeight+280);
	speedDown.cornerRadius = 4;
	speedDown.strokeWeight = 1;
	speedDown.stroke = "#525252";
	speedDown.width = 40;
	speedDown.height = 40;
	speedDown.text = " -";
	speedDown.onPress = function(){
		if (stencil.speed >0.0005){
			stencil.speed -= 0.0005;
		}
	}

	speedDown.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	speedDown.onOutside = function(){
		this.color = "#d6d6d6";
		cursor(ARROW);
	}

	speedUp = new Clickable();
  speedUp.locate(215,startHeight+280);
	speedUp.cornerRadius = 4;
	speedUp.strokeWeight = 1;
	speedUp.stroke = "#525252";
	speedUp.width = 40;
	speedUp.height = 40;
	speedUp.text = " +";
	speedUp.onPress = function(){
		if (stencil.speed <0.1){
			stencil.speed += 0.0005;
		}
	}
	speedUp.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	speedUp.onOutside = function(){
		this.color = "#d6d6d6";
		cursor(ARROW);
	}

	stop = new Clickable();
  stop.locate(125,startHeight+325);
	stop.cornerRadius = 4;
	stop.strokeWeight = 1;
	stop.stroke = "#525252";
	stop.width = 130;
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

	stop.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	stop.onOutside = function(){
		this.color = "#d6d6d6";
		cursor(ARROW);
	}


	help = new Clickable();
	help.locate(125,startHeight+495);
	help.cornerRadius = 4;
  help.strokeWeight = 1;
	help.stroke = "#525252";
	help.width = 130;
	help.height = 40;
	help.text = "Help";
	help.onPress = function(){
		helpOpen = !helpOpen;
		if (!helpOpen){
			fill(color(canvasColor));
		  rect(272,0,width-272,height);
		}
	}

	help.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	help.onOutside = function(){
		this.color = "#eeeeee";
		cursor(ARROW);
	}


  makeBlank = new Clickable();
  makeBlank.locate(125,startHeight+540);
	makeBlank.cornerRadius = 4;
	makeBlank.strokeWeight = 1;
	makeBlank.stroke = "#525252";
	makeBlank.width = 130;
	makeBlank.height = 40;
	makeBlank.text = "Clear Canvas";
	makeBlank.onPress = function(){
		fill(color(canvasColor));
	  rect(272,0,width-272,height);

	    stencil.diameter = stencil.diameterTarget;
	    mover.diameter = mover.diameterTarget;
	}

	makeBlank.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	makeBlank.onOutside = function(){
		this.color = "#eeeeee";
		cursor(ARROW);
	}


	randomiser = new Clickable();
	randomiser.locate(125,startHeight+450);
	randomiser.cornerRadius = 4;
	randomiser.strokeWeight = 1;
	randomiser.stroke = "#525252";
	randomiser.width = 130;
	randomiser.height = 40;
	randomiser.text = "Randomise";
	randomiser.onPress = function(){
		//fill('#ffffff');
	   // rect(242,0,width-237,height);
		penSize = int(random(1,10));
		stencil.diameter = random(40, width-300);
		stencil.diameterTarget = stencil.diameter;
		mover.diameter = random(10,stencil.diameter);
		mover.diameterTarget = mover.diameter;
	}

	randomiser.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	randomiser.onOutside = function(){
		this.color = "#eeeeee";
		cursor(ARROW);
	}


	saver = new Clickable();
	saver.locate(125,startHeight+585);
	saver.cornerRadius = 4;
	saver.strokeWeight = 1;
	saver.stroke = "#525252";
	saver.width = 130;
	saver.height = 40;
	saver.text = "Save jpg";
	saver.onPress = function(){
		let to_save = get( 271, 0, width-271, height );
		save(to_save, "spirograph" + int(random(5000)) + ".jpg");
	}

	saver.onHover = function(){
		this.color = "#a9a9a9";
		cursor(HAND);
	}
	saver.onOutside = function(){
		this.color = "#eeeeee";
		cursor(ARROW);
	}

}







function drawOtherButtons(){

	textSize(30);
	textFont(moonLight);
	textAlign(CENTER, CENTER);
	penSizeUp.draw();
  penSizeDown.draw();

  outerRadiusDown.draw();
  outerRadiusUp.draw();

  innerRadiusDown.draw();
  innerRadiusUp.draw();

  speedDown.draw();
  speedUp.draw();

	textSize(14);
	textFont(moonBold);
  stop.draw();
  randomiser.draw();
  makeBlank.draw();
  saver.draw();
  help.draw();

	textSize(13.5);


	textFont(moonBold);
	fill('#000000');
  textAlign(LEFT, CENTER);
	text('Pen Size', 125, startHeight-5);
	textAlign(CENTER, CENTER);
	textFont(moonLight);
	text(penSize, 190, startHeight+30);

	textFont(moonBold);
  textAlign(LEFT, CENTER);
	text('Outer Radius', 125, startHeight+85);
  textAlign(CENTER, CENTER);
	textFont(moonLight);
	text(int((stencil.diameterTarget)/2), 190, startHeight+120);

	textFont(moonBold);
  textAlign(LEFT, CENTER);
  text('Inner Radius', 125, startHeight+175);
  textAlign(CENTER, CENTER);
	textFont(moonLight);
	text(int((mover.diameterTarget)/2), 190, startHeight+210);

	textFont(moonBold);
  textAlign(LEFT, CENTER);
	text('Speed', 125, startHeight+265);
	textAlign(CENTER, CENTER);
	textFont(moonLight);
	var printSpeed = int(stencil.speed*10000);
	text(printSpeed, 190, startHeight+300);

}

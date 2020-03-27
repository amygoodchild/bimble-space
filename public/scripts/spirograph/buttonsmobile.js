// Other buttons


function createOtherButtonsMobile(){
    
	textSize(15);
	penSizeUp = new Clickable();
    penSizeUp.locate(280,height - 205);
	penSizeUp.cornerRadius = 0;
	penSizeUp.strokeWeight = 1;
	penSizeUp.width = 35;
	penSizeUp.height = 35;
	penSizeUp.text = ">";
	penSizeUp.onPress = function(){
		penSize += 1;
	}

	penSizeDown = new Clickable();
    penSizeDown.locate(220,height - 205);
	penSizeDown.cornerRadius = 0;
	penSizeDown.strokeWeight = 1;
	penSizeDown.width = 35;
	penSizeDown.height = 35;
	penSizeDown.text = "<";
	penSizeDown.onPress = function(){
		if (penSize >1){
			penSize -= 1;
		}
	}


	outerRadiusDown = new Clickable();
    outerRadiusDown.locate(220,height - 165);
	outerRadiusDown.cornerRadius = 0;
	outerRadiusDown.strokeWeight = 1;
	outerRadiusDown.width = 35;
	outerRadiusDown.height = 35;
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
    outerRadiusUp.locate(280,height - 165);
	outerRadiusUp.cornerRadius = 0;
	outerRadiusUp.strokeWeight = 1;
	outerRadiusUp.width = 35;
	outerRadiusUp.height = 35;
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
    innerRadiusDown.locate(220,height - 125);
	innerRadiusDown.cornerRadius = 0;
	innerRadiusDown.strokeWeight = 1;
	innerRadiusDown.width = 35;
	innerRadiusDown.height = 35;
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
    innerRadiusUp.locate(280,height - 125);
	innerRadiusUp.cornerRadius = 0;
	innerRadiusUp.strokeWeight = 1;
	innerRadiusUp.width = 35;
	innerRadiusUp.height = 35;
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
    speedDown.locate(220,height - 85);
	speedDown.cornerRadius = 0;
	speedDown.strokeWeight = 1;
	speedDown.width = 35;
	speedDown.height = 35;
	speedDown.text = "<";
	speedDown.onPress = function(){
		if (stencil.speed >0.0005){
			stencil.speed -= 0.0015;
		}
	}

	speedUp = new Clickable();
    speedUp.locate(280,height - 85);
	speedUp.cornerRadius = 0;
	speedUp.strokeWeight = 1;
	speedUp.width = 35;
	speedUp.height = 35;
	speedUp.text = ">";
	speedUp.onPress = function(){
		if (stencil.speed <0.1){
			stencil.speed += 0.0015;
		}
	}



	stop = new Clickable();
    stop.locate(10, height - 40);
	stop.cornerRadius = 0;
	stop.strokeWeight = 1;
	stop.width = 70;
	stop.height = 35;
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
    makeBlank.locate(90,height-40);
	makeBlank.cornerRadius = 0;
	makeBlank.strokeWeight = 1;
	makeBlank.width = 70;
	makeBlank.height = 35;
	makeBlank.text = "Clear";
	makeBlank.onPress = function(){
		fill('#ffffff');
	    
		if (windowWidth < 900){
			rect(0,46,width,height-258);
		}
		else{
	    	rect(242,0,width-237,height);
	    }

	    stencil.diameter = stencil.diameterTarget;
	    mover.diameter = mover.diameterTarget;
	}


	randomiser = new Clickable();
	randomiser.locate(170,height-40);
	randomiser.cornerRadius = 0;
	randomiser.strokeWeight = 1;
	randomiser.width = 70;
	randomiser.height = 35;
	randomiser.text = "Random";
	randomiser.onPress = function(){
		//fill('#ffffff');
	   // rect(242,0,width-237,height);
		penSize = int(random(1,10));
		stencil.diameter = random(10, width);
		stencil.diameterTarget = stencil.diameter;
		mover.diameter = random(10,stencil.diameter);
		mover.diameterTarget = mover.diameter;
	}




}







function drawOtherButtonsMobile(){


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
	text('Pen Size', 10, windowHeight - 225);
	text(penSize, 125, windowHeight - 225);

	text('Outer Radius', 10, windowHeight - 185);
	text(int((stencil.diameterTarget)/2), 125, windowHeight - 185);

    text('Inner Radius', 10, windowHeight - 145);
	text(int((mover.diameterTarget)/2), 125, windowHeight - 145);

	text('Speed', 10, windowHeight - 105);
	text(nf(stencil.speed,2,4), 125, windowHeight - 105);

}
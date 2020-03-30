// Color Buttons
let colorButtons = [];
let canvasColorButtons = [];

function createColorButtons(){

	for (let i = 0; i<17; i++){
		colorButtons[i] = new Clickable();
		colorButtons[i].locate(10,45*i+35);
		colorButtons[i].text = "";
		colorButtons[i].cornerRadius = 4;
		colorButtons[i].strokeWeight = 1;
		colorButtons[i].height = 40;
		colorButtons[i].width = 40;
		colorButtons[i].textColor = "#000000";

		colorButtons[i].onPress = function(){
			penColor = colorButtons[i].color;
			rainbow = false;
			for (let j = 0; j<colorButtons.length; j++){
					colorButtons[j].strokeWeight = 1;
			}
			this.strokeWeight = 3;
		}
	}

	for (let i = 9; i<17; i++){
		colorButtons[i].locate(55, (45*i+35) - 405);
	}


	colorButtons[0].color = "#f54b42";
	colorButtons[1].color = "#f79736";
	colorButtons[2].color = "#f7f300";
	colorButtons[3].color = "#6ec955";
	colorButtons[4].color = "#55bfc9";
  colorButtons[5].color = "#2641c7";
	colorButtons[6].color = "#500063";
	colorButtons[7].color = "#000000";

	colorButtons[9].color = "#d9367b";
	colorButtons[10].color = "#ff7777";
	colorButtons[11].color = "#ffcd77";
	colorButtons[12].color = "#aad888";
	colorButtons[13].color = "#44a8fc";
	colorButtons[14].color = "#191473";
	colorButtons[15].color = "#8f62bd";
	colorButtons[16].color = "#ffffff";

	colorButtons[8].color = "#ffffff";
	colorButtons[8].text = "Rainbow";
	colorButtons[8].width = 85;
	colorButtons[8].onPress = function(){
		rainbow = true;
		for (let j = 0; j<colorButtons.length; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}



	for (let i = 0; i<8; i++){
		canvasColorButtons[i] = new Clickable();
		canvasColorButtons[i].locate(10,45*i+475);
		canvasColorButtons[i].text = "";
		canvasColorButtons[i].cornerRadius = 4;
		canvasColorButtons[i].strokeWeight = 1;
		canvasColorButtons[i].height = 40;
		canvasColorButtons[i].width = 40;
		canvasColorButtons[i].textColor = "#000000";

		canvasColorButtons[i].onPress = function(){
			canvasColor = canvasColorButtons[i].color;
			fill(color(canvasColor));
		  rect(272,0,width-272,height);
			for (let j = 0; j<canvasColorButtons.length; j++){
					canvasColorButtons[j].strokeWeight = 1;
			}
			this.strokeWeight = 3;
		}
	}


	for (let i = 4; i<8; i++){
		canvasColorButtons[i].locate(55,(45*i)+475-180);
	}


	canvasColorButtons[4].color = "#ffffff";
	canvasColorButtons[0].color = "#000000";
	canvasColorButtons[5].color = "#a3a3a3";
	canvasColorButtons[1].color = "#303030";
	canvasColorButtons[6].color = "#c7b4d0";
	canvasColorButtons[2].color = "#3c1346";
	canvasColorButtons[7].color = "#c3d1e9";
	canvasColorButtons[3].color = "#16315c";

}

function drawColorButtons(){


	textFont(moonBold);

	fill('#000000');
  textAlign(LEFT, CENTER);
	textSize(14);
	text('Colour', 10, startHeight-5);

	text('BG Colour', 10, 460);



	for (let i = 0; i<colorButtons.length; i++){
		colorButtons[i].draw();
	}

	for (let i = 0; i<canvasColorButtons.length; i++){
		canvasColorButtons[i].draw();
	}
}

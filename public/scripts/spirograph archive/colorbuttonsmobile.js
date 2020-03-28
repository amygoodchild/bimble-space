// Color Buttons


function createColorButtonsMobile(){

	for (let i = 0; i<8; i++){
		colorButtons[i] = new Clickable();
		colorButtons[i].textColor = "#ffffff";

	    colorButtons[i].text = "";
		colorButtons[i].cornerRadius = 0;
		colorButtons[i].strokeWeight = 1;
		colorButtons[i].height = 35;
		colorButtons[i].width = 33;
	}

	for (let i = 0; i<9; i++){

		colorButtons[i].locate(36*i+2,5);
	}
	


	colorButtons[0].color = "#f54b42";
	//Red
	colorButtons[0].onPress = function(){
		penColor = "#f54b42";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	colorButtons[1].color = "#f79736";
	// Orange
	colorButtons[1].onPress = function(){
		penColor = "#f79736";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	colorButtons[2].color = "#f7f300";
	// Yellow
	colorButtons[2].textColor = "#000000";
	colorButtons[2].onPress = function(){
		penColor = "#f7f300";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	colorButtons[3].color = "#6ec955";
	// Green
	colorButtons[3].textColor = "#000000";
	colorButtons[3].onPress = function(){
		penColor = "#6ec955";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	colorButtons[4].color = "#55bfc9";
	// Cyan
	colorButtons[4].textColor = "#000000";
	colorButtons[4].onPress = function(){
		penColor = "#55bfc9";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

    colorButtons[5].color = "#2641c7";
	// Blue
	colorButtons[5].textColor = "#ffffff";
	colorButtons[5].onPress = function(){
		penColor = "#2641c7";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	colorButtons[6].color = "#500063";
	// Purple
	colorButtons[6].textColor = "#ffffff";
	colorButtons[6].onPress = function(){
		penColor = "#500063";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	colorButtons[7].color = "#000000";
	// Black
	colorButtons[7].textColor = "#ffffff";
	colorButtons[7].onPress = function(){
		penColor = "#000000";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	textSize(10);
	colorButtons[8].color = "#ffffff";
	colorButtons[8].text = "RB";
	colorButtons[8].textColor = "#000000";
	colorButtons[8].onPress = function(){
		rainbow = true;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	colorButtons[8].cornerRadius = 0;
	colorButtons[8].strokeWeight = 1;
	colorButtons[8].height = 35;
	colorButtons[8].width = 50;

}

function drawColorButtonsMobile(){
	for (let i = 0; i<9; i++){
		colorButtons[i].draw();
	}
}
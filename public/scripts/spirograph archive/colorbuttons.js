// Color Buttons
let colorButtons = [];


function createColorButtons(){

	for (let i = 0; i<9; i++){
		colorButtons[i] = new Clickable();
		colorButtons[i].locate(10,45*i+10);
		colorButtons[i].textColor = "#ffffff";
		colorButtons[i].cornerRadius = 0;
		colorButtons[i].strokeWeight = 1;
		colorButtons[i].height = 40;
		colorButtons[i].width = 90;
	}


	colorButtons[0].color = "#f54b42";
	colorButtons[0].text = "Red";
	colorButtons[0].onPress = function(){
		penColor = "#f54b42";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	colorButtons[1].color = "#f79736";
	colorButtons[1].text = "Orange";
	colorButtons[1].onPress = function(){
		penColor = "#f79736";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	colorButtons[2].color = "#f7f300";
	colorButtons[2].text = "Yellow";
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
	colorButtons[3].text = "Green";
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
	colorButtons[4].text = "Cyan";
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
	colorButtons[5].text = "Blue";
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
	colorButtons[6].text = "Purple";
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
	colorButtons[7].text = "Black";
	colorButtons[7].textColor = "#ffffff";
	colorButtons[7].onPress = function(){
		penColor = "#000000";
		rainbow = false;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

	colorButtons[8].color = "#ffffff";
	colorButtons[8].text = "Rainbow";
	colorButtons[8].textColor = "#000000";
	colorButtons[8].onPress = function(){
		rainbow = true;
		for (let j = 0; j<9; j++){
				colorButtons[j].strokeWeight = 1;
		}
		this.strokeWeight = 3;
	}

}

function drawColorButtons(){
	for (let i = 0; i<9; i++){
		colorButtons[i].draw();
	}
}
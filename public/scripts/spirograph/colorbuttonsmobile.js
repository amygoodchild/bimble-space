// Color Buttons

function createColorButtonsMobile(){

	for (let i = 0; i<9; i++){
		colorButtons[i] = new Clickable();
		colorButtons[i].textColor = "#ffffff";
		colorButtons[i].text = "";
		colorButtons[i].cornerRadius = 0;
		colorButtons[i].strokeWeight = 1;
		colorButtons[i].height = 35;
		colorButtons[i].width = 33;
		colorButtons[i].locate(36*i+2,5);
		colorButtons[i].onPress = function(){
			penColor = colorButtons[i].color;
			rainbow = false;
			for (let j = 0; j<9; j++){
					colorButtons[j].strokeWeight = 1;
			}
			this.strokeWeight = 3;
		}
}



	colorButtons[0].color = "#f54b42";
	colorButtons[1].color = "#f79736";
	colorButtons[2].color = "#f7f300";
	colorButtons[3].color = "#6ec955";
	colorButtons[4].color = "#55bfc9";
  colorButtons[5].color = "#2641c7";
	colorButtons[6].color = "#500063";
	colorButtons[7].color = "#000000";

	textSize(10);
	colorButtons[8].color = "#ffffff";
	colorButtons[8].text = "RB";
	colorButtons[8].textColor = "#000000";
	colorButtons[8].onPress = function(){
		rainbow = true;
	}

}

function drawColorButtonsMobile(){
	for (let i = 0; i<9; i++){
		colorButtons[i].draw();
	}
}

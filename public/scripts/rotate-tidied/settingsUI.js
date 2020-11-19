class SettingUI{
  constructor(){
    $("#penSize2").addClass("sliderButtonSelected");
    $("#speed2").addClass("sliderButtonSelected");
    $("#trailLength2").addClass("sliderButtonSelected");

  }

  penGradientChange(penColorID){
    $("#penColors").hide();
    let theClass;
    for (let i=0; i<5;i++){
      theClass = "penColor" + i;
      $("#penColorsMenu").children(".menuIcon").removeClass(theClass);
    }
    theClass = penColorID;
    $("#penColorsMenu").children(".menuIcon").addClass(theClass);
  }

  backgroundColorChange(colorID){
    $("#bgColors").hide();

    let theClass;
    for (let i=0; i<5;i++){
      theClass = "bgColor" + i;
      $("#bgColorsMenu").children(".menuIcon").removeClass(theClass);
    }
    theClass = colorID;
    $("#bgColorsMenu").children(".menuIcon").addClass(theClass);

    if (theClass == "bgColor0"){
      $(".menuText").removeClass("blackText");
      $("#bgColorsMenu").children(".menuIcon").removeClass("blackBorder");
      $("#penColorsMenu").children(".menuIcon").removeClass("blackBorder");
      $(".penColorButton").removeClass("blackBorder");
      $(".bgColorButton").removeClass("blackBorder");
    }
    else{
      $(".menuText").addClass("blackText");
      $("#bgColorsMenu").children(".menuIcon").addClass("blackBorder");
      $("#penColorsMenu").children(".menuIcon").addClass("blackBorder");
      $(".penColorButton").addClass("blackBorder");
      $(".bgColorButton").addClass("blackBorder");
    }
  }

  penSizeChange(penSizeID){
    $(".penSizeButton").removeClass("sliderButtonSelected");
    $("#" + penSizeID).addClass("sliderButtonSelected");
  }

  speedChange(speedID){
    $(".speedButton").removeClass("sliderButtonSelected");
    $("#" + speedID).addClass("sliderButtonSelected");
  }

  bgOpacityChange(opacityID){
    $(".trailLengthButton").removeClass("sliderButtonSelected");
    $("#" + opacityID).addClass("sliderButtonSelected");
  }

  setClockwise(){
    $("#spinClockWise").addClass("buttonSelected");
    $("#spinAntiClockWise").removeClass("buttonSelected");
  }

  setAntiClockwise(){
    $("#spinClockWise").removeClass("buttonSelected");
    $("#spinAntiClockWise").addClass("buttonSelected");
  }

  addNotification(message){
    // Adds an element to the document
    var n = document.getElementById("notification");
    var newElement = document.createElement("div");

    newElement.setAttribute('class', "notificationMessage");
    let newID = ps.int(ps.random(0,50000));
    newElement.setAttribute('id', newID);
    newElement.innerHTML = message;
    n.appendChild(newElement);
  }
}


function googleTags(cssID){
  let eventName = cssID;
  let value = eventName.charAt(eventName.length - 1);
  eventName = eventName.substring(0, eventName.length - 1);
  gtag('event', eventName, {
    'event_category': "Blend",
    'event_label': value
  });
}

function googleTagsNoValue(cssID){
  let eventName = cssID;
  gtag('event', eventName, {
    'event_category': "Blend",
    'event_label': ""
  });
}


$(document).ready(function(){
  // Change pen colour
  $(".penColorButton").click(function(){
    ps.settingHandler.currentPen.setGradient($(this).attr('id'));
    ps.settingUI.penGradientChange($(this).attr('id'));
    googleTags($(this).attr('id'));
  });

  // Change pen size
  $(".penSizeButton").click(function(){
    ps.settingHandler.currentPen.setSize($(this).attr('id'));
    ps.settingUI.penSizeChange($(this).attr('id'));
    googleTags($(this).attr('id'));
  });

  // Change rotate speed
  $(".speedButton").click(function(){
    ps.settingHandler.currentCanvas.setSpeed($(this).attr('id'));
    ps.settingUI.speedChange($(this).attr('id'));
    ps.commsHandler.sendNewSetting("rotate speed", $(this).attr('id'));
    googleTags($(this).attr('id'));
  });

  // Change background opacity / trail length
  $(".trailLengthButton").click(function(){
    ps.settingHandler.currentCanvas.setBgOpacity($(this).attr('id'));
    ps.settingUI.bgOpacityChange($(this).attr('id'));
    ps.commsHandler.sendNewSetting("background opacity", $(this).attr('id'));
    googleTags($(this).attr('id'));
  });

  // Change spin direction of pen
  $("#spinClockWise").click(function(){
    ps.settingHandler.currentCanvas.setClockwise(true);
    ps.settingUI.setClockwise();
    ps.commsHandler.sendNewSetting("clockwise", $(this).attr('id'));
    googleTagsNoValue($(this).attr('id'));
  });

  $("#spinAntiClockWise").click(function(){
    ps.settingHandler.currentCanvas.setClockwise(false);
    ps.settingUI.setAntiClockwise();
    ps.commsHandler.sendNewSetting("anti clockwise", $(this).attr('id'));
    googleTagsNoValue($(this).attr('id'));
  });

  // Change canvas colour
  $(".bgColorButton").click(function(){
    ps.settingHandler.currentCanvas.setBgColor($(this).attr('id'));
    ps.settingUI.backgroundColorChange($(this).attr('id'));
    ps.commsHandler.sendNewSetting("background color", $(this).attr('id'));
    googleTags($(this).attr('id'));
  });

  // Clear canvas
  $("#clearAllButton").click(function(){
    ps.pointsHandler.deleteAllPoints();
    ps.canvasHandler.backgroundFade = true;
    ps.canvasHandler.backgroundFadeCount = ps.frameCount;
    ps.commsHandler.sendNewSetting("clear", "0", "0");
    googleTagsNoValue($(this).attr('id'));
  });

  // Save canvas
  $("#saveButton").click(function(){
    name = "bimblespace_blend_" + ps.int(ps.random(0,50000) + ps.millis());
    ps.saveCanvas(name, 'png');
    googleTagsNoValue($(this).attr('id'));
  });

  // Click through menu options
  $(".menuOption").click(function(){
      let theId = $(this).attr('id');
      theId = theId.substring(0,theId.length -4);
      if ($('#' + theId).is(":hidden")){
        $(".menuDrawer").hide();
        $('#' + theId).show();
        ps.drawOpen = true;
      }
      else{
        $('#' + theId).hide();
        ps.drawOpen = false;
      }
      // Extra arrowy thingy
      if ($('#options').is(":hidden")){
        $("#optionSelector").hide();
      }
      else{
        $("#optionSelector").show();
      }
      if ($('#pairing').is(":hidden")){
        $("#pairingSelector").hide();
      }
      else{
        $("#pairingSelector").show();
      }
  });

  // Closes the settings stuff if you click on the canvas
  $(document).on('mousedown', function (e) {
    if ($(e.target).closest("#options").length === 0) {
      if($(e.target).closest("#optionsMenu").length ===0){
        $("#options").hide();
        $("#optionSelector").hide();
      }
    }
    if ($(e.target).closest("#pairing").length === 0) {
      if($(e.target).closest("#pairingMenu").length ===0){
        $("#pairing").hide();
        $("#pairingSelector").hide();
      }
    }
  });

});



function moveNotificationsUp(){
  $('#notification').children().each(function () {
    let newBottom = $(this).css("bottom");
    newBottom = parseInt(newBottom.substring(0,newBottom.length -2));
    newBottom += 2;
    $(this).css("bottom", newBottom + "px");

    let newOpacity = $(this).css("opacity");
    newOpacity = parseFloat(newOpacity);
    newOpacity -= 0.01;
    $(this).css("opacity", newOpacity);

    if (newBottom > 300){
      $(this).remove();
    }
  });
}

$(document).ready(function(){

  $("#color0").click(function(){ ps.colorChoice = 0; });
  $("#color1").click(function(){ ps.colorChoice = 1; });
  $("#color2").click(function(){ ps.colorChoice = 2; });
  $("#color3").click(function(){ ps.colorChoice = 3; });
  $("#color4").click(function(){ ps.colorChoice = 4; });
  $("#color5").click(function(){ ps.colorChoice = 5; });
  $("#color6").click(function(){ ps.colorChoice = 6; });
  $("#color7").click(function(){ ps.colorChoice = 7; });
  $("#color8").click(function(){ ps.colorChoice = 8; });
  $("#color9").click(function(){ ps.colorChoice = 9; });
  $("#color10").click(function(){ ps.colorChoice = 10; });
  $("#color11").click(function(){ ps.colorChoice = 11; });


  $(".colorButton").click(function(){
    $(".colorButton").removeClass('colorButtonOn');
    $(this).addClass('colorButtonOn');
  });

  if($(window).width() < $(window).height()){
    $("#mobileColor").click(function(){
      $(this).css("display", "none");
      $('.colorButton').css("display", "block");
    });

    $(".colorButton").click(function(){
      $(".colorButton").css("display", "none");
      $('#mobileColor').css("display", "block");
      $('#mobileColor').css("background", $(this).css('background'));
    });

  }


});


function windowResized() {
  console.log("resize");
  sortOutWindowResize();
}

function sortOutWindowResize(){
  var newToyWidth;
  var newToyHeight;


  if(!landscape){
    newToyWidth =  $(window).width();
    newToyHeight = $(window).height();
                    - 50;
  }
  else{
    newToyWidth =  $(window).width()
                      - 55;
    newToyHeight = $(window).height();
  }

  $("#theToyContainer").css({ 'width': newToyWidth });
  $("#theToyContainer").css({ 'height': newToyHeight });
}

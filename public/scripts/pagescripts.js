$(document).ready(function(){

  $( window ).resize(function() {
    if ($( window ).height() < $( window ).width()){
      $("#menu").css("width", "150px");
      $("#menu").css("height", "100%");
      $(".menuButtonClosed").css("display", "none");
      $(".menuButtonOpen").css("display", "none");
      $(".menuButtonClosedMobile").css("display", "none");
      $(".menuButtonOpenMobile").css("display", "none");
    }
    else{
      $("#menu").css("height", "50px");
      $("#menu").css("width", "100%");
      $(".menuButtonClosedMobile").css("display", "inline-block");
      $(".menuButtonOpenMobile").css("display", "none");
      $(".menuButtonClosed").css("display", "none");
      $(".menuButtonOpen").css("display", "none");
    }
  });

  $(".menuButtonClosedMobile").click(function(){
    $("#menu").animate({height: "100%"}, 400);
    $(".menuButtonClosedMobile").css("display", "none");
    $(".menuButtonOpenMobile").css("display", "inline-block");
  });

  $(".menuButtonOpenMobile").click(function(){
    $("#menu").animate({height: "55px"}, 400);
    $(".menuButtonClosedMobile").css("display", "inline-block");
    $(".menuButtonOpenMobile").css("display", "none");
  });


  $(".fullScreenButtonOpen").css("display", "none");
  $(".fullScreenButtonClose").css("display", "none");


});

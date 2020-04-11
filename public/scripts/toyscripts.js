$(document).ready(function(){

  $( window ).resize(function() {
    if ($( window ).height() < $( window ).width()){
      $("#menu").css("width", "55px");
      $("#menu").css("height", "100%");
      $(".menuButtonClosed").css("display", "inline-block");
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


  $(".menuButtonClosed").click(function(){
    $("#menu").animate({width: "400px"}, 400);
    $(".menuButtonClosed").css("display", "none");
    $(".menuButtonOpen").css("display", "inline-block");
  });


  $(".menuButtonOpen").click(function(){
    $("#menu").animate({width: "55px"}, 400);
    $(".menuButtonClosed").css("display", "inline-block");
    $(".menuButtonOpen").css("display", "none");
  });


  $(".menuButtonClosedMobile").click(function(){
    $("#menu").animate({height: "100%"}, 400);
    $(".menuButtonClosedMobile").css("display", "none");
    $(".menuButtonOpenMobile").css("display", "inline-block");
  });

  $(".menuButtonOpenMobile").click(function(){
    $("#menu").animate({height: "50px"}, 400);
    $(".menuButtonClosedMobile").css("display", "inline-block");
    $(".menuButtonOpenMobile").css("display", "none");
  });


  $(".fullScreenButtonOpen").click(function(){
    openFullScreen();
    $(".fullScreenButtonClose").css("display", "inline-block");
    $(".fullSCreenButtonOpen").css("display", "none");
  });

  $(".fullScreenButtonClose").click(function(){
    exitFullScreen();
    $(".fullScreenButtonOpen").css("display", "inline-block");
    $(".fullSCreenButtonClose").css("display", "none");
  });

  var elem = document.documentElement;


  function openFullScreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
    sortOutWindowResize()
    //resizeCanvas(windowWidth, windowHeight);
    //background('#fffffff');
  }

  function exitFullScreen() {
    if (elem.requestFullscreen) {
      document.exitFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      document.mozExitFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
    sortOutWindowResize()
    //resizeCanvas(windowWidth, windowHeight);
    //background('#fffffff');
  }





});

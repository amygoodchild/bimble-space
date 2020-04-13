
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-162297893-1');


$(document).ready(function(){

  // Spirograph events

  $("#randomizeButton").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Randomize"
    });
  });

  $("#penUp").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Pen Up"
    });
  });

  $("#penDown").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Pen Down"
    });
  });

  $("#outerCircleUp").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Outer Circle Up"
    });
  });

  $("#outerCircleDown").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Outer Circle Down"
    });
  });

  $("#innerCircleUp").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Inner Circle Up"
    });
  });

  $("#innerCircleDown").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Inner Circle Down"
    });
  });


  $("#speedUp").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Speed Up"
    });
  });

  $("#speedDown").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Speed Down"
    });
  });


  $("#playButton").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Play Pause"
    });
  });

  $("#saveButton").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Save"
    });
  });

  $("#clearButton").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "New canvas"
    });
  });

  $(".colorButton").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Pen Color"
    });
  });

  $(".bgColorButton").click(function() {
    gtag('event', "Toy click", {
      'event_category': "Spirograph",
      'event_label': "Background Color"
    });
  });

});

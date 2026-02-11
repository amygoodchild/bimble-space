var landscape;
  if ($( window ).height() < $( window ).width()){
    landscape = true;
    console.log("landscape");
  }
  else{
    landscape = false;
    console.log("portrait");
  }

  $( window ).resize(function() {
    if ($( window ).height() < $( window ).width()){
      landscape = true;
      $("#menu").css("width", "55px");
      $("#menu").css("height", "100%");
      $(".menuButtonClosed").css("display", "inline-block");
      $(".menuButtonOpen").css("display", "none");
      $(".menuButtonClosedMobile").css("display", "none");
      $(".menuButtonOpenMobile").css("display", "none")

      newToyWidth =  $(window).width() - 55;
      newToyHeight = $(window).height();

      ps.maxSize = 12;         // Size the boids will grow to
      ps.minSize = 5;

    }
    else{
      landscape = false;

      $("#menu").css("height", "50px");
      $("#menu").css("width", "100%");
      $(".menuButtonClosedMobile").css("display", "inline-block");
      $(".menuButtonOpenMobile").css("display", "none");
      $(".menuButtonClosed").css("display", "none");
      $(".menuButtonOpen").css("display", "none");

      newToyWidth =  $(window).width();
      newToyHeight = $(window).height() - 50;

      ps.maxSize = 10;         // Size the boids will grow to
      ps.minSize = 3;
    }

    $("#theToyContainer").css({ 'width': newToyWidth });
    $("#theToyContainer").css({ 'height': newToyHeight });
    ps.resizeCanvas(parseInt($("#theToyContainer").width()), parseInt($("#theToyContainer").height()));

    data = {
      newWidth : newToyWidth,
      newHeight : newToyHeight,
      otherUser : ps.otherUser
    }
    ps.socket.emit('iResized', data);

    if (ps.otherWidth > newToyWidth){
      ps.wrapWidth = ps.otherWidth;
    }
    else{
      ps.wrapWidth = newToyWidth;
    }
    if (ps.otherHeight > newToyHeight){
      ps.wrapHeight = ps.otherHeight;
    }
    else{
      ps.wrapHeight = newToyHeight;
    }
  });

function registerOwnID(data){
  console.log(data);
}

function sortOutWindowResize(){
}

const pewpewSketch = ( p ) => {

  p.boids = [];

  // Spawning variables
  p.duplicates= 2;          // how many spawn per frame (looks cool if loads shoot out at once, but hits max boids quicker)
  p.spawnRandomness = 20;   // gives a bit of randomness to the position of spawning
  p.id = 0;                 // gives each boid an ID - useful for debugging because it's possible to log out details of one boid


  p.colorJitter = 20;       // colours are picked from a set of pre selected ones, but with a little randomness built into the hues for depth
  p.wiggleAmount = {
    min: 2,
    max: 3
  }
  p.noiseSpeed = {
    min: 0.02,
    max: 0.1
  }

  p.maxSize = 10;         // Size the boids will grow to
  p.minSize = 3;
  p.deleteDiameter = 5;   // size the boids get deleted at

  p.previousMouseX = 0;   // To figure out what direction the mouse is going in
  p.previousMouseY = 0;
  p.mouseSpeedMin = -550;
  p.mouseSpeedMax = 550;
  p.minInitialSpeed = -300;
  p.initialSpeed = 300;      // how much the mouse direction affects initial velocity
  p.startSpeed = 4;          // how fast the mousedirection pushes a boid

  p.maxBoids = 500;      // Max number of boids, changes to be lower if framerate is struggling
  p.topMaxBoids = 180;
  p.lowMaxBoids = 20;

  p.colorCollections = []; // Manage colour choices
  p.colorChoice = 0;
  p.matched = false;
  p.matchMe = false;
  p.numUsers;
  p.pairCounter = 0;
  p.socket;              // For comms with other player
  p.loneMessages = [];   // Collection of messages to display if you're playing alone
                            // (messages for if you've been paired with a partner are in the server side code so both users can get the same one)
  p.matchState = "noPartner";

  p.otherWidth;          // Partner's screen size, so we can map movement from different resolutions
  p.otherHeight;
  p.wrapWidth;           // When wrapping is on, we wrap to the bigger user's screen size
  p.wrapHeight;

  p.frameRateLerp = 60;  // For displaying framerate more smoothly/readably

  p.disableFriendlyErrors = true; // Supposed to improve p5js performance... *shrug*
  p.debugMode = false;    // debug and stuff for measuring time taken
  p.start = 0;
  p.elapsed = 0;

  p.alignSlider;
  p.cohesionSlider;
  p.separationSlider;
  p.separationDistanceSlider;
  p.forceSlider;

  // flock variables
  p.perceptionRadius = 75;
  p.desiredSeparation = 15;
  p.separationAmount = 1.0;
  p.separationDistanceAmount = 10;
  p.alignAmount = 2.0;
  p.cohesionAmount = 0.3;
  p.forceAmount = 0.6;

  p.dragLength = 0;
  p.drawCounter = 0;

  p.drawGoodbye = false;
  p.drawGoodbyeCount = 100;

  p.drawMyGoodbye = false;
  p.drawMyGoodbyeCount = 100;

  p.idleMillis = 0;
  p.idleCounting = false;

  p.setup = () => {
    // Connects to server for comms - always connect to Heroku (in.bimble.space may proxy static files but not socket.io)
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      p.socket = io.connect('http://localhost:3000');
    }
    else{
      p.socket = io.connect('https://desolate-dusk-28350.herokuapp.com/');
    }

    /*p.separationSlider = p.createSlider(0, 5, 1.5, 0.1);
    p.separationDistanceSlider = p.createSlider(1, 500, 30, 1);
    p.alignSlider = p.createSlider(0, 5, 1.8, 0.1);
    p.cohesionSlider = p.createSlider(0, 5, 0.3, 0.1);
    p.forceSlider = p.createSlider(0, 2, 0.3, 0.05);

    p.separationSlider.position(200, 10);
    p.separationSlider.style('width', '100px');
    p.separationDistanceSlider.position(350, 10);
    p.separationDistanceSlider.style('width', '100px');

    p.alignSlider.position(200, 40);
    p.alignSlider.style('width', '100px');
    p.cohesionSlider.position(200, 70);
    p.cohesionSlider.style('width', '100px');

    p.forceSlider.position(200, 120);
    p.forceSlider.style('width', '100px');*/


    // Set up some options
    p.colorMode(p.HSB,360,100,100, 100);
    p.noStroke();
    p.noiseSeed(100);   // So that each session gets the same perlin noise
    p.angleMode(p.DEGREES);

    //p.frameRate(1);  // for debugging

    // Creates the canvas
    if (p.int(p.windowWidth) > p.int(p.windowHeight)){    // landscape
      p.theWidth = p.int(p.windowWidth) - 55;
      p.theHeight = p.int(p.windowHeight);
      p.rippleCanvas = p.createCanvas(p.theWidth, p.theHeight);
      p.startSpeed = 7;

    }
    else{                                               // portrait
      p.theWidth = p.int(p.windowWidth);
      p.theHeight = p.int(p.windowHeight) - 50;
      p.rippleCanvas = p.createCanvas(p.theWidth, p.theHeight);
      p.maxSize = 10;         // Size the boids will grow to
      p.minSize = 3;
      p.startSpeed = 4;

    }

    p.rippleCanvas.parent('theToyContainer');

    p.background(200,50,20);

    // default wrap width (changes if you are paired with someone with a bigger screen)
    p.wrapWidth = p.width;
    p.wrapHeight = p.height;

    // Stores some nice colour options to pick from.
    p.colorCollections[0] = new ColorCollection( p.color('#e2d810'), p.color('#d9138a'), p.color('#12a4d9'), 0.33, 0.33, 0.33 );
    p.colorCollections[1] = new ColorCollection( p.color('#fff0e1'), p.color('#ff6e53'), p.color('#ffc13b'), 0.10, 0.45, 0.45 );
    p.colorCollections[2] = new ColorCollection( p.color('#4eff5d'), p.color('#d9f8b1'), p.color('#1b6535'), 0.45, 0.15, 0.40 );
    p.colorCollections[3] = new ColorCollection( p.color('#e75874,'), p.color('#be1558'), p.color('#fbcbc9'), 0.10, 0.80, 0.10 );
    p.colorCollections[4] = new ColorCollection( p.color('#8a307f'), p.color('#4493ff'), p.color('#ff48a7'), 0.15, 0.70, 0.15 );
    p.colorCollections[5] = new ColorCollection( p.color('#fbcbc9'), p.color('#ffea04'), p.color('#f33ca4'), 0.20, 0.35, 0.45 );
    p.colorCollections[6] = new ColorCollection( p.color('#ffb312'), p.color('#85cfb4'), p.color('#ed186b'), 0.33, 0.33, 0.33 );
    p.colorCollections[7] = new ColorCollection( p.color('#eecce7'), p.color('#33f2dc'), p.color('#55b7d2'), 0.20, 0.40, 0.40 );
    p.colorCollections[8] = new ColorCollection( p.color('#79cbb8'), p.color('#500472'), p.color('#ddcb1c'), 0.33, 0.33, 0.33 );
    p.colorCollections[9] = new ColorCollection( p.color('#1fbfb8'), p.color('#11587e'), p.color('#1978a5'), 0.33, 0.33, 0.33 );
    p.colorCollections[10] = new ColorCollection( p.color('#da000f'), p.color('#ff7e00'), p.color('#ffd800'), 0.33, 0.33, 0.33 );
    p.colorCollections[11] = new ColorCollection( p.color('#1b2d34'), p.color('#00ffda'), p.color('#ffca00'), 0.33, 0.33, 0.33 );

    // hee hee.
    p.loneMessages[0] = "Like a spider";
    p.loneMessages[1] = "such as a monk";
    p.loneMessages[2] = "much like the moon";
    p.loneMessages[3] = "deep";
    p.loneMessages[4] = "hope you're having a nice time";

    if (p.socket){
      p.socket.on('onJoin', p.onJoin);  // Tell the server our deets.
      p.socket.on('whatsyourinfo', p.whatsmyinfo);  // Tell the server our deets.
      p.socket.on('updateUsers', p.updateUsers);  // Tell the server our deets.
      p.socket.on('matched', p.matched);              // Lets us know we've been matched
      p.socket.on('aNewBoid', p.otherUserDraws);      // When a boid from our partner arrives
      p.socket.on('theyResized', p.theyResized);          // Lets us know we've been unmatched (the other person left)
      p.socket.on('unMatched', p.unmatched);          // Lets us know we've been unmatched (the other person left)
      p.socket.on('goodbye', p.goodbye);          // Other person sent a goodbye
    }

  };

  p.goodbye = (data) =>{
    console.log("goodbye!");
    p.drawGoodbye = true;
  }

  p.onJoin = (data) =>{
    if (data.numPairingUsers == 1){
      $("#currentUsers").html("There is currently "+ data.numPairingUsers + " other user here that you could be paired with.");
    }
    else{
      $("#currentUsers").html("There are currently "+ data.numPairingUsers + " other users here that you could be paired with.");
    }
  }

  p.unmatched = (data) =>{
    console.log("Unmatched :(");
    let randomNumber = p.random(0,1);   // to pick a lone message
    for (let i = 0; i<=p.loneMessages.length;i++){
      if (randomNumber<=1/p.loneMessages.length*(i+1)){
        $("#infoContent").html("Partner left.<br>Finding you a new friend...");
        break;
      }
    }
    p.wrapWidth = p.width; // set the wrap with back to our own
    p.wrapHeight = p.height;
    p.matched = false;
    gtag('event', "Unpairing", {
      'event_category': "Flock",
      'event_label': p.pairCounter
    });

    p.matchState = "searching";
  }

  p.updateUsers = (data) => {
    p.numUsers = data.numUsers;
  }

  p.matched = (data) =>{
     console.log("I am: " + data.whoami);
     console.log("My id is: " + data.myid);
     console.log("Matched with: " + data.partnerID);
     p.pairCounter++;
     gtag('event', "Pairing", {
       'event_category': "Flock",
       'event_label': p.pairCounter
     });

     $("#infoContent").html("You're paired up - " + data.message);
     p.otherWidth = data.partnerWidth;    // map up the screen widths
     p.otherHeight = data.partnerHeight;
     if (p.otherWidth > p.width){
       p.wrapWidth = p.otherWidth;
     }
     if (p.otherHeight > p.height){
       p.wrapHeight = p.otherHeight;
     }
     p.matched = true;
     p.otherUser = data.partnerID;
     p.matchState = "paired";
  }

  p.passResize = (data) =>{
    p.otherWidth = data.newWidth;    // map up the screen widths
    p.otherHeight = data.newHeight;
    if (p.otherWidth > p.width){
      p.wrapWidth = p.otherWidth;
    }
    if (p.otherHeight > p.height){
      p.wrapHeight = p.otherHeight;
    }
  }

  p.whatsmyinfo = (data) =>{
    p.numUsers = data.numUsers;
    if (p.numUsers == 1){
      $('#userCount').html("You're the only person here right now.");
    }
    else{
      $('#userCount').html("There are currently " + p.numUsers + " people here.");
    }

    sendData = {
      room : "flock",
      width : p.width,
      height : p.height
    }
    p.socket.emit('flockMatchMe', sendData);
  }

  p.otherUserDraws = (data) =>{
    console.log("other person drawing");
    if ( p.boids.length < p.maxBoids){
      let xposition = p.map(data.x, 0, p.otherWidth, 0, p.width);   // mapped to other user's screensize
      let yposition = p.map(data.y, 0, p.otherHeight, 0, p.height);
      

      var newBoid = new Boid(xposition, yposition, data.xoff, data.yoff, data.speed, data.directionx, data.directiony, data.diameter,
                                data.maxDiameter, data.hue, data.sat, data.bri, data.wiggleAmt);
      p.boids.push(newBoid);    // other user boids get added to the same array as this user's boids.
      p.id++;
    }
  }

  /*p.keyPressed = () => {
    console.log("Separation Weight: " + p.separationSlider.value());
    console.log("Alignment Weight:  " + p.alignSlider.value());
    console.log("Cohesion Weight:   " + p.cohesionSlider.value());
    console.log("Separation Dist:   " + p.separationDistanceSlider.value());
    console.log("Force Strength:    " + p.forceSlider.value());
  }*/

  p.draw = () => {
    p.blendMode(p.BLEND);
    //p.textFont(myFont, 20);
    //p.clear();
    //p.blendMode(p.ADD);

 
    p.fill(0,0,5,60);



    p.rect(0,0,p.width,p.height);

    // for(let i = 0; i < p.height; i+=10){
    //   let brightness = p.map(i, 0, p.height, 20, 0);
    //   p.fill(200,30,brightness,60);
    //   p.rect(0,i,p.width,10);
    // }
    

    if(p.debugMode){
      if (p.frameCount % 5 == 0){
        p.frameRateLerp = p.lerp(p.frameRateLerp, p.frameRate(), 1.0);
      }
      p.fill(0,0,0);
      p.rect(80,0,40,90);
      p.fill(0,0,100);
      p.textSize(50);
      p.text(p.int(p.frameRateLerp), 230, 200);
      p.textSize(20);

      p.text("framerate:", 85, 200);
    }


    // Decide how many boids we should allow, based on frame rate.
      if (p.frameRate() < 20){
        p.maxBoids = p.lerp(p.maxBoids, p.lowMaxBoids, 0.8);
        //console.log("under 20");
      }
      if (p.frameRate() < 30){
        p.maxBoids = p.lerp(p.maxBoids, p.lowMaxBoids, 0.65);
        //console.log("under 20");
      }
      if (p.frameRate() < 40){
        p.maxBoids = p.lerp(p.maxBoids, p.lowMaxBoids, 0.6);
        //console.log("under 40");
      }
      else if (p.frameRate() > 55){
        p.maxBoids = p.lerp(p.maxBoids, p.topMaxBoids, 0.6);
      }
      else{
        p.maxBoids = p.lerp(p.maxBoids, p.map(p.frameRate(), 40, 55, p.lowMaxBoids, p.topMaxBoids), 0.5);
      }



    if(p.debugMode){
      p.textSize(20);
      p.text("max bubbles:", 85, 280);
      p.text("current bubbles:", 85, 360);

      p.textSize(50);
      p.text( p.int(p.maxBoids), 230, 280);
      p.text( p.boids.length, 230, 360);
    }

    if (p.mouseIsPressed){
      if (p.idleCounting){
        p.idleCounting = false;
        $("#idleWarning").css("display", "none");
      }
      p.idleMillis = p.millis();
      if(p.dragLength == 0){
        //new drag
        p.drawCounter++;

        if (p.drawCounter == 1){
          gtag('event', "First Draw", {
            'event_category': "Flock",
            'event_label': p.drawCounter
          });
        }
        if (p.drawCounter == 5){
          gtag('event', "Draw counter", {
            'event_category': "Flock",
            'event_label': p.drawCounter
          });
        }
        if (p.drawCounter == 10){
          gtag('event', "Draw counter", {
            'event_category': "Flock",
            'event_label': p.drawCounter
          });
        }
        if (p.drawCounter == 30){
          gtag('event', "Draw counter", {
            'event_category': "Flock",
            'event_label': p.drawCounter
          });
        }
        else if (p.drawCounter % 50 == 0){
          gtag('event', "Draw counter", {
            'event_category': "Flock",
            'event_label': p.drawCounter
          });
        }
      }
      else{
        if(p.boids.length < p.maxBoids){     // only add boids if we're not at max already

          // Map the mouse direction to a reasonable amount - unneccessary because the max speed controls this anyway.
           p.mouseDirection = p.createVector(p.map(p.mouseX - p.previousMouseX, p.mouseSpeedMin, p.mouseSpeedMax, p.minInitialSpeed, p.initialSpeed),
                                            p.map(p.mouseY - p.previousMouseY, p.mouseSpeedMin, p.mouseSpeedMax, p.minInitialSpeed, p.initialSpeed)
                                            );

          // Figure out the mouse direction
          //p.mouseDirection = p.createVector(p.mouseX - p.previousMouseX,
          //                                  p.mouseY - p.previousMouseY
          //                                  );

          for (var i = 0; i < p.duplicates; i++){
            // choosing a colour
            p.probability = p.random(0,1);
            let tempHue;
            let tempSat;
            let tempBri;

            if (p.probability<= p.colorCollections[p.colorChoice].pA){
              tempHue = p.random(p.hue(p.colorCollections[p.colorChoice].colorA)-p.colorJitter, p.hue(p.colorCollections[p.colorChoice].colorA)+p.colorJitter) %360;
              tempSat = p.saturation(p.colorCollections[p.colorChoice].colorA);
              tempBri = p.brightness(p.colorCollections[p.colorChoice].colorA);

            }
            else if (p.probability <= p.colorCollections[p.colorChoice].pB){
              tempHue = p.random(p.hue(p.colorCollections[p.colorChoice].colorB)-p.colorJitter, p.hue(p.colorCollections[p.colorChoice].colorB)+p.colorJitter) %360;
              tempSat = p.saturation(p.colorCollections[p.colorChoice].colorB);
              tempBri = p.brightness(p.colorCollections[p.colorChoice].colorB);
            }
            else{
              tempHue = p.random(p.hue(p.colorCollections[p.colorChoice].colorC)-p.colorJitter, p.hue(p.colorCollections[p.colorChoice].colorC)+p.colorJitter) %360;
              tempSat = p.saturation(p.colorCollections[p.colorChoice].colorC);
              tempBri = p.brightness(p.colorCollections[p.colorChoice].colorC);
            }

            let ns = p.random(p.noiseSpeed.min, p.noiseSpeed.max);
            let wiggleAmt = p.random(p.wiggleAmount.min, p.wiggleAmount.max);

            var newBoid = new Boid(p.random(p.mouseX - p.spawnRandomness, p.mouseX + p.spawnRandomness), // pos x
                                p.random(p.mouseY - p.spawnRandomness, p.mouseY + p.spawnRandomness),    // pos y
                                p.random(0,1000), p.random(0,1000), ns,                                // xoff yoff noiseSpeed
                                p.mouseDirection.x, p.mouseDirection.y,                                  // velocity
                                5, p.random(p.minSize,p.maxSize),                                        // diameter maxdiameter
                                tempHue, tempSat, tempBri, 
                                wiggleAmt
                              );                                              // hue sat bri

            p.id++;

            // add new boid to the array
            p.boids.push(newBoid);

            // if we have a buddy
            if (p.matched){
              // make a data packet of this boid's info
              var data = {
                x : newBoid.position.x,
                y : newBoid.position.y,
                xoff : newBoid.xoff,
                yoff : newBoid.yoff,
                speed : newBoid.speed,
                directionx : newBoid.velocity.x,
                directiony : newBoid.velocity.y,
                diameter : newBoid.diameter,
                maxDiameter : newBoid.maxDiameter,
                hue : newBoid.hue,
                sat : newBoid.sat,
                bri : newBoid.bri,
                otherUser: p.otherUser

              }
              // send it
              if (p.socket){
                p.socket.emit('aNewBoid', data);
              }

            }
          }
        }
      }
      p.dragLength++;
    }

    else{
      p.dragLength = 0;
    }


    for (var i = p.boids.length; i > 0; i--){
      // if the boid has shrunk under a certain size, delete it
      if (p.boids[i-1].diameter < 0 && p.boids[i-1].diameterGrowing == false){
        p.boids.splice(i-1,1);
      }
      // if the boid is off screen, delete it
      //  else if(p.boids[i-1].position.x < 0 || p.boids[i-1].position.x > p.theWidth || p.boids[i-1].position.y < 0 || p.boids[i-1].position.y > p.theHeight){
      //  p.boids.splice(i-1,1);
      //}
    }

    if (p.boids.length > p.maxBoids){
      let overage = (p.boids.length - p.maxBoids)/2;
      for (let i = 0; i< overage; i++){
        p.boids[i].murder=true;
      }
    }

    for (let boid of p.boids){
      boid.flock(p.boids);    // flocking behaviour
    }
    for(let boid of p.boids){
      boid.update();
      boid.noiseWiggle();     // wiggles!
      boid.growAndShrink();     // other updates (diameter)
      boid.createPath();
    }

    for (var i = 0; i < p.boids.length; i++){
      p.boids[i].display();   // draw boids
    }

    // for measuring mouse direction
    p.previousMouseX = p.mouseX;
    p.previousMouseY = p.mouseY;

    if (p.drawGoodbye){
      let top = p.drawGoodbyeCount + "vh";
      let opacity = p.drawGoodbyeCount/100 - 0.1;
      $("#goodbye").css("top", top);
      $("#goodbye").css("opacity", opacity);

      p.drawGoodbyeCount*=0.991;
      if (p.drawGoodbyeCount < 10){
        p.drawGoodbye = false;
        p.drawGoodbyeCount = 100;
        $("#goodbye").css("top", "100vh");
      }
    }


    if (p.drawMyGoodbye){
      let top = p.drawMyGoodbyeCount + "vh";
      let opacity = p.drawMyGoodbyeCount/100 - 0.1;
      $("#myGoodbye").css("top", top);
      $("#myGoodbye").css("opacity", opacity);

      p.drawMyGoodbyeCount*=0.991;
      if (p.drawMyGoodbyeCount < 10){
        p.drawMyGoodbye = false;
        p.drawMyGoodbyeCount = 100;
        $("#myGoodbye").css("top", "100vh");
      }
    }


    if (ps.matchState == "searching" | ps.matchState == "paired"){
      if (p.millis() > p.idleMillis + 60000 ){
        sendData = {
          state : "idle",
          choice: "went idle"
        }
        if (ps.socket)ps.socket.emit('playSolo', sendData);

        $("#idleWarningContent").html("You have been unpaired due lack of activity. Use the menu above to reconnect");
        p.matchState = "idle";
        p.matched = false;

        gtag('event', "Idle", {
          'event_category': "Flock",
          'event_label': "Idle"
        });

        p.idleCounting = false;

        for (let i = 0; i<ps.loneMessages.length;i++){
          let randomNumber = ps.random(0,1);   // to pick a lone message
          if (randomNumber<=1/ps.loneMessages.length*(i+1)){
            $("#infoContent").html("You're playing solo - " + ps.loneMessages[i]);
            break;
          }
        }

      }

      else if (p.millis() > p.idleMillis + 120000){
        p.idleCounting = true;
        $("#idleWarning").css("display", "table");
        let seconds = 60 - (p.int((p.millis() - p.idleMillis) / 1000));

        $("#idleWarningContent").html("You will be disconnected if you do not draw in the next " + seconds + " seconds");
      }
    }



  };


  class Boid{
    constructor(x, y, xoff, yoff, speed, dx, dy, diameter, maxDiameter, hue, sat, bri, wiggleAmt){
      this.position = p.createVector(x,y);       // mouseposition
      //this.position = p.createVector(p.random(p.width), p.random(p.height));
      this.velocity = p.createVector(dx,dy);      // velocity = mouse direction
      this.velocity.limit(p.startSpeed);
      this.acceleration = p.createVector(0,0);    // acceleration = zero
      this.xoff = xoff;     // for noise wiggle
      this.yoff = yoff;     // for noise wiggle
      this.speed = speed;   // for noise wiggle
      this.diameter = diameter;
      this.diameterGrowing = true;
      this.maxDiameter = maxDiameter;
      this.hue = hue;
      this.sat = sat;
      this.bri = bri;
      this.maxAlpha = p.random(40, 80);
      this.alpha = 0;
      this.murder = false;

      this.wiggle = wiggleAmt;  // max pixels the noise can map to

      this.maxSpeed = 5;          // for flocking
      this.ultimateMaxSpeed = 30; // for flocking
      this.maxForce = p.forceAmount;      // for flocking
      this.force = 0;

      this.id = p.id;

      this.noiseCenter = {
        x: p.random(999),
        y: p.random(999),
      }

      this.mode = p.random();

      this.pointAngle = 0;
      this.spinSpeed = p.random(.5, 4);
      this.noiseZ = p.random(999);

      if (p.random()<0.5) this.spinSpeed = -this.spinSpeed;

      this.createPath();
  	}

    createPath(){
      this.path = [];

      let numPoints = 100;
      let angleGap = 360/numPoints;

      for(let i =0; i < numPoints; i++){
        let angle = i * angleGap;

        let np = {
          x: this.noiseCenter.x + p.cos(angle) * .3,
          y: this.noiseCenter.y + p.sin(angle) * .3,
          angle: angle
        }

        let n = p.noise(np.x, np.y, this.noiseZ);

        let diameter = this.diameter + p.map(n, 0, 1, -this.diameter*0.5, this.diameter*1.1);


        let x = this.position.x + p.cos(angle + this.pointAngle) * diameter;
        let y = this.position.y + p.sin(angle + this.pointAngle) * diameter;
        
        this.path.push(p.createVector(x, y));
      }

      this.pointAngle += this.spinSpeed;
      this.noiseZ += 0.03;

      if (this.alpha < this.maxAlpha) this.alpha += 5;

    }

    flock(boids){

      let alignSteer = p.createVector();
      let cohesionSteer = p.createVector();
      let separationSteer = p.createVector();

      let closeCount = 0;
      let separationCloseCount = 0;

      for (let other of boids){
        if (other!=this){
          let d = p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
          if (d < p.perceptionRadius){
            alignSteer.add(other.velocity);
            cohesionSteer.add(other.position);
            closeCount++;
          }
          if (d < p.separationDistanceAmount){
            let diff = p.createVector(this.position.x, this.position.y);
            diff = diff.sub(other.position);
            if (d > 0){
              diff.div(d);
            }
            separationSteer.add(diff);
            separationCloseCount++;
          }
        }
      }
      if (closeCount > 0){
        alignSteer.div(closeCount);
        alignSteer.setMag(this.maxSpeed);
        alignSteer.sub(this.velocity);
        alignSteer.limit(this.force);

        cohesionSteer.div(closeCount);
        cohesionSteer.sub(this.position);
        cohesionSteer.setMag(this.maxSpeed);
        cohesionSteer.sub(this.velocity);
        cohesionSteer.limit(this.force);
      }
      if (separationCloseCount > 0){
        separationSteer.div(separationCloseCount);
        separationSteer.setMag(this.maxSpeed);
        separationSteer.sub(this.velocity);
        separationSteer.limit(this.force);
      }

      alignSteer.mult(p.alignAmount);
      cohesionSteer.mult(p.cohesionAmount);
      separationSteer.mult(p.separationAmount);

      this.acceleration.add(alignSteer);
      this.acceleration.add(cohesionSteer);
      this.acceleration.add(separationSteer);
    }

    noiseWiggle(){
      let xforce = p.map(p.noise(this.xoff), 0, 1, 0-this.wiggle, this.wiggle);
      let yforce = p.map(p.noise(this.yoff), 0, 1, 0-this.wiggle, this.wiggle);
      let wiggleForce = p.createVector(xforce,yforce);
      this.position.add(wiggleForce);

      // Wiggle
      this.xoff += this.speed;
      this.yoff += this.speed;
    }


    update(){
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.ultimateMaxSpeed);
      this.acceleration.set(0,0);

      if (this.force < this.maxForce){
        this.force+=0.002;
      }


    }




    growAndShrink(){
      // Wrap around
      if (this.position.x > (p.width + 10)){
        this.position.x = -10;
        this.diameter -= 8;
      }
      else if (this.position.x < -10){
        this.position.x = p.width+10;
        this.diameter -= 8;
      }
      if (this.position.y > (p.height+ 10)){
        this.position.y = -10;
        this.diameter -= 8;
       }
      else if (this.position.y < -10){
        this.position.y = p.height+10;
        this.diameter -= 8;
       }

      //change size
      if (this.diameterGrowing){
        this.diameter += 2;
      }
      else{
        if (this.diameter > p.deleteDiameter){
          this.diameter -= 0.1;
        }
        else{
          this.diameter -= 2;
        }
        if (this.murder == true){
          this.diameter -=2;
        }
      }

      if (this.diameter > this.maxDiameter){
        this.diameterGrowing = false;
      }
  	}

  	display(){
      if (this.diameter <.5) return;

      p.fill(this.hue, this.sat, this.bri, this.alpha);
  		//p.ellipse(this.position.x, this.position.y, this.diameter, this.diameter);

      p.beginShape();
      for(let i = 0; i < this.path.length; i++){
        p.vertex(this.path[i].x, this.path[i].y);
      }
      p.endShape();
  	}
  }

  class ColorCollection{
    constructor(a, b, c, pa, pb, pc){
      this.colorA = a;
      this.colorB = b;
      this.colorC = c;
      this.pA = pa;
      this.pB = pa+pb;
      this.pC = pa+pb+pc;
    }
  }
}



var ps = new p5(pewpewSketch);

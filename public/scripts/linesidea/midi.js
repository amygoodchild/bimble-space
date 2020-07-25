
$(document).ready(function(){


  var color1 = true;
  var color2 = false;
  var bgcolor = false;
  var timer;

  if (navigator.requestMIDIAccess) {
      console.log('This browser supports WebMIDI!');
  } else {
      console.log('WebMIDI is not supported in this browser.');
  }

  navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

  function onMIDISuccess(midiAccess) {
    console.log(midiAccess);

    var inputs = midiAccess.inputs;

    for (var input of midiAccess.inputs.values()){
      input.onmidimessage = getMIDIMessage;
    }
  }

  function getMIDIMessage(midiMessage) {
    //console.log(midiMessage.data[1] + " : " + midiMessage.data[2]);
    //document.getElementById('midiValue').innerHTML = midiMessage.data[1];

    if (midiMessage.data[1] == 58 && midiMessage.data[2] == 127){
      ps.theNoiseSeed = ps.int(ps.random(0,1200));
      $("#randomizeNoiseSeed").val(ps.theNoiseSeed);

      if(ps.autoLayer){ ps.newLayer(); }
      if(ps.autoNew){ ps.totallyNew(); }
    }


    if (midiMessage.data[1] == 59 && midiMessage.data[2] == 127){
      ps.seeder = ps.int(ps.random(0,1000));
      $("#randomizeSeedStart").val(ps.seeder);

      if(ps.autoLayer){ ps.newLayer(); }
      if(ps.autoNew){ ps.totallyNew(); }
    }

    if (midiMessage.data[1] == 43){
      ps.alternate = true;
    }
    if (midiMessage.data[1] == 44){
      ps.alternate = false;
    }
    if (midiMessage.data[1] == 41 && midiMessage.data[2] == 127){
      ps.totallyNew();
    }
    if (midiMessage.data[1] == 45 && midiMessage.data[2] == 127){
      ps.totallyNewColor();
    }

    if (midiMessage.data[1] == 16){
      let newValue = ps.map(midiMessage.data[2], 0, 127, 0, 0.5);
      $("#seedStartStep").val(newValue);
      ps.maxSeedStepTarget = newValue;
    }


    if (midiMessage.data[1] == 17){
      let newValue = ps.int(ps.map(midiMessage.data[2], 0, 127, 1, 500));
      $("#numLines").val(newValue);
      ps.numLinesTarget = newValue;
    }

    if (midiMessage.data[1] == 18){
      let newValue = ps.int(ps.map(midiMessage.data[2], 0, 127, 1, 40));
      $("#thickness").val(newValue);
      ps.thickness = newValue;
      ps.strokeWeight(ps.thickness);
    }

    if (midiMessage.data[1] == 19){
      let newValue = ps.int(ps.map(midiMessage.data[2], 0, 127, 1, 100));
      $("#yResolution").val(newValue);
      ps.yResolutionTarget = newValue;
    }

    if (midiMessage.data[1] == 20){
      let newValue = ps.map(midiMessage.data[2], 0, 127, 0, 0.8);
      $("#noiseChange").val(newValue);
      ps.noiseChangeTarget = newValue;
    }

    if (midiMessage.data[1] == 21){
      let newValue = ps.int(ps.map(midiMessage.data[2], 0, 127, 10, -300));
      $("#wiggleLeft").val(newValue);
      ps.wiggleLeftTarget = newValue;
    }

    if (midiMessage.data[1] == 22){
      let newValue = ps.int(ps.map(midiMessage.data[2], 0, 127, -10, 300));
      $("#wiggleRight").val(newValue);
      ps.wiggleRightTarget = newValue;
    }

    if (midiMessage.data[1] == 23){
      let newValue = ps.map(midiMessage.data[2], 0, 127, 0, 1);
      $("#lerp").val(newValue);
      ps.lerpAmountTarget = newValue;
    }

    if (midiMessage.data[1] == 32){
      color1 = true;
      color2 = false;
      bgcolor = false;
    }

    if (midiMessage.data[1] == 48){
      color1 = false;
      color2 = true;
      bgcolor = false;
    }

    if (midiMessage.data[1] == 64 && midiMessage.data[2] == 127){
      timer = ps.millis();
    }

    if (midiMessage.data[1] == 64 && midiMessage.data[2] == 0){

      if (ps.millis() > timer + 2000){
        console.log("longpress");
        ps.bgHue = ps.minHue2;
        ps.bgSat = ps.sat2;
        ps.bgBri = ps.bri2-20;
        ps.bgOpa = 0.3;
        color1 = false;
        color2 = false;
        bgcolor = true;
      }
      else{
        console.log("shortpress");
        color1 = false;
        color2 = false;
        bgcolor = true;
      }

    }

    if (midiMessage.data[1] == 0){
      let newValue = ps.int(ps.map(midiMessage.data[2], 0, 127, 0, 360));

      if (color1){
        $("#hueFrom1").val(newValue);
        ps.minHue1 = newValue;
      }
      else if (color2){
        $("#hueFrom2").val(newValue);
        ps.minHue2 = newValue;
      }
      else if (bgcolor){
        //$("#hueFrom2").val(newValue);
        ps.bgHue = newValue;
      }
    }

    if (midiMessage.data[1] == 1){
      let newValue = ps.int(ps.map(midiMessage.data[2], 0, 127, 0, 360));

      if (color1){
        $("#hueTo1").val(newValue);
        ps.maxHue1 = newValue;
      }
      else if (color2){
        $("#hueTo2").val(newValue);
        ps.maxHue2 = newValue;
      }
      else if (bgcolor){
        //$("#hueFrom2").val(newValue);
        ps.bgHue = newValue;
      }
    }

    if (midiMessage.data[1] == 2){
      let newValue = ps.int(ps.map(midiMessage.data[2], 0, 127, 0, 100));

      if (color1){
        $("#sat1").val(newValue);
        ps.sat1 = newValue;
      }
      else if (color2){
        $("#sat2").val(newValue);
        ps.sat2 = newValue;
      }
      else if (bgcolor){
        //$("#hueFrom2").val(newValue);
        ps.bgSat = newValue;
      }
    }


    if (midiMessage.data[1] == 3){
      let newValue = ps.int(ps.map(midiMessage.data[2], 0, 127, 0, 100));

      if (color1){
        $("#bri1").val(newValue);
        ps.bri1 = newValue;
      }
      else if (color2){
        $("#bri2").val(newValue);
        ps.bri2 = newValue;
      }
      else if (bgcolor){
        //$("#hueFrom2").val(newValue);
        ps.bgBri = newValue;
      }
    }

    if (midiMessage.data[1] == 4){
      let newValue;

      if (midiMessage.data[2] < 64){
        newValue = ps.int(ps.map(midiMessage.data[2], 0, 63, 0, 5));
      }
      else{
        newValue = ps.int(ps.map(midiMessage.data[2], 64, 127, 6, 100));
      }

      if (color1){
        $("#opa1").val(newValue);
        ps.opa1 = newValue;
      }
      else if (color2){
        $("#opa2").val(newValue);
        ps.opa2 = newValue;
      }
      else if (bgcolor){
        //$("#hueFrom2").val(newValue);
        ps.bgOpa = newValue;
      }
    }



    if (midiMessage.data[1] == 5){
      let newValue = ps.map(midiMessage.data[2], 0, 127, 0, 0.03);
      ps.noiseSeedDistanceTarget = newValue;
      //console.log(newValue);
    }

    if (midiMessage.data[1] == 6){
      let newValue = ps.map(midiMessage.data[2], 0, 127, 0, 0.01);
      ps.seedDistanceSeedChangeTarget = newValue;
      //console.log(newValue);
    }



    if (midiMessage.data[1] == 7){
      let newValue = ps.map(midiMessage.data[2], 0, 127, 0, 1);
      ps.targetLerp = newValue;
      //console.log(newValue);
    }

  }


  function onMIDIFailure() {
      console.log('Could not access your MIDI devices.');
  }







});

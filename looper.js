window.setup = function(){}; //p5 doees not seem to initialize unless there"s a global setup method
$(function() {
    "use strict"

    var tracksList = $("[id=tracks]");
    var trackTemplate = $("[id=track-template]");
    var mic = new p5.AudioIn();
    mic.start();

    var createNewControlsHtml = function(setupControls) {
        var templateContents = trackTemplate.prop("content");
        var controlsHtml = document.importNode( templateContents, true); //clone contents

        var offset = 0;
        var isPaused = false;

        var soundFile;
        var recorder = new p5.SoundRecorder();
        recorder.setInput(mic);

        var startRecording = function() {
          if(!mic.enabled) {
            alert("You have to enable the microphone first!")
          } else {
            if(soundFile) {
              soundFile.stop();
              soundFile.disconnect();
            }
            soundFile = new p5.SoundFile();
            recorder.record(soundFile);
          }
        };

        var stopRecording = function() {
          recorder.stop(); // sends the result to the soundFile
        };
        var startPlayLoop = function() {
          isPaused = false;
          playLoop();
        };
        var playLoop = function() {
          if(isPaused) {
            return;
          }
          soundFile.play();
          window.setTimeout(playLoop, soundFile.duration() * 1000 + offset);
        }
        var pause = function() {
          isPaused = true;
          soundFile.pause();
        };
        var setRate = function(newRate) {
          soundFile.rate(newRate);
        };
        var setVolume = function(newVolume) {
          soundFile.setVolume(window.parseInt(newVolume)); //makes strings such as "123" become numbers 123
        };
        var setOffset = function(newOffset) {
          offset = window.parseInt(newOffset);
        }

        var controls = {
          startRecording: startRecording,
          stopRecording: stopRecording,
          playLoop: startPlayLoop,
          pause: pause,
          setRate: setRate,
          setVolume: setVolume,
          setOffset: setOffset,
        };

        setupControls( controls, controlsHtml );

        tracksList.append(controlsHtml);
    }

    var disable = function() {
      $.makeArray(arguments).forEach(function(item){
        $(item).prop("disabled", true);
      });
    };
    var enable = function() {
      $.makeArray(arguments).forEach(function(item){
        $(item).prop("disabled", false);
      });
    };

    window.looper = {
        // Create a new set of HTML controls
        // Example:
        //   var newContainer = looper.createNewControlsHtml();
        createNewControlsHtml: createNewControlsHtml,
        // Enable a bunch of buttons and controls all at once
        // Example:
        //   looper.enable(control1, button1, button2);
        enable: enable,
        // Disable a bunch of buttons and controls all at once
        // Example:
        //   looper.disable(control1, button1, button2);
        disable: disable,
    };
});

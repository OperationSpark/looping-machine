window.setup = function(){}; //p5 doees not seem to initialize unless there"s a global setup method
$(function() {
    "use strict"

    var tracksList = $("[id=tracks]");
    var trackTemplate = $("[id=track-template]");
    var mic = new p5.AudioIn();
    mic.start();

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

    var createNewControlsHtml = function(setupControls) {
        if(!setupControls || !setupControls.call) {
          throw new Error("createNewControlsHtml must have one parameter and it must be a function");
        }
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

        var audioControls = {
          // Start recording. Erases old recording on this track if one exists
          // Example:
          //  audioControls.startRecording();
          startRecording: startRecording,
          // Stop current recording and get ready for playing.
          // Example:
          //  audioControls.stopRecording();
          stopRecording: stopRecording,
          // Start to play noice in a loop. It will have the current rate
          // offset and volume.
          // Example:
          //  audioControls.playLoop();
          playLoop: startPlayLoop,
          // Pause the current track
          // Example:
          //  audioControls.pause();
          pause: pause,
          // Set the current speed at which the track plays. Doing so changes pitch.
          // Example:
          //  audioControls.setRate(1);
          setRate: setRate,
          // Set the current volume at which the track plays.
          // Example:
          //  audioControls.setVolume(2);
          setVolume: setVolume,
          // Set the time to wait before looping this track in thousands of a second (1000 is 1 second).
          // Example:
          //  audioControls.setOffset(2000);
          setOffset: setOffset,
        };

        setupControls( audioControls, controlsHtml );

        tracksList.append(controlsHtml);
    }

    window.looper = {
        // Create a new set of HTML controls by cloning the id="track-template" template on the page.
        // The first parameter should be a function. This function will be called
        // just before the html for the new control is placed on the page. Use it
        // to set up what happens when things are clicked or changed. Recieves two parameters
        //    * audioControls - simplified audio controls with methods for starting, stoping
        //                      recording, playing loops, setting volume, etc.
        //                      for more info see documentation above for audioControls object
        //    * controlsHtml - the html for the new controls. Use this to find any  buttons
        // Example:
        //   var newContainer = looper.createNewControlsHtml(function(audioControls, controlsHtml){
        //     ...set up any click handlers here...
        //   });
        createNewControlsHtml: createNewControlsHtml,
        // Enable a bunch of buttons and controls all at once.
        // Example:
        //   looper.enable(control1, button1, button2);
        enable: enable,
        // Disable a bunch of buttons and controls all at once.
        // Example:
        //   looper.disable(control1, button1, button2);
        disable: disable,
    };
});

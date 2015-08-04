window.setup = function(){}; //p5 doees not seem to initialize unless there"s a global setup method
$(function() {
    "use strict"

    var trackTemplate = $("[id=track-template]");
    var mic = new p5.AudioIn();
    mic.start();

    var createNewControlsHtml = function() {
        var templateContents = trackTemplate.prop("content");
        return document.importNode( templateContents, true); //clone contents
    }

    var disable = function() {
      $.makeArray(arguments).map(function(item){
        $(item).prop("disabled", true);
      });
    };
    var enable = function() {
      $.makeArray(arguments).map(function(item){
        $(item).prop("disabled", false);
      });
    };

    function createControls() {
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
      }

      var stopRecording = function() {
        recorder.stop(); // sends the result to the soundFile
      }
      var playLoop = function() {
        soundFile.loop();
      }
      var pause = function() {
        soundFile.pause();
      }
      var resetRate = function() {
        var newRate = rateControl.prop("value");
        soundFile.rate(newRate);
      }
      var resetVolume = function() {
        var newVolume = +volumeControl.prop("value");
        soundFile.setVolume(newVolume);
      }

      var controls = {
        startRecording: startRecording,
        stopRecording: stopRecording,
        playLoop: playLoop,
        pause: pause,
        resetRate: resetRate,
        resetVolume: resetVolume,
      }
      return controls;
    }

    var getControlHelper = function(element) {
      var $element = $(element);
      var controls = $element.data('controls');
      if(!controls) {
        controls = createControls();
        $element.data('controls', controls);
      }
      return controls;
    }

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
        getControlHelper: getControlHelper,
    };
});

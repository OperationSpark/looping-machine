window.setup = function(){}; //p5 doees not seem to initialize unless there"s a global setup method
$(function() {
    "use strict"
    
    var trackTemplate = $("[id=track-template]");
    
    var createNewControlsHtml = function() {
        var templateContents = trackTemplate.prop("content");
        return document.importNode( templateContents, true); //clone contents 
    }
    
    window.looper = {
        // Create a new set of HTML controls
        createNewControlsHtml: createNewControlsHtml,
    };
});
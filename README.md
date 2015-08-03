Welcome to the looping machine. In this project you will use libraries to create a looping machine in your browser. When done, you'll be able to record, play back, modify, and mix together beats in your browser!

# Figure out how to record and play audio

We want to make sure that we know how to record and play back audio *before* we start messing with building an entire application around the concept. We are going to be using the [p5 library](http://p5js.org/) for this. This is simply another version of ProcessingJs (the same drawing stuff you use in Khan Academy) but with addons for working with sound.

Looking around the p5.js website, there is an example of [recording and playing back audio here](http://p5js.org/examples/examples/Sound__Record_Save_Audio.php). Look over the code in the example (also available [on github](https://github.com/processing/p5.js/blob/master/examples/addons/p5.sound/record/sketch.js) and in this project inside `p5/examples/addons/p5.sound/record/sketch.js`). Try to identify what code is necessary to

* start capturing sound from the microphone
* to play the captured audio
* to prepare the application to record audio. (For example, we need to let the system know we are going to be using the microphone so that it can ask the user to allow this.)

See if you can also figure out the answer to

* What is soundFile? How is it set?
* Do you have a theory on how you would pause a sound?
* There are three things from p5 that are being used here - `mic` (the microphone), `recorder` (to actually do the recording), and `soundFile`. Can you guess which ones you would have to duplicate if you wanted to record and play back multiple tracks at the same time?

# Get the project and run the template

Pull down the project [from Github](https://github.com/OperationSpark/looping-machine).

## On Cloud 9
If you are in Cloud 9 you can open up index.html and hit play.

## On a local computer
If you are on your own computer you will need a webserver to run it. The application comes ready with one made in node. To set it up you will need to open up the console and `cd` to this project's directory, then

* `npm install` to download everything that is required to run a server (this is a one-time thing)
* `npm start` to start the server. You will run this whenever you want to start the application. Once it is running you can open your browser to http://localhost:8283.

# Create a set of record/play controls when adding a track

  var container = looper.createNewControlsHtml();
  tracksList.append(container);

# Record audio
# Play audio

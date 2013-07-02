// Usage is simple, just call start() and stop(). And it also supports pause, play in video controller. 
// States: start, running, pause, stop

define(['jperfproto'], function(jPerfProto) {
  function VideoFPSMeter(videoElement, autoStart, iterationInterval, skipIterationNumber) {
    // Common to all meters
    var canStart = autoStart;
    var interval = iterationInterval ? iterationInterval : 1000;
    var skipNumber = skipIterationNumber ? skipIterationNumber : 3;
    var intervalID = null;
    var recentFPS;
    var averageFPS;
    var rt = new jPerfProto.RelativeTime();
    var framesIteration;
    var elapsedIteration;
    var framesTotal = 0;
    var elapsedTotal = 0;

    var reportFPS = function(eventName) {
      var event = document.createEvent("Event");
      event.initEvent(eventName, true, true); 
      event.recentFPS = recentFPS;
      event.averageFPS = averageFPS;
      document.dispatchEvent(event);
    };

    // Specific to this meter
    var running = 0;
    var displayedFrameCount = function() {
      return videoElement.webkitDecodedFrameCount - videoElement.webkitDroppedFrameCount;
    };
    var pause = function(event) {
      recentFPS = 0;
      reportFPS("VideoFPSReport");
      running = 0;
      if (intervalID)
        clearInterval(intervalID);
    };

    var playingHandler = function(event) {
      console.log(event.type);
      if (canStart)
        this.start();
    };

    var pauseHandler = function(event) {
      console.log(event.type);
      pause();
    };    

    this.start = function(event) {
      // Common to all meters
      var startTime = null;
      var skippedNumber = 0;

      // Specific to this meter
      var startFrameCount = 0;

      var startIteration = function() {
        startTime = rt.now();
        startFrameCount = displayedFrameCount();
      };

      canStart = true;
      if (videoElement.paused || videoElement.ended)
        return;

      if (!running) {
        intervalID = setInterval(
          function () {
            if (skippedNumber >= skipNumber) {
              framesIteration = displayedFrameCount() - startFrameCount;
              elapsedIteration = rt.now() - startTime;
              framesTotal += framesIteration;
              elapsedTotal += elapsedIteration;

              recentFPS = Math.round(framesIteration * 100000 / elapsedIteration) / 100;
              averageFPS = Math.round(framesTotal * 100000 / elapsedTotal) / 100;
              reportFPS("VideoFPSReport");
            } else {
              skippedNumber++;
            }

            startIteration();
          },
          interval
        );
        
        startIteration();
        running = 1;
      }
    };

    this.stop = function() {
      canStart = false;
      running = 0;
      recentFPS = 0;
      reportFPS();
      if (intervalID)
        clearInterval(intervalID);
    };

    if (!videoElement) {
      console.log("You must specify a video element");
      return;
    }
    videoElement.addEventListener("playing", playingHandler.bind(this));
    videoElement.addEventListener("pause", pauseHandler.bind(this));
  }

  jPerfProto.VideoFPSMeter = VideoFPSMeter;

  return VideoFPSMeter;

});
define(['jperfproto'], function(jPerfProto) {
  function CSSFPSMeter(autoStart, iterationInterval, skipIterationNumber) {
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
    var ref = null;
    var frames = null;
    var frameID = null;
    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;

    // Repeatedly store value of left
    var storeValue = function () {
      frameID = requestAnimationFrame(storeValue);
      var frame = parseFloat(window.getComputedStyle(ref, null).left);
      frames.push(frame);
    };

    this.start = function() {
      // Common to all meters
      var startTime = null;
      var skippedNumber = 0;

      var startIteration = function() {
        frames = [];
        startTime = rt.now();
        storeValue();
      };

      if (!ref) {
        // Create a simple CSS animation
        ref = document.createElement("div");
        ref.setAttribute('id', 'ref');
        var style = '-webkit-animation: ref 1s linear infinite; width:1px; height:1px; background:transparent; position:absolute;';
        ref.setAttribute('style', style);
        document.body.appendChild(ref);

        var keyframes = '@-webkit-keyframes ref { 0% {left:0px;} 100% {left:100px;} }';
        var s = document.createElement('style');
        s.innerHTML = keyframes;
        document.body.appendChild(s);

        // Report fps
        intervalID = setInterval(
          function () {
            cancelAnimationFrame(frameID);
            if (skippedNumber >= skipNumber) {
              framesIteration = frames.length;
              elapsedIteration = rt.now() - startTime;
              framesTotal += framesIteration;
              elapsedTotal += elapsedIteration;

              recentFPS = Math.min(Math.round(framesIteration * 100000 / elapsedIteration) / 100, 60.00);
              averageFPS = Math.min(Math.round(framesTotal * 100000 / elapsedTotal) / 100, 60.00);
              reportFPS("CSSFPSReport");

            } else {
              skippedNumber++;
            }

            startIteration();
          },
          interval);

        startIteration();
      }
    };

    this.stop = function() {
      cancelAnimationFrame(frameID);
      frameID = null;
      document.body.removeChild(ref);
      ref = null;
      clearInterval(intervalID);
    };

    if (autoStart)
      this.start();
  }

  jPerfProto.CSSFPSMeter = CSSFPSMeter;

  return CSSFPSMeter;

});
define(['jperfproto'], function(jPerfProto) {
  function Timer() {
    var startTime = 0;

    var getTime = function() {
      if (window.performance.now === undefined)
        return new Date();
      else
        return window.performance.now();
    };

    this.start = function() {
      startTime = getTime();
    };

    this.duration = function() {
        var endTime = getTime();
        return endTime - startTime;
    };
  }
  
  jPerfProto.Timer = Timer;

  return Timer;

});
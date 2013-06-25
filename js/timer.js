define(['jperfproto'], function(jPerfProto) {
  function Timer() {
    var startTime = 0;

    var getTime = function() {
      if (typeof window.performance.now == 'function')
        return window.performance.now();
      else
        return new Date();
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
define(['jperfproto'], function(jPerfProto) {
  function Timer() {
    var startTime = 0;

    this.start = function() {
      this.startTime = new Date();
    };

    this.duration = function() {
        var endTime = new Date();
        return endTime - this.startTime;
    };
  }
  
  jPerfProto.Timer = Timer;

  return Timer;

});
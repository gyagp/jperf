define(['jperfproto', 'relativetime'], function(jPerfProto, RelativeTime) {
  function Timer() {
    var startTime = 0;
    var rt = new jPerfProto.RelativeTime();

    this.start = function() {
      startTime = rt.now();
    };

    this.duration = function() {
        var endTime = rt.now();
        return endTime - startTime;
    };
  }
  
  jPerfProto.Timer = Timer;

  return Timer;

});
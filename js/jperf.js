define(['jperfproto'], function(jPerfProto) {
  var jPerf = function(){};
  jPerf.prototype = jPerfProto;
  jPerf = new jPerf();
  window.jPerf = jPerf;
  
  return jPerf;

});
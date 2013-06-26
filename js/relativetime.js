define(['jperfproto', 'singletonify'], function(jPerfProto, singletonify) {
 
  function RelativeTime() {
    var timeFunction;
    
    function callOnce() {
      function fromDate() {
        return new Date();
      }
	  
      function fromPerformance() {
        return window.performance.now();
      }
      
      if (typeof window.performance == 'object' && typeof window.performance.now == 'function')
        timeFunction = fromPerformance;
      else
        timeFunction = fromDate;
    }
  
    callOnce();
    
    this.now = function() {
      return timeFunction();
    };
  }
  
  jPerfProto.RelativeTime = RelativeTime;
  
  singletonify("RelativeTime");

  return RelativeTime;  

});
define(['jperfproto'], function(jPerfProto) {

  var global = jPerfProto;
  var singletonify = function(constructorName) {
    var constructorFunction = global[constructorName];
    var instance = null;

    global[constructorName] = function() {
      if (instance == null) {
        instance = new constructorFunction();
        instance.constructor = null;
      }
      return instance;
    };
  };
  
  return singletonify;

});
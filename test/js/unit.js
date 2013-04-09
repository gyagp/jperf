test("window.jPerf", function() {
  ok(window.jPerf, "jPerf object created");
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

test("Timer", function() {
  t = new window.jPerf.Timer()
  ok(t, "Timer is created")
  
  t.start()
  sleep(10)
  d = t.duration()
  ok(d > 0, "Timer works well")
});
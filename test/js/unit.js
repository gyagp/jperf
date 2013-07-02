function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

test("window.jPerf", function() {
  ok(window.jPerf, "jPerf object created");
});

test("RelativeTime", function() {
  rt = new jPerf.RelativeTime();
  t = rt.now();
  ok(t, "RelativeTime works well");
});

test("Timer", function() {
  t = new jPerf.Timer();
  ok(t, "Timer is created");
  
  t.start();
  sleep(10);
  d = t.duration();
  ok(d > 7 && d < 13, "Timer works well");
});

test("CSSFPSMeter", function() {
  meter = new jPerf.CSSFPSMeter();
  ok(meter, "CSSFPSMeter works well");
});

test("VideoFPSMeter", function() {
  meter = new jPerf.VideoFPSMeter();
  ok(meter, "VideoFPSMeter works well");
});

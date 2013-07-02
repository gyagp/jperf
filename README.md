jperf [![Build Status](https://secure.travis-ci.org/gyagp/jperf.png?branch=master)](http://travis-ci.org/gyagp/jperf)
=====

JavaScript library for performance measurement.


RelativeTime
-------------------
Use performance.now() to provide high resolution time.

Timer
--------
Provide a easy-to-use timer as a handy tool.

FPSMeter
-------------
CSSFPSMeter: It's not straightforward to measure the FPS of CSS transition, transform and animation, and this tool is all for your help.

VideoFPSMeter: Use specific way to report FPS of HTML5 video. 

All meters have same usage model. That is, use autoStart or start() to run the meter, use stop to stop it, and use event listener to get FPS report periodically. Either start() or stop() can be called multiple times without any side effect. See samples for more detail!

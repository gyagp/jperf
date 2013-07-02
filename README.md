jperf [![Build Status](https://secure.travis-ci.org/gyagp/jperf.png?branch=master)](http://travis-ci.org/gyagp/jperf)
=====

JavaScript library for performance measurement.


RelativeTime
-------------------
Use performance.now or Date (if the previous doesn't exist) to provide relative time. It's a singleton.

FPSMeter
-------------
CSS FPS meter: It's not straightforward to measure the FPS of CSS transition, transform and animation, and this object is all for your help.
Video FPS meter: HTML video has its own method to report the FPS number, and here you go.

All meters have same usage model. That is, use autoStart or start() to run the meter, and use stop to stop it. Either start() or stop() can be called multiple times without any side effect. As to implementation, they share similar data structures as much as possible.

jperf [![Build Status](https://secure.travis-ci.org/gyagp/jperf.png?branch=master)](http://travis-ci.org/gyagp/jperf)
=====

JavaScript library for performance measurement

FPSMeter: All meters should have same usage model. That is, use autoStart or start() to run the meter, and use stop to stop it. Either start() or stop() can be called multiple times without any side effect. As to implementation, they share similar data structures.

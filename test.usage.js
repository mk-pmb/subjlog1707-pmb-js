/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('usnam-pmb');

var equal = require('equal-pmb'), origConsLog = console.log;

(function readmeDemo() {
  //#u
  var makeLogger = require('subjlog1707-pmb'), someObj = /some regexp/ig,
    myLogger = makeLogger(someObj), cb, ar;

  equal(myLogger.subj, someObj);
  myLogger('A logger for', 'some object:', String(myLogger));

  cb = myLogger.l8r('.l8r(non-array) prepares a callback');
  cb('that logs exactly', 'its original arguments', 'and ignores these.');

  cb = myLogger.l8r([ '.l8r(array)', 'also logs' ]);
  ar = [ 'the', 'callback', 'args' ];
  ar.forEach(cb);

  console.log = makeLogger('fake console');
  myLogger.cfg({ verbose: true });
  myLogger('Verbose mode on!');
  myLogger.cfg({ verbose: false });
  myLogger('… and off again.');

  equal.lists(myLogger(), [
    [ 'A logger for', 'some object:', '[logger for /some regexp/gi]' ],
    '.l8r(non-array) prepares a callback',
    [ '.l8r(array)', 'also logs', 'the',      0, ar ],
    [ '.l8r(array)', 'also logs', 'callback', 1, ar ],
    [ '.l8r(array)', 'also logs', 'args',     2, ar ],
    'Verbose mode on!', '… and off again.',
  ]);

  equal.lists(console.log(), [
    [ '/some regexp/gi:', 'Verbose mode on!' ],
  ]);
  //#r

  console.log = origConsLog;
}());









console.log("+OK usage test passed.");    //= "+OK usage test passed."

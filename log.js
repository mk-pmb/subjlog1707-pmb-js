/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var arSlc = Array.prototype.slice;

function makeLogger(subj, initCfg) {
  function log(msg) {
    if (arguments.length === 0) { return log.entries; }
    if (arguments.length > 1) { msg = arSlc.call(arguments); }
    if (log.verbose) { console.log(String(log.subj) + ':', msg); }
    log.entries.push(msg);
    return subj;
  }
  log.toString = function () { return '[logger for ' + log.subj + ']'; };
  log.subj = subj;
  log.clear = function () {
    log.entries = [];
    return log.subj;
  };
  log.clear();
  log.cfg = function (opt) { return (Object.assign(log, opt) && log.subj); };
  log.cfg(initCfg);
  log.l8r = function (msg) {
    return function log_l8r() {
      log.apply(null, (msg === undefined ? arguments
        : (msg.push ? msg.concat(arSlc.call(arguments)) : [msg])));
      return log.subj;
    };
  };
  return log;
}



module.exports = makeLogger;

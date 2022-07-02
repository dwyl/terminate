'use strict';

var psTree = require('ps-tree'); // see: https://git.io/jBHZ
var handlePsTreeCallback = require('./handlePsTreeCallback');

/**
 * terminate is an ultra-simple way to kill all the node processes
 * by providing a process pid. It finds all child processes and shuts
 * them down too, so you don't have to worry about lingering processes.
 * @param {int} pid - the Process ID you want to terminate
 * @param {string} [signal=SIGKILL] - the signal to kill the processes
 * with.
 * @param {object} [options={}] - options object
 * @param {number} [options.pollInterval=500] - interval to poll whether pid
 * and all of the child pids have been killed.
 * @param {number} [options.timeout=5000] - max time to wait for processes to
 * exit before timing out and calling back with an error.
 * @param {function=} callback - if you want to know once the
 * procesess have been terminated, supply a callback.
 * @param {Error} error - will be null if no error occured
 * @returns {void}
 */
module.exports = function terminate (pid) {
  var i = 1;
  var signal, options, callback;

  if (!pid) {
    throw new Error('No pid supplied to Terminate!');
  }

  // extract optional arguments.  Any can be omitted, but the
  // ones present have to be in the
  if (typeof arguments[i] === 'string') {
    signal = arguments[i++];
  }
  if (typeof arguments[i] === 'object' && arguments[i]) {
    options = arguments[i++];
  }
  if (typeof arguments[i] === 'function') {
    callback = arguments[i++];
  }

  psTree(pid, function (err, children) {
    handlePsTreeCallback(
      err,
      children,
      pid,
      signal,
      options,
      callback
    );
  });
};


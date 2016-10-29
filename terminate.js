var psTree = require('ps-tree'); // see: http://git.io/jBHZ
var handlePsTreeCallback = require('./handlePsTreeCallback');

/**
 * terminate is an ultra-simple way to kill all the node processes
 * by providing a process pid. It finds all child processes and shuts
 * them down too, so you don't have to worry about lingering processes.
 * @param {int} pid - the Process ID you want to terminate
 * @param {string=SIGTERM} signal (optional) - the signal to kill the processes
 * with.
 * @param {object={}} options
 * @param {number=500} options.pollInterval - interval to poll whether pid
 * and all of the child pids have been killed.
 * @param {number=5000} options.timeout - max time to wait for processes to
 * exit before timing out and calling back with an error.
 * @param {function=} callback (optional) - if you want to know once the
 * procesess have been terminated, supply a callback.
 *   @param {Error} error - will be null if no error occured
 */
module.exports = function terminate(pid) {
  if(!pid) {
    throw new Error("No pid supplied to Terminate!")
  }

  // extract optional arguments.  Any can be omitted, but the
  // ones present have to be in the
  var i = 1;
  var signal, options, callback;
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


var psTree = require('ps-tree'); // see: http://git.io/jBHZ
var handlePsTreeCallback = require('./handlePsTreeCallback');

/**
 * terminate is an ultra-simple way to kill all the node processes
 * by providing a process.pid. It finds all child processes and shuts
 * them down too, so you don't have to worry about lingering processes.
 * @param {int} pid - the Process ID you want to terminate
 * @param {function} callback (optional) - if you want to know once the
 * procesess have been terminated, supply a callback.
 *   @param {string} error - will be null if no error occured
 *   @param {boolean} done - will be true if the operation succeeded.
 */

module.exports = function terminate(pid, callback) {
  if(!pid) {
    throw new Error("No pid supplied to Terminate!")
  }
  psTree(pid, function (err, children) {
    handlePsTreeCallback(err, children, pid, callback);
  });
};

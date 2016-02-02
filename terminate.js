var cp = require('child_process');
var psTree = require('ps-tree'); // see: http://git.io/jBHZ

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
  var signal = 'SIGKILL';
  psTree(pid, function (err, children) {
    cp.spawn('kill', ['-9'].concat(children.map(function (p) { return p.PID })))
    if(callback && typeof callback === 'function') {
      callback(err, true);
    } else { // do nothing
      console.log(children.length + " Processes Terminated!");
    }
  });
};

module.exports = function handlePsTreeCallback(
  err,
  children,
  pid,
  signal,
  options,
  callback
) {
  signal = signal || 'SIGKILL';
  options = options || {};
  callback = callback || function noop() {};
  var pollInterval = options.pollInterval || 500;
  var timeout = options.timeout;
  if (err) {
    return callback(err);
  }
  var pids = children.map(function (child) {
    return parseInt(child.PID);
  });
  pids.forEach(function (pid) {
    try {
      process.kill(pid, signal);
    } catch (error) {
      // ignore
    }
  });
  try {
    process.kill(pid, signal);
  } catch (error) {
    // don't ignore if killing the top-level process fails
    return callback(error);
  }

  pids.push(pid);

  var start = Date.now();

  function getUnterminatedProcesses() {
    var result = [];
    for (var i = 0; i < pids.length; i++) {
      var pid = pids[i];
      try {
        process.kill(pid, 0);
        // success means it's still alive
        result.push(pid);
      } catch (error) {
        // error means it's dead
      }
    }
    return result;
  }

  function poll() {
    var unterminated = getUnterminatedProcesses();
    if (!unterminated.length) {
      return callback(null);
    } else if (Date.now() + pollInterval - start > timeout) {
      return callback(new Error('timed out waiting for pids ' + unterminated.join(', ') + ' to exit'));
    } else {
      setTimeout(poll, pollInterval);
    }
  }

  setTimeout(poll, 0);
};


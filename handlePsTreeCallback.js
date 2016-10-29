module.exports = function handlePsTreeCallback(err, children, pid, callback) {
  if (err) {
    if (callback) {
      callback(err);
    }
    return;
  }
  children.forEach(function (child) {
    try {
      process.kill(parseInt(child.PID));
    } catch (error) {
      // ignore
    }
  });
  try {
    process.kill(pid, 'SIGKILL');
  } catch (error) {
    // ignore
  }
  if(callback && typeof callback === 'function') {
    callback(null, true);
  } else { // do nothing
    console.log(children.length + " Processes Terminated!");
  }
};

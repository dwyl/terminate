var cp = require('child_process');
var chalk = require('chalk');
var red = chalk.red, green = chalk.green, cyan = chalk.cyan;
var count = 0;
function child() {
  return cp.exec("node ./test/exec/child.js", function(error, stdout, stderr) {
    if (error !== null) {
      console.log(red('exec error: ' + error));
    }
  })
}
while(count < 10) {
  console.log('starting child')
  var c = child();
  console.log("child pid: "+c.pid + " | count: "+count);
  count++
}

process.on('SIGINT', function () {
  console.log('parent got SIGINT');
  if (process.env.KILL_DELAY) {
    setTimeout(function () {
      process.exit(0);
    }, parseInt(process.env.KILL_DELAY));
  } else {
    process.exit(0);
  }
});


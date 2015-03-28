var cp = require('child_process');
var chalk = require('chalk');
var red = chalk.red, green = chalk.green, cyan = chalk.cyan;
var count = 0;
function child(){
  return cp.exec("node ./test/exec/child.js", function(error, stdout, stderr) {
      // console.log('stdout: ' + stdout);
      // console.log(red('stderr: ' + stderr));
      if (error !== null) {
          console.log(red('exec error: ' + error));
      }
  })
}
while(count < 10) {
  var c = child();
  console.log("child pid: "+c.pid + " | count: "+count);
  count++
}

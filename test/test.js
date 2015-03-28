var test  = require('tape');
var chalk = require('chalk');
var red = chalk.red, green = chalk.green, cyan = chalk.cyan;
var psTree = require('ps-tree');  // see: http://git.io/jBHZ
var exec = require('child_process').exec;

var terminate = require('../terminate');

test(cyan('Spawn a Parent process which has a few Child Processes'), function (t) {
  var parent = exec("node ./test/exec/parent.js", function(error, stdout, stderr) {
    // console.log('stdout: ' + stdout);
    // console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
  })
  setTimeout(function() {
    console.log(cyan("Parent:"+parent.pid));
    // list all the child processes
    psTree(parent.pid, function(err, children) {
      // console.log(red(err));
      console.log(cyan("Children: "), children)
      t.true(children.length > 0, green("✓ There are "+children.length+" active child processes"));
    })
    setTimeout(function() {
      terminate(parent.pid, function(err, done) {
        t.equal(err, null, green("✓ No Errors"))
        t.equal(done, true, green("✓ Terminator killed all the processes"))
      })
      setTimeout(function() {
        psTree(parent.pid, function (err, children) {
          // console.log("Children: ", children, '\n');
          t.equal(children.length, 0, green("✓ No more active child processes (we killed them)"));
          t.end();
        })
      },200); // give psTree time to kill the processes
    },10); // give the child process time to spawn
  },200); // give the child process time to spawn
});

test(cyan('Attempt to terminate without providing a Parent Process ID'), function (t) {
  var errmsg = "Error: No pid supplied to Terminate!"
  try {
    terminate(); // this should throw an error
  }
  catch (e) {
    t.equal(e.toString(), errmsg, green("✓ Fails when no callback supplied (as expected)"))
    t.end();     // nothing to test
  }
});

test(cyan('Terminate a process without providing a callback'), function (t) {
  var child = exec("node ./test/exec/child.js", function(error, stdout, stderr) { });
  setTimeout(function(){
    terminate(child.pid);
    setTimeout(function() {
      psTree(child.pid, function (err, children) {
        if(err){
          console.log(err);
        }
        t.equal(children.length, 0, green("✓ No more active child processes"));
        t.end();
      });
    },1000); // give psTree time to kill the processes
  },200); // give the child process time to spawn
});

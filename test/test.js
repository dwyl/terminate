var test  = require('tape');
var clc = require("cli-color");
var red = clc.redBright, green = clc.greenBright, cyan = clc.cyanBright;
var psTree = require('ps-tree');  // see: https://git.io/jBHZ
var exec = require('child_process').exec;

var terminate = require('../terminate');
var terminate_promise = require('../promise');
var handlePsTreeCallback = require('../handlePsTreeCallback')

function assign(obj) {
  for (var i = 1; i < arguments.length; i++) {
    var vals = arguments[i]
    if (vals) {
      for (var key in vals) {
        obj[key] = vals[key]
      }
    }
  }
  return obj
}

test(cyan('kills all processes'), function (t) {
  t.plan(3);
  var parent = exec("node " + require.resolve('./exec/parent.js'), function(error, stdout, stderr) {
    if (error) {
      // this happens even during successful testing because the parent gets SIGKILLed
      console.log('exec error: ' + error);
    }
  })
  setTimeout(function() {
    console.log(cyan("Parent:" + parent.pid));
    // list all the child processes
    psTree(parent.pid, function (err, children) {
      // console.log(red(err));
      console.log(cyan("Children: "), children)
      t.true(children.length > 0, green("✓ There are " + children.length + " active child processes"));
      setTimeout(function () {
        terminate(parent.pid, function (err) {
          t.equal(err, null, green("✓ No Errors"))
        })
        setTimeout(function () {
          psTree(parent.pid, function (err, children) {
            // console.log("Children: ", children, '\n');
            t.equal(children.length, 0, green("✓ No more active child processes (we killed them)"));
          })
        }, 200); // give psTree time to kill the processes
      }, 10); // give the child process time to spawn
    });
  }, 200); // give the child process time to spawn
});

test(cyan('works with custom pollInterval'), function (t) {
  t.plan(3);
  var parent = exec("node " + require.resolve('./exec/parent.js'), function(error, stdout, stderr) {
    if (error) {
      console.log('exec error: ' + error);
    }
  })
  setTimeout(function() {
    console.log(cyan("Parent:"+parent.pid));
    // list all the child processes
    psTree(parent.pid, function(err, children) {
      // console.log(red(err));
      console.log(cyan("Children: "), children)
      t.true(children.length > 0, green("✓ There are " + children.length + " active child processes"));
      setTimeout(function () {
        terminate(parent.pid, {pollInterval: 1000}, function (err) {
          t.equal(err, null, green("✓ No Errors"))
        })
        setTimeout(function () {
          psTree(parent.pid, function (err, children) {
            // console.log("Children: ", children, '\n');
            t.equal(children.length, 0, green("✓ No more active child processes (we killed them)"));
            // t.end();
          })
        }, 200); // give psTree time to kill the processes
      }, 10); // give the child process time to spawn
    });
  },200); // give the child process time to spawn
});

test(cyan('works when process takes awhile to exit'), function (t) {
  t.plan(3);
  var parent = exec(
    "node " + require.resolve('./exec/parent.js'),
    {env: assign({}, process.env, {KILL_DELAY: '1000'})},
    function(error, stdout, stderr) {
      if (error) {
        console.log('exec error: ' + error);
      }
    }
  )
  setTimeout(function() {
    console.log(cyan("Parent:"+parent.pid));
    // list all the child processes
    psTree(parent.pid, function(err, children) {
      // console.log(red(err));
      console.log(cyan("Children: "), children)
      t.true(children.length > 0, green("✓ There are " + children.length + " active child processes"));
      setTimeout(function () {
        terminate(parent.pid, function (err) {
          t.equal(err, null, green("✓ No Errors"))
        })
        setTimeout(function () {
          psTree(parent.pid, function (err, children) {
            // console.log("Children: ", children, '\n');
            t.equal(children.length, 0, green("✓ No more active child processes (we killed them)"));
          })
        }, 1500); // give psTree time to kill the processes
      }, 10); // give the child process time to spawn
    });
  },200); // give the child process time to spawn
});

if (process.platform !== 'win32') {
  test(cyan('errors when process takes too long to exit'), function (t) {
    var parent = exec(
      "node " + require.resolve('./exec/parent.js'),
      {env: assign({}, process.env, {KILL_DELAY: '2500'})},
      function (error, stdout, stderr) {
        if (error) {
          console.log('exec error: ' + error);
        }
      }
    )
    setTimeout(function () {
      console.log(cyan("Parent:" + parent.pid));
      // list all the child processes
      psTree(parent.pid, function (err, children) {
        // console.log(red(err));
        console.log(cyan("Children: "), children)
        t.true(children.length > 0, green("✓ There are " + children.length + " active child processes"));
        setTimeout(function () {
          terminate(parent.pid, 'SIGINT', {timeout: 1000}, function (err) {
            t.assert(err && /^timed out waiting for pids \d+(, \d+)* to exit$/.test(err.message), green("✓ got expected error message"));
            t.end();
          })
        }, 10); // give the child process time to spawn
      });
    }, 200); // give the child process time to spawn
  });

  test(cyan('sends signal user passed'), function (t) {
    t.plan(4);
    var parent = exec("node " + require.resolve('./exec/parent.js'), function (error, stdout, stderr) {
      t.assert(/^parent got SIGINT$/m.test(stdout), green("✓ parent reported getting SIGINT"));
      if (error) {
        console.log('exec error: ' + error);
      }
    })
    setTimeout(function () {
      console.log(cyan("Parent:" + parent.pid));
      // list all the child processes
      psTree(parent.pid, function (err, children) {
        console.log(cyan("Children: "), children)
        t.true(children.length > 0, green("✓ There are " + children.length + " active child processes"));
        setTimeout(function () {
          terminate(parent.pid, 'SIGINT', function (err) {
            t.equal(err, null, green("✓ No Errors"))
          })
          setTimeout(function () {
            psTree(parent.pid, function (err, children) {
              // console.log("Children: ", children, '\n');
              t.equal(children.length, 0, green("✓ No more active child processes (we killed them)"));
            })
          }, 200); // give psTree time to kill the processes
        }, 10); // give the child process time to spawn
      });
    }, 200); // give the child process time to spawn
  });
}

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
  t.plan(1);
  var child = exec("node " + require.resolve('./exec/parent.js'), function(error, stdout, stderr) { });
  setTimeout(function(){
    terminate(child.pid);
    setTimeout(function() {
      psTree(child.pid, function (err, children) {
        if(err){
          console.log(err);
        }
        t.equal(children.length, 0, green("✓ No more active child processes"));
      });
    },1000); // give psTree time to kill the processes
  },200); // give the child process time to spawn
});

test(cyan("errors if parent pid doesn't exist"), function (t) {
  var pid = 9000;
  function exists() {
    try {
      process.kill(pid, 0);
      return true;
    } catch (err) {
      return false;
    }
  }
  while (exists()) {
    pid++;
  }

  terminate(pid, function(err) {
    t.assert(err, green("✓ got error"));
    t.end();
  });
});

test(cyan('immediately passes along errors from psTree'), function (t) {
  var error = new Error('test');
  handlePsTreeCallback(error, undefined, 1, undefined, undefined, function (err) {
    t.equal(error, err, green("✓ got expected error"));
    t.end();
  });
});

test(cyan('handles errors from psTree without callback'), function (t) {
  var error = new Error('test');
  handlePsTreeCallback(error, undefined, 1);
  setTimeout(function () { t.end(); }, 500);
});


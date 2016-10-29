// does nothing child process
console.log("Child process.id: "+process.pid);
console.log(" - - - - - - - - - - - - - - - - - - - - - - - ");
// keep process alive for one minute
setTimeout(function () {}, 60000);

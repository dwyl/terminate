# terminate

A reliable (tested) way to **Terminate** a **Node.js Process** (and ***all Child Processes***) based on the **Process ID**

![terminate-the-node-process-final](https://cloud.githubusercontent.com/assets/194400/6859420/a3b63f3c-d410-11e4-91bb-ad6b607cc465.png)

[![Build Status](https://travis-ci.org/nelsonic/terminate.svg)](https://travis-ci.org/nelsonic/terminate)
[![Code Climate](https://codeclimate.com/github/nelsonic/terminate/badges/gpa.svg)](https://codeclimate.com/github/nelsonic/terminate)
[![Test Coverage](https://codeclimate.com/github/nelsonic/terminate/badges/coverage.svg)](https://codeclimate.com/github/nelsonic/terminate)
[![npm version](https://badge.fury.io/js/terminate.svg)](http://badge.fury.io/js/terminate)
[![Node.js Version](https://img.shields.io/node/v/terminate.svg?style=flat)](http://nodejs.org/download)
[![Dependency Status](https://david-dm.org/nelsonic/terminate.svg)](https://david-dm.org/nelsonic/terminate)



## Usage

### Install from NPM

```sh
npm install terminate --save
```

### In your script

```js
var terminate = require('terminate');
terminate(process.pid, function(err, done){
  if(err) { // you will get an error if you did not supply a valid process.pid
   console.log("Oopsy: " + err); // handle errors in your preferred way.
 }
 else {
   console.log(done); // do what you do best!
 }
})
```


 <br />

# tl;dr

## Why?

In our [***Faster***](https://github.com/ideaq/faster) project
we run the server using a child process.
When we want to re-start the server,  
we needed to ensure the **process** (and any **Child Processes**)
were **Terminate**ed before re-start.

## Research

### Background Reading

+ How to terminate node processes: https://github.com/joyent/node/issues/1172 (history lesson)
+ nodejs exec command failing with no useful error message:
https://github.com/joyent/node/issues/4590

### Useful StackOverflow Questions/Answers

+ http://stackoverflow.com/questions/26694100/why-does-my-node-app-process-keep-getting-stopped-when-i-use-forever
+ http://stackoverflow.com/questions/18275809/kill-all-child-process-when-node-process-is-killed
+ http://stackoverflow.com/questions/26004519/why-doesnt-my-node-js-process-terminate-once-all-listeners-have-been-removed
+ http://stackoverflow.com/questions/14319724/nodejs-exec-command-failing-with-no-useful-error-message
+ http://stackoverflow.com/questions/9275654/how-many-child-processes-can-a-node-js-cluster-spawn-on-a-64bit-wintel-pc

## Background / Motivation

While building the [***Faster***](https://github.com/ideaq/faster)
module we decided to use [**Child Process**](https://nodejs.org/api/child_process.html)(es)
to run the application we are observing.  
As a result, we need to be able to kill those processes in order to re-start the app.  


### Why not use an *Existing* Module?

We investigated using **terminate**: https://github.com/indexzero/terminate/
it was *un-maintained* and had *no tests*
  so we submitted an [***issue***](https://github.com/indexzero/terminate/issues/10)
  offering to update the module *with tests*.  
  [*Charlie*](https://github.com/indexzero/terminate/issues/10#issuecomment-86795133)
  replied welcoming an update so we submitted
  a [***Pull Request***](https://github.com/indexzero/terminate/pull/12)
  with ***100% test coverage***

Other potential modules:

+ **nexpect**: https://github.com/nodejitsu/nexpect
+ **node-ps**: https://github.com/neekey/ps (has basic tests but no cov)
+ **tree-kill**: https://www.npmjs.com/package/tree-kill (no tests!!)


### Name

[**Terminate**](https://www.google.co.uk/search?q=terminate)
seemed like the *best* (of the available) name,  
if you have a *better suggestion*, please share!

<br />
<br />
## This Project Reminded me of Two *xkcd* Comics:

![xkcd terminate](http://i.imgur.com/KQ9v7ll.png)

![xkcd time robot](http://imgs.xkcd.com/comics/time_robot.png)

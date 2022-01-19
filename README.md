# terminate

A minimalist yet *reliable* (tested) way to **Terminate** a **Node.js Process** (and ***all Child Processes***) based on the **Process ID**

![terminate-the-node-process-final](https://cloud.githubusercontent.com/assets/194400/6859420/a3b63f3c-d410-11e4-91bb-ad6b607cc465.png)

[![Build Status](https://travis-ci.org/dwyl/terminate.svg?branch=master)](https://travis-ci.org/dwyl/terminate)
[![codecov.io](https://codecov.io/github/dwyl/terminate/coverage.svg?branch=master)](https://codecov.io/github/dwyl/terminate?branch=master)
[![npm version](https://badge.fury.io/js/terminate.svg)](http://badge.fury.io/js/terminate)
[![Node.js Version](https://img.shields.io/node/v/terminate.svg?style=flat)](http://nodejs.org/download)
[![Dependency Status](https://david-dm.org/dwyl/terminate.svg)](https://david-dm.org/dwyl/terminate)
[![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts "JavaScript The Good Parts")



## Usage

### Install from NPM

```sh
## Using NPM
npm install terminate --save
```

### In your script

```js
const terminate = require('terminate');

terminate(process.pid, function (err) {
  if (err) { // you will get an error if you did not supply a valid process.pid
    console.log('Oopsy:', err); // handle errors in your preferred way.
  }
  else {
    console.log('done'); // terminating the Processes succeeded.
    // NOTE: The above won't be run in this example as the process itself will be killed before.
  }
});
```

#### Usage

All the available parameters and their descriptions are viewable in the TypeScript definition file: [**`index.d.ts`**](./index.d.ts#L71).

#### Promise API

If you are **using Node.js 8+**, you can load the Promise version importing the module `terminate/promise.js` like this:

```js
const terminate = require('terminate/promise');

(async () => {
  try {
    await terminate(process.pid);
    console.log('done');
  } catch (err) {
    console.log('Oopsy:', err);
  }
})();
```

<br />

# tl;dr

## Why?

In our [***Faster***](https://github.com/ideaq/faster) project
we run the server using [**Child Process**](https://nodejs.org/api/child_process.html)(es).
When we want to re-start the server,  
we needed to ensure the **process** (and any **Child Processes**)
were **Terminate**d before attempting to re-start.


## *Prevents* Zombie Processes

Imagine you are running your Node.js app on a Multi-Core Processor
and don't want to "waste" the CPU by only using *one* of those cores  
(remember: one of Node's *selling points* is that its [single-process running on a single-core](http://stackoverflow.com/questions/17959663/)),
you can "farm out" tasks to the other cores using [**Child Process**](https://nodejs.org/api/child_process.html)(es)

If you then want to restart your app you *naively* (we did this!)
terminate the "main" process and *expect* all the "child" processes to
be ended too.

Sadly this results in [***Zombie Processes***](http://stackoverflow.com/questions/27381163)
which you would have to either *manually* kill or restart the machine/VM to clear.  
Instead you need to *find* all the Process IDs for the child processes
that your app created and **terminate** those *before* you can re-start your app.

Using ***terminate*** you no longer have this problem.

<br />

## Dependencies [![Dependency Status](https://david-dm.org/dwyl/terminate.svg)](https://david-dm.org/dwyl/terminate) [![devDependency Status](https://david-dm.org/dwyl/terminate/dev-status.svg)](https://david-dm.org/dwyl/terminate#info=devDependencies) [![Retire Status](https://img.shields.io/badge/security-no%20known%20vulnerabilities-brightgreen.svg)](http://retire.insecurity.today/api/image?uri=https://raw.githubusercontent.com/dwyl/terminate/master/package.json)

While researching how to get a list of child processes given a
Process ID we found **ps-tree**: https://github.com/indexzero/ps-tree  
it was *un-maintained* and had *no tests*
  so we submitted an [***issue***](https://github.com/indexzero/terminate/issues/10)
  offering to update the module *with tests*.  
  [*Charlie*](https://github.com/indexzero/terminate/issues/10#issuecomment-86795133)
  replied welcoming an update so we submitted
  a [***Pull Request***](https://github.com/indexzero/ps-tree/pull/12)
  with ***100% test coverage*** which was [***Merged*** by *Charlie*](https://github.com/indexzero/ps-tree/pull/12#issuecomment-91785753)  
ps-tree in turn uses [**event-stream**](https://github.com/dominictarr/event-stream)
(by [Dominc Tarr](https://github.com/dominictarr)) for streaming the result
of its process lookups.  
**event-stream** does not publish its' code coverage,
but is tested (and *more importantly* ***used*** by millions of people)  
has had ***many itterations*** and has been ***stable*** for a while:

[![NPM](https://nodei.co/npm/event-stream.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/event-stream/)

While we don't *like* the fact that **event-stream** has dependencies which have
*limited* ***automated tests***,  
we are willing to place *reliance* on the module given how
"***real-world tested***" it is.

*If* at any point we find that relying **event-stream** or its underlying
dependencies is the source of a bug or sleepless nights,  
we can either [***make time***](https://github.com/ideaq/time)
to contribute the tests ***or*** *write our own* version of **ps-tree**
*without dependencies*  
(*which should "only" take a day but won't be as elegant...*)


## Research

### Background Reading

+ How to terminate node processes: https://github.com/joyent/node/issues/1172 (history lesson)
+ nodejs exec command failing with no useful error message:
https://github.com/joyent/node/issues/4590

### Useful StackOverflow Questions/Answers

+ http://stackoverflow.com/questions/27381163/spawning-node-js-child-processes-results-in-zombie-processes-on-cloud-foundry-s
+ http://stackoverflow.com/questions/26694100/why-does-my-node-app-process-keep-getting-stopped-when-i-use-forever
+ http://stackoverflow.com/questions/18275809/kill-all-child-process-when-node-process-is-killed
+ http://stackoverflow.com/questions/26004519/why-doesnt-my-node-js-process-terminate-once-all-listeners-have-been-removed
+ http://stackoverflow.com/questions/14319724/nodejs-exec-command-failing-with-no-useful-error-message
+ http://stackoverflow.com/questions/9275654/how-many-child-processes-can-a-node-js-cluster-spawn-on-a-64bit-wintel-pc
+ http://stackoverflow.com/questions/17959663/why-is-node-js-single-threaded


Other potential modules we could have used:

+ **node-ps**: https://github.com/neekey/ps (has basic tests but no coverage / unmaintained?)
+ **tree-kill**: https://www.npmjs.com/package/tree-kill (no tests!!)
+ **nexpect**: https://github.com/nodejitsu/nexpect (spawn and control child processes
  looks really good, but we wanted *less abstraction*)


### Name

[**Terminate**](https://www.google.co.uk/search?q=terminate)
seemed like the *best* (of the available) name,  
if you have a *better suggestion*, please share!

<br />
<br />
## This Project Reminded me of Two *xkcd* Comics:

![xkcd terminate](http://i.imgur.com/KQ9v7ll.png)

![xkcd time robot](http://imgs.xkcd.com/comics/time_robot.png)

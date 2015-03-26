# terminate
Terminate a Node.js Process based on the Process ID

![terminate-the-node-process-final](https://cloud.githubusercontent.com/assets/194400/6859420/a3b63f3c-d410-11e4-91bb-ad6b607cc465.png)




 <br />

## Background / Motivation

While building the [***Faster***](https://github.com/ideaq/faster)
module we decided to use [**Child Process**](https://nodejs.org/api/child_process.html)(es)
to run the application we are observing.  
As a result, we need to be able to kill those processes in order to re-start the app.  


### Why not use an *Existing* Module?

We investigated using:

+ **ps-tree**: https://github.com/indexzero/ps-tree/
(but sadly it appears to be un-maintained and has *zero tests*
  we submitted an [***issue***](https://github.com/indexzero/ps-tree/issues/10)
  offering to update the module *with tests* but did not get a reply from
  [Charlie](https://github.com/indexzero) ... )

### Name

**Terminate** seemed like the *best* (of the available) name,
if you have a better suggestion, please share!

<br />
<br />
## This Project Reminded me of Two *xkcd* Comics:

![xkcd terminate](http://i.imgur.com/KQ9v7ll.png)

![xkcd time robot](http://imgs.xkcd.com/comics/time_robot.png)

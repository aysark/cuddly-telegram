# Intro to AngularJS

Look into electron (similar to nw.js); http://electron.atom.io/

At the end of the day, when using DOM elements using JS, JS is really just glue code between C++ objects.

JS is single threaded.  At any given time, only one task can be done only.

What is node.js? Its JavaScript on the server.

How is related to Java? it gets rid of it.

For an elementary look into a basic express-like clone, see the http-helper.js file.

Over time 2 module systems came about:
1. CommonJS - synchronise file system module based system
2. AMD - downloads what you need when you need it, not as popular because nowadays bandwidth is not the issue, latency is.

## Day 1
### Principles & Concepts
- browser is blocking when loading js files, so always put them at bottom of page
- css files is also blocking, but you want page to be styled

- when angularjs is loaded at the documentReady event, it looks for the directive marker ng-app into which it will apply its js code to.  Angular will only exist on that ng-app element and all its children.  You cannot have multiple ng-app directive markers.  But you can have multiple apps using the angularjs bootstrap method.  Similar to ng-app, you have ng-controller directive marker.

- javascript has no concept of namespacing
- in javascript, functions are objects

- immediately invoked function expression (IIFE) is the:
```javascript
(function(angular {
	// angular code here
})(angular);
```
allows you to define things such that they do not pollute the global scope.

- TODO: see brendan eich podcast on javascript creation

- "use strict"; // best practice, applies certain features/conventions from ECMASCRIPT5

- angular adds the ng-scope which means its a new variable scope
- angular adds the ng-binding class which means there are template elements that are bound that need to be updated.  Must be used carefully because everytime input taken then update model then digest loop function is done twice on the whole page.  This digest loop does the synchronization, since JS is single threaded, this can cause sluggishness as app grows bigger. NOTE: THIS has changed since Angular 2.0!

### Directives

- ng-repeat, takes a dom element and repeats it over and over
- $ sign prefix just means the thing you are working with is built-in into angular, some examples: 
`$index, $first, $last, $middle, $even, $odd`
- you can use built-in filters using: filter and orderBy: `<li ng-repeat="color in colors | filter:colorFilter | orderBy:'toString()':colorSort">` 

- ng-click, adds a click handler then runs the digest loop
- to manually trigger the digest loop, `$scope.$digest();` - never do this, not good convention unless you do it like (runs in the context of a try/catch block):
```$scope.$apply(function() {
	$scope.$digest();
})
```

## Day 2

## Questions
- opinion on semicolon
- ng-model
# Intro to AngularJS

Look into electron (similar to nw.js); http://electron.atom.io/

At the end of the day, when using DOM elements using JS, JS is really just glue code between C++ objects.

JS is single threaded.  At any given time, only one task can be done only.

JS hoisting, function declarations (not impl) get hoisted to the top on file load.  In JS2015, `let` is block scoped but `var` is function scoped.

JS has no concept of classes.  In JS live objects inherit from other live objects.  The value of `this` is the global object, unless you're in `use strict` in which case it will be undefined.  The value of `this` depends on what is calling the function, if its an object, then `this` will be that object.

What is node.js? Its JavaScript on the server.

How is related to Java? it gets rid of it.

For an elementary look into a basic express-like clone, see the http-helper.js file.

Over time 2 module systems came about:
1. CommonJS - synchronize file system module based system
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
- ng-model directive creates two way binding

- ng-repeat, takes a dom element and repeats it over and over
- $ sign prefix just means the thing you are working with is built-in into angular, some examples:
`$index, $first, $last, $middle, $even, $odd`
- you can use built-in filters using: filter and orderBy: `<li ng-repeat="color in colors | filter:colorFilter | orderBy:'toString()':colorSort">`

- ng-if
- ng-click, adds a click handler then runs the digest loop
- to manually trigger the digest loop, `$scope.$digest();` - never do this, not good convention unless you do it like (runs in the context of a try/catch block):

```javascript
$scope.$apply(function() {
	$scope.$digest();
})
```

- double dollar properties are internal properties that you should not use (ie. $$childHead).

### Scope
The structure of the DOM in html page drives the app- not the js file.  The scope object hierarchy in angular js uses prototype inheritance.

Always initialize your objects when using them with scope.
Always qualify your ng-model directives with objects not scalar values/individual properties.

A scope should never be referencing anything above itself unless via inheritance.

You'll typically have many scopes throughout your app.

When setting values for an object's property, it will be set to the child object directly.

When getting values for an object's property, it will go up the prototype chain if not found in the child object.

All scope objects have 2 kinds of relationships:
1. Prototype inheritance ($parent, $$childHead, $$childTail)
2. Linked node ($nextSibling, $previousSibling)

Watch functions are used to compare the old and new value to check if it changed.  These are stored in the scope object.  The digest loop iterates through all the scope watch functions.

### Dependency Injection
JS doesn't actually have DI, but angular tries;
```javascript
homeCtrl.$inject = ["$log", "$scope"];
function homeCtrl($log, $scope) {
	$scope.message = "Hi class!";
	$log.log($scope.message);
}
```

### Templates
You can create an inline template via:
```javascript
<script id="home.tpl" type="text/ng-template">
	<h1>{{message}}</h1>
</script>
```

And include it via the ng-include directive

Use gulp/grunt to cache your templates into templateCache

## Day 2

## Questions
- ng-model
- do you have to use index.html

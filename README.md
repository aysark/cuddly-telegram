# Intro to AngularJS 1.5

Look into electron (similar to nw.js); http://electron.atom.io/

At the end of the day, when using DOM elements using JS, JS is really just glue code between C++ objects.

JS is single threaded  (but the browser is multi).  At any given time, only one task can be done only.

JS hoisting, function declarations (not impl) get hoisted to the top on file load.  In JS2015, `let` is block scoped but `var` is function scoped.

JS has no concept of classes.  In JS live objects inherit from other live objects.  The value of `this` is the global object, unless you're in `use strict` in which case it will be undefined.  The value of `this` depends on what is calling the function, if its an object, then `this` will be that object.

What is node.js? Its JavaScript on the server.

How is related to Java? it gets rid of it.

For an elementary look into a basic express-like clone, see the http-helper.js file.

Over time 2 module systems came about:
1. CommonJS - synchronize file system module based system
2. AMD - downloads what you need when you need it, not as popular because nowadays bandwidth is not the issue, latency is.

AngularJS does not follow MVC, its more like
Model ($scope) -injected-> Controller
^
|
View (template, directives, filters)

Its basically MV-whatever / MVVM.  Controllers are used to configure scope objects mainly.

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

### Form validation
```javascript
<input type="text" name="widgetName" ng-model="widget.name" required />
<span ng-show="widgetForm.widgetName.$touched && widgetForm.widgetName.$invalid">Name is required</span>
```

```javascript
<label>
	Where are you from?
	<select ng-model="contact.location" name="contactLocation"
	ng-options="country.code as country.name group by country.continent for country in countries | orderBy:'continent'">
		<option value="">Select one...</option>
	</select>
</label>
```

### Promises
Alleviates the pyramid of doom:
```javascript
$.ajax({
	success: function() {
		$.ajax({
			success: function() {
				$.ajax({
					function() {
						// ...
					}
				});
			}
		});
	}
});
```

Javascript promise:
```javascript
var p = new Promise(function(fulfill, reject) {
})
```

Angular promise:
```javascript
$http.get("/api/widgets").then(function(results) {
	// handle success
}).catch(function(results){
	// handle failure
});
```

Look into: HTTP interceptors.

### Services
To create a service, use the `factory` method.  
```Javascript
angular.module("WidgetApp", [])
	.factory("widgetsService", function($http) {
		return {
			getAll: function(){
				return $http.get("/api/widgets");
			},
			get: function(id){
				return $http.get("/api/widgets/" + encodeURIComponent(id)); // encodeURIComponent escapes it so its valid URI
			},
			new: function(widget) {
				return $http.post("/api/widgets", widget); // automatically serialized to JSON
			},
			update: function(id, widget) {
				return $http.update("/api/widgets/"+encodeURIComponent(id), widget);
			}
		};
	});
```

Or a more decoupled way, in its own service file:
```javascript
(function(angular){
  "use strict";

  factory.$inject["$http"];

  function service($http) {
    return {
      getAll: function() {
        return $http.get("/api/widgets");
      },
      get: function(id) {
        return $http.get("/api/widgets/"+encodeURIComponent(id));
      },
      delete: function(id) {
        return $http.delete("/api/widgets/"+encodeURIComponent(id));
      },
      new: function(widget) {
        return $http.post("/api/widgets", widget); // automatically serialized to JSON
      },
      update: function(id, widget) {
        return $http.update("/api/widgets/"+encodeURIComponent(id), widget);
      }
    };
  }

  angular.module("WidgetApp.Services")
    .factory("widgets", service);
})(angular);
```

### Structure
In Angular, there is no namespacing, the names of modules does not mean anything for it.  If you have 2 modules named the same thing, the last one will be used.

### Routing
Create a routes.js file;
```javascript
(function(angular){
  "use strict";

  angular.module("WidgetApp.Services")
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
      $urlRouterProvider.otherwise("/");
      $locationProvider.html5Mode(false);

      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: "/tpls/home.tpl",
          controller: "home"
        });
    });
})(angular)
```

### Testing

A sample unit test in Jasmine:
```javascript
it("view widget", function() {

	mockScope.viewWidget(1);
	expect(stateSvc.go).toHaveBeenCalledWith("view", { widgetId: 1 });

});
```

Use istanbul for js code coverage.

Cyclomatic complexity is a software metric (measurement), used to indicate the complexity of a program. It is a quantitative measure of the number of linearly independent paths through a program's source code.

Cyclomatic complexity is computed using the control flow graph of the program: the nodes of the graph correspond to indivisible groups of commands of a program, and a directed edge connects two nodes if the second command might be executed immediately after the first command. Cyclomatic complexity may also be applied to individual functions, modules, methods or classes within a program.

One testing strategy, called basis path testing by McCabe who first proposed it, is to test each linearly independent path through the program; in this case, the number of test cases will equal the cyclomatic complexity of the program.[1]
https://en.wikipedia.org/wiki/Cyclomatic_complexity

## Questions
Email: eric@training4developers.com
https://www.dropbox.com/sh/0lakcm80swz2ae7/AADcLdepPaoFk6n3-VyyhK0wa?dl=0

Use Webpack to minify and combine all as one single file.
Jasmine is the unit test fw for angular.

middle-man
=========

Simple express middleware manager. Pull your middleware out `server.js` and into seperate modules. Instead of worrying about middleware execution order, focus on what dependencies exist between them, if any.

```
npm install --save middleman
```


## Usage

``` javascript
// Require middleman
var middleman = require('middleman');

// Generate express middleware from your directory of middleware objects
var middlewareArray = middleman.generate({directory: path.resolve(__dirname, '/middleware')});
// Pass in your new, ordered middleware array into Express
app.use(middlewareArray);
```

## Middleware Plugins

### Format

``` javascript
module.exports = {
  name: // The name of the middleware plugin, used to reference as a dependency, etc.
  middleware: // A function or array of functions to register with your express application
  dependencies: // [Optional] An array of muddleware plugin names that must be run before this one
  priority: // [Optional] if true, order this middleware before any non-priority plugins
};
```




### Examples

#### Simple Middleware

``` javascript
module.exports = {
  name: 'simple-plugin',
  middleware: function simplePlugin(req, res, next) {
    next();
  }
};
```

#### Middleware with Dependencies

``` javascript
module.exports = {
	name: 'complex-plugin',
	dependencies: ['simple-plugin'],
	middleware: [
		function middlewareA(req, res, next) {
			next();
		},
		function middlewareB(req, res, next) {
			next();
		},
		function middlewareC(req, res, next) {
			next();
		}
	]
};
```

### Setup Middleware

``` javascript
module.exports = {
	name: 'setup',
	middleware: function setupPlugin(req, res, next) {
		// If you have a plugin named 'setup', it will be run first, no matter what. Do any early setup here
		next();
	}
};
```

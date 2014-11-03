'use strict';

var fs = require('fs');

function proccessMiddleware(plugins) {
	var orderedMiddleware = [],
		availableDependencies = {},
		totalPlugins = plugins.length,
		numPlugins = 0;

	function addPlugin(plugin) {
		var middleware = plugin.middleware;
		if(Array.isArray(middleware)) {
			orderedMiddleware = orderedMiddleware.concat(middleware);
		} else if(typeof middleware === 'function') {
			orderedMiddleware.push(middleware);
		} else {
			throw new TypeError('middleware must be a middleware function or array of functions');
		}
		numPlugins++;
		plugin.added = true;
		availableDependencies[plugin.name] = true;
	}

	function hasFulfilledDependencies(plugin) {
		var dependencies = plugin.dependencies;
		if(!dependencies) {
			return true;
		}
		if(!Array.isArray(dependencies)) {
			throw new TypeError('dependencies must be an array of plugin names');
		}
		return dependencies.every(function(dep) {
			var depStatus = availableDependencies[dep];
			if(typeof depStatus === 'undefined') {
				throw new Error(plugin.name + ' dependency \'' + dep + '\' does not exist.');
			}
			return !!availableDependencies[dep];
		});
	}

	// Step 1: Populate the availableDependencies base object
	plugins.forEach(function createPluginDictionary(plugin) {
		availableDependencies[plugin.name] = false;
	});

	// Step 2: Add the special 'setup' plugin, if present
	plugins.forEach(function addSetup(plugin) {
		if(plugin.name === 'setup') {
			if(typeof plugin.dependencies !== 'undefined') {
				throw new Error('setup plugin cannot have dependencies.');
			}
			addPlugin(plugin);
		}
	});

	// Step 3: Add each priority plugin
	plugins.forEach(function addPriority(plugin) {
		if(plugin.priority && !plugin.added) {
			addPlugin(plugin);
		}
	});

	// Step 4: Add all other plugins
	function addNormal(plugin) {
		if(hasFulfilledDependencies(plugin) && !plugin.added) {
			addPlugin(plugin);
		}
	}
	while(numPlugins < totalPlugins) {
		plugins.forEach(addNormal);
	}

	return orderedMiddleware;
}

module.exports = {
	generate: function init(params) {
		var middlewareDirectory = params.directory;
		var middlewareFiles = fs.readdirSync(middlewareDirectory);
		var middlewareModules = middlewareFiles.map(function(filename) {
			return require(middlewareDirectory + '/' + filename);
		});
		return proccessMiddleware(middlewareModules);
	}
};

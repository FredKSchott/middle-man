module.exports = {
	name: 'has-dependencies-plugin',
	dependencies: ['dependency-plugin', 'simple-plugin'],
	middleware: function hasDependenciesPlugin(req, res, next) {
		next();
	}
};
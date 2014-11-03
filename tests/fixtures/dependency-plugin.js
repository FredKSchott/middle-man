module.exports = {
	name: 'dependency-plugin',
	middleware: function dependencyPlugin(req, res, next) {
		next();
	}
};
module.exports = {
	name: 'simple-plugin',
	middleware: function simplePlugin(req, res, next) {
		next();
	}
};
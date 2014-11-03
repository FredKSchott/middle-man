module.exports = {
	name: 'array-middleware-plugin',
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
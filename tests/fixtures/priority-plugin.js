module.exports = {
	name: 'some-priority-plugin',
	priority: true,
	middleware: function somePriorityPlugin(req, res, next) {
		next();
	}
};
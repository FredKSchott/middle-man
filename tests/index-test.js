
var middleman = require('../index'),
	path = require('path');


describe('middle-man', function() {

	it('should load', function() {
		var orderedMiddleware = middleman.generate({directory: path.resolve(__dirname, 'fixtures')});
		console.log(orderedMiddleware);
	});

});
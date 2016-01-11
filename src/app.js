var React = require('react'),
	Rebus = require('./utils/Rebus.js');

//init rebus
require('./rebusFile.js');

//create the root component by Rebus.
var app = Rebus.excute('CREATE_TODOAPP');
React.render(
	app,
	document.getElementById('todoapp')
	);
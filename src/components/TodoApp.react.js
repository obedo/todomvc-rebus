var React = require('react');
	eBus = require('../utils/Rebus.js');

var TodoApp = React.createClass({
	render : function(){
		var TodoHead = eBus.excute('CREATE_TODOHEAD'),
			TodoBody = eBus.excute('CREATE_TODOBODY'),
			TodoFoot = eBus.excute('CREATE_TODOFOOT');
		return (
			<div>
				{TodoHead}
				{TodoBody}
				{TodoFoot}
			</div>
		);
	},//End render
});

module.exports = TodoApp;
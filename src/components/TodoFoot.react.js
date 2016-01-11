var React = require('react'),
	Rebus = require('../utils/Rebus.js'),
	contants = require('../utils/Contants.js');

//组件ID
var _compID = contants.TODO_FOOT;

//组件状态生成器
var _createState = function(){
	return {
		allTodos : Rebus.excute('GET_ALL_TODOS'),
	};
};

var TodoFoot = React.createClass({
	getInitialState : function(){
		return _createState();
	},
	componentDidMount : function(){
		Rebus.addUpdateListener(_compID, this.updateState);
	},
	componentWillUnmount : function(){
		Rebus.removeUpdateListener(_compID);
	},
	render : function(){
		var allTodos = this.state.allTodos;
		var total = Object.keys(allTodos).length;

		if(0===total){
			return null;
		}

		var completed = 0;
		for(var key in allTodos){
			if(allTodos[key].complete){
				completed++;	
			}
		}

		var itemsLeft = total - completed;
		var itemsLeftPhrase = itemsLeft===1 ? ' item' : 'items';
		itemsLeftPhrase += ' left';	

		var clearCompletedButton;
		if(completed){
			clearCompletedButton = 
				<button id='clear-completed' onClick={this.onClearCompleteClick}>
					Clear completed ({completed})
				</button>;
		}
		return (
			<footer id='footer'>
				<span id='todo-count'>
					<strong>
						{itemsLeft}
					</strong>		
					{itemsLeftPhrase}
				</span>
				{clearCompletedButton}
			</footer>
		);
	},
	updateState : function(){
		this.setState(_createState);
	},
	onClearCompleteClick : function(){
		Rebus.excute('CLEAR_COMPLETED');
	},
});

module.exports = TodoFoot;
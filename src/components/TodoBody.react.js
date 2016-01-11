var React = require('react'),
	ReactPropTypes = React.PropTypes,
	Rebus = require('../utils/Rebus.js'),
	contants = require('../utils/Contants.js');

//该组件的ID
var _compID = contants.TODO_BODY;

//组件State生成器
var _createState = function(){
	return {
		todos : ( Rebus.excute('GET_TODOS') || {} ),
		areAllComplete : ( Rebus.excute('ARE_ALL_COMPLETE') || false ),
	}
}//End getTodoState

var TodoBody = React.createClass({

	getInitialState : function(){
		return _createState();
	},//End getInitialState

	componentDidMount : function(){
		Rebus.addUpdateListener(_compID, function(){
			this.setState(_createState);
		}.bind(this));
	},//End componentDidMount

	componentWillUnmount : function(){
		Rebus.removeUpdateListener(_compID);
	},//End componentWillUnmount

	render : function(){
		var todos = this.state.todos,
			todoItems = [];
		for(var key in todos){
			todoItems.push( Rebus.excute('CREATE_TODOITEM', {
				key : key,
				todo : todos[key],
			}) );
		}
		return (
			<section id='main'>
				<input id='toggle-all' type='checkbox'
					onChange={this.onToggleCompleteAll}
					checked={this.state.areAllComplete ? 'checked' : ''} />
				<label htmlFor='toggle-all'>Mark all as complete</label>
				<ul id='todo-list'>{todoItems}</ul>
			</section>
		);
	},//End render

	onToggleCompleteAll : function(){
		Rebus.excute('TOGGLE_ALL_COMPLETE');
	},//End onToggleCompleteAll

});

module.exports = TodoBody;
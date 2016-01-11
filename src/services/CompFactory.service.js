var React = require('react'),
	contants = require('../utils/Contants.js'),
	TodoApp  = require('../components/TodoApp.react.js'),
	TodoHead = require('../components/TodoHead.react.js'),
	TodoInput = require('../components/TodoInput.react.js'),
	TodoBody = require('../components/TodoBody.react.js'),
	TodoItem = require('../components/TodoItem.react.js'),
	TodoFoot = require('../components/TodoFoot.react.js');

// var createMap = {
// 	TODO_HEAD : function(arg){
// 		console.log('TODO_HEAD inner map')
// 		return <TodoHead/>;
// 	},
// 	TODO_INPUT : function(arg){
// 		return <TodoInput 
// 			id={arg.id}
// 			placeholder={arg.placeholder}
// 			onSave={arg.onSave} />;
// 	},
// 	TODO_BODY : function(arg){
// 		return <TodoBody/>;
// 	},
// };

var CompFactory = {
	createTodoApp  : function(arg){
		return <TodoApp/>;
	},
	createTodoHead : function(arg){
		return <TodoHead/>;
	},
	createTodoInput : function(arg){
		return <TodoInput 
			id={arg.id}
			className={arg.className}
			placeholder={arg.placeholder}
			onSave={arg.onSave} />;
	},
	createTodoBody : function(arg){
		return <TodoBody/>;
	},
	createTodoItem : function(arg){
		return <TodoItem key={arg.key} todo={arg.todo} />;
	},
	// create : function(compKey, arg){
	// 	console.log(compKey)
	// 	var res = createMap[compKey].call(this,arg);
	// 	console.log(res)
	// 	return res;
	// },
	createTodoFoot : function(arg){
		return <TodoFoot/>;
	},
};

module.exports = CompFactory;
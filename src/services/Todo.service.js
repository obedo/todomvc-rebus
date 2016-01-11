var assign = require('object-assign');

var _todos = {},
	_filter = 0;//0:All, 1:completed, 2:left

function add(arg){
	var text = arg.text;
	if(text!==''){
		var id = (+new Date() + Math.floor(Math.random()*999999).toString(36));
		_todos[id] = {
			id		: id,
			complete: false,
			text 	: text
		};
		return true;
	}else{
		return false;
	}
}//End add

function remove(todoID){
	delete _todos[todoID];
};//End remove

function toggleComplete(todo){
	todo.complete = !todo.complete;
	_todos[todo.id] = todo;
};//End toggleComplete

function update(id, updates){
	_todos[id] = assign({}, _todos[id], updates);
}//End update

function updateAll(updates){
	for(var id in _todos){
		update(id, updates);
	}
	return true;
}//End updateAll

function getAllTodos(){
	return _todos;
}//End getAllTodos

function getTodosByFilter(){
	switch(_filter){
	case 0:
		return getAllTodos();
		break;
	case 1:
		return getCompleteds();
		break;
	case 2:
		return getLeftItems();
		break;
	default:
		break;
	}
}//End getTodosByFilter

function getCompleteds(){
	var completeds = {};
	for(var id in _todos){
		if(_todos[id].complete){
			completeds[id] = _todos[id];
		}
	}
	return completeds;
}//End getCompleteds

function getLeftItems(){
	var leftItems = {};
	for(var id in _todos){
		if(!_todos[id].complete){
			leftItems[id] = _todos[id];
		}
	}
	return leftItems;
}//End getLeftItems

function areAllComplete(){
	var propCount = 0;
	for(var id in _todos){
		propCount++;
		if(!_todos[id].complete){
			return false;
		}
	}
	if( 0===propCount )
		return false 
	else
		return true;
}//End areAllComplete

function toggleAllComplete(){
	var allCompleted = areAllComplete();
	if(allCompleted){
		return updateAll({complete:false});
	}else{
		return updateAll({complete:true});
	}
}//End toggleAllComplete

function clearCompleted(){
	for(var id in _todos){
		if(_todos[id].complete){
			remove(id);
		}
	}
}//End clearCompleted

var TodoService = {
	add 		: add,
	remove 		: remove,
	getAllTodos : getAllTodos,
	update 		: update,
	updateAll 	: updateAll,
	areAllComplete 		: areAllComplete,
	toggleAllComplete 	: toggleAllComplete,
	toggleComplete 		: toggleComplete,
	clearCompleted		: clearCompleted,
	getTodosByFilter	: getTodosByFilter,
};

module.exports = TodoService;
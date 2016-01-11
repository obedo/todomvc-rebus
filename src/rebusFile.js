var Rebus = require('./utils/Rebus.js'),
	CompFactory = require('./services/CompFactory.service.js'),
	TodoService = require('./services/Todo.service.js'),
	contants = require('./utils/Contants.js');

var comps_update = [contants.TODO_BODY, contants.TODO_FOOT];

Rebus.bind('CREATE_TODOAPP', CompFactory.createTodoApp);

Rebus.bind('CREATE_TODOHEAD', CompFactory.createTodoHead);

Rebus.bind('CREATE_TODOINPUT', CompFactory.createTodoInput);

Rebus.bind('CREATE_TODOBODY', CompFactory.createTodoBody);

Rebus.bind('CREATE_TODOITEM', CompFactory.createTodoItem);

Rebus.bind('CREATE_TODOFOOT', CompFactory.createTodoFoot);

Rebus.bind('ARE_ALL_COMPLETE', TodoService.areAllComplete);

Rebus.bind('GET_ALL_TODOS', TodoService.getAllTodos);

Rebus.bind('GET_TODOS', TodoService.getTodosByFilter);

Rebus.bind('ADD_TODO', TodoService.add)
	.updateComp(comps_update);

Rebus.bind('DESTROY_TODO', TodoService.remove)
	.updateComp(comps_update);

Rebus.bind('UPDATE_TODO', TodoService.update)
	.updateComp(comps_update);

Rebus.bind('TOGGLE_COMPLETE', TodoService.toggleComplete)
	.updateComp(comps_update);

Rebus.bind('TOGGLE_ALL_COMPLETE', TodoService.toggleAllComplete)
	.updateComp(comps_update);
	
Rebus.bind('CLEAR_COMPLETED', TodoService.clearCompleted)
	.updateComp(comps_update);







var EventEmitter  = require('events').EventEmitter,
	assign 		  = require('object-assign');

var eventMap = {},
	compUpdateFns = {};


var Rebus = assign({}, EventEmitter.prototype, {
	excute : function(){
		var eventKey = Array.prototype.shift.call(arguments);
		var fn = eventMap[eventKey];
		var res;//result
		if(fn instanceof Function){
			res = fn.apply(this,arguments);
		}else{
			res = null;
		}
		this.emit(eventKey);//Broadcate the message.
		return res;
	},
	bind : function(eventKey, fn){
		if(!fn instanceof Function){
			console.log("fn is not a Function.");
		}else{
			eventMap[eventKey] = fn;
		}
		this.eventKey = eventKey;
		return this;
	},
	listen : function(eventKey, fns){
		if(!fns instanceof Array){
			console.log("The second argument for lisen() must be an array of Function. ");
		}else{

			this.on(eventKey, function(){
				for(var j=0,len=fns.length; j<len; j++){
					fns[j].apply(this, arguments);
				}
			});
		}
		return this;
	},//End listen
	addUpdateListener : function(compID,fn){
		if(! fn instanceof Function){
			console.log("The second argument of addUpdateListener must be a Function.");
		}else{
			compUpdateFns[compID] = fn;
		}
	},
	removeUpdateListener : function(compID){
		delete compUpdateFns[compID];
	},
	updateState : function(compID){
		compUpdateFns[compID]();
	},
	//更新組件
	updateComp : function(compIDs){
		if(!(compIDs instanceof Array)){
			console.error("Error: The argument of updateComp must be an array of component ID.");
			return null;
		}
		var updateFns = [];
		compIDs.map(function(compID){
			updateFns.push(function(){
				compUpdateFns[compID]();
			});
		});
		this.listen(this.eventKey, updateFns);
		return this;
	}
});

module.exports = Rebus;
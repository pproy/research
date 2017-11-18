'use strict';

const async = require("async");
const taskModel = require('./task.schema');



let tskMdl = taskModel.task;


const addTask = function(req, callback){
	let req_post = req;
	console.log('xxx1',req_post)

	let tsk = new tskMdl(req_post);
	tsk.save();

	callback(null);

};


module.exports = {
    addTask
};
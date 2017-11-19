'use strict';

const async = require("async");
const mongoose = require('mongoose');
const taskModel = require('./task.schema');

let tskMdl = taskModel.task;

const getTaskList = function(callback){	
	
	let taskList = tskMdl.find(function(err, data) {
      if(err){
      	callback(err);
      }else{
		callback(null, data);
      }
    });
};

const addTask = function(req, callback){
	let req_post = req;	

	let tsk = new tskMdl(req_post);
	tsk.save();

	callback(null);

};

const updateTask = function(req, callback){	

	let req_post = req;
	//console.log('xx',req_post)

    tskMdl.update({
      _id: req_post.id
    }, {
    	description: req_post.description,
      	status: req_post.status      
    }, {}, function(err, data) {
      if(err){
      	callback(err);
      }else{
		callback(null, data);
      }
    });
};


const getTaskDetails = function(id, callback){	
	
	tskMdl.findOne({ _id: id }, function (err, data){
	  if(err){
      	callback(err);
      }else{
		callback(null, data);
      }
	});

};

const deleteTask = function(id, callback){	
	
	tskMdl.remove({ _id: id }, function (err, data){
	  if(err){
      	callback(err);
      }else{
		callback(null, data);
      }
	});
};


module.exports = {
    addTask,
    getTaskList,
    updateTask,
    getTaskDetails,
    deleteTask
};
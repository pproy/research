'use strict';

const async = require("async");

//Load model
const taskModel = require('./task.model');


const listTask = function(req, res) {
    
    let response = {
        "jsonrpc": '2.0'
    };
    let fetchList = function (callback) {
        
        taskModel.getTaskList(callback);
    };

    async.series([fetchList], function (err, result) {
        try {
            //Final Result After Executing Tasks
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            response.error = 'Sorry, unable to fetch list.';
        }
        res.send(response);
    });
}
;


const addTask = function(req, res) {

    let response = {
        'jsonrpc': '2.0'
    };

    let req_post = req.body;

    let addTaskModel = function (callback) {
        //console.log('zzzz',req_post)
        taskModel.addTask(req_post, callback);
    };

    async.waterfall([addTaskModel], function (err, result) {

        try {
            if (err) {
                //console.log(err.message);
                response.error.message = err.message;
            } else {
                response.result = result;
            }
        } catch (e) {
            console.log(e);
            response.error = 'Sorry, unable to add task.';
        }
        //console.log(response);
        res.send(response);
    });
}
;


const updateTask = function(req, res) {

    let response = {
        'jsonrpc': '2.0'
    };

    let req_post = req.body;
    /*let id = req_post.id;
    delete req_post.id;*/
    //req_post.status = (req_post.status) ? "true" : "false";
    //req_post['due_date'] = Date.now;

    let updateTaskModel = function (callback) {
        taskModel.updateTask(req_post, callback);
    };

    async.waterfall([updateTaskModel], function (err, result) {

        try {
            if (err) {
                //console.log(err.message);
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            console.log(e);
            //response.error = errorCodes['-32000'];
            response.error = 'Sorry, something went wrong.';
        }
        //console.log(response);
        res.send(response);
    });
}
;


const getTaskDetails = function(req, res) {
    let response = {
        'jsonrpc': '2.0'
    };

    let req_post = req.body;
    let id = req_post.id || null;
    let checkRequest = function (callback) {
        try {
            if (!id || id === null) {
                callback('Id not found.');
            } else {
                callback(null);
            }
        } catch (e) {
            //Log(e);
            callback('Sorry, something went wrong.');
        }
    };

    let getInfo = function (callback) {
        taskModel.getTaskDetails(id, callback);
    };

    async.waterfall([checkRequest, getInfo], function (err, result) {
        try {
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            //response.error = errorCodes['-32000'];
            response.error = 'Sorry, something went wrong.';
        }
        res.send(response);
    });
}
;

const deleteTask = function(req, res) {
    let response = {
        'jsonrpc': '2.0'
    };
    let req_post = req.body;
    let id = req_post.id || null;

    let checkRequest = function (callback) {
        try {
            if (!id || id === null) {
                //callback(errorCodes['-32014'], null);
                callback('Id not found.');
            } else {
                callback(null);
            }
        } catch (e) {
            //Log(e);
            //callback(errorCodes['-32000'], null);
            callback('Sorry, something went wrong.');
        }
    };


    let deleteTaskId = function (callback) {
        taskModel.deleteTask(id, callback);
    };    

    async.waterfall([checkRequest, deleteTaskId], function (err, result) {
        try {
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            response.error = errorCodes['-32000'];
        }
        res.send(response);
    });
}
;


module.exports = {
    addTask,
    listTask,
    updateTask,
    getTaskDetails,
    deleteTask    
};
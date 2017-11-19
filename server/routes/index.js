(function() {

  'use strict';
  const express = require('express');
  const router = express.Router();

  const taskCtrl = require('./task.ctrl'); 
 

  //GET
  router.get('/list-task', taskCtrl.listTask); // get list;

  //POST
  router.post('/add-task', taskCtrl.addTask); // add task;
  router.post('/update-task', taskCtrl.updateTask); // update task;
  router.post('/task-details', taskCtrl.getTaskDetails); // get details;
  router.post('/delete-task', taskCtrl.deleteTask); // get details;

  /* GET home page. */
  /*router.get('/', function(req, res) {
    res.render('index');
  });


  router.get('/task', function(req, res) {
    res.send();
  });*/

  /*router.get('/api/todos', function(req, res) {
    db.todos.find(function(err, data) {
      res.json(data);
    });
  });

  router.post('/api/todos', function(req, res) {
    db.todos.insert(req.body, function(err, data) {
      res.json(data);
    });

  });

  router.put('/api/todos', function(req, res) {

    db.todos.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      isCompleted: req.body.isCompleted,
      todo: req.body.todo
    }, {}, function(err, data) {
      res.json(data);
    });

  });

  router.delete('/api/todos/:_id', function(req, res) {
    db.todos.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });

  });*/

  module.exports = router;

}());

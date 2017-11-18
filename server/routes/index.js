(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();

  const taskCtrl = require('./task.ctrl');
  
  //var mongojs = require('mongoose'); 
  //var db = mongojs('mongodb://localhost/meantodo', ['todos']);

  //Get
  //router.get('/', taskCtrl.listTask); // get list;
  router.post('/add-task', taskCtrl.addTask); // get list;

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

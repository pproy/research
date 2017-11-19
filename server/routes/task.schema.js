'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let taskSchema = new Schema({
  title:  String,  
  description:   String, 
  due_date: { type: Date, default: Date.now },
  status: Boolean
});

let task = mongoose.model('task', taskSchema);


module.exports = {
    task
};
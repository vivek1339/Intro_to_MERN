var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// To-do item model
const Todo = require('../models/Todo');

// Routes
router.get('/api/todos', (req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(404).json({ notodosfound: 'No to-do items found' }));
});

router.post('/api/add', (req, res) => {
  const new_task = new Todo({name:req.body.name, date:req.body.date})
  new_task.save((err)=>{
    if(err) res.sendStatus(400)
    else res.sendStatus(200)
  })
});

router.put('/api/todos/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({ error: 'Unable to update to-do item' }));
});

router.delete('/api/todos/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then(todo => res.json({ success: true }))
    .catch(err => res.status(404).json({ error: 'No to-do item found' }));
});


module.exports = router;

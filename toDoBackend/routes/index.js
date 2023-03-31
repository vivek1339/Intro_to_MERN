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
router.get('/api/get_all', (req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(404).json({ notodosfound: 'No to-do items found' }));
});

router.post('/api/add', (req, res) => {
  const new_task = new Todo({name:req.body.name, date:req.body.date})
  new_task.save()
  .then(()=>{
    res.sendStatus(200)
  })
  .catch((err)=>{
    res.sendStatus(400)
  })
});

router.post('/api/update/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, {name:req.body.name, date:req.body.date}, (err, result)=>{
    if(err){
      res.sendStatus(400)
    }
    else{
      res.send(result)
    }
  })
});

router.delete('/api/todos/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then(todo => res.json({ success: true }))
    .catch(err => res.status(404).json({ error: 'No to-do item found' }));
});


module.exports = router;

var express = require('express');
var router = express.Router();
var cors = require('cors')
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
    .then(todos => {
      console.log(todos)
      res.json(todos)
    })
    .catch(err => res.status(404).json({ notodosfound: 'No to-do items found' }));
});

router.post('/api/add', (req, res) => {
  const new_task = new Todo({name:req.body.name, date:req.body.date})
  new_task.save()
  .then((task_item)=>{
    res.json({id:task_item._id})
  })
  .catch((err)=>{
    res.sendStatus(400)
  })
});

router.post('/api/update/', (req, res) => {
  Todo.findByIdAndUpdate(req.body.id, {name:req.body.name, date:req.body.date})
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    res.sendStatus(400)
  })
  
});

router.post('/api/delete', (req, res) => {
  Todo.deleteOne({_id:req.body.id})
  .then(todo => res.json({ success: true }))
  .catch(err => res.status(404).json({ error: 'No to-do item found' }));
});


module.exports = router;

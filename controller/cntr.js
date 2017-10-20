let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// Connect to Database
mongoose.connect('mongodb://root:root@ds127375.mlab.com:27375/todo_list');

// Create Database Schema
let todoSchema = new mongoose.Schema({
  item: String
});

let Todo = mongoose.model('Todo', todoSchema);

//sending the items to the servers
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    // Get Data from the Database and Send it to the View
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', {tasks: data});
    });
  });
  app.post('/todo', urlencodedParser, function(req, res) {
    //Get Data From the View and Send it to the Database
    let newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
  app.delete('/todo/:item', function(req, res) {
    // Delete the Requested Item from the Database
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}

var Todos = require('../models/todoModel');
var Lists = require('../models/listModel');
var bodyParser = require('body-parser');


module.exports = function(app) {

    // middleware to make sure data is parsed as json and make it available as js object
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended:true }));


    // GET ALL LISTS
    app.get('/api/lists', function(req, res) {
        Lists.find({}, 
            function(err, lists) {
                if (err) throw err;
                res.send(lists);
        });
    });

    // When we define a route URL with :list in it, this function will be run first as middleware
    // rather than doing a query for a specific list each time
    app.param('list', function(req, res, next, id) {
        var query = Lists.findById(id);

        query.exec(function (err, list){
            if (err) { return next(err); }
            if (!list) { return next(new Error('can\'t find list')); }

            req.list = list;
            return next();
        });
    });
       
    // GET A SPECIFIC LIST BY ID
    app.get('/api/lists/:list', function(req, res) {
        req.list.populate('todos', function(err, list) {
            if (err) throw err;
            res.json(req.list);
        });
    });

    // POST A NEW LIST-  will be JSON data in a http req
    app.post('/api/lists', function (req, res) {

        var newList = Lists({
            listname: req.body.listname,     
        });
        
        // save to database the newly created object
        newList.save(function (err) {
            if (err) throw err;
            
            Lists.find({}, function(err, lists) {
                if (err) throw err;

                res.json(lists);
            });
        });

    });
    // POST A NEW TODO to a specific list
    app.post('/api/lists/:list/todos', function(req, res, next) {
        // create a new todo
        var newTodo = Todos({
            username: "test",
            todo: req.body.todo, // assumes the req will contain a todo
            isDone: false
            //hasAttachment: req.body.hasAttachment
        });
        // add the list reference to the new todo obj
        newTodo.list = req.list;
        // save to database the newly created object
        newTodo.save(function (err, todo) {
            if (err) throw err;

            req.list.todos.push(todo);
            req.list.populate('todos', function(err, list) {
                req.list.save(function(err, list) {
                    if (err) throw err;

                    res.send(list);
                });  
            });
          
        });       
    });

    // DELETE LIST
    app.delete('/api/lists/:list', function(req, res) {

        Lists.findByIdAndRemove(req.list, function (err) {
            if (err) throw err;
            // Return the remaining list after removing the given list
            Lists.find({}, function(err, lists) {
                if (err) throw err;

                res.json(lists);
            });
        });

    });



    // HELPERS
    var getData = function(req, res) {
        Todos.find({}, function(err, results) {
            if (err) throw err;

            res.json(results);
        });
    }

    // GET ALL TODOS
    app.get('/api/todos', function(req, res) {
        // finds all todos
        getData(req, res);

    });

    // GET TODOS BY ID
    app.get('/api/todos/:id', function(req, res) {

        Todos.findById({ _id: req.params.id }, function(err, todo) {
            if (err) throw err;

            res.json(todo);
        });
    });
   

    // DELETE TODOS
    app.delete('/api/todos/:id', function(req, res) {
       // find parent list
       Lists.findOne( { todos: { _id: req.params.id }}, function(err, list) {
           if (err) throw err;
           // populate todos in the list
           list.populate('todos', function(err, list) {
                // pull from the list
                list.todos.pull( { _id: req.params.id});
                // save list
                list.save(function(err, list) {
                    if (err) throw err;
                    // provide list as a response
                    res.send(list);      

                });  
            });

        }); 

    }); 


    /* Get by user
    app.get('/api/todos/:uname', function(req, res) {
        Todos.find({ username: req.params.uname },
        // error first callback
        function(err, todos) {
            if (err) throw err;
            res.send(todos);
        });
    });
    */

}
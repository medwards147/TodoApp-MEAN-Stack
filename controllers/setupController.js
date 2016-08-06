var Todos = require('../models/todoModel');
var Lists = require('../models/listModel');

module.exports = function(app) {

    app.get('/api/setupTodos', function(req, res) {

        // seed database
        var starterTodos = [
            { 
                //username: 'test',
                todo: 'Buy milk',
                isDone: false,
                //hasAttachment: false
            },
            { 
                //username: 'test',
                todo: 'Feed dog',
                isDone: false,
                //hasAttachment: false
            },
            { 
                //username: 'test',
                todo: 'Learn node',
                isDone: false,
                //hasAttachment: false
            },
            { 
                //username: 'test',
                todo: 'Generate fake data using json-generator.com',
                isDone: false,
                //hasAttachment: false
            }
        ];
        // mongoose created model with methods availabe such as create
        // takes the data and a callback function to pass errors and results
        Todos.create(starterTodos, function(err, results) {
            res.send(results);
        });

    });

    app.get('/api/setupLists', function(req, res) {
        var starterLists = [
            { listname: 'Groceries'}
            //{ listname: 'Work', posts: ['report', 'admin', 'talk to coworker']},
           // { listname: 'Home Repair', posts: ['bathroom fix', 'kitchen fix', 'talk contractor']},
            //{ listname: 'Gifts', posts: ['jewelry', 'flowers', 'trip']}
        ];

        Lists.create(starterLists, function(err, lists) {
            res.send(lists);
        });
    });

}

/*
Could add checks here to make sure the user is allowed to run this


*/
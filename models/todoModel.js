var mongoose = require('mongoose');

// get Schema object
var Schema = mongoose.Schema;

// create a new Schema object
var todoSchema = new Schema({
    username: String,
    todo: String,
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'Lists' },
    isDone: Boolean
    //hasAttachment: Boolean
});

// create models using the Schema
var Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;
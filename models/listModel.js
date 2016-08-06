var mongoose = require('mongoose');

// get Schema object
var Schema = mongoose.Schema;

var listSchema = new Schema({
    listname: String,
    // category: String,
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todos' }]   //array of objects (multiple todos for a list)
});

var Lists = mongoose.model('Lists', listSchema);

module.exports = Lists;

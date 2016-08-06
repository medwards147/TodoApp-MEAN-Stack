/**
 * The purpose of this is to send to our front-end router handled by angular
 * This is passed to our server.js
*/
var path    = require("path");

module.exports = function(app) {

    /*
    load the single view file (angular will handle the page changes on the front-end
    */
    app.get('/', function(req, res) {
        
        res.sendFile(path.join(__dirname + '/../views/index.html'));
        
    });

}
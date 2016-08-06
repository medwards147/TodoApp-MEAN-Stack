var configValues = require('./config');

module.exports = {
    // mongodb://<dbuser>:<dbpassword>@ds023105.mlab.com:23105/udemy-todo-app
    // could have this function take in a parameter such as "dev" or "test" to define the connection string for the scenario
    getDbConnectionString: function() {
        return "mongodb://" + configValues.uname + ":" + configValues.pwd + "@ds023105.mlab.com:23105/udemy-todo-app";
    }
}
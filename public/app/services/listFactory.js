todoApp.factory('listFactory', ['$http', function($http) {
    var obj = {};   

    obj.getLists = function() {
        return $http.get('/api/lists');
    };

    obj.getList = function(id) {
        return $http.get('/api/lists/' + id);
    };

    obj.createList = function(formData) {
        return $http.post('/api/lists', formData);
    };
    
    obj.deleteList = function(id) {
        return $http.delete('/api/lists/' + id);
    };

    obj.createTodo = function(listId, formData) {
        // formData will be an JSON object with a todo: "todo text" format
        return $http.post('/api/lists/' + listId + '/todos', formData);
    };

    obj.deleteTodo = function(id) {
        return $http.delete('api/todos/' + id);
    };

    obj.lists = obj.getLists();

    return obj;

}]);
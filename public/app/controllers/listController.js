todoApp.controller('listController', ['$http', '$scope', 'listFactory', '$routeParams', function($http, $scope, listFactory, $routeParams) {
    
    $scope.routeparam = $routeParams.id;
    $scope.selected = { id: $routeParams.id } // for setting active class on list
    $scope.formData = {};
    $scope.todoFormData = {};    

    // GET ALL LIST
    $scope.getLists = function() {
        listFactory.getLists()
        .then(
            function(res) {
                $scope.lists = res.data;
            }, function(err) {
                console.log('Error returning all lists: ' + err);
        });
    };
    
    // GET ONE LIST
    $scope.getList = function() {

        listFactory.getList($scope.routeparam).then(
            function(res) {
                $scope.list = res.data;
            }, 
            function(err) {
                console.log('Error getting list by id: ' + err);
            });
    };

    // CREATE LIST
    $scope.createList = function() {
        if (!$scope.formData.listname) { return ; }
        listFactory.createList($scope.formData).then(
            function (res) {
                // clear the form so our user is ready to enter another
                $scope.formData = {};
                $scope.lists = res.data;

            }, function (err) {
                console.log('Error: ' + err);
        });
    };

    // CREATE TODO FOR A LIST
    $scope.createTodo = function() {
        if (!$scope.todoFormData.todo) { return ; }
        // $scope.todoFormData will be set with ng-model in the input field where the user enters a todo
        listFactory.createTodo($scope.routeparam, $scope.todoFormData).then(
            function (res) {
                $scope.todoFormData = {}; // clear the form so our user is ready to enter another
                $scope.list = res.data; // response turns a list with the new todo object pushed into the "todos" property... do I want to set $scope.list.todos ?

            }, function (err) {
                console.log('Error: ' + err);
        });
    };
   
    // DELETE LIST
    $scope.deleteList = function(id) {
        listFactory.deleteList(id).then(
            function(res) {
                $scope.lists = res.data;
            }, function(err) {
                console.log('Error: ' + err);
        });
    };

    // DELETE TODO
    $scope.deleteTodo = function(id) {
        listFactory.deleteTodo(id).then(
            function(res) {
                $scope.list = res.data;
            }, function(err) {
                console.log('Error: ' + err);
            });
    };
    $scope.getLists();
    
    if ($routeParams.id) {
        $scope.getList();
    }
}]);
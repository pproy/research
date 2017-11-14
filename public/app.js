// Define the `taskMngrApp` module
var module = angular.module('taskMngrApp',['ui.router', 'ui.bootstrap']);

module.config(['$stateProvider',  function($stateProvider, $urlRouterProvider) {


	 var modules = {};
    $lazyLoadHelperProvider.setDefaultOptions({
        urlArg: new Date().getTime(),
        modules: modules,
        filePath: '/',
        resolve: {
            someResolve: ['$timeout', function($timeout) {
                return $timeout(function() {}, 1000);
            }]
        }
    });

  
  $stateProvider
    .state('task', {
      url: "/task",
      templateUrl: "app/task.html",
      controller: 'taskController'
    });
    
    /*.state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html",
      controller: 'YourOtherCtrl'
    });*/
    $urlRouterProvider.otherwise("/");
}]);


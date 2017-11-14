// Define the `PhoneListController` controller on the `phonecatApp` module
module.controller('taskController',['$scope', '$uibModal', '$log', function taskController($scope, $uibModal, $log) {
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];


  $scope.tasks = []; //Task array
  $scope.task = {title: '', description: '', dueDate: ''};


  $scope.animationsEnabled = true;

  $scope.modalOpenAddTask = function () {
      /*var parentElem = parentSelector ? 
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;*/
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        //templateUrl: 'taskAdd.html',
        template: '<div></div>',
        controller: 'TaskAddCtrl',
        /*controllerAs: '$ctrl',
        size: size,
        appendTo: parentElem,*/
        resolve: {
          task: function () {
            return $scope.task;
          }
        }
      });

      modalInstance.result.then(function (task) {
        $scope.tasks.push(task); //single valid task added
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
}]);





angular.module('taskMngrApp').controller('TaskAddCtrl', function ($scope, $uibModalInstance, task) {
  var $ctrl = this;
  $ctrl.task = task;
  

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.task);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


});




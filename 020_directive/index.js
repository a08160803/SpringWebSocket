var myApp = angular.module('myApp', []);

myApp.directive("myDirective", function () {
    return {
        scope: {
            control: '='
        },
        link: link
    }

    function link(scope, element, attrs, controller) {
        scope.control.numberFormat = function (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
});

myApp.directive("myDirective2", function () {
    return {
        template: '<button ng-click="buttonClicked();">Click Me</button>',
        scope: {
            // @ 父到directive
            // & directive到父
            // = 雙向
            onButtonClick: '&'
        },
        link: link
    }

    function link(scope, element, attrs, controller) {
        scope.buttonClicked = function () {
            scope.onButtonClick();
        }
    }
});

myApp.controller('xxxxxxx', ['$scope', function ($scope) {
    $scope.numberControl = {};
    $scope.totalMoney = '12345679';
    
    $scope.changeValue = function (totalMoney) {
        if ($scope.numberControl.numberFormat) {
            $scope.totalMoney = $scope.numberControl.numberFormat(totalMoney);
        }
    }
    $scope.changeValue($scope.totalMoney);

    // --------------------------------------------------------------------
    $scope.directiveButtonClicked = function () {
        alert('button was clicked in directive');
    }
}]);
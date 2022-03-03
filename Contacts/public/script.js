var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    var getData = function() {
        console.log('inside the get data');
        return $http( {
            method: 'GET',
            url: '/contact'
        }).then(function successCallback(response) {
            $scope.contacts = response.data;
            console.log(response.data);
        }, function errorCallback(response) {
            console.log('Error: ' + response);
        });
    };
    getData();
    $scope.del_contact = function(contact) {
        $http( {
            method: 'DELETE',
            url: '/contact/:id',
            params: {'id': contact.id}
        }).then(function successCallback(response) {
            console.log(response);
            return getData();
        }, function errorCallback(response) {
            console.log('Error: ' + response);
        });
    };
    $scope.add_contact = function() {
        console.log('inside the fun add')
        var body = '{ "name": "' + $scope.Name +
        '", "email": "' + $scope.Email +
        '", "id": "' + $scope.Id +
        '", "message": "' + $scope.Message +
        '", "phone": "' + $scope.Phone + '" }';
        $http({
            method: 'POST',
            url: '/contact',
            data: body
        }).then(function successCallback(response) {
            console.log(response);
            return getData();
        }, function errorCallback(response) {
            console.log('Error: ' + response);
        });
    };
});
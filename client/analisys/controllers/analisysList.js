/**
 * Created by Andrea on 07/06/2015.
 */
angular.module("sam-1").controller("AnalisysListCtrl",['$scope','$meteor','ModalService',
    function($scope, $meteor, ModalService) {
        $scope.analisysList = $meteor.collection(Analisys);
        $scope.headers = ['', 'Nombre'];

        $scope.showTextSearch = true;
        $scope.showAddNew = function(ev) {
            ModalService.showModal(AddAnalisysController, 'client/analisys/views/addAnalisys.tmpl.ng.html', ev);
        }
        $scope.toggleSearch = function() {
            $scope.showTextSearch = !$scope.showTextSearch;
        }

    }]);

function AddAnalisysController($scope, $meteor, notificationService, $mdDialog) {

    $scope.analisysList = $meteor.collection(Analisys);
    $scope.areas = $meteor.collection(Areas);
    $scope.labs = $meteor.collection(Labs);
    $scope.exams = $meteor.collection(Exams);
    $scope.selectedExam = {};
    $scope.selectedExams = [];
    $scope.selectedExamsIds = [];

    $scope.save = function() {
        var examsToJson = angular.toJson($scope.selectedExamsIds);
        var examsToArray = JSON.parse(examsToJson);
        $scope.newAnalisys.exams = examsToArray;

        $scope.analisysList.save($scope.newAnalisys).then(function(number) {
            notificationService.showSuccess("Se ha registrado correctamente el Analisis clinico");
        }, function(error){
            notificationService.showError("Error en el registro del area");
            console.log(error);
        });
        $scope.newAnalisys = '';
        $mdDialog.hide();
    }

    $scope.saveExam = function() {
        $scope.selectedExams.push($scope.selectedExam);
        $scope.selectedExamsIds.push($scope.selectedExam._id);
    }

    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}
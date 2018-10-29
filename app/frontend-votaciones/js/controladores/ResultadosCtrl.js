angular.module('votacioneslive')

.controller('ResultadosCtrl', function($scope,  $uibModal, USER, AuthServ, toastr, $q, $http, MySocket, $window){

	$scope.imprimir = function() {
		
		window.print();
    };

	$scope.exportar_excel = function() {
		$window.open(window.location.protocol + '//' + window.location.hostname + ':3000/api/Exportar/exportar-usuarios');
		/*
		$http.get('::Exportar/exportar-usuarios',  {params: {}}).then(function(result){
			
		}, function(tx){
			console.log('error', tx);
		});*/
		
    };


	
  $http.get('::resultado',  {params: {Votacion_id: $scope.USER.Votacion_id}}).then(function(result){
		$scope.Aspiraciones = result.data;

		console.log($scope.Aspiraciones);

		
		$scope.Aspiraciones.forEach(function(aspiracion, indice){


			$scope.cadidatos_de_aspiracion(aspiracion);

	MySocket.on('Voto_enviado', function(data){
		
		$scope.cadidatos_de_aspiracion(aspiracion);
		
	});	 
		})

	}, function(tx){
		console.log('error', tx);
	});

	$scope.cadidatos_de_aspiracion = function(aspiracion){

    	 $http.get('::resultado/CandidatoAspiracion',  {params: {id: aspiracion.rowid}}).then(function(result){
			aspiracion.Candidatos = result.data;

			console.log(result.data);
			

		}, function(tx){
			console.log('error', tx);
		});

	}
 
})
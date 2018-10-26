angular.module('votacioneslive')

.controller('ResultadosCtrl', function($scope,  $uibModal, USER, AuthServ, toastr, $q, $http, MySocket){

	
  $http.get('::resultado',  {params: {Votacion_id: $scope.USER.Votacion_id}}).then(function(result){
		$scope.Aspiraciones = result.data;

		
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
			

		}, function(tx){
			console.log('error', tx);
		});

	}
 
})
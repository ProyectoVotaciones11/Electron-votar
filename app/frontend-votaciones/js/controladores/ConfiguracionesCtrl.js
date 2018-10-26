angular.module('votacioneslive')

.controller('ConfiguracionesCtrl', function($scope,  $uibModal, USER, AuthServ, toastr, $http){

	console.log(USER);

	$scope.perfil = {};


		$scope.Tabla_Participantes = function(){

		
		$http.get('::usuarios').then (function(result){
			$scope.Participantes = result.data.participantes ;
			for (var i = 0; i < $scope.Participantes.length; i++) {

				if ($scope.Participantes[i].rowid == USER.rowid) {
					$scope.perfil = $scope.Participantes[i];
					console.log($scope.perfil)
				}
				
			}

	
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    }

   

		$scope.Tabla_Participantes();

			    
	  $scope.Modificar_perfil = function(modificar){

	  	console.log(modificar);

		$scope.Tabla_Participantes();

			$http.get('::configuraciones/editar',  {params: { rowid: modificar.rowid, Nombres: modificar.Nombres, Apellidos: modificar.Apellidos, Sexo: modificar.Sexo, Username: modificar.Username, Password: modificar.Password } }).then (function(result){

					console.log(result)

				}, function(tx){
					console.log('error', tx);
				});
			return
			

	}
 
    
})

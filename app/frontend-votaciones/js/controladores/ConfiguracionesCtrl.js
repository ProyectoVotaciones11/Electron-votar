angular.module('votacioneslive')

.controller('ConfiguracionesCtrl', function($scope,  $uibModal, USER, AuthServ, toastr, $http){

	console.log(USER);


		$scope.Tabla_Participantes = function(){

		
		$http.get('::usuarios').then (function(result){
			$scope.Participantes = result.data ;

			console.log($scope.Participantes);
	
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    }

    $scope.Tabla_Votaciones = function(){

			$http.get('::votaciones').then (function(result){
			  $scope.votaciones = result.data ;
					

				}, function(tx){
					toastr.error('Error trayendo votaciones');
				});

		}

		$scope.Tabla_Votaciones();	
	

		$scope.Tabla_Participantes();

			    
	  $scope.Modificar_perfil = function(modificar){

		$scope.Tabla_Participantes();

			$http.get('::configuraciones/editar',  {params: { rowid: modificar.rowid, Nombres: modificar.Nombres, Apellidos: modificar.Apellidos, Sexo: modificar.Sexo, Username: modificar.Username, Password: modificar.Password } }).then (function(result){

					console.log(result)

				}, function(tx){
					console.log('error', tx);
				});
			return
			

	}
 
    
})

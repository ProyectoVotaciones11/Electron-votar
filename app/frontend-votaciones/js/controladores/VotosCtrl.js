angular.module('votacioneslive')

.controller('VotosCtrl', function($scope,ConexionServ,$filter, $http, MySocket){

	ConexionServ.createTables();

	$scope.Tabla_Votos = function(){

		$http.get('::votos').then (function(result){

			$scope.Votos = result.data;

		}, function(tx){
			console.log('error', tx);
		});


	}


	$scope.Tabla_de_aspiraciones = function(){

		$http.get('::aspiraciones').then (function(result){
			  $scope.Aspiraciones = result.data ;

		}, function(tx){
			console.log('error', tx);
		});

	}

	$scope.Tabla_candidatos = function(){

		$http.get('::candidatos').then (function(result){
			$scope.Candidatos = result.data ;
	
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			

	}

	$scope.Tabla_Participantes = function(){

		
		$http.get('::usuarios').then (function(result){
			$scope.Participantes = result.data ;
	
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    };

		$scope.Tabla_Votos();
		$scope.Tabla_candidatos();
		$scope.Tabla_Participantes();
		$scope.Tabla_de_aspiraciones();


	

	$scope.Delete_Votos = function(votos){

		$http.delete('::votos/eliminar', {params: { id: votos.rowid} }).then (function(result){

				 $scope.Tabla_Votos();

			}, function(tx){
				console.log('error', tx);
			});

		}


	MySocket.on('Voto_enviado', function(data){
		
		$scope.Tabla_Votos();
		
	});	 

	

})
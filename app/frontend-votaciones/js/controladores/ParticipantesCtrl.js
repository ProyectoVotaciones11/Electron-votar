angular.module('votacioneslive')

.controller('ParticipantesCtrl', function($scope,$filter, $http,  $state, $anchorScroll, $location){

	$scope.Mostrar_Participantes 		= false;
	$scope.Participante_nuevo 			= {};
	$scope.Mostrar_tabla_crear 			= false;
	$scope.data 						= [];

	if ($scope.USER.Tipo == "Participante") {
		 $state.go('panel');
	}

	

	$scope.Tabla_Participantes = function(){

		
		$http.get('::usuarios').then (function(result){
			console.log(result)
			$scope.Participantes 		= result.data.participantes ;
			$scope.data.grupos 			= result.data.grupos ;

			if ($scope.data.grupos.length>0) {
				$scope.data.grupo_seleccionado 	= $scope.data.grupos[0];
			}
			
	
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    };

    $scope.traerAlumnos = function(grupo){
    	console.log(grupo);

		
		$http.put('::usuarios/participantes-por-grupo', {Grupo_id: grupo}).then (function(result){
			$scope.Participantes = result.data ;
	
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    };

    $scope.Tabla_Votaciones = function(){

			$http.get('::votaciones').then (function(result){
			  $scope.votaciones = result.data ;
					

				}, function(tx){
					toastr.error('Error trayendo votaciones');
				});

		}

		$scope.Tabla_Votaciones();	
	

		$scope.Tabla_Participantes();


	$scope.Insert_Participantes = function(crear){

		if (crear.Nombres == undefined) {
			console.log("esta nulo");
			return;
		}
		if (crear.Sexo == undefined) {
			console.log("esta nulo");
			return;
		}

		$http.get('::usuarios/insertar', {params: {Nombres: crear.Nombres, Apellidos: crear.Apellidos, Sexo: crear.Sexo, Username: crear.Username, Password: crear.Password, Tipo: crear.Tipo, Grupo_id: crear.Grupo_id, Votacion_id: crear.Votacion_id   }  }).then (function(result){
	     

			$scope.Mostrar_tabla_crear = false;

			$scope.Participante_nuevo = {};

			$scope.Tabla_Participantes();

		}, function(tx){
			console.log('error', tx);
		});

	}

	$scope.Delete_Participantes = function(participantes){

			$http.delete('::usuarios/eliminar', {params: { id: participantes.rowid} }).then (function(result){

				 $scope.Tabla_Participantes();

			}, function(tx){
				console.log('error', tx);
			});

		}

	$scope.Modificar_Participante = function(modificar){

		if(modificar.Mostrar_Participante == true){
			modificar.Mostrar_Participante = false;

			$http.get('::usuarios/editar',  {params: { rowid: modificar.rowid, Nombres: modificar.Nombres, Apellidos: modificar.Apellidos, Sexo: modificar.Sexo, Username: modificar.Username, Password: modificar.Password , Grupo_id: modificar.Grupo_id, Votacion_id: modificar.Votacion_id, Tipo: modificar.Tipo } }).then (function(result){
               
              

					$scope.Tabla_Participantes();

				}, function(tx){
					console.log('error', tx);
				});
			return
		}
		
		for (var i = 0; i < $scope.Participantes.length; i++) {
			$scope.Participantes[i].Mostrar_Participante = false;


		}

		modificar.Mostrar_Participante = true;

			

	}

	$scope.Ocultar_Tabla_de_Editar = function(modificar){
		
		if(modificar.Mostrar_Participante == true){
			modificar.Mostrar_Participante = false;

				};

		}

	$scope.Mostrar_tabla_De_Crear = function(){
		
		$scope.Mostrar_tabla_crear = true;
		$location.hash('fila-participante-nuevo');
      	$anchorScroll();
	}

	$scope.Ocultar_participantes = function(){
			
		$scope.Mostrar_tabla_crear = false;

	}



})

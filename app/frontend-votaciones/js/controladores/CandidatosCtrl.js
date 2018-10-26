angular.module('votacioneslive')

.controller('CandidatosCtrl', function($scope,ConexionServ,$filter, $http){

	$scope.Mostrar_Candidatos = false;
	$scope.Candidatos_nuevo = {};
	$scope.Mostrar_tabla_crear = false;



	$scope.Tabla_candidatos = function(){

		$http.get('::candidatos').then (function(result){
			$scope.Candidatos = result.data ;
	
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			

	}

	$scope.Tabla_de_aspiraciones = function(){

		$http.get('::aspiraciones').then (function(result){
			  $scope.Aspiraciones = result.data ;

		}, function(tx){
			console.log('error', tx);
		});

	}

	$scope.Tabla_de_aspiraciones();

	$scope.Tabla_candidatos();


		$scope.Modificar_Candidatos = function(modificar){

		if(modificar.Mostrar_Candidatos == true){
			modificar.Mostrar_Candidatos = false;

		$http.get('::candidatos/editar',  {params: { rowid: modificar.rowid, Nombres: modificar.Nombres, Apellidos: modificar.Apellidos, Sexo: modificar.Sexo, Foto: modificar.Foto, aspiracion_id: modificar.aspiracion_id , Grupo_id: modificar.Grupo_id } }).then (function(result){
               				
								$scope.Tabla_candidatos();

						}, function(tx){
							console.log('error', tx);
					});
		return

		}
				for (var i = 0; i < $scope.Candidatos.length; i++) {
					$scope.Candidatos[i].Mostrar_Candidatos = false;

				}


				modificar.Mostrar_Candidatos = true;


	}


	$scope.Insert_Candidatos = function(crear){

		if (crear.Nombres == undefined) {
			console.log("esta nulo");
			return;
		}
		if (crear.Sexo == undefined) {
			console.log("esta nulo");
			return;
		}

		$http.get('::candidatos/insertar', {params: {Nombres: crear.Nombres, Apellidos: crear.Apellidos, Sexo: crear.Sexo, Grupo_id: crear.Grupo_id, Foto: crear.Foto, aspiracion_id: crear.aspiracion_id}}).then(function(result){
	
			$scope.Tabla_candidatos();

			$scope.Mostrar_tabla_crear = false;

			$scope.Candidatos_nuevo = {};


		}, function(tx){
			console.log('error', tx);
		});

	}

	$scope.Delete_Candidatos = function(candidatos){

			$http.delete('::candidatos/eliminar', {params: { id: candidatos.rowid} }).then (function(result){

				 $scope.Tabla_candidatos();

			}, function(tx){
				console.log('error', tx);
			});

		}



	$scope.Ocultar_Tabla_de_Editar = function(modificar){
		
		if(modificar.Mostrar_Candidatos == true){
			modificar.Mostrar_Candidatos = false;

				};

		}

	$scope.Mostrar_tabla_De_Crear = function(){
		
		$scope.Mostrar_tabla_crear = true;

		}

	$scope.Ocultar_Candidato = function(){
			
		$scope.Mostrar_tabla_crear = false;

		}

})
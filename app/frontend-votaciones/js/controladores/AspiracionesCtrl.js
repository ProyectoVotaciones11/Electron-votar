angular.module('votacioneslive')

.controller('AspiracionesCtrl', function($scope,ConexionServ,$filter, $uibModal, $http){

	$scope.Mostrar_Aspiraciones = false;
	$scope.nueva_Aspiraciones = {};
	$scope.Mostrar_tabla_crear = false;

	ConexionServ.createTables();

	$scope.Tabla_de_aspiraciones = function(){

		$http.get('::aspiraciones').then (function(result){
			  $scope.Aspiraciones = result.data ;

		}, function(tx){
			console.log('error', tx);
		});

	}

	$scope.Tabla_candidatos = function(){

		$http.get('::votaciones').then (function(result){
			$scope.votaciones = result.data ;
	
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			

	}

	$scope.Tabla_candidatos();

	$scope.Tabla_de_aspiraciones();

		

	$scope.Insert_Aspiraciones = function(crear){

		console.log(crear.votacion_id);

		if (crear.aspiracion == undefined) {
			console.log("esta nulo");
			return;
		}
		if (crear.descripcion == undefined) {
			console.log("esta nulo");
			return;
		}

		
		$http.get('::aspiraciones/insertar',  {params: { votacion_id: crear.votacion_id ,aspiracion: crear.aspiracion, descripcion: crear.descripcion}}).then(function(result){
		
	
			$scope.Tabla_de_aspiraciones();

			$scope.Mostrar_tabla_crear = false;

			$scope.nueva_Aspiraciones = {};

		}, function(tx){
			console.log('error', tx);
		});



		}

	$scope.Delete_Aspiraciones = function(aspiraciones){

		$http.delete('::aspiraciones/eliminar', {params: { id: aspiraciones.rowid} }).then (function(result){

					 $scope.Tabla_de_aspiraciones();

				}, function(tx){
					console.log('error', tx);
				});
	
		}

	$scope.Modificar_Aspiraciones = function(modificar){
		if(modificar.Mostrar_Aspiraciones == true){
			modificar.Mostrar_Aspiraciones = false;

				$http.get('::aspiraciones/editar',  {params: { id: modificar.id, votacion_id: modificar.votacion_id,  aspiracion: modificar.aspiracion, descripcion: modificar.descripcion, rowid: modificar.rowid}}).then(function(result){
				

					$scope.Tabla_de_aspiraciones();

				}, function(tx){
					console.log('error en modificar', tx);
				});
			return
		}
		
		for (var i = 0; i < $scope.Aspiraciones.length; i++) {
			$scope.Aspiraciones[i].Mostrar_Aspiraciones = false;

		}

		modificar.Mostrar_Aspiraciones = true;


	}


	$scope.Ocultar_Tabla_de_Editar = function(modificar){
		
		if(modificar.Mostrar_Aspiraciones == true){
			modificar.Mostrar_Aspiraciones = false;

				};

		}

	$scope.Mostrar_tabla_De_Crear = function(){
		
		$scope.Mostrar_tabla_crear = true;

		}

	$scope.Ocultar_Aspiraciones = function(){
			
		$scope.Mostrar_tabla_crear = false;

		}

	$scope.open = function (size, parentSelector) {

    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
     
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return ;
        }
      }
    });

  }

	



})
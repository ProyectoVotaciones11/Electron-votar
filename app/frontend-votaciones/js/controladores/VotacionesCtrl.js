angular.module('votacioneslive')

.controller('VotacionesCtrl', function($scope,ConexionServ,$filter, $uibModal, toastr, $http){

	$scope.Mostrar_Votaciones = false;
	$scope.Votaciones_nuevo = {};
	$scope.Mostrar_tabla_crear = false;
	$scope.Cambiar_contrasena = false;
	$scope.Primera_password = false;
	$scope.Comfirmar_Primera_password = false;


	

		$scope.Tabla_Votaciones = function(){

			$http.get('::votaciones').then (function(result){
			  $scope.votaciones = result.data ;
					

				}, function(tx){
					toastr.error('Error trayendo votaciones');
				});

		}

		$scope.Tabla_Votaciones();	

	$scope.Insert_Votaciones = function(crear){

		if (crear.Nombre == undefined) {
			console.log("esta nulo");
			return;
		}
		if (crear.Alias == undefined) {
			console.log("esta nulo");
			return;
		}

			$http.get('::votaciones/insertar',  {params: { Nombre: crear.Nombre, Alias: crear.Alias, descripcion: crear.descripcion, Username: crear.Username}}).then(function(result){
			

					$scope.Mostrar_tabla_crear = false;

					$scope.Votaciones_nuevo = {};

					$scope.Tabla_Votaciones();	

				}, function(tx){
					console.log('error', tx);
				});

		}

	$scope.Delete_Votaciones = function(votaciones){
		
		$http.delete('::votaciones/eliminar', {params: { id: votaciones.rowid} }).then (function(result){


				$scope.Tabla_Votaciones();	

		   }, function(tx){
			   console.log('error', tx);
		   });

		}


	$scope.Modificar_Votaciones = function(modificar){

		if(modificar.Mostrar_Votaciones == true){
			modificar.Mostrar_Votaciones = false;

			$http.get('::votaciones/editar',  {params: { Nombre: modificar.Nombre, Alias: modificar.Alias, descripcion: modificar.descripcion, Username: modificar.Username, Password: modificar.Password, rowid: modificar.rowid}}).then(function(result){
				

				$scope.Tabla_Votaciones();	

				}, function(tx){
					console.log('error', tx);
				});
			return
		}
		
		for (var i = 0; i < $scope.votaciones.length; i++) {
			$scope.votaciones[i].Mostrar_Votaciones = false;
		}
		modificar.Mostrar_Votaciones = true;

	}
	
	
	$scope.ver_aspiraciones = function(votacion){
		
		ConexionServ.query("SELECT a.rowid, a.*  FROM Aspiraciones a WHERE votacion_id=?", [votacion.rowid]).then(function(result){
			$scope.Aspiraciones = result;
			console.log(' tabla Aspiraciones ', result);

		}, function(tx){
			console.log('error', tx);
		});
			
	}
	$scope.copiar_votaciones = function(){
		

	    var modalInstance = $uibModal.open({
	        templateUrl: 'templates/CopiarAspiracionesModal.html',
	        resolve: {
		        votaciones: function () {
		        	return $scope.votaciones;
		        }
		    },
	        controller: 'CopiarAspiracionesModalCtrl' // En LibroMesModales.js 
	    });

	    modalInstance.result.then(function (result) {
			console.log(result);
	    }, function(r2){
	    	$scope.traerDatos();
	    });
			
	}

	$scope.Anadir_Aspiraciones = function(modificar){

		ConexionServ.query("UPDATE Aspiraciones  SET votacion_id=? WHERE rowid=? ", [modificar, modificar.rowid]).then(function(result){
					console.log("hola")

				}, function(tx){
					console.log('error en modificar', tx);
				});


	}


	$scope.Ocultar_Tabla_de_Editar = function(modificar){
		
		if(modificar.Mostrar_Votaciones == true){
			modificar.Mostrar_Votaciones = false;
			
				};
		}

	$scope.Mostrar_tabla_De_Crear = function(){
		
		$scope.Mostrar_tabla_crear = true;

		}

	$scope.Ocultar_Votacion = function(){
			
		$scope.Mostrar_tabla_crear = false;

		}

	$scope.Mostrar_Cambiar_contrasena = function(modificar, Primera_password, Comfirmar_Primera_password){

		if(modificar.Cambiar_contrasena == true){
			modificar.Cambiar_contrasena = false;

			if (modificar.Primera_password == modificar.Comfirmar_Primera_password) {

				ConexionServ.query("UPDATE Votaciones  SET  Password=? WHERE rowid=? ", [ modificar.Primera_password,  modificar.rowid]).then(function(result){
				console.log("hola")

						$scope.Tabla_Votaciones();	

					}, function(tx){
						console.log('error', tx);
					});

			}else{
				console.log("nulo")
			}

			return
		}

			for (var i = 0; i < $scope.votaciones.length; i++) {
			$scope.votaciones[i].Cambiar_contrasena = false;
		}
		modificar.Cambiar_contrasena = true;


		}

	$scope.ocultar_Cambiar_contrasena = function(modificar){
		
		modificar.Cambiar_contrasena = false;

	}

})




.controller("CopiarAspiracionesModalCtrl", function($uibModalInstance, $scope, votaciones, ConexionServ, toastr, $filter) {
    $scope.votaciones = votaciones;

    


    $scope.ok = function () {
        $uibModalInstance.close('Cerrado');
    };


    $scope.copiar = function(votacion) {

        consulta 	= 'UPDATE lib_semanales SET ' + columna + '=? WHERE rowid=?';
        colum 		= columna.charAt(0).toUpperCase() + columna.slice(1);
        
        ConexionServ.query(consulta, [libro[columna], libro.rowid]).then(function(){

            
        }, function(){
            toastr.error(colum + ' NO guardado');
        });

    }
    


    return ;
})





angular.module('votacioneslive')

.controller('VotacionesCtrl', function($scope,ConexionServ,$filter, $uibModal, toastr, $http, $state){

	$scope.Mostrar_Votaciones = false;
	$scope.Votaciones_nuevo = {};
	$scope.Mostrar_tabla_crear = false;
	$scope.Mostrar_planchas = false;
	

	if ($scope.USER.Tipo != "Admin") {
		 $state.go('panel');
	}


		$scope.Tabla_Votaciones = function(){

			$http.get('::votaciones').then (function(result){
			  $scope.votaciones = result.data ;

			  

				}, function(tx){
					toastr.error('Error trayendo votaciones');
				});

		}

		$scope.Borrar_Participantes = function(votacion){

			$http.get('::votaciones/Borrar-participantes',{params: { id: votacion.rowid} }).then (function(result){
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

		if (crear.actual == "si") {
			crear.actual = 1;

			$http.get('::votaciones/actual').then(function(result){
			
				}, function(tx){
					console.log('error', tx);
				});

		}else{
			crear.actual = 0;
		}


			$http.get('::votaciones/insertar',  {params: { Nombre: crear.Nombre, Alias: crear.Alias, actual: crear.actual,  descripcion: crear.descripcion, Username: crear.Username}}).then(function(result){
			
			
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

	$scope.Copiar_participantes = function(votaciones, vota){

		console.log(votaciones, vota)
		
		$http.put('::votaciones/Copiar-Participantes', { Votacion_id: vota.rowid, Votacion_copiada_rowid: votaciones.rowid} ).then (function(result){


				$scope.Tabla_Votaciones();	

		   }, function(tx){
			   console.log('error', tx);
		   });

		}


	$scope.elegir_votacion = function( vota ){
		

	    var modalInstance = $uibModal.open({
	        templateUrl: 'templates/elegirVotacion.html',
	        resolve: {
		        votaciones: function () {
		        	return $scope.votaciones;
		        },
		        
		    },
	        controller: 'VotaCtrlModal' // En LibroMesModales.js 
	    });

	    modalInstance.result.then(function (result) {
			console.log(result);

			$scope.Copiar_participantes(result, vota);

	    }, function(r2){
	    	
	    });
			
	}


	$scope.Modificar_Votaciones = function(modificar){

		if(modificar.Mostrar_Votaciones == true){
			modificar.Mostrar_Votaciones = false;

			if (modificar.actual == "si") {
			modificar.actual = 1;

			$http.get('::votaciones/actual').then(function(result){
			
				}, function(tx){
					console.log('error', tx);
				});

			}else{
				modificar.actual = 0;
			}


			$http.get('::votaciones/editar',  {params: { Nombre: modificar.Nombre, Alias: modificar.Alias, descripcion: modificar.descripcion, actual: modificar.actual, Username: modificar.Username, Password: modificar.Password, rowid: modificar.rowid}}).then(function(result){
				

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

	$scope.Cambiar_actual = function(vota){

		if (vota.actual == 0 ) {
			$http.get('::votaciones/actual').then(function(result){

					$http.get('::votaciones/actual2',  {params: { rowid: vota.rowid}}).then(function(result){

						$scope.Tabla_Votaciones();	
							
						}, function(tx){
							console.log('error', tx);
						});	

				}, function(tx){
					console.log('error', tx);
				});
		}

			

	}
	
	
	$scope.Ver_Planchas = function(votacion){
		$scope.Planchas = [];

		$scope.votacion_plancha = votacion;
		
		$http.get('::votaciones/Traer-planchas').then (function(result){

			$scope.Mostrar_planchas = true;

			for (var i = 0; i < result.data.length; i++) {
			
				if (result.data[i].votacion_id == votacion) {
					$scope.Planchas.push(result.data[i]);
				}
			}	

		   }, function(tx){
			   console.log('error', tx);
		   });
			
	}

	$scope.Crear_plancha = function(votacion){
		
		$scope.Traer_planchas($scope.Planchas, $scope.votacion_plancha);					   
		
	}

	


	$scope.Editar_plancha = function( plancha ){
		

	    var modalInstance = $uibModal.open({
	        templateUrl: 'templates/EditarPlanchaModal.html',
	        resolve: {
		        plancha: function () {
		        	return plancha;
		        },
		        votacion: function () {
		        	return $scope.votacion_plancha;
		        }
		    },
	        controller: 'PlanchaModalCtrl2' // En LibroMesModales.js 
	    });

	    modalInstance.result.then(function (result) {
			console.log(result);

			$scope.Ver_Planchas(result);

	    }, function(r2){
	    	
	    });
			
	}


	$scope.Traer_planchas = function( plancha , votacion){
		

	    var modalInstance = $uibModal.open({
	        templateUrl: 'templates/PlanchasModal.html',
	        resolve: {
		        plancha: function () {
		        	return plancha;
		        },
		        votacion: function () {
		        	return votacion;
		        }
		    },
	        controller: 'PlanchaModalCtrl' // En LibroMesModales.js 
	    });

	    modalInstance.result.then(function (result) {
			console.log(result);

			$scope.Ver_Planchas(result);

	    }, function(r2){
	    	
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
})


.controller("PlanchaModalCtrl", function($uibModalInstance, $scope, plancha, votacion,  ConexionServ, toastr, $filter, $http) { 

   		$scope.plancha_nueva = {};

        $scope.plancha = plancha;
         console.log(  votacion);

   

   $scope.Craer_plancha = function(Plancha){

   	console.log(Plancha);
		
		$http.get('::Plancha/insertar', {params: { Nombre: Plancha, votacion_id: votacion }}).then (function(result){
	

		   }, function(tx){
			   console.log('error', tx);
		   });

		$uibModalInstance.close(votacion);

		}
 

    $scope.ok = function () {
       $uibModalInstance.close(votacion);
    };


    return ;
})

.controller("PlanchaModalCtrl2", function($uibModalInstance, $scope, plancha, votacion,  ConexionServ, toastr, $filter, $http) { 

        $scope.plancha = plancha;
         console.log(  votacion);

   $scope.Editar_planch = function(Plancha){

   	console.log(Plancha);
		
		$http.get('::Plancha/editar', {params: { Nombre: Plancha.Nombre, rowid: Plancha.rowid }}).then (function(result){
	

		   }, function(tx){
			   console.log('error', tx);
		   });

		$uibModalInstance.close(votacion);

		}

	$scope.Eliminar_plancha = function(){

		$http.delete('::Plancha/eliminar', {params: { id: plancha.rowid} }).then (function(result){			

		   }, function(tx){
			   console.log('error', tx);
		   });
		$uibModalInstance.close(votacion);
	}
 

    $scope.ok = function () {
       $uibModalInstance.close(votacion);
    };


    return ;
})

.controller("VotaCtrlModal", function($uibModalInstance, $scope, votaciones , ConexionServ, toastr, $filter, $http) { 

        $scope.Votaciones = votaciones;
         console.log(  votaciones);

	$scope.Votacion_elegida = function (vota) {
       $uibModalInstance.close(vota);
    };
	

    $scope.ok = function () {
       $uibModalInstance.close();
    };


    return ;
})





angular.module('votacioneslive')


.controller('VotarCtrl', function($scope, $state,  AuthServ, $q, toastr, $http,$uibModal, MySocket, $interval){

	$scope.Moatrar_Contralos = false; 


    $http.get('::votar', {params: {Votacion_id: $scope.USER.Votacion_id}}).then(function(result){
		$scope.Aspiraciones = result.data;
	


		$scope.completado 	= false;
		$scope.contador 	= 0;

		for (let j = 0; j <	$scope.Aspiraciones.length; j++) {

			$scope.cadidatos_de_aspiracion($scope.Aspiraciones[j]);
		
			found = false;

			for (let i = 0; i <	 $scope.USER.votos.length; i++) {			 

				if ($scope.USER.votos[i].aspiracion_id == $scope.Aspiraciones[j].rowid) {

					found 				= true;
					$scope.contador 	= $scope.contador + 1;
				
				}
					    
			};				

			if (found) {
				$scope.Aspiraciones[j].activa = false;
			}else{
				$scope.Aspiraciones[j].votada = true;
			}

			

			/*
			promesa = $scope.cadidatos_de_aspiracion($scope.Aspiraciones[j]);
			promesa.then(function(){

				$scope.contador 	= $scope.contador + 1;

				if ($scope.contador == $scope.Aspiraciones.length) {
					$scope.completado 				= true;
					$scope.Aspiraciones[0].activa 	= true;
				}
			}, function(er){
				console.log(er);
			});
			*/

		}

		if ($scope.contador == $scope.Aspiraciones.length) {
			$state.go('panel');
		}


		for (let j = 0; j <	$scope.Aspiraciones.length; j++) {

			if ($scope.Aspiraciones[j].votada) {
				$scope.Aspiraciones[j].activa = true;
				
				$scope.checkear_logueo($scope.Aspiraciones[j].rowid);
				return
			}

		}

	}, function(tx){
		console.log('error 1', tx);
	});
	
	$scope.checkear_logueo = function(rowid){

		stop = $interval(function(){
			if (MySocket.check_logueo()){
				$scope.stopFight();
				MySocket.emit('Enviar_voto', { id: rowid, can: $scope.USER.rowid} );
			}
		}, 100)
		
        $scope.stopFight = function() {
			if (angular.isDefined(stop)) {
				$interval.cancel(stop);
				stop = undefined;
			}
		}
	}

	$scope.cadidatos_de_aspiracion = function(aspiracion){

		var defered = $q.defer();
    	$http.get('::votar/CandidatoAspiracion',  {params: {id: aspiracion.rowid}}).then(function(result){
			aspiracion.Candidatos = result.data;

			defered.resolve(' ');
		}, function(tx){
			console.log('error 2', tx);
			defered.reject('Error 4')
		});

    	return defered.promise;
	}

	$scope.Tabla_Votos = function(){

		$http.get('::votos').then (function(result){

			$scope.Votos = result.data;

		}, function(tx){
			console.log('error', tx);
		});

	}

	$scope.Cambiar_active = function(numero, candidato){


		var modalInstance = $uibModal.open({
	        templateUrl: 'templates/Question_vot.html',
	        resolve: {
		        candidato: function () {
		        	return  candidato;
		        }
		    },
	        controller: 'Question_vot'  
	    });

	    modalInstance.result.then(function (result) {
			console.log(result);

			$scope.Voto = result

			var fecha = new Date;

			if ($scope.Voto =='Voto') {
			
		 fecha_nac = '' + fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + (fecha.getDate() + 1) + '/' + fecha.getHours() + ' :' +  fecha.getMinutes() + ' :' + fecha.getSeconds();

			$http.get('::votar/Cambiaractive', {params: { user_id: $scope.USER.rowid, id: candidato.rowid, aspiracion_id: candidato.aspiracion_id, fecha: fecha_nac }}).then(function(result){

				$scope.ascandi = candidato.aspiracion_id	

				MySocket.emit('Enviar_voto',{id:($scope.ascandi + 1), can: $scope.USER.rowid});

				$scope.USER.votos.push(result.config.params);	

				localStorage.USER = JSON.stringify($scope.USER);

				if ((numero+1) == $scope.Aspiraciones.length) {

					if ($scope.USER.Tipo == "Participante") {

						 AuthServ.cerrar_sesion();                           
                           $state.go('Login');
					}else{
						$state.go('Panel');
					}
				}

				for (var i = 0; i < $scope.Aspiraciones.length; i++) {
					
					$scope.Aspiraciones[i].activa = false;
				}

				$scope.Aspiraciones[numero + 1].activa  = true;

				}, function(tx){
					console.log('error 3', tx);
					
				});

		}

	    }, function(r2){
	    	console.log(r2);
	    });

	}
 
})

.controller("Question_vot", function($uibModalInstance, $scope, candidato, ConexionServ, toastr, $filter) {

    $scope.candidato = candidato; 
  

   

    $scope.no = function () {
        $uibModalInstance.close('Cerrado');
    };

     $scope.ok = function () {
        $uibModalInstance.close('Voto');
    };

    return ;
});
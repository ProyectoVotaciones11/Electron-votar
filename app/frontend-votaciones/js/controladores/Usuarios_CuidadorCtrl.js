angular.module('votacioneslive')


.controller('Usuarios_CuidadorCtrl', function($scope, $state,  AuthServ, $q, toastr, $http, MySocket, $uibModal, $filter){

	$scope.Gt 		= true;
	$scope.puntos 	= [];


	$http.get('::aspiraciones').then (function(result){
		$scope.aspiraciones = result.data ;
		MySocket.emit('traer_clientes');
	}, function(tx){
		console.log('error', tx);
	});


	

	$scope.Grupo_enviado = [];
	$scope.Participantes = [];

	MySocket.on('clientes_traidos', function(data){

		$scope.puntos = data;	

	});	



	$scope.Participantes_grupo = function(num_grupo){

		$scope.Grupo_enviado 		= num_grupo;		
		$scope.Participantes 		= [];

		for (let i = 0; i <	 $scope.Grupo_id.length; i++) {


			if ($scope.Grupo_id[i].Grupo_id == $scope.Grupo_enviado) {

				$scope.Participantes.push($scope.Grupo_id[i]);

				if ($scope.puntos.length > 0) {
					for (let h = 0; h <	$scope.puntos.length; h++) {						      		

				      	if ($scope.puntos[h].user_data.Username == $scope.Grupo_id[i].Username) {

				      		$scope.Grupo_id[i].punto = $scope.puntos[h].nombre_punto;

				      		$scope.Grupo_id[i].votos = $scope.puntos[h].user_data.votos;

				      		
						}							
				    }		
				}
					    
			}	
	 	}
	 	
	}

	MySocket.on('me_recibieron_logueo', function(data){
		
		MySocket.emit('traer_clientes');

	});	  

	MySocket.on('logueado:alguien', (data)=>{


		MySocket.emit('traer_clientes');
	});

	MySocket.on('clientes_traidos', function(data){

		 $scope.puntos = data;		  
	});	



	 
	$scope.Tabla_Participantes = function(){

		
		$http.get('::usuarios').then (function(result){


			$scope.Grupo_id = result.data.participantes;


			if (localStorage.grupo_ciudar) {
			  	$scope.Participantes_grupo(parseInt(localStorage.grupo_ciudar));
			}

		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    };


    $scope.Tabla_Participantes();


	 MySocket.on('Cuidador_enviado', function(data){
	 	localStorage.grupo_ciudar 	= data.cuidar_grupo.numeros;
		$scope.Participantes_grupo(data.cuidar_grupo.numeros);

	});	


	MySocket.on('logueado:alguien', (data)=>{
		$scope.Tabla_Participantes();

			MySocket.emit('traer_clientes');
		});



	MySocket.on('participante_en_aspiracion', (data)=>{

		console.log(data);

		for (var i = 0; i < $scope.Participantes.length; i++) {
			parti = $scope.Participantes[i];

			if (parti.rowid == data.can) {
				parti.votando_aspiracion_id = data.id;
			}
		}
		
	});

	MySocket.on('Alguien_desconect', function(data){
		

		setTimeout(function() {

			$scope.Tabla_Participantes();

			MySocket.emit('traer_clientes');
        	
		
   		 }, 2000); 
    	
	});	

    $scope.Ver_Control = function(partc){

    	if (partc.punto) {

    	}else{
    		 var modalInstance = $uibModal.open({
	        templateUrl: 'templates/Control_modal.html',
	        resolve: {
		        punto: function () {
		        	return   $scope.puntos;
		        	 },
		        part: function(){
		        	return   partc;
		          }
		       
		    },
	        controller: 'Control'  
	    });

	    modalInstance.result.then(function (result) {

	    	MySocket.emit('traer_cliente', {id: result});
	   		
	    }, function(r2){
	    	$scope.traerDatos();
	    });
    	}	   
			
	} 

	
})



.filter('participantesInAspiracion', [ function(){
	return function(participantes, aspiracion_id){

		if(participantes && aspiracion_id){
			this.resp = [];

			angular.forEach(participantes, function (participante, key) {
				//console.log(participante, aspiracion_id);
				if(participante.votando_aspiracion_id == aspiracion_id){
					this.resp.push(participante);
				}
			})

			return this.resp

		}else{
			return participantes;
		}
	}
}])


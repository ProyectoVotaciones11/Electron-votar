angular.module('votacioneslive')

.controller('CuidadorCtrl', function($scope, $state,  AuthServ, $q, toastr, $http, MySocket, $uibModal, $filter){

	$scope.Participantes = [];

	$scope.puntos = [];
	MySocket.emit('traer_clientes');

	MySocket.on('conectado:alguien', (data)=>{
			MySocket.emit('traer_clientes');
		});	 

		MySocket.on('clientes_traidos', function(data){

			$scope.puntos = data;		    	

		 });

	$scope.Tabla_Participantes = function(){

			$scope.Participantes = [];
			
		$http.get('::usuarios').then (function(result){
		
			for (let i = 0; i <	 result.data.participantes.length; i++) {

		      if (result.data.participantes[i].Tipo == "Cuidador") {

		      	console.log($scope.puntos);
		      	$scope.Participantes.push(result.data.participantes[i] );

			      for (let h = 0; h <	$scope.puntos.length; h++) {						      		

			      	if ($scope.puntos[h].user_data.Username == result.data.participantes[i].Username) {

			      		$scope.Participantes.pop (result.data.participantes[i] );
				  }							
			    }	
			  }
			}	
		}, function(error){
			console.log('No se pudo traer los datos', error);
		})			
    };

  	 MySocket.on('Alguien_desconect', function(data){
		

		setTimeout(function() {

			MySocket.emit('traer_clientes');
        	
		$scope.Tabla_Participantes();
    }, 1000); 
    	
		});	

    $scope.Tabla_Participantes();

    $scope.Ver_Control = function(partc){

	    var modalInstance = $uibModal.open({
	        templateUrl: 'templates/Control_modal.html',
	        resolve: {
		       
		        part: function(){
		        	return   partc;
		          }     
		    },
	        controller: 'Control'  
	    })
	    modalInstance.result.then(function (result) {

	    	if(result == "Cerrado"){

	    	}else{
    			$scope.cuidador = result
    			MySocket.emit('traer_cliente', {id: result});
    			$scope.Segundo_modal($scope.cuidador);	
	    	};

	    		
	    }, function(r2){
	    	
	    });			
	} 

	 $scope.Segundo_modal = function(Cuid){
	    var modalInstance = $uibModal.open({
	        templateUrl: 'templates/Grupo_cuidador.html',
	        resolve: {
		        punto: function () {
		        	return   $scope.puntos;
		        	 },
		        Cuidador: function(){
		        	return   Cuid;
		          }		       
		    },
	        controller: 'Control2'  
	    });
	    modalInstance.result.then(function (result) {

	    $scope.Tabla_Participantes();	    	
	    				
	    	MySocket.emit('Enviar_cuidador', {id: result});
	    }, function(r2){
	    	
	    });		
	} 
})

.controller("Control", function($uibModalInstance, $scope,  ConexionServ, toastr, $filter, part, MySocket) {

	MySocket.emit('traer_clientes');
		MySocket.on('me_recibieron_logueo', function(data){	
			MySocket.emit('traer_clientes');
		});	  

		MySocket.on('Alguien_desconect', function(data){	
			MySocket.emit('traer_clientes');
		});	  

		MySocket.on('conectado:alguien', (data)=>{
			MySocket.emit('traer_clientes');
		});

		MySocket.on('clientes_traidos', function(data){
			$scope.puntos = [];

				for (let i = 0; i <	data.length; i++) {

				    if (data[i].user_data.Username) {}else{

					$scope.puntos.push(data[i]);	
			}	
		 }
		});	

		//if (localStorage.Grupo_cuidador) {

			//for (let i = 0; i <	 $scope.puntos.length; i++) {
				     // if ($scope.puntos[i].Tipo == "Cuidador") {
						//	$scope.Participantes.push(result.data[i] );
					   //   }	


			 // }	
			  
		//}

	$scope.Enviar_Cuidador = function (Mens) {
		$scope.usuario = Mens;
		$scope.usuario.user_data = part;
		$uibModalInstance.close($scope.usuario);	      
    };
	$scope.ok = function () {
        $uibModalInstance.close('Cerrado');
    };

    return ;   
})

.controller("Control2", function($uibModalInstance, $scope, ConexionServ, toastr, $filter, Cuidador) {

	$scope.Grupos_Mostrar = false; 

	$scope.grupos = [ {numeros: 1 }, {numeros: 2}, {numeros: 3 }, {numeros: 4}, 
					  {numeros: 5 }, {numeros: 6}, {numeros: 7 }, {numeros: 8},
					  {numeros: 9 }, {numeros: 10}, {numeros: 11 }]; 

	$scope.Enviar_Grupo = function (grup) {

		localStorage.Grupo_cuidador = grup;
		$scope.usuario = Cuidador;
		$scope.usuario.cuidar_grupo = grup;
		$uibModalInstance.close($scope.usuario);	       
    };

	$scope.ok = function () {
        $uibModalInstance.close('Cerrado');
    };
    return ;  
})
angular.module('votacioneslive')


.controller('LoginCtrl', function($scope, $state, ConexionServ, AuthServ, $http, MySocket, toastr, $rootScope){


   if ($rootScope.sesion_cerrada) {
        MySocket.emit('me_desconecte');
        location.reload();

      }

      MySocket.on('cliente_traido', function(data){


        $scope.Par_env          = {};
        $scope.Par_env.Tipo     = data.user_data.Tipo
        $scope.Par_env.password = data.user_data.Password;
        $scope.Par_env.username = data.user_data.Username;


        AuthServ.loguear($scope.Par_env).then(function(){
          MySocket.loguear();

          if ($scope.Par_env.Tipo == "Cuidador") {

            $state.go('panel.Usuarios_Cuidador')  
          }else{
            $state.go('panel.Votar')
          }
        }, function(){
            alert('Datos incorrectos');
        }) 
 
      });  


      MySocket.emit('mis_datos');
      
      MySocket.on('toma_datos', function(data){
         $scope.punto = data.nombre_punto;
      });   

    $scope.user ={};

    
    
    if (localStorage.servidor) {
    	$scope.servidor = localStorage.servidor
    } else {
    	$scope.servidor = location.hostname
    }
  	

  	$scope.mostrarCambiarServ = function(){
  		$scope.mostrar_cambiar_serv = !$scope.mostrar_cambiar_serv;
  	}

    
  	$scope.cambiar_servidor = function(servidor){
  		localStorage.servidor = servidor;

  		$scope.mostrarCambiarServ();
  	}


    $scope.entrar = function(user){
     
        AuthServ.loguear(user).then(function(){
            $state.go('panel.Votar')
        }, function(){
            alert('Datos incorrectos');
        })    
    }
    
    ConexionServ.createTables();	
 
})
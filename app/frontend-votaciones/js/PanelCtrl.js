angular.module('votacioneslive')

.controller('PanelCtrl', function($scope, $uibModal, USER, AuthServ, toastr, $state, MySocket, $http, $rootScope){
    
    $scope.USER             = USER;
    $scope.sitio_colegio    = 'https://lalvirtual.edu.co';


    $scope.descargarDatos = function(){

        $http.put('::usuarios/subir-datos', {sitio: $scope.sitio_colegio}).then(function(result){

            console.log("usuarios agregados")
            
            
        }, function(){
            console.log('Error descargando datos');
        });

    }

 

    console.log($scope.USER);

     $scope.Admin = false;
     $scope.Participante = false;
     $scope.Cuidador = false;

     $scope.Puestos = false;

     
    setTimeout(function() {
        MySocket.emit('toma_mis_datos', {usuario: $scope.USER});  
    }, 1000); 

  

    /* $scope.traer_datos = function(){
        $http.get('::Dashboard').then (function(result){
            $scope.pruebas= result.data ;
            
            console.log('Se trajo los datos con exito', result);
        }, function(error){
            console.log('No se pudo traer los datos', error);

        })
    };

        $scope.traer_datos(); */  


      
    
         MySocket.on('Secion_cerrada', function(r){

             $scope.id_recivido = r;

            console.log(r);
     
                    
               if ($scope.id_recivido == $scope.USER.rowid) {

                            AuthServ.cerrar_sesion();

                             
                                       $state.go('Login');

                    }else{ console.log("hola");}; 
                 
        
        }); 


     $scope.Mostrar_Puestos = function(){

     if ($scope.Puestos == false) { $scope.Puestos = true; }else{$scope.Puestos = false;}

     }

    
    $scope.traer_puestos = function(){

        MySocket.emit('necesito_puestos');  


    }

    MySocket.on('toma_los_puestos', function(datos){
        console.log(datos);
    })
    
    
   
    $scope.Diferencia_de_Tipo = function(){

        if (USER.Tipo == 'Participante') {

            $scope.Participante = true;}

             if (USER.Tipo == 'Cuidador') {

            $scope.Participante = true;
            $scope.Cuidador = true;}

             if (USER.Tipo == 'Admin') {

            $scope.Participante = true;
            $scope.Cuidador = true;
            $scope.Admin = true;

                        
                    }

            }

     $scope.Diferencia_de_Tipo();
    
    
    
    $scope.cerrar_sesion = function(){

         AuthServ.cerrar_sesion();

 
           $state.go('Login');

        toastr.success('Has cerrado sesion con exito');

    }
        
})


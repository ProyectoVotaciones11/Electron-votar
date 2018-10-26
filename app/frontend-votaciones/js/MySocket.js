angular.module('votacioneslive')

.factory('MySocket', ['$q', '$rootScope', '$timeout', '$http', '$state', '$filter', function($q, $rootScope, $timeout, $http, $state, $filter){



	// Open a WebSocket connection
	// Verifico que no tenga puerto asignado
	dominio 	= location.hostname;

	if (localStorage.servidor) {
		dominio 	= localStorage.servidor;
	}



	//url 		= 'ws://' + dominio + ':8787';
	var socket = io.connect(dominio + ':3000');
	var logueado = false;


	loguear = function(){
			
		if (!localStorage.getItem('registered_boolean')){
			localStorage.registered_boolean = false
		}

		if (localStorage.getItem('registered_boolean')) {
			registered = localStorage.getItem('registered_boolean')
		}else{
			registered = false
		}

		if (registered=='false') {
			registered = false;
		}

       if (localStorage.USER){
			usu = JSON.parse(localStorage.USER);

			if (usu.rowid) {
				
				socket.emit('loguear', {usuario: usu, registered: registered } )
			}
		} 

	}


	check_logueo = function(){
		return logueado;
	}

	socket.on('te_conectaste', function(data){
		loguear();
	});
	
	socket.on('te_logueaste', function(data){
		logueado = true;
	});



	socket.on('logueado:yo', function(data){
		
		$rootScope.$emit('logueado:yo:agregado_a_arrays', data.yo)

	});

	

	//on enter() #en LoginCtrl y PanelCtrl



	// Metodos externos
	methods = {
		on: function(eventName, callback){
			socket.on(eventName, function(){
				args = arguments;
				$rootScope.$apply( function(){
					callback.apply(socket, args);
				});
			});
		},

		emit: function(eventName, data, callback){
			socket.emit(eventName, data, function(){
				args = arguments;
				$rootScope.$apply( function(){
					if (callback){
						callback.apply(socket, args);
					}
				});
			});
		},

		loguear: loguear,
		check_logueo: check_logueo

	}

	return methods


}])



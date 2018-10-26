angular.module('votacioneslive', [
	'ngSanitize', 
	'ngTouch',
	'ngAnimate',
	'ui.router', 
	'ui.bootstrap',
	'ui.select',
	'ui.grid',
	'ui.grid.edit',
	'ui.grid.resizeColumns',
	'ui.grid.exporter',
	'ui.grid.selection',
	'ui.grid.cellNav',
	'ui.grid.autoResize',
	'ui.grid.pinning',
	'ui.grid.expandable',
	'ui.grid.moveColumns',
	'toastr'
])

 .config(['$stateProvider','$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider){
		
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];
		
		
			$httpProvider.interceptors.push(function($q)
			{
				return {
					'request': function(config){
						explotado = config.url.split('::');
						if(explotado.length > 1){
							config.url = window.location.protocol + '//' + window.location.hostname + ':3000/api/' + explotado[1];
						}else{
							explotado = config.url.split('==');
							if (explotado.length > 1)
								config.url = window.location.host + explotado[1];
						}
						//console.log(config.url);
						return config;
					}
				}
			});

	var panel = {
		name: 'panel',
		url: '/panel',
		templateUrl: 'templates/panel.html',
		controller: 'PanelCtrl',
		resolve: {
			USER: ['AuthServ', function(AuthServ){
				return AuthServ.verificar_user_logueado();
			}]
		}
	}

	var Login = {
		name: 'Login',
		url: '/Login',
		templateUrl: 'templates/Login.html',
		controller:'LoginCtrl'
	}

	var Votar = {
		name: 'panel.Votar',
		url: '/Votar',
		templateUrl: 'templates/Votar.html',
		controller:'VotarCtrl'
	}

	var Participantes = {
		name: 'panel.Participantes',
		url: '/alumnos',
		templateUrl: 'templates/Participantes.html',
		controller:'ParticipantesCtrl'
	}
	var candidatos = {
		name: 'panel.candidatos',
		url: '/candidatos',
		templateUrl: 'templates/candidatos.html',
		controller:'CandidatosCtrl'
	}
	var Votaciones = {
		name: 'panel.Votaciones',
		url: '/Votaciones',
		templateUrl: 'templates/Votaciones.html',
		controller:'VotacionesCtrl'
	}

	var Aspiraciones = {
		name: 'panel.Aspiraciones',
		url: '/Aspiraciones',
		templateUrl: 'templates/aspiraciones.html',
		controller:'AspiracionesCtrl'
	}

	var Votos = {
		name: 'panel.Votos',
		url: '/Votos',
		templateUrl: 'templates/Votos.html',
		controller:'VotosCtrl'
	}

	var Configuraciones = {
		name: 'panel.Configuraciones',
		url: '/Configuraciones',
		templateUrl: 'templates/Configuraciones.html',
		controller:'ConfiguracionesCtrl'
	}
	var Resultados = {
		name: 'panel.Resultados',
		url: '/Resultados',
		templateUrl: 'templates/Resultados.html',
		controller:'ResultadosCtrl'
	}
	var Control = {
		name: 'panel.Control',
		url: '/Control',
		templateUrl: 'templates/Control.html',
		controller:'ControlCtrl'
	}
	var Cuidador = {
		name: 'panel.Cuidador',
		url: '/Cuidador',
		templateUrl: 'templates/Cuidador.html',
		controller:'CuidadorCtrl'
	}
	var Usuarios_Cuidador = {
		name: 'panel.Usuarios_Cuidador',
		url: '/Usuarios_Cuidador',
		templateUrl: 'templates/Usuarios_Cuidador.html',
		controller:'Usuarios_CuidadorCtrl'
	}

  $stateProvider.state(panel);
  $stateProvider.state(Login);
  $stateProvider.state(Votar);
  $stateProvider.state(Participantes);
  $stateProvider.state(candidatos);
  $stateProvider.state(Votaciones);
  $stateProvider.state(Aspiraciones);
  $stateProvider.state(Votos);
  $stateProvider.state(Configuraciones);
  $stateProvider.state(Resultados);
  $stateProvider.state(Control);
  $stateProvider.state(Cuidador);
  $stateProvider.state(Usuarios_Cuidador);
 

   $urlRouterProvider.otherwise('/Login');

}])


.run(function($state){
	$state.defaultErrorHandler(function(error) {

	   $state.go('Login', { errorMessage: error }); 
	});
});
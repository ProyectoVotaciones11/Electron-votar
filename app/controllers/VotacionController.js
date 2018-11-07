var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

router.route('/eliminar').delete(deleteUsuarioHandler);
router.route('/editar').get(getEditarHandler);
router.route('/insertar').get(getInsertarHandler);
router.route('/cambiar-pass').get(getCambiarPassHandler);
router.route('/Traer-planchas').get(getPlachasPassHandler);
router.route('/actual').get(getactualPassHandler);
router.route('/Copiar-Participantes').put(putCopiarParticipantesPassHandler);
router.route('/actual2').get(getactual2PassHandler)


function getRouteHandler(req, res) {

	consulta = "Select *, rowid from votaciones";
	db.query(consulta).then(function(result){
        votaciones = result ;
    	res.json(votaciones);
    }, function(error){
		
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
}

function getEditarHandler(req, res) {

	consulta = "UPDATE votaciones  SET Nombre=? , Alias=? , descripcion=? , actual=? , Username=? , Password=? WHERE rowid=?  ";
	params = req.query;

	datos = [params.Nombre, params.Alias, params.descripcion, params.actual, params.Username , params.Password, params.rowid];     
	db.query(consulta, datos).then (function(result){
     
        res.send('Editado');
	}, function(error){
      
       res.status(400).send({ error: error })
	})
}

function getCambiarPassHandler(req, res) {
   consulta = "update  votaciones set password=? where rowid=?";
	
	db.query(consulta, [ req.query.password, req.query.rowid]).then (function(result){
		res.send('Cambiado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})	
    
}

function getInsertarHandler(req, res) {

	consulta = "INSERT INTO votaciones( Nombre,  Alias, descripcion, actual, Username, Password ) VALUES( ?, ?, ?, ?, ?, ?)";
	params = req.query;
	datos = [params.Nombre, params.Alias, params.descripcion, params.actual, params.Username, "123"];     
	db.query(consulta, datos).then (function(result){
        res.send('Insertado');
	}, function(error){
       res.status(400).send({ error: error })
	})
};

function getPlachasPassHandler(req, res) {

	consulta = "Select *, rowid FROM Planchas";     
	db.query(consulta).then (function(result){
        res.send(result); 
	}, function(error){
       res.status(400).send({ error: error })
	})
};

function getactualPassHandler(req, res) {

	consulta = "update  votaciones set actual=? ";     
	db.query(consulta, [0]).then (function(result){
        res.send(result); 
	}, function(error){
       res.status(400).send({ error: error })
	})
};


function getactual2PassHandler(req, res) {

	consulta = "update  votaciones set actual=? WHERE rowid=?";     
	db.query(consulta, [1, req.query.rowid]).then (function(result){
        res.send(result); 
	}, function(error){
       res.status(400).send({ error: error })
	})
};


function putCopiarParticipantesPassHandler(req, res) {

		promesas = [];

		consulta = "Select *,rowid FROM Participantes WHERE Votacion_id = ?";    
			db.query(consulta, [ req.body.Votacion_copiada_rowid]).then (function(result){

			ParticipantesVotacion = result;
			
			
			for (var i = 0; i < ParticipantesVotacion.length; i++) {
			ParticipantesVotacion[i]

				consulta = "INSERT INTO Participantes(  Nombres, Apellidos, Username, Password, Sexo, Grupo_id, Votacion_id, Tipo ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)";
				
				part = ParticipantesVotacion[i];

			
				datos = [part.Nombres, part.Apellidos, part.Username, part.Password, part.Sexo, part.Grupo_id, req.body.Votacion_id, part.Tipo]; 

				prome = db.query(consulta,datos);
				
				promesas.push(prome);
				
			
		}
		
		
		Promise.all(promesas).then(function(resul){
			res.send('Insertados');
		}, function(error){
			res.status(400).send({ error: error })
		})
		

	}, function(error){
       res.status(400).send({ error: error })
	})


};




function deleteUsuarioHandler(req, res) {
    
	consulta = "DELETE FROM votaciones WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		res.send('Eliminado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})
}

                  
module.exports = router;
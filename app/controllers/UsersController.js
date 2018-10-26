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
router.route('/subir-datos').put(putSubirPassHandler);
router.route('/participantes-por-grupo').put(putParticipantesPorGruposHandler);


function getRouteHandler(req, res) {

	consulta = "SELECT P.*, P.rowid, V.Nombre, V.Alias from Participantes P INNER JOIN votaciones V ON P.Votacion_id = V.rowid";
	db.query(consulta).then(function(result){
        respuesta = {};
        respuesta.participantes = result ;


		consulta = "SELECT DISTINCT Grupo_id from Participantes";
		
		db.query(consulta).then (function(resultG){

			respuesta.grupos = resultG ;
	    	res.json(respuesta);	
	    }, function(error){
			console.log(error);
		})

    }, function(error){
		console.log(error);		
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
}
function putParticipantesPorGruposHandler(req, res) {

	consulta = "SELECT P.*, P.rowid, V.Nombre, V.Alias from Participantes P INNER JOIN votaciones V ON P.Votacion_id = V.rowid WHERE Grupo_id=?";
	
	db.query(consulta, [req.body.Grupo_id]).then (function(result){

		console.log(result)
     
        res.send(result);
	}, function(error){
      
       res.status(400).send({ error: error })
	})
}

function getEditarHandler(req, res) {

	consulta = "UPDATE Participantes  SET  Nombres=? , Apellidos=? , Username=?, Password=?, Sexo=? , Grupo_id=? , Votacion_id=? , Tipo=? WHERE rowid=? ";
	params = req.query;

	datos = [params.Nombres, params.Apellidos, params.Username, params.Password, params.Sexo, params.Grupo_id, params.Votacion_id, params.Tipo , params.rowid];     
	db.query(consulta, datos).then (function(result){
     
        res.send('Editado');
	}, function(error){
      
       res.status(400).send({ error: error })
	})
}

function getCambiarPassHandler(req, res) {
   consulta = "update  Participantes set password=? where rowid=?";
	
	db.query(consulta, [ req.query.password, req.query.rowid]).then (function(result){
		res.send('Cambiado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})	
    
}

function getInsertarHandler(req, res) {

	consulta = "INSERT INTO Participantes(  Nombres, Apellidos, Username, Password, Sexo, Grupo_id, Votacion_id, Tipo ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)";
	params = req.query;
	datos = [params.Nombres, params.Apellidos, params.Username, params.Password, params.Sexo, params.Grupo_id, params.Votacion_id, params.Tipo];     
	db.query(consulta, datos).then (function(result){
        res.send('Insertado');
	}, function(error){
       res.status(400).send({ error: error })
	})
};

function deleteUsuarioHandler(req, res) {
    
	consulta = "DELETE FROM Participantes WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		res.send('Eliminado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})
}

function putSubirPassHandler(req, res) {

	axios = require('axios');

	colegio = req.body.sitio; 

	axios.get(colegio + '/5myvc/public/asistencias/datos-solo-alumnos', { year_id: 4 }).then(function (data) {
	    let grupos = data.data.grupos;
       

		promesas = [];
		
		for (var i = 0; i < grupos.length; i++) {
				
			
			for (var j = 0; j < grupos[i].alumnos.length; j++) {
				alumno = grupos[i].alumnos[j];
				console.log(grupos[i].alumnos[j]);
				
				consulta = "INSERT INTO Participantes(  Nombres, Apellidos, Username, Password, Sexo, Grupo_id, Votacion_id, Tipo ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)";
				prome = db.query(consulta, [alumno.nombres, alumno.apellidos, alumno.username, '123', alumno.sexo, grupos[i].abrev, '1', 'Participante']);
				
				promesas.push(prome);
				
			}
		}
		
		Promise.all(promesas).then(function(result){
			res.send('Insertados');
		}, function(error){
			res.status(400).send({ error: error })
		})
		

	}).catch(function (error) {
	    console.log(error);
	});


}
                  
module.exports = router;
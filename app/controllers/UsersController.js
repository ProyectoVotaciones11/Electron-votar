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
router.route('/Subir_Datos').get(getSubirPassHandler);


function getRouteHandler(req, res) {

	consulta = "SELECT P.*, P.rowid, V.Nombre, V.Alias from Participantes P INNER JOIN votaciones V ON P.Votacion_id = V.rowid";
	db.query(consulta).then(function(result){
        Participantes = result ;
    	res.json(Participantes);	

    }, function(error){
		
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
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

function getSubirPassHandler(req, res) {

	console.log(req.query);


	for (var i = 0; i < grupos.length; i++) {
                 console.log(grupos[i].alumnos);

		for (var j = 0; j < grupos[j].alumnos.length; j++) {
		 alumno = grupos[i].alumnos[j];

		 consulta = "INSERT INTO Participantes(  Nombres, Apellidos, Username, Password, Sexo, Grupo_id, Votacion_id, Tipo ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)";
		 db.query(consulta, [req.query.id]).then (function(result){
			res.send('Eliminado');
		}, function(error){
			
			res.status(400).send({ error: error })
		})

         }
    }

    
	consulta = "DELETE FROM Participantes WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		res.send('Eliminado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})
}
                  
module.exports = router;
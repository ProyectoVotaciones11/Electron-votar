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


function getRouteHandler(req, res) {

	consulta = "SELECT C.*, C.rowid, p.Nombre as planchas_nombre, a.aspiracion from Candidatos C INNER JOIN Aspiraciones a ON C.aspiracion_id = a.rowid "+
				" INNER JOIN Planchas p ON C.Plancha_id = p.rowid";
	db.query(consulta).then(function(result){
        Candidatos = result ;
    	res.json(Candidatos);
    }, function(error){
		
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
}

function getEditarHandler(req, res) {

	consulta = "UPDATE Candidatos  SET Nombres=? , Apellidos=? , Sexo=? , Grupo_id=? , Foto=?, aspiracion_id=? WHERE rowid=?  ";
	params = req.query;

	datos = [params.Nombres, params.Apellidos, params.Sexo, params.Grupo_id, params.Foto , params.aspiracion_id, params.rowid];     
	db.query(consulta, datos).then (function(result){
     
        res.send('Editado');
	}, function(error){
      
       res.status(400).send({ error: error })
	})
}

function getCambiarPassHandler(req, res) {
   consulta = "update  Candidatos set password=? where rowid=?";
	
	db.query(consulta, [ req.query.password, req.query.rowid]).then (function(result){
		res.send('Cambiado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})	
    
}

function getInsertarHandler(req, res) {

	consulta = "INSERT INTO Candidatos( Nombres, Apellidos, Sexo, Grupo_id,  Foto, aspiracion_id ) VALUES( ?, ?, ?, ?, ?, ?)";
	params = req.query;
	datos = [params.Nombres, params.Apellidos, params.Sexo, params.Grupo_id, params.Foto, params.aspiracion_id];     
	db.query(consulta, datos).then (function(result){
        res.send('Insertado');
	}, function(error){
       res.status(400).send({ error: error })
	})
};


function deleteUsuarioHandler(req, res) {
    
	consulta = "DELETE FROM Candidatos WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		res.send('Eliminado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})
}

                  
module.exports = router;
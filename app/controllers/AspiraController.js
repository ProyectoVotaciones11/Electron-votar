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

	consulta = "SELECT a.*, a.rowid, v.Nombre from Aspiraciones a INNER JOIN Votaciones v ON a.votacion_id = v.rowid ";
	db.query(consulta).then(function(result){
        Aspiraciones = result ;
    	res.json(Aspiraciones);
    }, function(error){
		
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
}

function getEditarHandler(req, res) {

	consulta = "UPDATE Aspiraciones  SET  id=? , aspiracion=? , descripcion=? WHERE rowid=?  ";
	params = req.query;

	datos = [params.id, params.aspiracion, params.descripcion, params.rowid];     
	db.query(consulta, datos).then (function(result){
     
        res.send('Editado');
	}, function(error){
      
       res.status(400).send({ error: error })
	})
}

function getCambiarPassHandler(req, res) {
   consulta = "update  Aspiraciones set password=? where rowid=?";
	
	db.query(consulta, [ req.query.password, req.query.rowid]).then (function(result){
		res.send('Cambiado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})	
    
}

function getInsertarHandler(req, res) {

	consulta = "INSERT INTO Aspiraciones( aspiracion, descripcion, votacion_id) VALUES( ?, ?, ?)";
	params = req.query;
	datos = [params.aspiracion, params.descripcion, params.votacion_id];     
	db.query(consulta, datos).then (function(result){
        res.send('Insertado');
	}, function(error){
       res.status(400).send({ error: error })
	})
};


function deleteUsuarioHandler(req, res) {
    
	consulta = "DELETE FROM Aspiraciones WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		res.send('Eliminado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})
}

                  
module.exports = router;
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

	consulta = "UPDATE votaciones  SET Nombre=? , Alias=? , descripcion=? , Username=? , Password=? WHERE rowid=?  ";
	params = req.query;

	datos = [params.Nombre, params.Alias, params.descripcion, params.Username , params.Password, params.rowid];     
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

	consulta = "INSERT INTO votaciones( Nombre,  Alias, descripcion, Username, Password ) VALUES( ?, ?, ?, ?, ?)";
	params = req.query;
	datos = [params.Nombre, params.Alias, params.descripcion, params.Username, "123"];     
	db.query(consulta, datos).then (function(result){
        res.send('Insertado');
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
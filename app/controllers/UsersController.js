var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

router.route('/eliminar').delete(deleteUsuarioHandler);


router.route('/cambiar-pass').get(getCambiarPassHandler)

function getRouteHandler(req, res) {

	consulta = "Select *, rowid from usuarios";
	db.query(consulta).then(function(result){
        usuarios = result ;
		console.log('Se trajo los datos con exito', result);

    	res.json(usuarios);
    }, function(error){
		console.log('No se pudo traer los datos', error);
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
}

function getCambiarPassHandler(req, res) {
    res.send('Cambiado');
}


function deleteUsuarioHandler(req, res) {
    
	consulta = "DELETE FROM usuarios WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		console.log('Eliminado', req.query);
		res.send('Eliminado');
	}, function(error){
		console.log('No se pudo borrarlos datos', error);
		res.status(400).send({ error: error })
	})
}



                  
module.exports = router;
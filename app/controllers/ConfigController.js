var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

router.route('/editar').get(getEditarHandler);
router.route('/cambiar-pass').get(getCambiarPassHandler);


function getRouteHandler(req, res) {

	

}

function postRouteHandler(req, res) {
    //handle POST route here
}

function getEditarHandler(req, res) {

	consulta = "UPDATE Participantes  SET  Nombres=? , Apellidos=? , Username=?, Password=?, Sexo=?  WHERE rowid=? ";
	params = req.query;

	datos = [params.Nombres, params.Apellidos, params.Username, params.Password, params.Sexo,  params.rowid];     
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
          
module.exports = router;
var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

router.route('/CandidatoAspiracion').get(CandidatoAspiracionHandler);
router.route('/Cambiaractive').get(CambiaractiveHandler);


function getRouteHandler(req, res) {



	consulta = "SELECT rowid, * from Aspiraciones WHERE Votacion_id=?";

	params = req.query;

	datos = [params.Votacion_id];
	db.query(consulta, datos).then(function(result){
        Aspiraciones = result ;
    	res.json(Aspiraciones);
    }, function(error){

    	 res.status(400).send({ error: error })
		
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
}



function CandidatoAspiracionHandler(req, res) {

	consulta = "SELECT c.*, c.rowid,  p.Nombre as planchas_nombre  from Candidatos c INNER JOIN Planchas p ON c.Plancha_id = p.rowid WHERE aspiracion_id = ? ";
	    
	db.query(consulta, [req.query.id]).then (function(result){

      
        res.json(result);
	}, function(error){
      
       res.status(400).send({ error: error })
	})
}

function CambiaractiveHandler(req, res) {

	consulta = "INSERT INTO Votos( Participante_id, candidato_id, aspiracion_id,  fecha_hora ) VALUES( ?, ?, ?, ?) ";
	params = req.query;

	datos = [params.user_id, params.id, params.aspiracion_id, params.fecha ];     
	db.query(consulta, datos).then (function(result){
     
        res.send('Editado');
	}, function(error){
      
       res.status(400).send({ error: error })
	})
}

                  
module.exports = router;
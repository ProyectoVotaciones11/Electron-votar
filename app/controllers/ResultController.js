var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

router.route('/CandidatoAspiracion').get(CadidatosAspiracionHandler);


function getRouteHandler(req, res) {



	consulta = "SELECT a.rowid, a.* from Aspiraciones a INNER JOIN Votaciones v ON a.votacion_id = v.rowid AND v.actual=1   ";

	params = req.query;

	datos = [params.Votacion_id];
	db.query(consulta).then(function(result){
        Aspiraciones = result ;
    	res.json(Aspiraciones);
    }, function(error){

    	 res.status(400).send({ error: error })
		
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
}



function CadidatosAspiracionHandler(req, res) {

	consulta = "SELECT C.*, C.rowid, p.Nombre as planchas_nombre, count(v.rowid) as cantidad from Candidatos C "+	
			"INNER JOIN Planchas p ON C.Plancha_id = p.rowid  "+
			"INNER JOIN Votaciones t ON p.votacion_id = t.rowid AND t.actual=1 "+
			"LEFT JOIN Votos v ON v.candidato_id = C.rowid "+
			" WHERE C.aspiracion_id = ? GROUP BY C.rowid ";
	    
	db.query(consulta, [req.query.id]).then (function(result){

      
        res.json(result);
	}, function(error){
      
       res.status(400).send({ error: error })
	})
}



                  
module.exports = router;
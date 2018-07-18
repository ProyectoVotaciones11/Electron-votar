var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

router.route('/eliminar').delete(deleteUsuarioHandler);



function getRouteHandler(req, res) {

	consulta = "SELECT V.*, V.rowid, a.aspiracion, C.Nombres, C.Apellidos, P.Nombres as Participantes_Nombres, P.Apellidos as Participantes_Apellidos from Votos V INNER JOIN Aspiraciones a ON V.aspiracion_id = a.rowid INNER JOIN Candidatos C ON V.candidato_id = C.rowid INNER JOIN Participantes P ON V.Participante_id = P.rowid ";
	db.query(consulta).then(function(result){
        Votos = result ;
    	res.json(Votos);
    }, function(error){
		
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
}



function deleteUsuarioHandler(req, res) {
    
	consulta = "DELETE FROM Votos WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		res.send('Eliminado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})
}

                  
module.exports = router;
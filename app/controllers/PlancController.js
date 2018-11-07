var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

router.route('/eliminar').delete(deleteUsuarioHandler);
router.route('/editar').get(getEditarHandler);
router.route('/insertar').get(getInsertarHandler);



function getRouteHandler(req, res) {

    consulta = "SELECT p.*, p.rowid, v.Nombre,  p.Nombre as Nombre_plancha from Planchas p INNER JOIN Votaciones v ON p.votacion_id = v.rowid And V.actual=1";
    db.query(consulta).then(function(result){
        Planchas = result ;
        res.json(Planchas);
    }, function(error){
        
    })

}

function postRouteHandler(req, res) {
    //handle POST route here
}

function getEditarHandler(req, res) {

    consulta = "UPDATE Planchas  SET   Nombre=?  WHERE rowid=?  ";
    params = req.query;

    datos = [params.Nombre,  params.rowid];     
    db.query(consulta, datos).then (function(result){
     
        res.send('Editado');
    }, function(error){
      
       res.status(400).send({ error: error })
    })
}



function getInsertarHandler(req, res) {

    consulta = "INSERT INTO Planchas( Nombre, votacion_id) VALUES( ?, ?)";
    params = req.query;
    datos = [params.Nombre,  params.votacion_id];     
    db.query(consulta, datos).then (function(result){
        res.send('Insertado');
    }, function(error){
       res.status(400).send({ error: error })
    })
};


function deleteUsuarioHandler(req, res) {
    
    consulta = "DELETE FROM Planchas WHERE rowid = ? ";
    db.query(consulta, [req.query.id]).then (function(result){
        res.send('Eliminado');
    }, function(error){
        
        res.status(400).send({ error: error })
    })
}

                  
module.exports = router;
require('dotenv').config();

sqlUsuarios = "CREATE TABLE IF NOT EXISTS usuarios (id integer," +
                "nombres varchar(100)  NOT NULL collate nocase," +
                "apellidos varchar(100)  DEFAULT NULL collate nocase," +
                "sexo varchar(100)  NOT NULL," +
                "username varchar(100)  NOT NULL collate nocase," +
                "password varchar(100)  NOT NULL collate nocase," +
                "prueba_id integer(100)  DEFAULT NULL," +
                "tipo integer DEFAULT '0')";

sqlPreguntas = "CREATE TABLE IF NOT EXISTS preguntas (id integer," +
                "definicion varchar(300)  NOT NULL collate nocase," +
                "tipo varchar(100)  NOT NULL collate nocase," +
                "prueba_id integer(100)  DEFAULT NULL," +
                "opc_a varchar(100)  DEFAULT NULL collate nocase," +
                "opc_b varchar(100)  DEFAULT NULL collate nocase," +
                "opc_c varchar(100)  DEFAULT NULL collate nocase," +
                "opc_d varchar(100)  DEFAULT NULL collate nocase," +
                "correcta varchar(100)  NOT NULL collate nocase," +
                "defini_img varchar(100)  DEFAULT NULL collate nocase," +
                "opc_a_img varchar(100)  DEFAULT NULL collate nocase," +
                "opc_b_img varchar(100)  DEFAULT NULL collate nocase," +
                "opc_c_img varchar(100)  DEFAULT NULL collate nocase," +
                "opc_d_img varchar(100)  DEFAULT NULL collate nocase," +
                "puntos varchar(100)  DEFAULT NULL collate nocase)";

sqlRespuestas = "CREATE TABLE IF NOT EXISTS respuestas (id integer," +
                "preg_id integer(100)  NOT NULL," +
                "usuario_id integer(100)  DEFAULT NULL," +
                "opcion_elegida varchar(100)  NOT NULL," +
                "correcta varchar(100)  NOT NULL collate nocase," +
                "duracion varchar(100)  NOT NULL collate nocase)";       
  
  sqlPruebas = "CREATE TABLE IF NOT EXISTS pruebas (id integer," +
                "nombre varchar(100)  NOT NULL collate nocase," +
                "alias varchar(100)  DEFAULT NULL collate nocase," +
                "dirigido varchar(100)  NOT NULL," +
                "mostrar_respuesta varchar(100)  NOT NULL collate nocase," +
                "puntos_promedio varchar(100)  NOT NULL collate nocase," +
                "tiempo_preg varchar(100)  NOT NULL collate nocase," +
                "actual integer(1)  DEFAULT NULL," +
                "tiempo_exam varchar(100)  NOT NULL collate nocase)";  
           





            

function createTable() {
    
    return new Promise(function(resolve, reject) {
    
        db = require('../conexion/connWeb');
        //db = new db();
        db.query(sqlUsuarios).then(function(res){
            console.log('tabla Usuarios creada');
            return db.query(sqlPreguntas);
        }).then(function(res){
            console.log('tabla Preguntas creada');
            return db.query(sqlRespuestas);
        }).then(function(res){
            console.log('tabla Respuestas creada');
            return db.query(sqlPruebas);
        }).then(function(res){
            console.log('tabla user_event creada');
            console.log('TODAS LAS TABLAS CREADAS');
        })
        
    });
    
        
}


module.exports = createTable;


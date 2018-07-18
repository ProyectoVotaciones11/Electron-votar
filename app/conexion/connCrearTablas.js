require('dotenv').config();

     sqlParticipantes = "CREATE TABLE IF NOT EXISTS Participantes (id integer," +
                        "Nombres varchar(100)  NOT NULL collate nocase," +
                        "Apellidos varchar(100)  NOT NULL collate nocase," +
                        "Sexo varchar(1)  DEFAULT NULL collate nocase," +
                        "Grupo_id integer (100)  DEFAULT NULL collate nocase," +
                        "Votacion_id integer(100)  DEFAULT NULL collate nocase," +
                        "Username varchar (100)  DEFAULT NULL collate nocase," +
                        "Password varchar(100)  NOT NULL,"+
                        "Tipo varchar(100)  NOT NULL)";
         
         sqlCandidatos = "CREATE TABLE IF NOT EXISTS Candidatos (id integer," +
                        "Nombres varchar(100)  NOT NULL collate nocase," +
                        "Apellidos varchar(100)  NOT NULL collate nocase," +
                        "Sexo varchar(1)  DEFAULT NULL collate nocase," +
                        "Grupo_id integer (100)  DEFAULT NULL collate nocase," +
                        "Foto integer(100)  DEFAULT NULL collate nocase," +
                        "aspiracion_id integer(100)  NOT NULL)";
         
         sqlVotaciones = "CREATE TABLE IF NOT EXISTS Votaciones (id integer," +
                        "Nombre varchar(100)  NOT NULL collate nocase," +
                        "Alias varchar(100)  NOT NULL collate nocase," +
                        "descripcion varchar(100)  DEFAULT NULL collate nocase," +
                        "Username varchar (100)  DEFAULT NULL collate nocase," +
                        "Password varchar(100)  NOT NULL)";

        sqlVotos = "CREATE TABLE IF NOT EXISTS Votos (id integer," +
                        "Participante_id integer(100)  NOT NULL collate nocase," +
                        "candidato_id integer(100)  NOT NULL collate nocase," +
                        "aspiracion_id integer(100)  DEFAULT NULL collate nocase," +
                        "fecha_hora date(100)  NOT NULL)";

        sqlAspiracion = "CREATE TABLE IF NOT EXISTS Aspiraciones (id integer," +
                        "aspiracion varchar(100)  NOT NULL collate nocase," +
                        "votacion_id integer(100)  NOT NULL," +
                        "descripcion varchar(100)  DEFAULT NULL)"; 
      

function createTable() {
    
    return new Promise(function(resolve, reject) {
    
        db = require('../conexion/connWeb');
        //db = new db();
        db.query(sqlParticipantes).then(function(res){
            console.log('Tabla Participantes creada');
            return db.query(sqlCandidatos);
        }).then(function(res){
            console.log('Tabla Candidatos creada');
            return db.query(sqlVotaciones);
        }).then(function(res){
            console.log('Tabla Votaciones creada');
            return db.query(sqlVotos);
        }).then(function(res){
            console.log('Tabla Votos creada');
            return db.query(sqlAspiracion);
        }).then(function(res){
            console.log('Tabla Aspiraciones creada');
            console.log('TODAS LAS TABLAS CREADAS');
        })
        
    });
    
        
}


module.exports = createTable;


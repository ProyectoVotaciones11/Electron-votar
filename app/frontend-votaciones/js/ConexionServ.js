angular.module('votacioneslive')

.factory('ConexionServ', function($q, $http, $timeout) {

  var db;


  db = window.openDatabase("Votaciones", '1', 'Tablas', 1024 * 1024 * 49);
  
    

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


                
    result = {
          
        createTables: function(){
            var defered = $q.defer();
            
            db.transaction(function (tx) {

                 tx.executeSql(sqlParticipantes, [], function (tx, result) {
                    defered.resolve(' ');
                }, function(tx,error){
                    console.log("Tabla  NO se pudo crear", error.message);
                })
            
                tx.executeSql(sqlVotaciones, [], function (tx, result) {
                    defered.resolve('');
                }, function(tx,error){
                    console.log("Tabla  NO se pudo crear", error.message);
                })

               

                tx.executeSql(sqlCandidatos, [], function (tx, result) {
                    defered.resolve(' ');
                }, function(tx,error){
                    console.log("Tabla motos NO se pudo crear", error.message);
                })

                 tx.executeSql(sqlVotos, [], function (tx, result) {
                    defered.resolve(' ');
                }, function(tx,error){
                    console.log("", error.message);
                })

                tx.executeSql(sqlAspiracion, [], function (tx, result) {
                    defered.resolve(' ');
                }, function(tx,error){
                    console.log("Tabla  NO se pudo crear", error.message);
                })

          
            });
  
        return defered.promise;
        
        },
        query: function(sql, datos, datos_callback){ // datos_callback para los alumnos en for, porque el i cambia
            var defered = $q.defer();
      
            if(typeof datos === "undefined") {
              datos = [];
            }
      
            db.transaction(function (tx) {
              tx.executeSql(sql, datos, function (tx, result) {
                var items = [];
                for (i = 0, l = result.rows.length; i < l; i++) {
                  items.push(result.rows.item(i));
                }
                if (datos_callback) {
                  defered.resolve({items: items, callback: datos_callback});
                }else{
                  defered.resolve(items);
                }
      
                
      
              }, function(tx,error){
                console.log(error.message, sql, datos);
                defered.reject(error.message, datos_callback)
              }) // db.executeSql
            }); // db.transaction
            return defered.promise;
          },
    }
    
    
    return result;

});
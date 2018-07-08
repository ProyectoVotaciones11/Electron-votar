require('dotenv').config();




            

function crearDatosIniciales() {
    
    return new Promise(function(resolve, reject) {
    
        db = require('../conexion/connWeb');
        
        db.query('SELECT * FROM usuarios').then(function(result){
            return new Promise(function(resolve2, reject2) {
                if (result.length > 0) {
                    resolve2('Usuarios ya estaban Insertados');
                }else{
                    
                    hash_password   = '123';
                    consulta = "INSERT INTO `usuarios` VALUES (1,'JORGE', 'CELEDON', 'jorge', '" + hash_password + "', 1, 'Admin', 'M')," +
                                                             "(2,'JUAN CAMILO', 'MANRRIQUE', 'juan','" + hash_password + "',  1, 'Usuario', 'M')," +
                                                             "(3,'EDILSON', 'MARQUEZ', 'edilson', '" + hash_password + "', 1, 'Usuario', 'M')," +
                                                             "(4,'FELIX', 'DÍAZ', 'felix', '" + hash_password + "', 1, 'Usuario',  'M')," +
                                                             "(5,'ERIK', 'ESLAVA', 'erik', '" + hash_password + "',  1, 'Usuario', 'M')," +
                                                             "(6,'MEMO', 'SILVA', 'memo','" + hash_password + "',  1, 'Usuario', 'M')," +
                                                             "(7,'JOSETH', 'GUERRERO', 'joseth', '" + hash_password + "',  1, 'Usuario', 'M')," +
                                                             "(8,'DANIEL', 'GRANDAS', 'daniel',  '" + hash_password + "', 1, 'Usuario', 'M')" ; 
                                                             
                    db.query(consulta).then(function(res){
                        resolve2('Usuarios Insertados');
                    })
                    
                }
            })
        })
        .then(function(data){
            return new Promise(function(resolve2, reject2) {
                db.query('SELECT * FROM preguntas').then(function(result){
                
                    if (result.length > 0) {
                        resolve2('Preguntas ya estaban Insertados');
                    }else{
                        
                       
                        consulta        = "INSERT INTO `preguntas`(id, definicion, tipo, prueba_id, opc_a, opc_b, opc_c, opc_d, correcta) VALUES(1,'¿De donde era Simon Bolivar?', 'Múltiple', 1,  'Colombia', 'Venezuela', 'Francia', 'España', 'B'), " +
                                                                  "(2,'Cuánto es 51 + 14?', 'Múltiple', 1,  '66', '65', '64', '53', 'B'), " +
                                                                  "(3,'Cuál día es el de descanso?', 'Múltiple', 1,  'Quinto', 'Septimo', 'Sexto', 'Octavo', 'B'), " +
                                                                  "(4,'Cual es el libro mas corto de la biblia?', 'Múltiple', 1,  '2° Juan', '1° Juan', 'Salmos', 'Genesis', 'A'), " +
                                                                  "(5,'quien fue Albert Einstein?', 'Múltiple', 1,  'físico estadounidense', 'Escritor ruso', 'físico alemán', 'Escritor aleman', 'C'), " +
                                                                  "(6,'Cuanto es √3?', 'Múltiple', 1,  '1,732', '0,435', '29.19', '1,23', 'A'), " +
                                                                  "(7,'que discipulo traiciono a Jesus?', 'Múltiple', 1,  'Juan', 'Eliceo', 'Choncas', 'Judas Iscariote', 'D'), " +
                                                                  "(8,'quien es Dios ?', 'Múltiple', 1,  'pues Dios', 'lo ve todo', 'lo es todo', 'Un ente todo poderoso', 'D')" ;
                                                                  
                        db.query(consulta).then(function(res){
                            resolve2('Preguntas Insertadas');
                        })
                        
                    }
                })
            })
        })
        .then(function(data){
            return new Promise(function(resolve2, reject2) {
                db.query('SELECT * FROM pruebas').then(function(result){
                
                    if (result.length > 0) {
                        resolve2('Pruebas ya estaban Insertadas');
                    }else{
                        
                        consulta = "INSERT INTO `pruebas` VALUES (1, 'Matarratas', 'mrratas', 'Dirigido',  'Si', 'Puntos', 'No', '', '4:00')";
                        db.query(consulta).then(function(res){
                            resolve2('Pruebas Insertadas');
                        })
                        
                    }
                })
            })
        })
        
        .then(function(data){
            resolve('Agregados');
        })
        

        
    });
    
        
}


module.exports = crearDatosIniciales;


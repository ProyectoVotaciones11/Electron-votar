require('dotenv').config();

function crearDatosIniciales() {
    
    return new Promise(function(resolve, reject) {
    
        db = require('../conexion/connWeb');
        
        db.query('SELECT * FROM Participantes').then(function(result){
            return new Promise(function(resolve2, reject2) {
                if (result.length > 0) {
                    resolve2('Participantes ya estaban Insertados');
                }else{
                    hash_password   = '123';
                    consulta = "INSERT INTO `Participantes` VALUES ('1','Kevin Daniel', 'Eslava Barroso' , 'M', '11' , '1' , 'Kedaesva', '" + hash_password + "', 'Admin')," +
                                                                   "('2','Yeison Felmaber', 'Eslava Barroso', 'M', '11' , '1' , 'yextrun','" + hash_password + "', 'Participante')," +
                                                                   "('3','keinny Zusette', 'Ferrer Quirife', 'F', '11' , '1' , 'Keinny', '" + hash_password + "', 'Participante')," +
                                                                   "('4','Angel Guillermo', 'Peñaredonda Silva', 'M', '11' , '1' , 'Memo', '" + hash_password + "', 'Participante')," +
                                                                   "('5','Jhan Carlos','Ruda Prada','M', '11' , '1' , 'erik', '" + hash_password + "', 'Participante')," +
                                                                   "('6','Leidy Paola',' Garcia Parra' ,'F', '11' , '1' , 'paola','" + hash_password + "', 'Participante')," +
                                                                   "('7','Martin Daniel','Rincon Molina', 'M', '11' , '1' , 'gandal', '" + hash_password + "', 'Participante')," +
                                                                   "('8','Juan Fernando','Eslava Vanegas', 'M', '11' , '1' , 'heraldo3',  '" + hash_password + "', 'Participante')" ; 
                                                             
                    db.query(consulta).then(function(res){
                        resolve2('Participantes Insertados');
                    })
                    
                }
            })
        })
        .then(function(data){
            return new Promise(function(resolve2, reject2) {
                db.query('SELECT * FROM Candidatos').then(function(result){
                
                    if (result.length > 0) {
                        resolve2('Candidatos ya estaban Insertados');
                    }else{
                        
                       
                        consulta        = "INSERT INTO `Candidatos` VALUES('1','keinny Zusette', 'Ferrer Quirife', 'F', '11' ,'images/users/2.jpg', 1), " +
                                                                  "('2','Kevin Daniel','Eslava Barroso','M','11','images/users/1.jpg','2'), " +
                                                                  "('3','Juan Fernando','Eslava Vanegas','M','11','images/users/4.jpg','3'), " +
                                                                  "('4','Jhan Carlos','Ruda Prada','M','11','images/users/5.jpg','1'), " +
                                                                  "('5','Yeison Felmaber','Eslava Barroso','M','11','images/users/7.jpg','2'), " +
                                                                  "('6','Andres David','Mendieta Olivera','M','11','images/users/8.jpg','3'), " +
                                                                  "('7','Martin Daniel','Rincon Molina','M','11','images/users/7.jpg','1'), " +
                                                                  "('8','Leidy Paola',' Garcia Parra','F','11','images/users/3.jpg','2'), " +
                                                                  "('9','Angel Guillermo','Peñaredonda Silva','M','11','images/users/5.jpg','3')" ;
                                                                  
                        db.query(consulta).then(function(res){
                            resolve2('Candidatos Insertados');
                        })
                        
                    }
                })
            })
        })
        .then(function(data){
            return new Promise(function(resolve2, reject2) {
                db.query('SELECT * FROM Votaciones').then(function(result){
                
                    if (result.length > 0) {
                        resolve2('Votaciones ya estaban Insertadas');
                    }else{

                        hash_password   = '123'
                        
                        consulta = "INSERT INTO `Votaciones` VALUES ('1','Votacion Estudiantiles 2018','VTE2018','Se elije a un personero, representante y contralor de los estudiantes','Vota2018','" + hash_password + "'),"+
                                                              "('2','Votaciones NaVi 2018','VNV2018','Se elije a NaVi de 11','VotNavi2018','" + hash_password + "')";
                        db.query(consulta).then(function(res){
                            resolve2('Votaciones Insertadas');
                        })
                        
                    }
                })
            })
        })

        .then(function(data){
            return new Promise(function(resolve2, reject2) {
                db.query('SELECT * FROM Aspiraciones').then(function(result){
                
                    if (result.length > 0) {
                        resolve2('Aspiraciones ya estaban Insertadas');
                    }else{
                        
                        consulta = "INSERT INTO `Aspiraciones` VALUES ('1','Personero','1','Representa al colegio'),"+
                                                              "('2','Contralor','1','Se encarga del dinero'),"+
                                                              "('3','Representante','1','Representa a los estudiantes')";
                        db.query(consulta).then(function(res){
                            resolve2('Aspiraciones Insertadas');
                        })
                        
                    }
                })
            })
        })


        .then(function(data){
            return new Promise(function(resolve2, reject2) {
                db.query('SELECT * FROM Votos').then(function(result){
                
                    if (result.length > 0) {
                        resolve2('Votos ya estaban Insertadas');
                    }else{
                        
                        consulta = "INSERT INTO `Votos` VALUES ('1','1','1','1',123),"+
                                                              "('2','2','2','2',123),"+
                                                              "('3','3','3','3',123)";
                        db.query(consulta).then(function(res){
                            resolve2('Votos Insertadas');
                        })
                        
                    }
                })
            })
        })
        
        .then(function(data){
            resolve(' Votaciones Agregadas');
     })
        

        
    });
    
        
}


module.exports = crearDatosIniciales;



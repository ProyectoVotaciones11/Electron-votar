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
                    consulta = "INSERT INTO `Participantes` VALUES ('1','Joseth', 'Local' , 'M', '0' , '1' , 'Admin', '" + hash_password + "', 'Admin')"; 
                                                             
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
                        
                       
                        consulta        = "INSERT INTO `Candidatos` VALUES('1','keinny Suzette', 'Ferrer Quirife', 'F', '11', '1' ,'images/users/2.jpg', 1), " +
                                                                  "('2','Kevin Daniel','Eslava Barroso','M','11', '1','images/users/1.jpg','2'), " +
                                                                  "('3','Juan Fernando','Eslava Vanegas','M','11', '1','images/users/4.jpg','3'), " +
                                                                  "('4','Jhan Carlos','Ruda Prada','M','11', '2','images/users/5.jpg','1'), " +
                                                                  "('5','Yeison Felmaber','Eslava Barroso','M','11', '2','images/users/7.jpg','2'), " +
                                                                  "('6','Andres David','Mendieta Olivera','M','11', '2','images/users/8.jpg','3'), " +
                                                                  "('7','Martin Daniel','Rincon Molina','M','11' , '3','images/users/7.jpg','1'), " +
                                                                  "('8','Leidy Paola',' Garcia Parra','F','11', '3','images/users/3.jpg','2'), " +
                                                                  "('9','Angel Guillermo','Peñaredonda Silva','M','11', '3','images/users/5.jpg','3'),"+ 
                                                                  "('10','Voto', 'En Blanco', 'I', '0' , '4','images/users/voto-blanco.jpg', 1),"+
                                                                  "('100','Voto', 'En Blanco', 'I', '0' , '4','images/users/voto-blanco.jpg', 2),"+
                                                                  "('1000','Voto', 'En Blanco', 'I', '0' , '4','images/users/voto-blanco.jpg', 3)";
                                                                  
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
                db.query('SELECT * FROM Planchas').then(function(result){
                
                    if (result.length > 0) {
                        resolve2('Planchas ya estaban Insertadas');
                    }else{

                        hash_password   = '123'
                        
                        consulta = "INSERT INTO `Planchas` VALUES ('1', 'Plancha_A','1'),"+
                                                                "('2','PLancha_B', '1'),"+
                                                              "('2','PLancha_C', '2'),"+
                                                              "('2','Plancha_D', '1')";
                        db.query(consulta).then(function(res){
                            resolve2('Planchas Insertadas');
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
            resolve(' Votaciones Agregadas');
     })
        

        
    });
    
        
}


module.exports = crearDatosIniciales;



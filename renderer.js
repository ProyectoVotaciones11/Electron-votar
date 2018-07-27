// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

require('dotenv').config();
const path          = require('path');
const express       = require('express');
const app           = express();
var cors            = require('cors');
var http            = require('http').Server(app);
var io              = require('socket.io')(http);
var bodyParser      = require('body-parser');

app.use(cors());
app.use(bodyParser.json()); // Para recibir json desde Angular
app.use("/app/frontend-votaciones", express.static(path.join(__dirname, 'app/frontend-votaciones')));
app.use("/images", express.static(path.join(__dirname, 'app/images')));
app.use('/api', require('./app/controllers/routes'));


app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/', function(req, res){
    res.writeHead(301,
        { Location: 'app/frontend-votaciones/' }
    );
    res.end();
});
    


self 		  = this;
self.io 	= io;

var count_clients   = 0;
var all_clts 		  = [];
var info_evento 	= {};


http.listen(process.env.NODE_PORT, function(){
  console.log('listening on *:'+process.env.NODE_PORT);
});





self.io.on('connection', (socket)=> {
    console.log('New connection: '+socket.id);

    count_clients++;

    datos 					= {};
    datos.logged 			= false;
    datos.registered 		= false;
    datos.resourceId		= socket.id;
    datos.respondidas		= 0;
    datos.tiempo			= 0;
    datos.nombre_punto		= 'Punto_' + count_clients;
    datos.user_data 		= {};
    socket.datos 			= datos;

    all_clts.push(socket.datos);

    socket.emit('te_conectaste', {datos: socket.datos});
    socket.broadcast.emit('conectado:alguien', {clt: socket.datos} );

  
  socket.on('mensaje', (data)=>{
    if (data.nombre_punto) {
        socket.datos.nombre_punto = data.nombre_punto;
    }
    if (data.registered) {
        socket.datos.registered = data.registered;
    }
    
    for(var i=0; i < all_clts.length; i++){
        if (all_clts[i].resourceId == socket.id) {
            all_clts.splice(i, 1, socket.datos);
        }
    }
    
    datos = {nombre_punto: socket.datos.nombre_punto, resourceId: socket.id, registered: socket.datos.registered };
    self.io.sockets.emit('reconocido:punto:registered', datos );
  });

  
  socket.on('disconnect', (data)=>{
    
    for (let i = 0; i < all_clts.length; i++) {

      if (all_clts[i].resourceId == socket.id) {
        all_clts.splice(i, 1);
      }
    }
    
    self.io.sockets.emit('client_disconnected',  {sockect_id: socket.id} );
  });

  
  socket.on('traer_clientes', (data)=>{
    console.log('Alguien escribió: Traer clientes');
    console.log(all_clts);
    self.io.sockets.emit('clientes_traidos', all_clts );
  });


  socket.on('toma_mis_datos', (data)=>{

    for (let i = 0; i < all_clts.length; i++) {

      if (all_clts[i].resourceId == socket.id) {
        all_clts[i].user_data = data.usuario;
      }
    }
    self.io.sockets.emit('me_recibieron_logueo' );
  });




});

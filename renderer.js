// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const path = require('path')
var indexRouter = require('./app/index');



const express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

self 		  = this;
self.io 	= io;

app.set('views', path.join(__dirname, 'views'));


//app.use(express.json());
app.use(express.static(path.join(__dirname, 'app/votaciones')));

// app.get('/', (req, res) => res.send('Hello World!'));


app.use('/', indexRouter);
//app.use('/users', usersRouter);


/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
*/


io.on('connection', function(socket){
  console.log('a user connected');

});



http.listen(3000, function(){
  console.log('Escuchando en el puerto *:3000');
});



all_clts = [];
  

io.on('connection', function(socket){
  console.log('a user connected');
  
  cliente = {};
  cliente.id      = socket.id;
  cliente.fecha   = socket.handshake.time;
  
  
  all_clts.push(cliente);
  io.emit('cliente_conectado', cliente );
  
  
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

      if (all_clts[i].id == socket.id) {
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


  socket.on('necesito_puestos', (data)=>{
    console.log('Alguien escribió: que necesito_puestos', all_clts);
    
    puestos = [];

    for (var i = 0; i < all_clts.length; i++) {
      if (all_clts[i].tipo == 'Puesto'){
        puestos.push(all_clts[i]);
      }
    }
    socket.emit('toma_los_puestos', {puestos: all_clts} );
  });


});

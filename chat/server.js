// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Creamos la aplicación de Express
const app = express();

// Creamos un servidor HTTP y lo asociamos con Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

// Servimos archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Manejamos el evento de conexión de Socket.IO
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Manejamos el evento 'chat message'
  socket.on('chat message', (msg) => {
    console.log('Mensaje: ' + msg);
    io.emit('chat message', msg);
  });

  // Manejamos la desconexión del usuario
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Definimos el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

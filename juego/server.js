const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let players = {};
let ball = {
  x: 400,
  y: 250,
  radius: 10,
  speedX: 3,  // Reduced speed
  speedY: 3   // Reduced speed
};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('newPlayer', (name) => {
    players[socket.id] = {
      id: socket.id,
      name: name,
      paddleY: 250,
      opponent: null
    };
    console.log('New player registered:', players[socket.id]);
    io.emit('updatePlayerList', Object.values(players));
  });

  socket.on('requestGame', (opponentId) => {
    if (players[socket.id] && players[opponentId]) {
      console.log(`Game request from ${players[socket.id].name} to ${players[opponentId].name}`);
      io.to(opponentId).emit('gameRequest', { requesterId: socket.id, requesterName: players[socket.id].name });
    } else {
      console.log('Player not found for game request:', socket.id, 'or', opponentId);
    }
  });

  socket.on('acceptGame', (data) => {
    const { opponentId, opponentName } = data;
    if (players[socket.id] && players[opponentId]) {
      console.log(`Game accepted by ${players[socket.id].name} to play with ${opponentName}`);
      players[socket.id].opponent = opponentId;
      players[opponentId].opponent = socket.id;
      io.to(socket.id).emit('startGame', players[socket.id], players[opponentId]);
      io.to(opponentId).emit('startGame', players[opponentId], players[socket.id]);
    } else {
      console.log('Player not found for game acceptance:', socket.id, 'or', opponentId);
    }
  });

  socket.on('updateGameState', (gameState) => {
    players = gameState.players;
    ball = gameState.ball;
    io.emit('updateGameState', gameState);
  });

  socket.on('disconnect', () => {
    let opponentId = players[socket.id]?.opponent;
    if (opponentId) {
      players[opponentId].opponent = null;
      io.to(opponentId).emit('opponentDisconnected');
    }
    delete players[socket.id];
    io.emit('updatePlayerList', Object.values(players));
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});

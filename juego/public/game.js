const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playerNameInput = document.getElementById('playerName');
const joinBtn = document.getElementById('joinBtn');
const playerListDiv = document.getElementById('playerListDiv');
const playerListContainer = document.getElementById('playerList');
const loginDiv = document.getElementById('loginDiv');

const socket = io();
let playerId;
let players = {};
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speedX: 3,  // Reduced speed
  speedY: 3   // Reduced speed
};
let keys = {};

joinBtn.addEventListener('click', () => {
  const playerName = playerNameInput.value.trim();
  if (playerName) {
    socket.emit('newPlayer', playerName);
    loginDiv.style.display = 'none';
    playerListDiv.style.display = 'block';
  }
});

socket.on('updatePlayerList', (playerList) => {
  playerListContainer.innerHTML = '';
  playerList.forEach(player => {
    if (player.id !== socket.id && !player.opponent) {
      const playerDiv = document.createElement('div');
      playerDiv.textContent = player.name;
      playerDiv.classList.add('player');
      playerDiv.addEventListener('click', () => {
        socket.emit('requestGame', player.id);
      });
      playerListContainer.appendChild(playerDiv);
    }
  });
});

socket.on('gameRequest', (data) => {
  const { requesterId, requesterName } = data;
  if (confirm(`Accept game request from ${requesterName}?`)) {
    socket.emit('acceptGame', { opponentId: requesterId, opponentName: requesterName });
  }
});

socket.on('startGame', (player1, player2) => {
  players[player1.id] = player1;
  players[player2.id] = player2;
  playerId = player1.id === socket.id ? player1.id : player2.id;
  playerListDiv.style.display = 'none';
  canvas.style.display = 'block';
  requestAnimationFrame(gameLoop);
});

socket.on('updateGameState', (gameState) => {
  players = gameState.players;
  ball = gameState.ball;
});

socket.on('opponentDisconnected', () => {
  alert('Opponent disconnected');
  location.reload();
});

function drawPaddle(x, y) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(x, y, 10, 100);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.closePath();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  Object.values(players).forEach(player => {
    let paddleX = player.id === playerId ? 10 : canvas.width - 20;
    drawPaddle(paddleX, player.paddleY);
  });

  // Draw ball
  drawBall();
  updateBallPosition();

  // Update paddle position based on keypress
  updatePaddlePosition();

  // Emit updated game state
  socket.emit('updateGameState', { players, ball });

  requestAnimationFrame(gameLoop);
}

function updateBallPosition() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Bounce off top and bottom
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }

  // Bounce off paddles
  Object.values(players).forEach(player => {
    let paddleX = player.id === playerId ? 10 : canvas.width - 20;
    if (ball.x - ball.radius < paddleX + 10 && ball.x + ball.radius > paddleX && ball.y > player.paddleY && ball.y < player.paddleY + 100) {
      ball.speedX = -ball.speedX;
    }
  });

  // Reset ball if out of bounds
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = (Math.random() > 0.5 ? 1 : -1) * 3;  // Randomize initial direction
    ball.speedY = (Math.random() > 0.5 ? 1 : -1) * 3;  // Randomize initial direction
  }
}

function updatePaddlePosition() {
  if (keys['ArrowUp'] && players[playerId].paddleY > 0) {
    players[playerId].paddleY -= 5;
  }
  if (keys['ArrowDown'] && players[playerId].paddleY < canvas.height - 100) {
    players[playerId].paddleY += 5;
  }
}

window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

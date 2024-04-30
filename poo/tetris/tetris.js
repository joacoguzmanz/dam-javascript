let gameInstance;

function randomTetrominoType() {
    const types = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    return types[Math.floor(Math.random() * types.length)];
}

// Classes
class Block {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

class Tetromino {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.blocks = [];
        this.createBlocks();
    }

    createBlocks() {
        switch (this.type) {
            case 'I':
                this.blocks = [
                    new Block(0, 0, this.color),
                    new Block(1, 0, this.color),
                    new Block(2, 0, this.color),
                    new Block(3, 0, this.color)
                ];
                break;
            case 'J':
                this.blocks = [
                    new Block(0, 0, this.color),
                    new Block(1, 0, this.color),
                    new Block(2, 0, this.color),
                    new Block(2, 1, this.color)
                ];
                break;
            case 'L':
                this.blocks = [
                    new Block(0, 0, this.color),
                    new Block(1, 0, this.color),
                    new Block(2, 0, this.color),
                    new Block(0, 1, this.color)
                ];
                break;
            case 'O':
                this.blocks = [
                    new Block(0, 0, this.color),
                    new Block(1, 0, this.color),
                    new Block(0, 1, this.color),
                    new Block(1, 1, this.color)
                ];
                break;
            case 'S':
                this.blocks = [
                    new Block(0, 0, this.color),
                    new Block(1, 0, this.color),
                    new Block(1, 1, this.color),
                    new Block(2, 1, this.color)
                ];
                break;
            case 'T':
                this.blocks = [
                    new Block(0, 0, this.color),
                    new Block(1, 0, this.color),
                    new Block(2, 0, this.color),
                    new Block(1, 1, this.color)
                ];
                break;
            case 'Z':
                this.blocks = [
                    new Block(0, 0, this.color),
                    new Block(1, 0, this.color),
                    new Block(0, 1, this.color),
                    new Block(-1, 1, this.color)
                ];
                break;
        }
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.grid = [];
        this.tetromino = null;
        this.initGame();
        gameInstance = this;
    }

    initGame() {
        // Initialize game grid
        for (let i = 0; i < 22; i++) {
            this.grid[i] = [];
            for (let j = 0; j < 10; j++) {
                this.grid[i][j] = null;
            }
        }
        // Start with a random tetromino
        this.tetromino = new Tetromino(randomTetrominoType(), 'blue');
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid cells
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                if (this.grid[i][j] !== null) {
                    this.ctx.fillStyle = this.grid[i][j].color;
                    this.ctx.fillRect(j * 40, i * 40, 40, 40);
                } else {
                    this.ctx.strokeStyle = 'gray';
                    this.ctx.strokeRect(j * 40, i * 40, 40, 40);
                }
            }
        }

        // Draw tetromino
        if (this.tetromino !== null) {
            for (let block of this.tetromino.blocks) {
                this.ctx.fillStyle = this.tetromino.color;
                this.ctx.fillRect((block.x + 5) * 40, block.y * 40, 40, 40);
            }
        }
    }

    update() {
        // Update game state
        /*if (this.tetromino !== null) {
            // Move tetromino down
            this.tetromino.blocks.forEach((block) => {
                block.y++;
            });
            // Check for collision with grid or bottom
            if (this.checkCollision()) {
                // Lock tetromino in place
                this.lockTetromino();
                // Check for cleared lines
                this.checkLines();
                // Spawn new tetromino
                this.tetromino = new Tetromino(randomTetrominoType(), 'blue');
            }
        }*/
        if (this.tetromino !== null) {
            // Move tetromino down
            this.tetromino.blocks.forEach((block) => {
                block.y++;
            });
            // Check for collision with grid or bottom
            if (this.checkCollision()) {
                // Lock tetromino in place
                this.lockTetromino();
                // Check for cleared lines
                this.checkLines();
                // Spawn new tetromino
                this.tetromino = new Tetromino(randomTetrominoType(), 'blue');
            }
            // Check if tetromino has reached the top of the board
            if (this.tetromino.blocks.some((block) => block.y <= 0)) {
                // Stop the game
                clearInterval(gameInstance.intervalId);
            }
        }
    }

    checkCollision() {
        // Check if any block of the tetromino collides with the grid or the bottom
        for (let block of this.tetromino.blocks) {
            if (block.y >= 20 || this.grid[block.y][block.x + 5] !== null) {
                return true;
            }
        }
        return false;
    }

    lockTetromino() {
        // Lock the tetromino in place by adding its blocks to the grid
        this.tetromino.blocks.forEach((block) => {
            this.grid[block.y][block.x + 5] = block;
        });
    }

    checkLines() {
        // Check for cleared lines and remove them
        for (let i = 0; i < 20; i++) {
            if (this.grid[i].every((block) => block !== null)) {
                // Remove the line and shift the grid down
                this.grid.splice(i, 1);
                this.grid.unshift(new Array(10).fill(null));
            }
        }
    }
}

class GameLoop {
    constructor(game) {
        this.game = game;
        this.intervalId = setInterval(() => {
            this.game.update();
            this.game.draw();
        }, 1000 / 60);
    }
}

// Add event listeners for user input
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            // Rotate tetromino
            if (gameInstance.tetromino !== null) {
                gameInstance.tetromino.blocks.forEach((block) => {
                    // Rotate the block around the center of the tetromino
                    const centerX = gameInstance.tetromino.blocks[0].x + 0.5;
                    const centerY = gameInstance.tetromino.blocks[0].y + 0.5;
                    block.x = centerX + (block.x - centerX) * Math.cos(Math.PI / 2) - (block.y - centerY) * Math.sin(Math.PI / 2);
                    block.y = centerY + (block.x - centerX) * Math.sin(Math.PI / 2) + (block.y - centerY) * Math.cos(Math.PI / 2);
                });
            }
            break;
        case 'ArrowDown':
            // Move tetromino down
            if (gameInstance.tetromino !== null) {
                gameInstance.tetromino.blocks.forEach((block) => {
                    block.y++;
                });
            }
            break;
        case 'ArrowLeft':
            // Move tetromino left
            if (gameInstance.tetromino !== null) {
                gameInstance.tetromino.blocks.forEach((block) => {
                    block.x--;
                });
            }
            break;
        case 'ArrowRight':
            // Move tetromino right
            if (gameInstance.tetromino !== null) {
                gameInstance.tetromino.blocks.forEach((block) => {
                    block.x++;
                });
            }
            break;
    }
})

let game = new Game(document.getElementById('game-canvas'));
setInterval(() => {
    game.update();
    game.draw();
}, 1000 / 20);
// Move tetromino
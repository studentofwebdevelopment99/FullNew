// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const snakeSize = 20;
let snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}]; // Initial snake body
let food = {x: 0, y: 0};
let direction = 'RIGHT';
let score = 0;

// Functions to generate food at random positions
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
  food.y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
}

// Functions to draw the snake and food
function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? 'black' : 'lime'; // Head is green, body is lime
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// Update the snake's position based on direction
function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'LEFT': head.x -= snakeSize; break;
    case 'RIGHT': head.x += snakeSize; break;
    case 'UP': head.y -= snakeSize; break;
    case 'DOWN': head.y += snakeSize; break;
  }

  snake.unshift(head); // Add new head to the snake array
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood(); // Generate new food if the snake eats it
  } else {
    snake.pop(); // Remove the last segment of the snake
  }
}

// Check for collisions
function checkCollisions() {
  const head = snake[0];

  // Collision with walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    resetGame();
  }

  // Collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

// Reset the game
function resetGame() {
  snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];
  direction = 'RIGHT';
  score = 0;
  generateFood();
}

// Update the game every 100ms
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  moveSnake();
  checkCollisions();
  drawSnake();
  drawFood();
  document.querySelector('title').textContent = `Snake Game - Score: ${score}`;
}

// Handle keyboard input for snake direction
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && direction !== 'DOWN') {
    direction = 'UP';
  } else if (e.key === 'ArrowDown' && direction !== 'UP') {
    direction = 'DOWN';
  } else if (e.key === 'ArrowLeft' && direction !== 'RIGHT') {
    direction = 'LEFT';
  } else if (e.key === 'ArrowRight' && direction !== 'LEFT') {
    direction = 'RIGHT';
  }
});

// Initialize the game
generateFood();
setInterval(update, 100); // Update the game every 100ms

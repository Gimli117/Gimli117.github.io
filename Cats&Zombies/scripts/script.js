const gridSize = 5;
let player = { x: 0, y: 0 };
let turnCount = 0;

// Images
const cellImages = Array.from({ length: 25 }, (_, i) => `images/${i + 1}.jpg`);
const catImage = "images/cat.jpg";
const zombieImage = "images/zombie.jpg";

// Positions
const cat = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
const zombies = [
  { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) },
  { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) }
];

const currentImage = document.getElementById("currentCellImage");
const warningDiv = document.getElementById("warning");

function drawCurrentCell() {
  const index = player.y * gridSize + player.x;

  // Show cell background image
  currentImage.src = cellImages[index];

  updateButtonVisibility();

  // Check for cat
  if (player.x === cat.x && player.y === cat.y) {
    currentImage.src = catImage;
    alert("You found the cat! 😺 You win!");
    return;
  }

  // Check for zombie
  for (let zombie of zombies) {
    if (player.x === zombie.x && player.y === zombie.y) {
      currentImage.src = zombieImage;
      alert("A zombie got you! 🧟‍♂️ Game Over.");
      return;
    }
  }

  // Show warning if a zombie is adjacent (1 cell away horizontally or vertically)
  warningDiv.innerText = "";
  for (let zombie of zombies) {
    if (Math.abs(zombie.x - player.x) + Math.abs(zombie.y - player.y) === 1) {
      warningDiv.innerText = "⚠️ Zombie nearby!";
    }
  }
}

 // Hides buttons when at a wall / corner
 function updateButtonVisibility() {
  document.getElementById("up").style.visibility = player.y > 0 ? "visible" : "hidden";
  document.getElementById("down").style.visibility = player.y < gridSize - 1 ? "visible" : "hidden";
  document.getElementById("left").style.visibility = player.x > 0 ? "visible" : "hidden";
  document.getElementById("right").style.visibility = player.x < gridSize - 1 ? "visible" : "hidden";
 }

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
    player.x = newX;
    player.y = newY;
    turnCount++;

    if (turnCount % 2 === 0) {
      moveZombies();
    }

    drawCurrentCell();
  }
}

function moveZombies() {
  for (let zombie of zombies) {
    if (zombie.x < player.x) zombie.x++;
    else if (zombie.x > player.x) zombie.x--;

    if (zombie.y < player.y) zombie.y++;
    else if (zombie.y > player.y) zombie.y--;
  }
}

document.getElementById("up").onclick = () => movePlayer(0, -1);
document.getElementById("down").onclick = () => movePlayer(0, 1);
document.getElementById("left").onclick = () => movePlayer(-1, 0);
document.getElementById("right").onclick = () => movePlayer(1, 0);

drawCurrentCell();
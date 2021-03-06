
let game = true;

// Enemies our player must avoid
let Enemy = function(x, y, sprite, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
      this.x = x;
      this.y = y;
      this.sprite = sprite;
      this.speed = speed;
      this.height = 65;
      this.width = 95;
      this.collision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
      if(this.x > ctx.canvas.width){
          this.x = -(this.speed * Math.floor(Math.random() * 4)) ;
      } else {
          this.x += this.speed * dt;
      }

    //Check for collision with Player
      if(collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)){
          this.collision = true;

          //reset the Player position
          if(player) {
            player.x = 202;
            player.y = 400;
          }
       } else {
          this.collision = false;
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let Player = function(x, y, sprite) {
      this.x = x;
      this.y = y;
      this.sprite = sprite;
      this.height = 75;
      this.width = 65;
};

// This class requires an update(), render() and
Player.prototype.update = function(dt) {
    //Win logic of the game
      if(game && this.y < 40){
    //Stopping the game loop
        game = false;
    // Calling winGame function to activate alert
        setTimeout(winGame, 1000);
      }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.
Player.prototype.handleInput = function(direction) {

    const horizontal = 101;
    const vertical = 83;

    if (direction === "left" && this.x - horizontal >= 0){
          this.x -= horizontal;
    } else if (direction === "right" && this.x + horizontal < ctx.canvas.width){
          this.x += horizontal;
    } else if (direction === "down" && this.y + vertical < ctx.canvas.height -200){
          this.y += vertical;
    } else if (direction === "up" && this.y - vertical >= 0 - this.height){
          this.y -= vertical;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

const bug1 = new Enemy(-101, 55, 'images/enemy-bug.png', 150);
const rock1 = new Enemy(-300, 140, 'images/Rock.png', 200);
const rock2 = new Enemy(-200, 230, 'images/Rock.png', 150);
const bug2 = new Enemy(-451, 145, 'images/enemy-bug.png', 170);

allEnemies.push(bug1, rock1, rock2, bug2);

// Place the player object in a variable called player
let player = new Player(202, 400, 'images/char-horn-girl.png');



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function collision(px, py, pw, ph, ex, ey, ew, eh) {
  return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
}

function winGame() {
  reset();
  alert("Yay! You Win");
}

function reset() {
  allEnemies = [];
}

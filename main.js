let myGamePiece;
let myObstacles = [];
let myScore;
let gameOver;

const startGame = () => {
  myGameArea.start();
  myGamePiece = new Component(70, 70, "img/girl.WebP", 10, 500, "image");
  myScore = new Component("20px", "Consolas", "black", 10, 40, "text");
  gameOver = new Component("40px", "Consolas", "black", 70, 300, "text");
  gameOver.text = "GAMEOVER";
};

class Component {
  constructor(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
      this.image = new Image();
      this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.color = color;
    this.x = x;
    this.y = y;
    this.text = "";
  }
  update() {
    let ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = this.color;
      ctx.fillText(this.text, this.x, this.y);
    } else if (this.type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  crashWith(otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  }
}

class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
  }
  start() {
    this.canvas.width = 310;
    this.canvas.height = 660;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0;
    this.speed = 1;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  }
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  stop() {
    clearInterval(this.interval);
  }
}

const everyinterval = (n) => {
  if ((myGameArea.frameNo / n) % 1 == 0) return true;
  return false;
};

let myGameArea = new Game();

const updateGameArea = () => {
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(160)) {
    const rnd = Math.floor(Math.random() * 2);
    if (rnd === 0) {
      myObstacles.push(new Component(200, 20, "purple", 0, -40));
    } else {
      myObstacles.push(new Component(200, 20, "rgb(219,112,147)", 110, -40));
    }
    console.log(myGameArea.frameNo);
  }
  if (everyinterval(1000)) {
    myGameArea.speed += 1;
  }
  for (let i = 0; i < myObstacles.length; i++) {
    myObstacles[i].y += myGameArea.speed;
    myObstacles[i].update();
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      gameOver.update();
      // console.log("GAME -OVER");
      return;
    }
  }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
};
document.addEventListener("keydown", (event) => {
  //console.log(event.key);
  myGamePiece.image.src = "img/girl.WebP";
  if (event.key === "ArrowUp" || event.key === "w") {
    myGamePiece.speedY = -4;
  }
  if (event.key === "ArrowDown" || event.key === "s") {
    myGamePiece.speedY = 4;
  }
  if (event.key === "ArrowLeft" || event.key === "a") {
    myGamePiece.speedX = -4;
  }
  if (event.key === "ArrowRight" || event.key === "d") {
    myGamePiece.speedX = 4;
  }
});

document.addEventListener("keyup", (event) => {
  //console.log(event.key);
  myGamePiece.image.src = "img/girl.WebP";

  if (event.key === "ArrowUp" || event.key === "w") {
    myGamePiece.speedY = 0;
  }
  if (event.key === "ArrowDown" || event.key === "s") {
    myGamePiece.speedY = 0;
  }
  if (event.key === "ArrowLeft" || event.key === "a") {
    myGamePiece.speedX = 0;
  }
  if (event.key === "ArrowRight" || event.key === "d") {
    myGamePiece.speedX = 0;
  }
});
window.onload = startGame;

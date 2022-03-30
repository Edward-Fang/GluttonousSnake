import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorePanel";

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  // 存储蛇的移动方向
  direction: string = "";
  isLive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 2);
    this.init();
  }

  // 初始化方法
  init() {
    // 通过 bind(this)使 this由 #document指向类本身
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.run();
  }

  // 键盘响应方法
  keydownHandler(event: KeyboardEvent) {
    // 修改direction
    this.direction = event.key;
  }

  // 根据 direction来改变蛇的方向
  run() {
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
    }

    this.checkEat(X, Y);

    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      alert(e.message);
      this.isLive = false;
    }
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }
  // 检查蛇是否吃到食物的方法
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
  }
}

export default GameControl;

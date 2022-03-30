class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div") as HTMLElement;
    this.bodies = this.element.getElementsByTagName("div")!;
  }

  // 获得蛇头的坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头的坐标
  // X 和 Y 两个同时只能修改一个，所以设置判断
  // 设置是否撞墙
  set X(value: number) {
    if (this.X === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("Game Over!");
    }

    // 关闭水平掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        // 说明蛇向右走，发生掉头，向左走
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }

    this.moveBody();
    this.head.style.left = value + "px";
    this.checkBump();
  }
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("Game Over!");
    }

    // 关闭垂直掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        // 说明蛇向右走，发生掉头，向左走
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }

    this.moveBody();
    this.head.style.top = value + "px";
    this.checkBump();
  }

  // 设置蛇增加身体的方法  添加 div
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  // 移动蛇身体
  moveBody() {
    // 后面一个的位置等于前面一个的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // 检车头和身体是否相撞
  checkBump() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("撞到自己了！");
      }
    }
  }
}

export default Snake;

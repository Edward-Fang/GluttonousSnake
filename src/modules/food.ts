class Food {
  element: HTMLElement;

  constructor() {
    // 可能会获取不到 food 元素，添加 ! 阻止报错
    this.element = document.getElementById("food")!;
  }

  // 定义获取坐标的方法
  get X() {
    return this.element.offsetLeft;
  }
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物位置的方法
  // 位置从0-290(304-2*2)，且一格是10，坐标最10的整数倍
  change() {
    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}

export default Food;

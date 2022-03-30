class ScorePanel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  maxLevel: number; // 等级限制
  upScore: number; // 升级的分数

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  addScore() {
    this.scoreEle.innerHTML = ++this.score + "";
    if (this.score % this.upScore === 0) {
      this.addLevel();
    }
  }
  addLevel() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  }
}
export default ScorePanel;

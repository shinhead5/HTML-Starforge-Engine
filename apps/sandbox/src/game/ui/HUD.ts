import { Color, TextLabel, UIElement } from "@starforge/engine";

export class HUD {
  root = new UIElement(0, 0, 200, 200);
  healthLabel = new TextLabel(20, 20, 200, 24);
  scoreLabel = new TextLabel(20, 44, 200, 24);

  constructor() {
    this.healthLabel.color = new Color(240, 240, 240, 1);
    this.scoreLabel.color = new Color(240, 240, 240, 1);
    this.root.add(this.healthLabel);
    this.root.add(this.scoreLabel);
  }

  update(health: number, score: number) {
    this.healthLabel.text = `Health: ${health}`;
    this.scoreLabel.text = `Score: ${score}`;
  }
}

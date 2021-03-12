import 'phaser';

declare const global: any;

class WebstroPop extends Phaser.Scene {

  spaceship?: Phaser.GameObjects.Sprite

  preload() {
    this.load.setBaseURL(process.env.BASE_URL);
    [
      "spaceship",
      "block-blue",
      "block-green",
      "block-purple",
      "block-red",
      "block-yellow",
    ].forEach((e) => this.load.image(e, `/assets/sprite/${e}.png`));
  }

  create() {
    this.spaceship = this.add.sprite(530, 500, "spaceship")
    
  }

  update(time: number, delta: number) {
    
  }
}

const config = {
  type: Phaser.AUTO,
  width: global.innerWidth * global.devicePixelRatio,
  height: global.innerHeight * global.devicePixelRatio,
  scene: WebstroPop
};

const game = new Phaser.Game(config);

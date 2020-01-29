export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "../../assets/background.png");

    this.load.image("yodabb", "../../assets/yodabb.png");
    this.load.image("yodabb-frog", "../../assets/yodabb-frog.png");
    this.load.image("yodabb-mushroom", "../../assets/yodabb-mushroom.png");
    this.load.image("yodabb-groot", "../../assets/yodabb-groot.png");

    this.load.image("frog", "../../assets/frog.png");
    this.load.image("mushroom", "../../assets/mushroom.png");
    this.load.image("groot", "../../assets/groot.png");

    this.load.bitmapFont("pixelFont", "../../assets/font/font.png", "../../assets/font/font.xml");
  }

  create() {
    this.add.text(200, 200, "Loading...");
    this.scene.start('MainScene');
  }
}

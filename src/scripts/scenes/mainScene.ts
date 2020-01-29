import Yodabb from '../objects/Yodabb';

export default class MainScene extends Phaser.Scene {
  private background: Phaser.GameObjects.TileSprite;
  private yodabb: Yodabb;
  private frog: Phaser.GameObjects.Image;
  private mushroom: Phaser.GameObjects.Image;
  private groot: Phaser.GameObjects.Image;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private scoreLabel: Phaser.GameObjects.BitmapText;

  private score: number;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "background");
    this.background.setOrigin(0, 0);

    this.yodabb = new Yodabb(this, this.scale.width/2, this.scale.height-50);
    this.frog = this.add.image(this.scale.width/2, 0, "frog");
    this.mushroom = this.add.image(this.scale.width/2, 0, "mushroom");
    this.groot = this.add.image(this.scale.width/2, 0, "groot");

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    
    this.score = 0;
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);
  }

  moveFood(food: Phaser.GameObjects.Image, speed: number) {
    food.y += speed;
    if (food.y > this.scale.height) {
      this.resetFoodPos(food);
    }
  }

  resetFoodPos(food: Phaser.GameObjects.Image) {
    food.y = 0;
    var randomX = Phaser.Math.Between(0, this.scale.width);
    food.x = randomX;
  }

  moveYodabbManager() {
    if(this.cursorKeys.left?.isDown) {
      this.yodabb.x -= 1.5;
    }
    else if (this.cursorKeys.right?.isDown) {
      this.yodabb.x += 1.5;
    }
  }

  yodabbGrabs(food: Phaser.GameObjects.Image) {
    //define upper- and lower-bounds
    let xLB = this.yodabb.x - 25;
    let xUB = this.yodabb.x + 25;
    let yLB = this.yodabb.y - 25;
    let yUB = this.yodabb.y + 25;

    let grab:boolean = ((xLB <= food.x) && (xUB >= food.x) && (yLB <= food.y) && (yUB >= food.y));

    if (grab) {
      this.resetFoodPos(food);      

      if (food.texture.key == 'frog') {
        console.log("frog");
        this.yodabb.catchFrog();
        this.score += 300;
      }
      else if (food.texture.key == 'groot') {
        console.log("groot");
        this.yodabb.catchGroot();
        this.score -= 500;
      }
      else if (food.texture.key == 'mushroom') {
        console.log("mushroom");
        this.yodabb.catchMushroom();
        this.score += 100;
      }

      this.scoreLabel.text = "SCORE " + this.score;

      this.time.delayedCall(300, function(yodabb) {
        yodabb.resetYoda();
      }, [this.yodabb]);
    }
    
  }

  update() {
    this.moveFood(this.frog, 3);
    this.moveFood(this.groot, 2);
    this.moveFood(this.mushroom, 1);


    this.background.tilePositionY -= 0.5;

    this.moveYodabbManager();

    this.yodabbGrabs(this.frog);
    this.yodabbGrabs(this.groot);
    this.yodabbGrabs(this.mushroom);
  }
}

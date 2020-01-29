export default class Yodabb extends Phaser.GameObjects.Container {
    private yodabb: Phaser.GameObjects.Image;


    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, []);
        scene.add.existing(this);

        this.yodabb = scene.add.image(0, 0, 'yodabb');
        this.yodabb.setOrigin(.5, .5);

        this.add(this.yodabb);
    }

    catchFrog() {
        this.yodabb.setTexture('yodabb-frog');
    }

    catchMushroom() {
        this.yodabb.setTexture('yodabb-mushroom');
    }

    catchGroot() {
        this.yodabb.setTexture('yodabb-groot');
    }

    resetYoda() {
        this.yodabb.setTexture('yodabb');
    }
}

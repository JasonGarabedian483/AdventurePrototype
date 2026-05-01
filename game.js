class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

// intro scene, black screen that eventually fades to scene 1 of game starting in bedroom
class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    preload() {
        this.load.path = 'assets/';
        this.load.image('bedroom', "Bedroom.jpg")
    }
    create() {
        const introText = this.add.text(300,50, "You feel oh so comfortable asleep in bed on a nice tuesday morning without a care in the world. Except something is wrong, there's this weird beeping sounds that seems very familiar... Oh no! Your alarm!", {
            wordWrap: { width: 1500},
        });
        introText.setFontSize(50);
        const wakeUpText = this.add.text(860,400, "Click anywhere to wake up!").setFontSize(50);

        this.tweens.add({
            targets: wakeUpText,
            alpha: 0,
            loop: -1,
            yoyo: true,
        })
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Bedroom'));
        });
    }
}

class bedroomScene extends AdventureScene {
    constructor() {
        super('Bedroom')
    }
    
    preload() {
        this.load.path = 'assets/';
        this.load.image('bedroom', 'Bedroom.jpg')
        this.load.image('phone', 'phone.png')
        this.load.image('wallet', 'wallet.png')
        this.load.image('exitArrow', 'leftarrow.png')
    }

    onEnter() {
        let bedroomImage = this.add.image(this.game.config.width * .375, this.game.config.height * .5, 'bedroom');
            bedroomImage.setScale(.25);

        let phoneItem = this.add.image(950, 675, 'phone');
            phoneItem.setScale(3);
            phoneItem.setAngle(105);
            phoneItem.setInteractive({useHandCursor: true});
            phoneItem.on("pointerover", () => this.showMessage("My phone"));
            phoneItem.on("pointerdown", () => {
                this.showMessage("Wouldn't want to forget that");
                this.gainItem('📱 Phone');
                this.tweens.add({
                    targets: phoneItem,
                    alpha: 0,
                    duration: 250,
                    onComplete: () => phoneItem.destroy()
                });
            })

        let walletItem = this.add.image(1150, 700, 'wallet');
            walletItem.setScale(3);
            walletItem.setAngle(15);
            walletItem.setInteractive({useHandCursor: true});
            walletItem.on("pointerover", () => this.showMessage("My wallet"));
            walletItem.on("pointerdown", () => {
                this.showMessage("Can't get back in without my ID");
                this.gainItem('💳 Wallet');
                this.tweens.add({
                    targets: walletItem,
                    alpha: 0,
                    duration: 250,
                    onComplete: () => walletItem.destroy()
                });
            })
        
        let exitArrow = this.add.image(400, 300, 'exitArrow');
            exitArrow.setScale(6);
            exitArrow.setInteractive({useHandCursor: true});
            exitArrow.on("pointerover", () => {
                this.getBigger(exitArrow);
                if (this.hasItem("💳 Wallet") && this.hasItem("📱 Phone")) {
                    this.showMessage("To the hallway..");
                }
                else {
                    this.showMessage("I'm missing something...");
                }
            })

            exitArrow.on("pointerout", () => {
                this.tweens.add({
                    targets: exitArrow,
                    scaleX: 6,
                    scaleY: 6,
                    duration: 100,
                    ease: 'Power1'
                })
            })

            exitArrow.on("pointerdown", () => {
                if (this.hasItem("💳 Wallet") && this.hasItem("📱 Phone")) {
                    this.gotoScene('Hallway');
                }
            })
    }
}

class hallwayScene extends AdventureScene {
    constructor () {
        super('Hallway')
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('hallway', 'Hallway.jpg')
        this.load.image('brushteeth', 'brushteeth.png')
        this.load.image('leftarrow', "leftarrow.png")
    }

    onEnter() {
        let hallwayImage = this.add.image(this.game.config.width * .375, this.game.config.height * .5, 'hallway');
            hallwayImage.setScale(.25);

        let toothbrushImage = this.add.image(1150, 300, 'brushteeth');
            toothbrushImage.setScale(4);
            toothbrushImage.setAngle(10);
            toothbrushImage.setInteractive({useHandCursor: true});
            toothbrushImage.on("pointerover", () => {
                this.showMessage("Brush teeth");
                this.getBigger(toothbrushImage);
            })
            toothbrushImage.on("pointerout", () => {
                this.tweens.add({
                    targets: toothbrushImage,
                    scaleX: 4,
                    scaleY: 4,
                    duration: 100,
                    ease: "Power1",
                })
            })
            toothbrushImage.on("pointerdown", () => {
                this.showMessage("Ahh, minty fresh");
                this.gainItem("🦷 Teeth cleaned");
                this.tweens.add({
                    targets: toothbrushImage,
                    alpha: 0,
                    duration: 250,
                    onComplete: () => toothbrushImage.destroy()
                })
            })
            
        let exitArrow = this.add.image(300, 200, 'leftarrow');
            exitArrow.setScale(6);
            exitArrow.setAngle(180);
            exitArrow.setInteractive({useHandCursor: true});
            exitArrow.on("pointerover", () => {
                this.getBigger(exitArrow);
                if (this.hasItem("🦷 Teeth cleaned")) {
                    this.showMessage("To the living room");
                }
                else {
                    this.showMessage("I should really brush my teeth");
                }
            })

            exitArrow.on("pointerout", () => {
                this.tweens.add({
                    targets: exitArrow,
                    scaleX: 6,
                    scaleY: 6,
                    duration: 100,
                    ease: 'Power1'
                })
            })

            exitArrow.on("pointerdown", () => {
                if (this.hasItem("🦷 Teeth cleaned")) {
                    this.gotoScene('Livingroom')
                }
            })
    }
}
 // ADD MORE OBJECTS, POSSIBLY ADD BASKETBALL THAT SAYS "I WON'T NEED THIS"
class livingroomScene extends AdventureScene {
    constructor() {
        super('Livingroom')
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('livingroom', 'LivingRoom.jpg')
        this.load.image('bookbag', 'bookbag.png')
        this.load.image('exitarrow', 'leftarrow.png')
        this.load.image('basketball', 'basketball.png')
    }

    onEnter() {
        let livingroomImage = this.add.image(this.game.config.width * .375, this.game.config.height * .5, 'livingroom');
            livingroomImage.setScale(.25);

        let bookbagItem = this.add.image(950, 625, 'bookbag');
            bookbagItem.setScale(6);
            bookbagItem.setInteractive({useHandCursor: true});
            bookbagItem.on("pointerover", () => {
                this.showMessage("My bookbag")
                this.getBigger(bookbagItem);
                });

            bookbagItem.on("pointerout", () => {
                this.getSmaller(bookbagItem);
            });

            bookbagItem.on("pointerdown", () => {
                this.showMessage("I'll definitely need this");
                this.gainItem('🎒 Bookbag');
                this.tweens.add({
                    targets: bookbagItem,
                    alpha: 0,
                    duration: 250,
                    onComplete: () => bookbagItem.destroy()
                });
            })
        
        let basketballItem = this.add.image(650, 825, 'basketball');
            basketballItem.setScale(6);
            basketballItem.setInteractive({useHandCursor: true});
            basketballItem.on("pointerover", () => {
                this.showMessage("A small basketball for a door hoop");
                this.getBigger(basketballItem);
            })
            basketballItem.on("pointerout", () => {
                this.getSmaller(basketballItem);
            })
            basketballItem.on("pointerdown", () => {
                this.showMessage("I probably don't have time to play with this");
            })

        let doorArrow = this.add.image(200, 800, 'exitarrow');
            doorArrow.setScale(6);
            doorArrow.setAngle(90);
            doorArrow.setInteractive({useHandCursor: true});
            doorArrow.on("pointerover", () => {
                this.getBigger(doorArrow);
                if (this.hasItem("💳 Wallet") && this.hasItem("📱 Phone") && this.hasItem("🦷 Teeth cleaned") && this.hasItem("🎒 Bookbag") && this.hasItem("🥪 Breakfast")) {
                    this.showMessage("All ready to go to class");
                }
                else {
                    this.showMessage("I'm missing something...");
                }
            });
        
        let kitchenArrow = this.add.image(1250, 400, 'exitarrow');
            kitchenArrow.setScale(3.5);
            kitchenArrow.setInteractive({useHandCursor: true});
            kitchenArrow.on("pointerover", () => {
                this.getBigger(kitchenArrow);
                this.showMessage("To the kitchen");
            })
            kitchenArrow.on("pointerout", () => {
                this.getSmaller(kitchenArrow);
            })
            kitchenArrow.on("pointerdown", () => {
                this.gotoScene('Kitchen');
            })
    }
}

class kitchenScene extends AdventureScene {
    constructor() {
        super('Kitchen')
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('poptart', 'poptart.png')
        this.load.image('kitchen', 'kitchenimage.jpg')
        this.load.image('backarrow', 'leftarrow.png')
        this.load.image('plate', 'plate.png')
    }

    onEnter() {
        let kitchenImage = this.add.image(this.game.config.width * .375, this.game.config.height * .5, 'kitchen');
            kitchenImage.setScale(.25);
        
        let backArrow = this.add.image(1250, 900, 'backarrow');
            backArrow.setScale(6);
            backArrow.setAngle(300);
            backArrow.setInteractive({useHandCursor: true});
            backArrow.on("pointerover", () => {
                this.showMessage("Back to living room");
                this.getBigger(backArrow);
            })
            backArrow.on("pointerout", () => {
                this.getSmaller(backArrow);
            })
            backArrow.on("pointerdown", () => {
                this.gotoScene('Livingroom');
            })

        let poptartImage = this.add.image(425, 815, 'poptart');
            poptartImage.setScale(4);
            poptartImage.setAngle(320);
            poptartImage.setInteractive({useHandCursor: true});
            poptartImage.on("pointerover", () => {
                this.showMessage("Some breakfast");
                this.getBigger(poptartImage);
            })
            poptartImage.on("pointerout", () => {
                this.getSmaller(poptartImage);
            })
            poptartImage.on("pointerdown", () => {
                this.showMessage("Probably smart to grab some quick food to go");
                this.gainItem("🥪 Breakfast");
                this.tweens.add({
                    targets: poptartImage,
                    alpha: 0,
                    duration: 250,
                    onComplete: () => poptartImage.destroy()
                });
            });

        let plateImage = this.add.image(600, 725, 'plate');
            plateImage.setScale(4);
            plateImage.setAngle(335);
            plateImage.setInteractive({useHandCursor: true});
            plateImage.on("pointerover", () => {
                this.showMessage("A plate for food");
                this.getBigger(plateImage);
            });
            plateImage.on("pointerout", () => {
                this.getSmaller(plateImage);
            });
            plateImage.on("pointerdown", () => {
                this.showMessage("I don't have time to sit down and eat, I need to go now!");
            });
    }
}
// outro scene, fading to black from outside stairs as the player completes the game
class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, bedroomScene, hallwayScene, livingroomScene, kitchenScene, Demo1, Demo2, Outro],
    title: "Adventure Game",
});


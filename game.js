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
        super('Bedroom', 'Bedroom')
    }
    
    preload() {
        this.load.path = 'assets/';
        this.load.image('bedroom', 'Bedroom.jpg')
        this.load.image('phone', 'phone.png')
        this.load.image('wallet', 'wallet.png')
        this.load.image('exitArrow', 'leftarrow.png')
        this.load.audio('button', 'button.mp3')
    }

    onEnter() {
        let bedroomImage = this.add.image(this.game.config.width * .375, this.game.config.height * .5, 'bedroom');
            bedroomImage.setScale(.25);

        let phoneItem = this.add.image(950, 675, 'phone');
            phoneItem.setScale(3);
            phoneItem.setAngle(105);
            phoneItem.setInteractive({useHandCursor: true});
            phoneItem.on("pointerover", () => {
                this.showMessage("My phone");
                this.getBigger(phoneItem);
            });
            phoneItem.on("pointerout", () => this.getSmaller(phoneItem));
            phoneItem.on("pointerdown", () => {
                this.showMessage("Wouldn't want to forget that");
                this.gainItem('📱 Phone');
                this.collectItem(phoneItem);
            })

        let walletItem = this.add.image(1150, 700, 'wallet');
            walletItem.setScale(3);
            walletItem.setAngle(15);
            walletItem.setInteractive({useHandCursor: true});
            walletItem.on("pointerover", () => {
                this.showMessage("My wallet");
                this.getBigger(walletItem);
            });
            walletItem.on("pointerout", () => this.getSmaller(walletItem));
            walletItem.on("pointerdown", () => {
                this.showMessage("Can't get back in without my ID");
                this.gainItem('💳 Wallet');
                this.collectItem(walletItem);
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
            exitArrow.on("pointerout", () => this.getSmaller(exitArrow));
            exitArrow.on("pointerdown", () => {
                if (this.hasItem("💳 Wallet") && this.hasItem("📱 Phone")) {
                    this.sound.play('button');
                    this.gotoScene('Hallway');
                }
            })
    }
}

class hallwayScene extends AdventureScene {
    constructor () {
        super('Hallway', 'Hallway')
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('hallway', 'Hallway.jpg')
        this.load.image('brushteeth', 'brushteeth.png')
        this.load.image('leftarrow', "leftarrow.png")
        this.load.audio('button', 'button.mp3')
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
            toothbrushImage.on("pointerout", () => this.getSmaller(toothbrushImage));
            toothbrushImage.on("pointerdown", () => {
                this.showMessage("Ahh, minty fresh");
                this.gainItem("🦷 Teeth cleaned");
                this.collectItem(toothbrushImage);
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
            exitArrow.on("pointerout", () => this.getSmaller(exitArrow));
            exitArrow.on("pointerdown", () => {
                if (this.hasItem("🦷 Teeth cleaned")) {
                    this.sound.play('button');
                    this.gotoScene('Livingroom')
                }
            })
    }
}

class livingroomScene extends AdventureScene {
    constructor() {
        super('Livingroom', 'Living Room')
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('livingroom', 'LivingRoom.jpg')
        this.load.image('bookbag', 'bookbag.png')
        this.load.image('exitarrow', 'leftarrow.png')
        this.load.image('basketball', 'basketball.png')
        this.load.audio('button', 'button.mp3')
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
            bookbagItem.on("pointerout", () => this.getSmaller(bookbagItem));
            bookbagItem.on("pointerdown", () => {
                this.showMessage("I'll definitely need this");
                this.gainItem('🎒 Bookbag');
                this.collectItem(bookbagItem);
            })

        let basketballItem = this.add.image(650, 825, 'basketball');
            basketballItem.setScale(6);
            basketballItem.setInteractive({useHandCursor: true});
            basketballItem.on("pointerover", () => {
                this.showMessage("A small basketball for a door hoop");
                this.getBigger(basketballItem);
            })
            basketballItem.on("pointerout", () => this.getSmaller(basketballItem));
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
            doorArrow.on("pointerout", () => this.getSmaller(doorArrow));
            doorArrow.on("pointerdown", () => {
                if (this.hasItem("💳 Wallet") && this.hasItem("📱 Phone") && this.hasItem("🦷 Teeth cleaned") && this.hasItem("🎒 Bookbag") && this.hasItem("🥪 Breakfast")) {
                    this.sound.play('button');
                    this.gotoScene("Outside");
                }
            });
        
        let kitchenArrow = this.add.image(1250, 400, 'exitarrow');
            kitchenArrow.setScale(3.5);
            kitchenArrow.setInteractive({useHandCursor: true});
            kitchenArrow.on("pointerover", () => {
                this.getBigger(kitchenArrow);
                this.showMessage("To the kitchen");
            });
            kitchenArrow.on("pointerout", () => this.getSmaller(kitchenArrow));
            kitchenArrow.on("pointerdown", () => {
                this.sound.play('button');
                this.gotoScene('Kitchen');
            });
    }
}

class kitchenScene extends AdventureScene {
    constructor() {
        super('Kitchen', 'Kitchen')
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('poptart', 'poptart.png')
        this.load.image('kitchen', 'kitchenimage.jpg')
        this.load.image('backarrow', 'leftarrow.png')
        this.load.image('plate', 'plate.png')
        this.load.audio('button', 'button.mp3')
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
            backArrow.on("pointerout", () => this.getSmaller(backArrow));
            backArrow.on("pointerdown", () => {
                this.sound.play('button');  
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
            poptartImage.on("pointerout", () => this.getSmaller(poptartImage));
            poptartImage.on("pointerdown", () => {
                this.showMessage("Probably smart to grab some quick food to go");
                this.gainItem("🥪 Breakfast");
                this.collectItem(poptartImage);
            });

        let plateImage = this.add.image(600, 725, 'plate');
            plateImage.setScale(4);
            plateImage.setAngle(335);
            plateImage.setInteractive({useHandCursor: true});
            plateImage.on("pointerover", () => {
                this.showMessage("A plate for food");
                this.getBigger(plateImage);
            });
            plateImage.on("pointerout", () => this.getSmaller(plateImage));
            plateImage.on("pointerdown", () => {
                this.showMessage("I don't have time to sit down and eat, I need to go now!");
            });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('Outside');
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('outside', 'Stairs.jpg')
    }

    create() {
        this.cameras.main.fadeIn(1000, 0,0,0);
        let backgroundImage = this.add.image(this.game.config.width * .5, this.game.config.height * .5, 'outside');
            backgroundImage.setScale(.25);

        this.add.text(300, 100, "Finally off to class.").setFontSize(50);
        this.add.text(300, 150, "I wonder what we're learning today?").setFontSize(35);
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, bedroomScene, hallwayScene, livingroomScene, kitchenScene, Outro],
    title: "Adventure Game",
});
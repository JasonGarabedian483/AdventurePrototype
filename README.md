A simple adventure game by {who?} based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: 
    - bedroomScene
    - hallwayScene
    - livingroomScene
    - kitchenScene
- **2+ scenes *not* based on `AdventureScene`**:
    - introScene
    - outroScene
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: getBigger(target): Automates the process of an object increasing in size when the player mouses over it.
    - Enhancement 2: getSmaller(target): Automates the process of an object decreasing in size when the player stops mousing over it.
    - Enhancement 3: collectItem(target): Automates the tween that fades an object to 0 alpha then calls target.destroy().

Experience requirements:
- **4+ locations in the game world**: 
    - Bedroom
    - Hallway
    - Kitchen
    - Living Room
    - Outside
- **2+ interactive objects in most scenes**:
    - Bedroom: The bedroom where the player starts has two interactive objects being the phone and the wallet, along with the navigation arrow to move them to the next scene
    - Living room: The living room has two interactive objects, one of which is not needed to finish the game, along with two navigation arrows.
- **Many objects have `pointerover` messages**: 
    - Navigation arrows will give a short description of where it will take the player
    - Pointerover messages for things like objects will tell the player what the object is that they're picking up.
- **Many objects have `pointerdown` effects**:
    - Navigation arrows navigate between scenes when clicked on 
    - Picking up items are moved to inventory when clicked on
- **Some objects are themselves animated**:
    - Navigation arrows and objects will increase and decrease in size as they are hovered over.
    - As objects are picked up and moved into the inventory, they will fade out of the screen

Asset sources:
- Background photos taken by me (Jason Garabedian)
- Pixel art drawings sketched by me (Jason Garabedian) using [Pixil art website](https://www.pixilart.com/draw)
- Button sound effect is recorded from in game audio from Minecraft
- (For each image/audio/video asset used, describe how it was created. What tool did you use to create it? Was it based on another work? If so, how did you change it, and where can we learn more about the original work for comparison? Use [Markdown link syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links).)

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.
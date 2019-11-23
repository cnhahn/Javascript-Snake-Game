 import MainScene from './MainScene.js'
 
 //creates a game space thats 640x640 pixels
 const config = {
     width: 640,
     height: 640,
     type: Phaser.AUTO,
     //will stick the gaame under the div we made in the previous game
     parent: 'phaser-game',
     scene: [MainScene]
 }

 //will create new phaser game with config
 new Phaser.Game(config);
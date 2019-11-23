

export default class Snake {
    constructor(scene){
        //created scene property pass it into the object
        this.scene = scene
        //write some code to see on sence
        //this.scene.add.rectangle(0,0,16,16,0xff0000).setOrigin(0)
        
        //create property for direction
        //this.direction = Phaser.Math.Vector2.LEFT;
        //this.direction = Phaser.Math.Vector2.RIGHT;
        //this.direction = Phaser.Math.Vector2.UP;
        this.direction = Phaser.Math.Vector2.DOWN;

        //time in miliseconds we last called the move fuction
        this.lastMoveTime = 0;

        //the amount of move interval - units are miliseconds
        this.moveInterval = 1000;

        //the size of the rectangle
        this.tileSize = 16;

        //how to make a box move
        //this.box = this.scene.add.rectangle(0,0,16,16,0xff0000).setOrigin(0)

        //need an array for the snake body we are building body is the object we will be setting the array
        this.body = []
        //this is how we start to add to the body of the snake
        //head of snake
        this.body.push( this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tileSize, this.tileSize, 0xff0000).setOrigin(0) )

        //body piece
        //this.body.push( this.scene.add.rectangle(0,0,16,16,0x0000ff).setOrigin(0) )
        //body piece 2
        //this.body.push( this.scene.add.rectangle(0,0,16,16,0xffffff).setOrigin(0) )

        //the apple the snake eats to become bigger
        this.apple = this.scene.add.rectangle(0,0,this.tileSize,this.tileSize,0x00ff00).setOrigin(0)

        this.positionApple()

        //set up inputs on sence
        scene.input.keyboard.on('keydown', e => { this.keydown(e) } )
    }

    positionApple() {
        this.apple.x = Math.floor( (Math.random() * this.scene.game.config.width / this.tileSize) ) * this.tileSize
        this.apple.y = Math.floor( (Math.random() * this.scene.game.config.height / this.tileSize) ) * this.tileSize
    }

    keydown(event){
        console.log(event)
        switch (event.keyCode){
            case 37: //left
                if (this.direction !== Phaser.Math.Vector2.RIGHT){
                    this.direction = Phaser.Math.Vector2.LEFT;
                }   
                break;
            case 38: //up
                if (this.direction !== Phaser.Math.Vector2.DOWN){
                    this.direction = Phaser.Math.Vector2.UP;
                }  
                break;
            case 39: //right
                if (this.direction !== Phaser.Math.Vector2.LEFT){
                    this.direction = Phaser.Math.Vector2.RIGHT;
                }  
                break;
            case 40: //down
            if (this.direction !== Phasar.Math.Vector2.UP){
                this.direction = Phaser.Math.Vector2.DOWN;
            }  
                break; 
        }
    }

    update(time){
        //example of moveing something paired with line 8
        //this.box.x += 1
        
        // * element is really how much it moves by

        //this.body[0].x += this.direction.x * 16
        //this.body[0].y += this.direction.y * 16

        if(time >= this.lastMoveTime + this.moveInterval){
            this.lastMoveTime = time
            this.move()
        }
    }

    //defines how often we want to move
    move(){
        //adds to the snakes body
        //this.body[1].x = this.body[0].x
        //this.body[1].y = this.body[0].y

        //make a local varrible to keep track of the head of snake
        let x = this.body[0].x + this.direction.x * this.tileSize
        let y = this.body[0].y + this.direction.y * this.tileSize

        //comparison
        if(this.apple.x === x && this.apple.y === y){
            //apple is eaten and we increase the body size of the snake
            this.body.push(this.scene.add.rectangle(0, 0, this.tileSize, this.tileSize, 0xffffff).setOrigin(0))
            this.positionApple()
        }

        for (let index = this.body.length - 1; index > 0; index --)
        {
            this.body[index].x = this.body[index - 1].x
            this.body[index].y = this.body[index - 1].y
        }

        this.body[0].x = x
        this.body[0].y = y

        //this.body[0].x += this.direction.x * 16
        //this.body[0].y += this.direction.y * 16

        //death by going off screen
        //setting up the bounders the snake can not enter if it dose it will die resulting in player failing the round
        if( this.body[0].x < 0 ||                             //to far to the right 
            this.body[0].x >= this.scene.game.config.width || //to far to the bottom 
            this.body[0].y < 0 ||                             //to far to the left
            this.body[0].y >= this.scene.game.config.height){  //to far to the top
                this.scene.scene.restart()
            }
        
        //death by eating own tail
        //condition - when head position === to any tail positions
        let tail = this.body.slice(1) //slice works by puting a start index and an end index
        
        //if(tail.filter(s => s.x === this.body[0].x && s.y === this.body[0].y).length > 0){
        //  this.scene.scene.restart()
        //}

        //more efficent way of doing what we wanted to do above
        if(tail.some(s => s.x === this.body[0].x && s.y === this.body[0].y)){
            this.scene.scene.restart()
        }



    }

    //consum apple need to compare where snakes head is and the apple is if they are the same apples the eaten and snake is bigger

}
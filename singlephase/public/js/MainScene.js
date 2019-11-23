import Snake from './Snake.js'

//allows for something to be exported so it can be used in another files
export default class MainScene extends Phaser.Scene {
    constructor(){
        super('MainScene')
    }

    preload(){
    }

    //when the sence frist loads
    create(){
        this.snake = new Snake(this)
    }

    //updates over and over again
    update(time){
        //console.log('update')
        
        //update method on our snake for every timestamp
        this.snake.update(time)
    }

}
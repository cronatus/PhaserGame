/**
 * Created by b00265222 on 26/10/2016.
 */


var Level1 = function(game){
    console.log("Launching Level 1", "color:white; background:red");
};

var map,layer,char,pickup1,pickup2,door,text1;

var inventory = 0;
var doorcollide = false;

Level1.prototype = {

    preload: function () {

        game.load.tilemap('map', 'Res/game_walls.csv', null, Phaser.Tilemap.CSV);
        game.load.image('walls', 'Res/walls.png');

        game.load.spritesheet('char', 'Res/playersht.png', 32,32);
        game.load.spritesheet('pickups', 'Res/pickups.png', 32,32);
        game.load.spritesheet('door', 'Res/door.png', 32,32);

    },

    create: function () {

        game.stage.backgroundColor = '#999999';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        map = game.add.tilemap('map', 32, 32);

        map.addTilesetImage('walls');

        layer = map.createLayer(0);

        layer.resizeWorld();

        map.setCollisionBetween( 0, 20, true, layer);

        pickup1 = game.add.sprite(200,450, 'pickups');
        pickup2 = game.add.sprite(700,600, 'pickups');
        door = game.add.sprite(306,768, 'door');
        char = game.add.sprite(800,600, 'char');
        text1 = game.add.text(300, 500, 'press E to Interact',{fill: '#ffffff'});



        char.scale.setTo(0.8,0.8);
        char.anchor.setTo(0.5,0.5);

        game.physics.arcade.enable([char, pickup1, pickup2, door]);
        game.physics.arcade.enable(layer);

        door.body.immovable = true;

        char.body.collideWorldBounds = true;

        char.animations.add('down', [1,0,1,2]);               //set up animation from spritesheet for the character
        char.animations.add('left', [4,3,4,5]);
        char.animations.add('right', [7,6,7,8]);
        char.animations.add('up', [10,9,10,11]);
        pickup1.animations.add('tool1', [0,1,2,3]);         //separate animations separated out for reference
        //pickup1.animations.add('tool2', [4,5,6,7]);
        pickup2.animations.add('tool3', [8,9,10,11]);
        //pickup1.animations.add('tool4', [12,13,14,15]);
        door.animations.add('open', [1,2,3,4,5,6,7,8,9]);

        game.camera.follow(char, game.camera.FOLLOW_LOCKON);

        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ])





    },

    update: function () {

        doorcollide = false;

        game.physics.arcade.collide(char,pickup1, pickup1CollHandler, null, this);
        game.physics.arcade.collide(char,pickup2, pickup2CollHandler, null, this);
        game.physics.arcade.collide(char,door, doorCollHandler, null, this);
        game.physics.arcade.collide(char,layer);

        if(doorcollide){
            text1 = game.add.text(300, 500, 'press E to Interact',{fill: '#ffffff'});
            text1.fixedToCamera = true;
        } else if (doorcollide == false) (
            text1.kill()
        )


        pickup1.animations.play('tool1', 15, true);
        pickup2.animations.play('tool3', 15, true);
        char.body.velocity.set(0);

        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            char.body.velocity.x = -150;
            char.animations.play('left', 15,true);
            char.animations.currentAnim.speed = 10;
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            char.body.velocity.x = 150;
            char.animations.play('right', 15,true);
            char.animations.currentAnim.speed = 10;
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            char.body.velocity.y = -150;
            char.animations.play('up', 15,true);
            char.animations.currentAnim.speed = 10;
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            char.body.velocity.y = 150;
            char.animations.play('down', 15,true);
            char.animations.currentAnim.speed = 10;
        } else{
            char.animations.stop(null, true)
        }



    },

    render: function () {
        //game.debug.spriteInfo(char, 10, 20);
        //game.debug.spriteInfo(pickup2, 10, 20);
    }

};

/**
 *
 * Current problem with collision handlers in that when Set 2 of pickup2 is the active code version collision breaks completely however
 * either set 1 or 2 works regardless for pickup1, regardless of what set pickup1 is on pickup 2 will break collision for both if it is
 * on Set 2.
 *
 * */

function pickup1CollHandler (char, pickup){

    //Set 1
    /*
    console.log("Wrench Collected"); //debug check
    inventory = 1;
    pickup.kill();
    */

    //Set 2
    switch(inventory){
        case 0:
            console.log("Wrench Collected"); //debug check
            inventory = 1;
            pickup.kill();
            break;
        case 2:
            console.log("Wrench Collected"); //debug check
            inventory = 1;
            pickup2.reset(700,600);
            pickup.kill();
            break;
    }

}

function pickup2CollHandler (char, pickup){

    //Set 1

    /*console.log("Keycard Collected"); //debug check
    inventory = 2;
    pickup.kill();*/


    //Set 2
    switch(inventory){
        case 0:
            console.log("Keycard Collected"); //debug check
            inventory = 2;
            pickup.kill();
            break;
        case 1:
            console.log("Keycard Collected"); //debug check
            inventory = 2;
            pickup1.reset(200,450);
            pickup.kill();
            break;
    }

}

function doorCollHandler (char, door) {

    doorcollide = true;

    if(game.input.keyboard.isDown(Phaser.Keyboard.E) && inventory == 2){
        door.animations.play('open', 15 , false, true);
        inventory = 0;
    }



}
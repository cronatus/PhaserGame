/**
 * Created by B00265222/MWilliams on 24/09/2016.
 */



var MainMenu = function(game){
    console.log("Starting the game", "color:white; background:red");
};

MainMenu.prototype = {
    preload: function () {

        //fill preloader with games assets

        game.load.tilemap('level1walls', 'Res/game_walls.csv', null, Phaser.Tilemap.CSV);
        game.load.image('start', 'Res/start_Button.png');
        game.load.image('howto', 'Res/howTo_Button.png');
        game.load.image('credits', 'Res/credits_Button.png');
        game.load.image('back', 'Res/back_Button.png');

        //load an image like below

    },

    create: function () {

        game.stage.backgroundColor = "#4488AA";

        var startButton = game.add.sprite(300,100, 'start');
        var howToButton = game.add.sprite(300,200, 'howto');
        var creditsButton = game.add.sprite(300,300, 'credits');

        startButton.inputEnabled = true;
        howToButton.inputEnabled = true;
        creditsButton.inputEnabled = true;

        startButton.events.onInputDown.add(Startlistener,this);
        howToButton.events.onInputDown.add(howTolistener,this);
        creditsButton.events.onInputDown.add(creditslistener,this);
    },

    update: function () {

    }
};

function Startlistener() {
    console.log("button clicked");
    game.state.start('game')
}

function howTolistener() {
    console.log("button clicked");
    game.state.start('how')
}

function creditslistener() {
    console.log("button clicked");
    game.state.start('credits')
}
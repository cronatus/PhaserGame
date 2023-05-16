/**
 * Created by b00265222 on 04/10/2016.
 */

var Credits = function(game){
    console.log("Launching credits", "color:white; background:red");
};

var text1;

Credits.prototype = {

    preload: function () {



    },

    create: function () {

        game.stage.backgroundColor = "#4488AA";

        text1 = game.add.text(100, 200, 'Menu Buttons sourced from DaButtonfactory.com',{fill: '#ffffff'});
        text1.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        var backButton = game.add.sprite(20,20, 'back');

        backButton.inputEnabled = true;

        backButton.events.onInputDown.add(backlistener,this);

    },

    render: function () {

    }

};

function backlistener() {
    console.log("button clicked");
    game.state.start('menu')
}
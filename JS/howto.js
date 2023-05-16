/**
 * Created by b00265222 on 04/10/2016.
 */

var howto = function(game){
    console.log("Launching howto", "color:white; background:red");
};

var text1, text2, text3;

howto.prototype = {

    preload: function () {



    },

    create: function () {

        game.stage.backgroundColor = "#4488AA";

        text1 = game.add.text(175, 200, 'use the Arrow Keys to move', {fill: '#ffffff'});
        text2 = game.add.text(175, 230, 'collect the glowing pickups', {fill: '#ffffff'});
        text3 = game.add.text(175, 260, 'Repair the ship', {fill: '#ffffff'});
        text1.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text2.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text3.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

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
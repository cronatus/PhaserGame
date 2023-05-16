/**
 * Created by b00265222 on 26/10/2016.
 */


var game = new Phaser.Game(800,600,Phaser.AUTO,'html5game');


game.state.add('menu', MainMenu);
game.state.add('game', Level1);
game.state.add('how', howto);
game.state.add('credits', Credits);

game.state.start('menu');
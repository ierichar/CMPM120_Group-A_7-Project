/***
 * Group A_7 - Endless Runner
 * Authors: Ilda Lara Aguilar, Jackson Bazeal, Ian Richardson
 * CMPM 120/ARTG 120
 * Started: April 23rd, 2021
 */

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            x:0,
            y:0
        }
    },
    scene: [Menu, Play ]
}

let game = new Phaser.Game(config);

//Variables
const tileSize = 35;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let gameSpeed = 2;

// reserve keyboard bindings
let keySPACE;
let keyP;
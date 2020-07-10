/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

// game speed and difficulty object
let game = {
    startspeed: 2,
    difficulty: 1,
    listeningToKeyboard: true,
    level: 1,

};


// define lives variable
let lives = 3;

let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 440;
document.body.appendChild(canvas);

let bgReady, heroReady, alienOneReady,
    alienTwoReady,
    alienThreeReady,
    alienFourReady,
    alienFiveReady,
    mothershipReady,
    laserPlayerReady,
    laserAlienReady;

let bgImage, heroImage, alienOne,
    alienTwo,
    alienThree,
    alienFour,
    alienFive,
    mothership,
    laserPlayer,
    laserAlien;

let startTime = Date.now();
const SECONDS_PER_ROUND = 0;
let elapsedTime = 0;

function loadImages() {
    bgImage = new Image();
    bgImage.onload = function() {
        // show the background image
        bgReady = true;
    };
    bgImage.src = "images/blackBgImage.jpeg";
    heroImage = new Image();
    heroImage.onload = function() {
        // show the hero image
        heroReady = true;
    };
    heroImage.src = "images/player.png";

    alienOne = new Image();
    alienOne.onload = function() {
        // show the monster image
        alienOneReady = true;
    };
    alienOne.src = "images/alien1.png";

    alienTwo = new Image();
    alienTwo.onload = function() {
        // show the monster image
        alienTwoReady = true;
    };
    alienTwo.src = "images/alien2.png";

    alienThree = new Image();
    alienThree.onload = function() {
        // show the monster image
        alienThreeReady = true;
    };
    alienThree.src = "images/alien3.png";

    alienFour = new Image();
    alienFour.onload = function() {
        // show the monster image
        alienFourReady = true;
    };
    alienFour.src = "images/alien4.png";

    alienFive = new Image();
    alienFive.onload = function() {
        // show the monster image
        alienFiveReady = true;
    };
    alienFive.src = "images/alien5.png";

    mothership = new Image();
    mothership.onload = function() {
        // show the monster image
        mothershipReady = true;
    };
    mothership.src = "images/mothership.png";

    laserPlayer = new Image();
    laserPlayer.onload = function() {
        // show the monster image
        laserPlayerReady = true;
    };
    laserPlayer.src = "images/playerlaser.png";

    laserAlien = new Image();
    laserAlien.onload = function() {
        // show the monster image
        laserAlienReady = true;
    };
    laserAlien.src = "images/alienlaser.png";
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

let heroX = canvas.width / 2
let heroY = 360

let alienOneX = 40;
let alienOneY = 100;

let alienTwoX = 40;
let alienTwoY = 140;

let alienThreeX = 40;
let alienThreeY = 180;

let alienFourX = 45;
let alienFourY = 220;

let alienFiveX = 43;
let alienFiveY = 260;

let mothershipX = 40;
let mothershipY = 40;
let mothershipDirectionX = 1;

let laserAlienX = 30;
let laserAlienY = 30;
let laserAlienDirectionY = 1;

let laserPlayerX = canvas.width / 2;
let laserPlayerY = 360;
let laserPlayerDirectionY = -1;

/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
 */
let keysDown = {};

function setupKeyboardListeners() {
    // Check for keys pressed where key represents the keycode captured
    // For now, do not worry too much about what's happening here. 
    addEventListener("keydown", function(key) {
        keysDown[key.keyCode] = true;
    }, false);

    addEventListener("keyup", function(key) {
        delete keysDown[key.keyCode];
    }, false);

}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function() {
    // Update the time.
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);

    let mothershipSpeed = game.startspeed * game.difficulty + 2;
    let laserAlienSpeed = game.startspeed * game.difficulty + 2;
    let laserPlayerSpeed = game.startspeed * game.difficulty + 2;

    // if (38 in keysDown) { // Player is holding up key
    //     heroY -= 5;
    // }
    // if (40 in keysDown) { // Player is holding down key
    //     heroY += 5;
    // }
    if (37 in keysDown) { // Player is holding left key
        heroX -= 5;
    }
    if (39 in keysDown) { // Player is holding right key
        heroX += 5;
    }

    // Check if player and monster collided. Our images
    // are about 32 pixels big.
    if (
        heroX <= (alienOneX + 32) &&
        alienOneX <= (heroX + 32) &&
        heroY <= (alienOneY + 32) &&
        alienOneY <= (heroY + 32)
    ) {
        // Pick a new location for the monster.
        // Note: Change this to place the monster at a new, random location.
        alienOneX = alienOneX + 50;
        alienOneY = alienOneY + 70;
    }

    if (heroX >= canvas.width - 32) {
        heroX = canvas.width - 32
    }
    if (heroX < 0) {
        heroX = 0
    }

    // alien laser movements
    laserAlienY += laserAlienSpeed * (laserAlienDirectionY * 1.5);
    // laserAlienX = laserAlienX;

    if (laserAlienY >= canvas.height) {
        laserAlienY = mothershipY;
        laserAlienX = mothershipX;
    }


    // player laser movements
    laserPlayerY += laserPlayerSpeed * (laserPlayerDirectionY * 1.5);
    // laserAlienX = laserAlienX;

    if (laserPlayerY === 0) {
        laserPlayerY = heroY;
        laserPlayerX = heroX + 17;
    }

    // mothership movements
    mothershipX += mothershipSpeed * mothershipDirectionX;
    mothershipY = mothershipY;
    if (
        mothershipX >= canvas.width - 32
    ) {
        mothershipX = canvas.width - 32
        mothershipDirectionX = -1;
    } else if (
        mothershipX <= 0
    ) {
        mothershipX = 0
        mothershipDirectionX = 1;
    }


};

/**
 * This function, render, runs as often as possible.
 */
var render = function() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, heroX, heroY);
    }
    if (alienOneReady) {
        let positionChange = 0;

        for (i = 0; i <= canvas.width / 55; i++) {
            ctx.drawImage(alienOne, alienOneX + positionChange, alienOneY);
            positionChange += 40
        }

    }
    if (alienTwoReady) {
        let positionChange = 0;

        for (i = 0; i < canvas.width / 50; i++) {
            ctx.drawImage(alienTwo, alienTwoX + positionChange, alienTwoY);
            positionChange += 40;
        }
    }
    if (alienThreeReady) {
        let positionChange = 0;

        for (i = 0; i < canvas.width / 50; i++) {
            ctx.drawImage(alienThree, alienThreeX + positionChange, alienThreeY);
            positionChange += 40;
        }
    }
    if (alienFourReady) {
        let positionChange = 0

        for (i = 0; i < canvas.width / 50; i++) {
            ctx.drawImage(alienFour, alienFourX + positionChange, alienFourY);
            positionChange += 40
        }
    }
    if (alienFiveReady) {
        let positionChange = 0

        for (i = 0; i < canvas.width / 50; i++) {
            ctx.drawImage(alienFive, alienFiveX + positionChange, alienFiveY);
            positionChange += 40;
        }
    }
    if (mothershipReady) {
        ctx.drawImage(mothership, mothershipX, mothershipY);
    }

    if (laserAlienReady) {
        ctx.drawImage(laserAlien, laserAlienX, laserAlienY);
    }

    if (laserPlayerReady) {
        ctx.drawImage(laserPlayer, laserPlayerX, laserPlayerY);
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${SECONDS_PER_ROUND + elapsedTime}`, 20, 20);

};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function() {
    update();
    render();
    // Request to do this again ASAP. This is a special method
    // for web browsers. 
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();
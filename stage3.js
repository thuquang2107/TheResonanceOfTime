
var gamerestart = 0;

var x, y; // player position
var spd = 15;
var hspd = spd;
var vspd = spd;
var jbnum = 800;
var loopbgx = 0;
var loopbgy = 0;
var rangex1, rangex2, rangey1, rangey2;
var r = 0;
var t = 0;
var gamerestart = 0;

// create arrays for pieces
var piecex = [];
var piecey = [];
var pieceImages = [];
var collisionRadius = 60; // Distance at which the player 'collects' the piece

var collectedPieces = 0; 
let finalImage;
let collectSound, bgStage3, bodyFont;


// let trail = []; // Array to store trail positions
// const trailLength = 20;


function preload() {
    // curser = loadImage('assets/cursor.png');
    pieceImages[0] = loadImage('assets/puzzple1.png');
    pieceImages[1] = loadImage('assets/puzzple2.png');
    pieceImages[2] = loadImage('assets/puzzple3.png');
    pieceImages[3] = loadImage('assets/puzzple4.png');
    pieceImages[4] = loadImage('assets/puzzple5.png');
    pieceImages[5] = loadImage('assets/puzzple6.png');
    pieceImages[6] = loadImage('assets/puzzple7.png');
    pieceImages[7] = loadImage('assets/puzzple8.png');

    playerTest = loadImage('assets/curser.png');
    finalImage = loadImage('assets/fullpuzzple.png');
    bgStage3 = loadImage('assets/bg_stage3.png');
    bodyFont = loadFont('font/PlaypenSans-Regular.ttf');
    

       collectSound = loadSound('music/snd_fragment_retrieve-14728.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight).parent('stage3_container'); // Decide canvas size here
    colorMode(HSB);
    imageMode(CENTER);
    rectMode(CENTER);
    frameRate(35);

    // Initialize player at the center of the canvas
    x = windowWidth / 2;
    y = windowHeight / 2;

    rangex1 = -windowWidth / 2;  // Left boundary
    rangex2 = windowWidth / 2;   // Right boundary
    rangey1 = -windowHeight / 2; // Top boundary
    rangey2 = windowHeight / 2;  // Bottom boundary

    //random positions of 8pieces
    for (var i = 0; i < 8; i++) {
        piecex[i] = random(rangex1, rangex2);
        piecey[i] = random(rangey1, rangey2);
    }
}

function draw() {
    background(100);

    
    image(bgStage3, windowWidth/2,0, windowWidth,windowHeight*2, 0.7);

    // Player Movement
    if (keyIsDown(87)) { // W key
        y -= vspd;
    }
    if (keyIsDown(83)) { // S key
        y += vspd;
    }
    if (keyIsDown(65)) { // A key
        x -= hspd;
    }
    if (keyIsDown(68)) { // D key
        x += hspd;
    }


 

    // Display 8pieces
    for (var i = 0; i < 8; i++) {
        if (pieceImages[i] !== null) { // Check if the piece exists
           
            let pieceX = piecex[i] - x + windowWidth / 2;
            let pieceY = piecey[i] - y + windowHeight / 2;

            image(pieceImages[i], pieceX, pieceY, windowWidth * 0.1, windowWidth * 0.1);

            if (dist(windowWidth / 2, windowHeight / 2, pieceX, pieceY) < collisionRadius) {
             
                pieceImages[i] = null; 
                collectedPieces++;

                if (!collectSound.isPlaying()) {
                    collectSound.play();
                }
            }
        }
    }

    textSize(20);
    textFont(bodyFont); 
    textAlign(LEFT);
    text(`Collected: ${collectedPieces} / 8`, 20, 40);
    image(playerTest, windowWidth / 2, windowHeight / 2, 60, 60);


    if (x >= rangex2) {
        x = rangex2;
    } 
    if (x <= rangex1) {
        x = rangex1;
    }
    if (y >= rangey2) {
        y = rangey2;
    }
    if (y <= rangey1) {
        y = rangey1;
    }

    if (collectedPieces === 8) {
        image(finalImage, windowWidth / 2.3, windowHeight / 2.6, windowWidth * 0.7, windowHeight * 0.7);

        
    }
}



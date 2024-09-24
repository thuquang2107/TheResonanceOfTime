
let bgCanvas; // 2D canvas for the background
let fgCanvas; // 3D canvas for the foreground
let babyHand, handHeight, handWidth,
    adultHand, 
    oldHand;
let bgMusic;


let angle = 0;
let sentence = ""; // Ensure this variable is available globally
let showText = false; // Use this flag to control the display

let x, y;
let r;
let g;
let b;

let center_StarClicked = false; // A flag to detect if the cone was clicked
let ball_aroundClickable = false;
let spherePositions = [];

let starField = [];
let starImg;
let fallingStars = false;


function setup() {
    let canvas = createCanvas(windowWidth, windowHeight).parent('main_container'); // Attach canvas to the div with id 'page1_container'

    bgCanvas = createGraphics(windowWidth, windowHeight); // Create a 2D canvas for the background walker
    fgCanvas = createGraphics(windowWidth, windowHeight, WEBGL); // Create a 3D canvas for the foregroun
    angleMode(DEGREES);

    push();
    handWidth = handHeight = 400;
    background(0);
   
    for (let i = 0; i < 190; i++) {
        starField.push({
            x: random(width),
            y: random(height),
            size: random(3.5, 10.5),
            brightness: random(0, 255),
            flickerSpeed: random(0.01, 0.05)
        });
    }
     pop();
}

function preload() {
  bgMusic = loadSound('music/wind-chimes-32150.mp3');
  // bodyFont = loadFont('font/Melodrama-Variable.ttf');
  bodyFont = loadFont('font/PlaypenSans-Regular.ttf');
  circleAdult = loadImage('assets/circleAdult.png')
  circleBaby = loadImage('assets/circleBaby.png')
  circleOlder = loadImage('assets/circleOlder.png')
  babyHand = loadImage('assets/babyHand.png');
  adultHand = loadImage('assets/adultHand.png');
  oldHand = loadImage('assets/oldHand.png');

 babyTexture = loadImage('assets/egg.png');;
  oldTexture = loadImage('assets/butter.png');
  adultTexture = loadImage('assets/catter.png');

  starImg = loadImage('assets/star.png');
}

function draw() {

    clear(0); 
    background(0);
    
    bgCanvas.push();
    bgCanvas.background(1,12);
    drawBg(bgCanvas);
    bgCanvas.pop();
 
    // Draw on the 3D foreground canvas
    fgCanvas.push();
    fgCanvas.clear();
    // fgCanvas.background(0,10);
    fgCanvas.rotateY(frameCount * 0.008);
    // fgCanvas.orbitControl(); 
    drawCustomCone(fgCanvas, 160); // Pass fgCanvas to your custom function
    drawSphere(fgCanvas);

    fgCanvas.pop();


    // Display both canvases: first the background, then the foreground
    image(fgCanvas, windowWidth / 2.1, height / 1.9); // Draw the 3D foreground canvas on top
    
}


function drawBg(canvas) {
   
    image(canvas, (canvas.width) / 2, (canvas.height) / 2);
    

    rectMode(CENTER);
    imageMode(CENTER);

    canvas.push();
    image(circleBaby, windowWidth / 1.6 , windowHeight/0.95 , handHeight, handWidth);
    canvas.pop();

    canvas.push();
    image(circleAdult, windowWidth / 8 , windowHeight / 25, handHeight *1.3, handWidth*1.3 );
    canvas.pop();

    canvas.push();
    image(circleOlder, windowWidth /1.15  , windowHeight / 27, handHeight *1.3, handWidth*1.3 );
    canvas.pop();


    canvas.push();
    scale(0.9);
    image(babyHand, windowWidth / 1.5 , windowHeight/0.95 , handHeight, handWidth);
    canvas.pop();
   
    canvas.push();
    scale(1.16);
    image(adultHand, windowWidth / 5.5 , windowHeight / 12, handHeight * 1.1, handWidth * 1.1 );  
    canvas.pop();
  
    canvas.push();
    scale(1.01);
    image(oldHand, windowWidth /1.25  , windowHeight / 7, handHeight, handWidth);
    canvas.pop();

    canvas.push();
    translate(0, 0);
    noStroke();

    for (let star of starField) {
        // Adjust brightness over time to create a twinkling effect
        star.brightness = 0 + 205 * noise(frameCount * 0.01 + star.x * 0.01, star.y * 0.01);

        if (fallingStars) {
            star.y += 1.95; // Adjust falling speed here
            let angleInRadians = radians(star.angle);
        }

        // Reset star to the top if it goes off-screen
        if (star.y > height) {
            star.y = 0; // Reset position to top
            star.x = random(width); // Randomize the x position when it reappears
        }
        // Slightly adjust position over time for a more dynamic effect
        star.x += random(0.1, -0.1);
        star.y += random(0.5, -0.5);
        star.trans = random (100,255);

        star.x = constrain(star.x, 0, width);
        star.y = constrain(star.y, 0, height);

        canvas.tint(255, star.brightness); // Adjust image brightness
        canvas.image(starImg, star.x, star.y, star.size, star.size);
    }

}

function drawCustomCone(canvas, h) {
    let radius = sqrt(4) / 2.5 * h;

    canvas.push();
    canvas.clear()
    canvas.noStroke();
    canvas.fill(255, 231, 94);
    canvas.cone(radius, h, 4);
    canvas.translate(0, -h);
    canvas.cone(radius, -h, 4);
    canvas.rotateZ(180);
    canvas.filter(BLUR, 3);
    canvas.rotateY(frameCount * 0.008);
    canvas.pop();
}


let moveSphere1ToCenter = false;

function drawSphere(canvas) {
    // let radius1 = 125;
    let radius1 = moveSphere1ToCenter ? 0 : 125;
    let sphereX = radius1 * cos(frameCount * 0.8);
    let sphereY = radius1 * sin(frameCount * 0.8);
    let sphereZ = radius1 * sin(frameCount * 0.8);

    canvas.push();
    // canvas.translate(width/12,height/12, 3); // Move the ellipse back along the Z-axis
    // canvas.translate(random(width/12,width/10), random(height/5, height/12) , 3);
    canvas.translate(sphereX,sphereY, sphereZ);
    canvas.noStroke();
    canvas.texture(babyTexture);
    canvas.sphere(25); // Draw the ellipse
    canvas.pop();

    let radius2 = 105;
    let sphereX2 = radius2 * sin(frameCount * 0.5);
    let sphereY2 = radius2 * sin(frameCount * 0.5);
    let sphereZ2 = radius2 * cos(frameCount * 0.5);

    canvas.push();
    canvas.translate(sphereX2, sphereY2, sphereZ2);
    canvas.noStroke();
    canvas.texture(adultTexture);
    canvas.sphere(25); // Draw the first sphere
    canvas.pop();

    let radius3 = 116;
    let sphereX3 = radius3 * cos(frameCount * 0.6);
    let sphereY3 = radius3 * sin(frameCount * 0.6);
    let sphereZ3 = radius3 * sin(frameCount * 0.6);

    canvas.push();
    canvas.translate(sphereX3, sphereY3, sphereZ3);
    canvas.noStroke();
    // Color for the third sphere
    canvas.texture(oldTexture);
    canvas.sphere(25); // Draw the third sphere
    canvas.pop();

}




function keyPressed() {
    if (key === '1') {
        moveSphere1ToCenter = true; // Move the first sphere to the center
        setTimeout(() => {
            window.location.href = 'stage1.html'; // Redirect to a new HTML page
        }, 1000); // Delay to show the sphere moving before redirecting
    
    }else if (key === 'f'  || key === 'F' ) {
        fallingStars = !fallingStars; 
        
    }
}


function playMusic() {
    if (bgMusic && !bgMusic.isPlaying()) {
        bgMusic.loop(); // sure the music loop
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    bgCanvas.resizeCanvas(windowWidth, windowHeight); 
    fgCanvas.resizeCanvas(windowWidth, windowHeight); 
}









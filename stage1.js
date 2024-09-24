
var r = 0;
var g = 200;
var b = 255;
let colormap; // Single image
let bgMusicP1;
let pg;
let textStage1;
let mouseMovedOnCanvas = false;

function preload() {
    colormap = loadImage('assets/stage1.png');
    bgMusicP1 = loadSound('music/015924_nostalgic-childhood-56165.mp3' );

}

function setup() {
    let canvas =createCanvas(windowWidth , windowHeight).parent('page1_container');

    pg = createGraphics(windowWidth * 0.85, windowHeight );
    pg.background(10, 0); 

    strokeWeight(0.6);
    frame = 0;
    numAcross = 10; 
    size1 = (width - frame * 2) / numAcross;
    rez3 = 0.001;
    len = size1 * 0.1;

    stroke(0, 200); 
    
    lines = [];
    lines2 = [];

    for (let x = frame; x < width - frame + 1; x += size1) {
        for (let y = frame; y < height - frame + 1; y += size1) {
            lines.push([x, y]);
        }
    }
    z = 10;
}

function draw() {
    background(255,10);

    if (!mouseMovedOnCanvas) {
        return;
    }

    // Loop through lines and draw the dynamic pattern
    for (let j = 0; j < lines.length; j++) {
        let oldX = lines[j][0];
        let oldY = lines[j][1];

        let col = colormap.get(oldX % colormap.width, oldY % colormap.height);
        pg.stroke(col);

        let distToMouse = dist(mouseX, mouseY, oldX, oldY);

        let n3 = noise((oldX + mouseX) * rez3, (oldY + mouseY) * rez3, z * rez3);
        let ang = map( distToMouse * 0.001, 0, 1, 0, PI * 2);

        let newX = cos(ang) * len + oldX;
        let newY = sin(ang) * len + oldY;

        pg.line(oldX, oldY, newX, newY);

        if ((newX > width || newX < 0) || (newY > height || newY < 0)) {
            newX = random(width);
            newY = random(height);
        }
        lines2.push([newX, newY]);
    }

    lines = lines2;
    lines2 = [];
    
    z += 2;
    image(colormap,1470,700);
    image(pg, 0, 0, windowWidth * 0.85, windowHeight * 0.85); // Corrected dimensions
}
   

function mouseMoved() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        mouseMovedOnCanvas = true;
    }
}

function playMusic() {
    if (bgMusicP1 && !bgMusicP1.isPlaying()) {
        bgMusicP1.loop(); 
    }
}

function keyPressed() {
    if (key === '0') {
        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 1500);
    } 
    else if (key === '1') {
        setTimeout(() => {
            window.location.href = 'stage1.html'; 
        }, 1500);
    } else if (key === '2') {
        moveSphere2ToCenter = true; 
        setTimeout(() => {
            window.location.href = 'stage2.html'; 
        }, 1500); 
    }else if (key === '3') {
        moveSphere3ToCenter = true; 
        setTimeout(() => {
            window.location.href = 'stage3.html'; 
        }, 1500); 
}
}

let fires = []; 
let numFires = 4; // number of GIFs
let fireUrls = ['assets/fire.gif', 
  'assets/fire2.gif', 
  'assets/fire3.gif', 
  'assets/fire4.gif']; 

let fireWidth = 400, fireHeight = 400; // Updated width and height of each GIF
let fireGifStates = []; // Array to track visibility of each GIF
let hiddenCount = 0; // Counter to track how many GIFs have been hidden
let startX, startY; // Global variables for positions
let gifsCreated = false;
let spacing = -70; 
let moving = true;

let numberOfFireflies;
var fireflies = [];
let fireflyColor = {hue: 27, saturation: 76, brightness: 88};


function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight).parent('stage2_container');
  colorMode(HSB);

  startX = (width - (numFires * fireWidth + (numFires - 1) * spacing)) / 2;
  startY = (height - fireHeight) / 3;
  
  // Position each GIF element outside the canvas, they won't be affected by background redraws
  for (let i = 0; i < fires.length; i++) {
    let x = startX + (i * fireWidth); // Calculate x position for each GIF
    let y = startY; 
    fires[i].position(x, y); // Set the position of the GIF
  }

  numberOfFireflies = 200;
  
  for (let i = 0; i < numberOfFireflies; i++) {
    
    let firefly = {
      x: random(width),
      y: random(height),
      vx: random(-0.5, 0.5), 
      vy: random(-0.5, 0.5),
      b: random(0.01, 0.1)
    };
    
    fireflies.push(firefly);
    
  }
}

function draw() {
  background(0,0,0,10);

  if (!gifsCreated) {
    for (let i = 0; i < numFires; i++) {
      let fireDisplay = createImg(fireUrls[i], null);
      fireDisplay.size(fireWidth, fireHeight); // Set the size of the GIF to the updated dimensions
      fireDisplay.position(startX + (i * (fireWidth + spacing)), startY); // Set the position
      fireDisplay.style('z-index', '10');
      fires.push(fireDisplay);
      fireGifStates.push(true); 
    } 
    gifsCreated = true; 
  }

  // fireflies flying without bouncign
  for (let i = 0; i < numberOfFireflies; i = i + 1) {
    let firefly = fireflies[i];
    
    // Update position based on velocity
    firefly.x += firefly.vx;
    firefly.y += firefly.vy;
    
    drawFirefly(fireflies[i].x, fireflies[i].y, fireflies[i].b);
    firefly.vx += random(-0.05, 0.05);
    firefly.vy += random(-0.05, 0.05);
  }


}


function drawFirefly(x, y, brightness) {
  noStroke();
  let size = random(1,3);

  for(let i = 4; i >= 0; i = i - 1) {
    fill(fireflyColor.hue, fireflyColor.saturation, fireflyColor.brightness, brightness + (sin(frameCount / 100) * 0.1));
    ellipse(x, y, size*(i + 2), size*(i + 2));
  }
  
  fill(54, 32, 100);
  ellipse(x, y, size, size);
}

function mousePressed() {  
  for (let i = 0; i < fires.length; i++) {
    let x = startX + (i * (fireWidth + spacing)); // Calculate x position for each GIF
    let y = startY; // y position is the same for all GIFs

    // console.log(`Checking GIF ${i}: Position (${x}, ${y}), Width: ${fireWidth}, Height: ${fireHeight}`);

    if (hiddenCount < 2 && fireGifStates[i] && mouseX > x && mouseX < x + fireWidth && mouseY > y && mouseY < y + fireHeight) {
      fireGifStates[i] = false; // Set the GIF state to false (i.e., hide it)
      fires[i].hide(); // Hide the GIF
      hiddenCount++; // Increment the hidden GIF count
      fireflyColor.hue = random(100, 360); // Random hue value
      fireflyColor.saturation = random(70, 100); // Random saturation
      fireflyColor.brightness = random(80, 100);
      // console.log('GIF ' + i + ' clicked and hidden. Hidden count: ' + hiddenCount);
      break; // Exit the loop after hiding one GIF to avoid multiple clicks at once
    }
  

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
      moveSphere1ToCenter = true; 
      setTimeout(() => {
          window.location.href = 'stage2.html'; 
      }, 1500); 
  }else if (key === '3') {
      moveSphere1ToCenter = true; 
      setTimeout(() => {
          window.location.href = 'stage3.html'; 
      }, 1500); 
}
}

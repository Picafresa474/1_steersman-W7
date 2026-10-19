/* DN3008 Generative Art, Ashley Hi 2026
 * Week 7 - Cybernetics & Emergence
 * Steersman
 */
let popHistory = [];
let gain = 1.0;
let agents = [];

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  background(20);
  for (let i = 0; i < 200; i++) {
    agents.push({ x: random(width), y: random(height), a: random(TWO_PI) });
  }
}

function draw() {
  const reading = sense(); // 1. Read back something the system produced
  update(reading); // 2. lLet that reading change what happens next
  render(); // 3. Draw it
}

function sense() {
  popHistory.push(agents.length);
  if (popHistory.length > 120) popHistory.shift();
  return popHistory[0];
}

function update(pastPop) {
  // The bigger the population was, the fewer births now
  const pBirth = constrain(0.01 * (1 - gain * pastPop / 300), 0, 0.02);
  const born = [];
  agents.forEach(a => {
    a.a += random(-0.2, 0.2);
    a.x = (a.x + cos(a.a) * 1.5 + width) % width;
    a.y = (a.y + sin(a.a) * 1.5 + height) % height;
    if (random() < pBirth && agents.length < 2000) {
      born.push({ x: a.x, y: a.y, a: random(TWO_PI) });
    }
  });
  agents = agents.filter(() => random() > 0.004).concat(born);   // a small chance of death each frame
}

function render() {
  noStroke();
  fill(20, 8);
  rect(0, 0, width, height);
  fill(240, 170, 50, 60);
  agents.forEach(a => circle(a.x, a.y, 3));
  fill(20);
  rect(0, 0, 170, 28);
  fill(255);
  text(`population: ${agents.length}`, 10, 19);
}

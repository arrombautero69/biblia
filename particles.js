const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Mouse interaction
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Particle Class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Check particle position, check mouse position, move the particle, draw the particle
    update() {
        // Check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 3; // Push right
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 3; // Push left
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 3; // Push down
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 3; // Push up
            }
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Draw particle
        this.draw();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 2; // Bigger particles for kids
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.6) - 0.3; // Slightly faster
        let directionY = (Math.random() * 0.6) - 0.3;

        // Kids Palette Colors: Blue, Yellow, Orange, Pinkish
        const colors = [
            'rgba(76, 201, 240, 0.6)', // Blue
            'rgba(255, 217, 61, 0.6)', // Yellow
            'rgba(255, 159, 28, 0.6)', // Orange
            'rgba(247, 37, 133, 0.4)'  // Pink/Red pop
        ];
        let color = colors[Math.floor(Math.random() * colors.length)];

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let frames = 0;
const gravity = 0.25;

const bird = { x: 50, y: 150, width: 20, height: 20, dy: 0 };
const pipes = [];

function resetGame() {
    bird.y = 150; bird.dy = 0; pipes.length = 0; frames = 0;
}

function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = "green";
    for (let p of pipes) {
        ctx.fillRect(p.x, 0, p.width, p.top);
        ctx.fillRect(p.x, p.bottom, p.width, canvas.height - p.bottom);
    }
}

function update() {
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Bird physics
    bird.dy += gravity;
    bird.y += bird.dy;

    if (bird.y + bird.height >= canvas.height || bird.y <= 0) resetGame();

    // Pipes logic
    if (frames % 90 === 0) {
        const top = Math.random()*200 + 50;
        pipes.push({x: canvas.width, width:30, top: top, bottom: top + 100});
    }

    for (let p of pipes) {
        p.x -= 2;
        if (bird.x < p.x + p.width && bird.x + bird.width > p.x &&
            (bird.y < p.top || bird.y + bird.height > p.bottom)) resetGame();
    }

    drawBird();
    drawPipes();

    // Remove offscreen pipes
    if (pipes.length && pipes[0].x + pipes[0].width < 0) pipes.shift();

    requestAnimationFrame(update);
}

document.addEventListener("keydown", e => {
    if (e.code === "Space") bird.dy = -5;
});

update();

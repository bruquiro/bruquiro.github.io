
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
for (let i = 0; i < 40; i++) {
  lines.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1
  });
}

function animateTerminal() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00FF00";
  ctx.font = "16px Courier New";
  for (let l of lines) {
    ctx.fillText("|", l.x, l.y);
    l.y += l.speed;
    if (l.y > canvas.height) {
      l.y = 0;
      l.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(animateTerminal);
}
animateTerminal();

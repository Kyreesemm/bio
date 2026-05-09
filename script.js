const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

const chars = '01';
const charArray = chars.split('');
const fontSize = 15;
let columns = Math.floor(window.innerWidth / fontSize);
const drops = [];
const glowChars = [];

function initDrops() {
    for (let i = 0; i < columns; i++) {
        if (drops[i] === undefined) {
            drops[i] = Math.random() * -100;
            glowChars[i] = {
                active: false,
                intensity: 0,
                nextGlow: Math.random() * 150 + 80
            };
        }
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = Math.floor(window.innerWidth / fontSize);
    if (newColumns !== columns) {
        columns = newColumns;
        initDrops();
    }
}

resizeCanvas();
initDrops();
window.addEventListener('resize', resizeCanvas);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `bold ${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (glowChars[i].nextGlow <= 0) {
            glowChars[i].active = true;
            glowChars[i].intensity = 1;
            glowChars[i].nextGlow = Math.random() * 200 + 100;
        }

        if (glowChars[i].active) {
            glowChars[i].intensity -= 0.015;
            if (glowChars[i].intensity <= 0) {
                glowChars[i].active = false;
            }
        }

        glowChars[i].nextGlow--;

        if (glowChars[i].active && glowChars[i].intensity > 0) {
            const glowIntensity = glowChars[i].intensity;
            ctx.shadowBlur = 30 * glowIntensity;
            ctx.shadowColor = `rgba(255, 51, 51, ${glowIntensity * 0.9})`;
            ctx.fillStyle = `rgba(255, ${51 + 150 * glowIntensity}, ${51 + 150 * glowIntensity}, ${0.95 + 0.05 * glowIntensity})`;
        } else {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(255, 51, 51, 0.4)';
            const progress = Math.min(y / canvas.height, 1);

            if (progress < 0.2) {
                ctx.fillStyle = `rgba(255, 51, 51, ${1.0 * (progress / 0.2)})`;
            } else if (progress < 0.5) {
                ctx.fillStyle = 'rgba(255, 102, 102, 0.9)';
            } else if (progress < 0.8) {
                ctx.fillStyle = 'rgba(255, 153, 153, 0.7)';
            } else {
                ctx.fillStyle = `rgba(255, 102, 102, ${0.5 * (1 - progress)})`;
            }
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height + 50 && Math.random() > 0.975) {
            drops[i] = Math.random() * -50;
        }
        drops[i]++;
    }

    ctx.shadowBlur = 0;
}

setInterval(drawMatrix, 35);

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.category-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

});

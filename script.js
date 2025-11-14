// Анимированный фон с единицами и нулями
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = '01';
const charArray = chars.split('');
const fontSize = 18; // Увеличил шрифт на 2pt
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Красный градиент для glow эффекта
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255, 51, 51, 0.9)');
    gradient.addColorStop(0.2, 'rgba(255, 102, 102, 0.8)');
    gradient.addColorStop(0.4, 'rgba(255, 153, 153, 0.7)');
    gradient.addColorStop(0.7, 'rgba(255, 102, 102, 0.4)');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff3333';

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(text, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    
    // Сбрасываем shadow для следующего кадра
    ctx.shadowBlur = 0;
}

setInterval(drawMatrix, 35);

// Переключение вкладок
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок и вкладок
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Добавляем активный класс к нажатой кнопке и соответствующей вкладке
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Фильтрация проектов по категориям
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок категорий
        document.querySelectorAll('.category-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Добавляем активный класс к нажатой кнопке
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
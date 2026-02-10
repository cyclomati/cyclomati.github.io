// ========== TYPEWRITER EFFECT ==========
const textList = [
    "Anmol Sharma", 
    "Software Engineer", 
    "Problem Solver", 
    "Tech Enthusiast", 
    "Gamer"
];
let currentText = 0;
let currentChar = 0;
function startTypewriter() {
    const typeSpan = document.querySelector('.typewriter');
    if (!typeSpan) return;

    function typeWriter() {
        if (currentChar < textList[currentText].length) {
            typeSpan.textContent += textList[currentText].charAt(currentChar);
            currentChar++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                typeSpan.textContent = '';
                currentChar = 0;
                currentText = (currentText + 1) % textList.length;
                typeWriter();
            }, 2000);
        }
    }

    typeWriter();
}
    
// ========== DARK/LIGHT MODE TOGGLE ==========
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// ========== MOBILE MENU TOGGLE ==========
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    startTypewriter();

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                // Close mobile menu after clicking
                document.getElementById('navLinks').classList.remove('active');
            }
        });
    });

    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

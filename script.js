// Configuração inicial do slideshow
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    initSlideshow();
    setupControls();
    setupKeyboardNavigation();
    setupTouchSwipe();
});

// Variáveis globais do slideshow
let currentSlide = 0;
let slides = [];
let dots = [];
let isPlaying = true;
let slideInterval;
let slideSpeed = 5000; // 5 segundos
let isShuffled = false;
let originalOrder = [];

// Criar corações flutuantes no fundo
function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
    }
}

// Inicializar o slideshow
function initSlideshow() {
    slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dotsContainer');
    
    // Criar dots para cada slide
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });
    
    // Guardar ordem original
    originalOrder = Array.from(slides);
    
    // Atualizar contador total
    document.getElementById('totalSlides').textContent = slides.length;
    
    // Mostrar primeiro slide
    updateSlide(0);
    
    // Iniciar reprodução automática
    startSlideshow();
    
    // Configurar botões de navegação
    document.getElementById('prevButton').addEventListener('click', prevSlide);
    document.getElementById('nextButton').addEventListener('click', nextSlide);
}

// Atualizar slide atual
function updateSlide(index) {
    // Remover classe active de todos os slides e dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adicionar classe active ao slide atual
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Atualizar contador
    document.getElementById('currentSlide').textContent = index + 1;
    
    // Atualizar barra de progresso
    updateProgressBar();
    
    currentSlide = index;
}

// Atualizar barra de progresso
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progress = ((currentSlide + 1) / slides.length) * 100;
    progressFill.style.width = progress + '%';
}

// Ir para slide específico
function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        updateSlide(index);
        resetSlideshowTimer();
    }
}

// Próximo slide
function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    updateSlide(nextIndex);
    resetSlideshowTimer();
}

// Slide anterior
function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
        prevIndex = slides.length - 1;
    }
    updateSlide(prevIndex);
    resetSlideshowTimer();
}

// Iniciar slideshow automático
function startSlideshow() {
    if (isPlaying && !slideInterval) {
        slideInterval = setInterval(nextSlide, slideSpeed);
    }
}

// Parar slideshow automático
function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Reiniciar timer do slideshow
function resetSlideshowTimer() {
    if (isPlaying) {
        stopSlideshow();
        startSlideshow();
    }
}

// Configurar controles
function setupControls() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');
    
    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        const playIcon = playPauseBtn.querySelector('.play-icon');
        const controlText = playPauseBtn.querySelector('.control-text');
        
        if (isPlaying) {
            playIcon.textContent = '⏸️';
            controlText.textContent = 'Pausar';
            startSlideshow();
        } else {
            playIcon.textContent = '▶️';
            controlText.textContent = 'Reproduzir';
            stopSlideshow();
        }
    });
    
    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
        const wrapper = document.querySelector('.slideshow-wrapper');
        
        if (!document.fullscreenElement) {
            wrapper.requestFullscreen().catch(err => {
                console.log('Erro ao entrar em tela cheia:', err);
            });
        } else {
            document.exitFullscreen();
        }
    });
    
    // Shuffle (aleatório)
    shuffleBtn.addEventListener('click', () => {
        isShuffled = !isShuffled;
        const shuffleIcon = shuffleBtn.querySelector('.shuffle-icon');
        const controlText = shuffleBtn.querySelector('.control-text');
        
        if (isShuffled) {
            shuffleIcon.textContent = '🔁';
            controlText.textContent = 'Ordem';
            shuffleSlides();
        } else {
            shuffleIcon.textContent = '🔀';
            controlText.textContent = 'Aleatório';
            restoreOriginalOrder();
        }
        
        // Reset para o primeiro slide
        currentSlide = 0;
        updateSlide(0);
        resetSlideshowTimer();
    });
    
    // Controle de velocidade
    speedRange.addEventListener('input', (e) => {
        const value = e.target.value;
        // Inverter a lógica: maior valor = mais rápido (menor tempo)
        slideSpeed = (11 - value) * 1000; // 1-10 -> 10000ms a 1000ms
        speedValue.textContent = value + 's';
        resetSlideshowTimer();
    });
}

// Embaralhar slides
function shuffleSlides() {
    const wrapper = document.querySelector('.slideshow-wrapper');
    const dotsContainer = document.getElementById('dotsContainer');
    
    // Embaralhar array de slides
    const shuffled = [...slides].sort(() => Math.random() - 0.5);
    
    // Reorganizar slides no DOM
    shuffled.forEach(slide => {
        wrapper.appendChild(slide);
    });
    
    // Atualizar array de slides
    slides = shuffled;
    
    // Recriar dots
    dotsContainer.innerHTML = '';
    dots = [];
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });
    
    updateSlide(0);
}

// Restaurar ordem original
function restoreOriginalOrder() {
    const wrapper = document.querySelector('.slideshow-wrapper');
    const dotsContainer = document.getElementById('dotsContainer');
    
    // Restaurar ordem original
    originalOrder.forEach(slide => {
        wrapper.appendChild(slide);
    });
    
    // Restaurar array de slides
    slides = [...originalOrder];
    
    // Recriar dots
    dotsContainer.innerHTML = '';
    dots = [];
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });
    
    updateSlide(0);
}

// Navegação por teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                prevSlide();
                break;
            case 'ArrowRight':
                nextSlide();
                break;
            case ' ':
                e.preventDefault();
                // Toggle play/pause
                const playPauseBtn = document.getElementById('playPauseBtn');
                playPauseBtn.click();
                break;
            case 'f':
                const fullscreenBtn = document.getElementById('fullscreenBtn');
                fullscreenBtn.click();
                break;
            case 's':
                const shuffleBtn = document.getElementById('shuffleBtn');
                shuffleBtn.click();
                break;
        }
    });
}

// Navegação por toque (swipe)
function setupTouchSwipe() {
    const wrapper = document.querySelector('.slideshow-wrapper');
    let touchStartX = 0;
    let touchEndX = 0;
    
    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - próximo slide
                nextSlide();
            } else {
                // Swipe right - slide anterior
                prevSlide();
            }
        }
    }
}

// Pausar slideshow quando a aba não estiver ativa
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopSlideshow();
    } else if (isPlaying) {
        startSlideshow();
    }
});

// Pausar slideshow quando o mouse estiver sobre o slideshow
const wrapper = document.querySelector('.slideshow-wrapper');
wrapper.addEventListener('mouseenter', () => {
    if (isPlaying) {
        stopSlideshow();
    }
});

wrapper.addEventListener('mouseleave', () => {
    if (isPlaying) {
        startSlideshow();
    }
});
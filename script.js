// Configuração inicial
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    startTypingEffect();
    setupLoveButton();
    setupMemoryCards();
    setupExpandButton();
    loadLoveCounter();
});

// Criar corações flutuantes no fundo
function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
    
    for (let i = 0; i < 20; i++) {
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

// Efeito de digitação para a mensagem principal
function startTypingEffect() {
    const textElement = document.getElementById('typing-text');
    const messages = [
        "Você é a razão dos meus sorrisos todos os dias 💖",
        "Cada momento ao seu lado é um presente precioso 🎁",
        "Meu coração bate mais forte quando estou com você 💓",
        "Você é meu sonho realizado e minha realidade favorita 🌟",
        "Te amar é a coisa mais fácil e natural do mundo 💕"
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            textElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            textElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50;
        }

        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pausa antes de deletar
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500; // Pausa antes de começar próxima mensagem
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Configurar botão de amor
function setupLoveButton() {
    const loveButton = document.getElementById('loveButton');
    const modal = document.getElementById('loveModal');
    const closeModal = document.querySelector('.close-modal');
    const counterNumber = document.getElementById('counterNumber');
    
    let clickCount = parseInt(localStorage.getItem('loveClickCount')) || 0;
    counterNumber.textContent = clickCount;

    loveButton.addEventListener('click', function() {
        // Incrementar contador
        clickCount++;
        counterNumber.textContent = clickCount;
        localStorage.setItem('loveClickCount', clickCount);
        
        // Criar explosão de corações
        createHeartExplosion(this);
        
        // Mostrar modal
        modal.style.display = 'block';
        
        // Adicionar mais corações ao modal
        addModalHearts();
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Carregar contador do localStorage
function loadLoveCounter() {
    const counterNumber = document.getElementById('counterNumber');
    let clickCount = parseInt(localStorage.getItem('loveClickCount')) || 0;
    counterNumber.textContent = clickCount;
}

// Criar explosão de corações ao clicar no botão
function createHeartExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(heart);
        
        // Animar o coração
        setTimeout(() => {
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const velocity = Math.random() * 200 + 100;
            const endX = centerX + Math.cos(angle) * velocity;
            const endY = centerY + Math.sin(angle) * velocity - 100;
            
            heart.style.left = endX + 'px';
            heart.style.top = endY + 'px';
            heart.style.opacity = '0';
            heart.style.transform = `scale(${Math.random() + 0.5})`;
        }, 10);
        
        // Remover o coração após a animação
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// Adicionar corações extras ao modal
function addModalHearts() {
    const modalHearts = document.querySelector('.modal-hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    modalHearts.textContent = '';
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('span');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.display = 'inline-block';
        heart.style.margin = '0 5px';
        heart.style.animation = `heartbeat 0.5s infinite`;
        heart.style.animationDelay = (i * 0.1) + 's';
        modalHearts.appendChild(heart);
    }
}

// Configurar cards de memória
function setupMemoryCards() {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    const memoryMessages = {
        '1': 'Lembro-me de cada detalhe desse dia especial. Seu sorriso, suas palavras, o modo como olhou para mim - tudo está gravado em meu coração para sempre 💖',
        '2': 'Nossas risadas são a trilha sonora da nossa vida. Cada momento de alegria compartilhada se torna uma memória ainda mais preciosa 🌟',
        '3': 'Cada aventura ao seu lado se torna uma história inesquecível. Não importa onde vamos, o importante é quem está comigo 🎭',
        '4': 'Nosso verdadeiro lar não é um lugar, mas sim onde estamos juntos. Em qualquer lugar, contigo é meu paraíso 🏠'
    };
    
    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const memoryId = this.getAttribute('data-memory');
            const message = memoryMessages[memoryId];
            
            if (message) {
                // Criar modal para mostrar mensagem da memória
                showMemoryModal(message);
            }
            
            // Adicionar efeito de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Mostrar modal com mensagem da memória
function showMemoryModal(message) {
    // Remove modal existente se houver
    const existingModal = document.getElementById('memoryModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'memoryModal';
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <span class="close-modal">&times;</span>
            <h2>💭 Nossa Memória</h2>
            <p style="font-size: 1.2rem; line-height: 1.8; color: #5a3a3a; margin: 20px 0;">${message}</p>
            <div style="font-size: 3rem; margin-top: 20px;">💕</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => modal.remove());
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Configurar botão de expandir carta
function setupExpandButton() {
    const expandButton = document.getElementById('expandLetter');
    const letterContent = document.getElementById('letterContent');
    
    expandButton.addEventListener('click', function() {
        letterContent.style.maxHeight = letterContent.style.maxHeight === 'none' ? '300px' : 'none';
        this.textContent = letterContent.style.maxHeight === 'none' ? 'Recolher carta' : 'Ler carta completa';
    });
}

// Adicionar efeito de parallax nas seções
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.message-card, .letter-container');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// Adicionar efeito hover especial nos reasons
const reasons = document.querySelectorAll('.reason');
reasons.forEach((reason, index) => {
    reason.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
        this.querySelector('p').style.color = '#4a2c2a';
    });
    
    reason.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.9)';
        this.querySelector('p').style.color = '#5a3a3a';
    });
});

// Adicionar efeito de confete quando atingir marcos do contador
const originalCounterDisplay = document.getElementById('loveCounter').innerHTML;

setInterval(() => {
    const counterNumber = document.getElementById('counterNumber');
    const count = parseInt(counterNumber.textContent);
    
    if (count > 0 && count % 10 === 0) {
        showCelebration(count);
    }
}, 1000);

function showCelebration(count) {
    // Mostrar mensagem especial
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        font-size: 1.5rem;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: celebrationPop 0.5s ease-out;
    `;
    
    celebration.innerHTML = `
        🎉 ${count} vezes! 🎉<br>
        <span style="font-size: 1rem;">Você é muito amada!</span>
    `;
    
    document.body.appendChild(celebration);
    
    // Criar confete
    createConfetti();
    
    // Remover após 3 segundos
    setTimeout(() => {
        celebration.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => celebration.remove(), 500);
    }, 3000);
}

function createConfetti() {
    const colors = ['#ff4757', '#ff6b81', '#ff9a9e', '#fecfef', '#ffd1d1'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            z-index: 9999;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Adicionar keyframes para animações de celebração
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrationPop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    @keyframes confettiFall {
        0% { top: -10px; transform: rotate(0deg); opacity: 1; }
        100% { top: 100vh; transform: rotate(720deg); opacity: 0; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
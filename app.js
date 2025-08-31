// Application data
const apologyData = {
    pandaExpressions: ["😢", "😐", "🙂", "😊", "😍", "🥰"],
    pandaMessages: [
        "Panda is getting happier! 🐼💕",
        "You're making panda smile! 🌸",
        "Panda loves you more! 💙🌹",
        "Forever panda love! 🐼💖",
        "You're panda's everything! 🥰🌺"
    ],
    roseStages: ["🌱", "🌿", "🥀", "🌹", "💙🌹✨"],
    bloomMessages: [
        "A blue rose blooms for you! 🌹💙",
        "Beauty grows with forgiveness! ✨",
        "Our love blossoms again! 🌺💕",
        "Like roses, we can bloom anew! 🌹🆕"
    ],
    surpriseMessages: [
        "You're as beautiful as blue roses in moonlight! 🌹🌙",
        "This panda is so lucky to love you! 🐼🍀",
        "Thank you for being patient with this silly panda 💙🐼",
        "You make this panda's heart bloom like roses! 💖🌹"
    ]
};

// Global variables
let loveCount = 0;
let currentExpression = 0;
let roseGrowthStates = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing application...');
    initializeAnimations();
    setupScrollAnimations();
    setupInteractiveElements();
    createFloatingHearts();
    initializeLoveCounter();
    initializeRoseGarden();
});

// Initialize love counter specifically
function initializeLoveCounter() {
    const interactivePanda = document.getElementById('interactivePanda');
    if (interactivePanda) {
        console.log('Love counter initialized');
        interactivePanda.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Panda clicked, current count:', loveCount);
            increaseLove();
        });
        
        // Also add touch event for mobile
        interactivePanda.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            increaseLove();
        });
    } else {
        console.error('Interactive panda not found!');
    }
}

// Initialize rose garden specifically  
function initializeRoseGarden() {
    const rosePlants = document.querySelectorAll('.rose-plant');
    console.log('Found rose plants:', rosePlants.length);
    
    rosePlants.forEach((plant, index) => {
        roseGrowthStates[index] = 0;
        
        plant.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Rose plant clicked:', index);
            growRose(this);
        });
        
        plant.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            growRose(this);
        });
    });
}

// Smooth scrolling function
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize animations and interactions
function initializeAnimations() {
    // Welcome panda animation
    const welcomePanda = document.getElementById('welcomePanda');
    if (welcomePanda) {
        welcomePanda.addEventListener('click', function() {
            console.log('Welcome panda clicked');
            // Create wave animation
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'wave 1s ease-in-out';
            
            // Create temporary hearts around the panda
            createTemporaryHearts(this);
        });
    }

    // Animate reason cards on hover
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special animations for specific sections
                if (entry.target.classList.contains('reasons-grid')) {
                    animateReasonCards();
                }
                if (entry.target.classList.contains('promises-list')) {
                    animatePromiseItems();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.section-content, .interactive-card, .reasons-grid, .promises-list');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Setup interactive elements
function setupInteractiveElements() {
    // Add hover effects to pandas
    const pandas = document.querySelectorAll('[class*="panda-"]');
    pandas.forEach(panda => {
        panda.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        panda.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click effects to roses
    const roses = document.querySelectorAll('.clicking-rose');
    roses.forEach(rose => {
        rose.addEventListener('click', function() {
            bloomRose(this);
        });
    });
}

// Love counter functionality - FIXED
function increaseLove() {
    const pandaFace = document.querySelector('.panda-face');
    const pandaExpression = document.getElementById('pandaExpression');
    const loveCountElement = document.getElementById('loveCount');
    const pandaMessage = document.getElementById('pandaMessage');

    loveCount++;
    console.log('Love count increased to:', loveCount);
    
    // Update the display
    if (loveCountElement) {
        loveCountElement.textContent = loveCount;
    }

    // Update panda expression based on love count
    if (loveCount <= apologyData.pandaExpressions.length) {
        const expressionIndex = Math.min(loveCount - 1, apologyData.pandaExpressions.length - 1);
        if (pandaExpression) {
            pandaExpression.textContent = apologyData.pandaExpressions[expressionIndex];
        }
        
        if (loveCount <= apologyData.pandaMessages.length && pandaMessage) {
            pandaMessage.textContent = apologyData.pandaMessages[loveCount - 1];
        }
    }

    // Add click animation
    if (pandaFace) {
        pandaFace.style.transform = 'scale(1.3)';
        pandaFace.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            pandaFace.style.transform = 'scale(1)';
        }, 200);
    }

    // Create hearts around the panda
    const interactivePanda = document.getElementById('interactivePanda');
    if (interactivePanda) {
        createTemporaryHearts(interactivePanda);
    }

    // Special animations for milestones
    if (loveCount === 5) {
        showSpecialCelebration();
    }
}

// Rose garden functionality - FIXED
function growRose(element) {
    const plantIndex = Array.from(element.parentNode.children).indexOf(element);
    let currentStage = roseGrowthStates[plantIndex] || 0;
    
    console.log('Growing rose, current stage:', currentStage, 'for plant:', plantIndex);
    
    if (currentStage < apologyData.roseStages.length - 1) {
        currentStage++;
        roseGrowthStates[plantIndex] = currentStage;
        element.textContent = apologyData.roseStages[currentStage];
        
        console.log('Rose grown to stage:', currentStage, 'emoji:', apologyData.roseStages[currentStage]);
        
        // Add growth animation
        element.style.transform = 'scale(1.5)';
        element.style.transition = 'all 0.4s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 400);
        
        // Show bloom message
        if (currentStage === apologyData.roseStages.length - 1) {
            showBloomMessage(plantIndex);
        }
        
        // Create sparkle effect
        createSparkleEffect(element);
    } else {
        // If fully grown, create sparkle effect anyway
        createSparkleEffect(element);
        showTemporaryMessage("This rose is already fully bloomed! 🌹✨", element);
    }
}

// Rose bloom functionality
function bloomRose(element) {
    element.classList.add('bloomed');
    element.textContent = '💙🌹✨';
    
    // Remove the class after animation
    setTimeout(() => {
        element.classList.remove('bloomed');
        element.textContent = '🌹';
    }, 1000);
    
    // Create sparkle effect
    createSparkleEffect(element);
    
    // Show random bloom message
    const messageIndex = Math.floor(Math.random() * apologyData.bloomMessages.length);
    showTemporaryMessage(apologyData.bloomMessages[messageIndex], element);
}

// Surprise message functionality
function showSurpriseMessage() {
    const surpriseMessage = document.getElementById('surpriseMessage');
    const surpriseText = document.getElementById('surpriseText');
    
    if (surpriseMessage && surpriseText) {
        // Get random surprise message
        const randomIndex = Math.floor(Math.random() * apologyData.surpriseMessages.length);
        surpriseText.textContent = apologyData.surpriseMessages[randomIndex];
        
        // Show the message
        surpriseMessage.classList.remove('hidden');
        
        // Hide after 5 seconds
        setTimeout(() => {
            surpriseMessage.classList.add('hidden');
        }, 5000);
        
        // Create celebration effect
        createCelebrationEffect();
    }
}

// Animation helper functions
function createTemporaryHearts(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.textContent = ['💖', '💙', '🌹', '✨', '💕', '🌸'][i];
        heart.style.position = 'absolute';
        heart.style.left = rect.left + scrollLeft + rect.width/2 + (Math.random() - 0.5) * 120 + 'px';
        heart.style.top = rect.top + scrollTop + rect.height/2 + (Math.random() - 0.5) * 60 + 'px';
        heart.style.fontSize = '1.8rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'floatUp 2.5s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2500);
    }
}

function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = ['✨', '⭐', '💫', '🌟', '💙', '🌹'][Math.floor(Math.random() * 6)];
        sparkle.style.position = 'absolute';
        sparkle.style.left = rect.left + scrollLeft + rect.width/2 + (Math.random() - 0.5) * 100 + 'px';
        sparkle.style.top = rect.top + scrollTop + rect.height/2 + (Math.random() - 0.5) * 100 + 'px';
        sparkle.style.fontSize = '1.4rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }
}

function createCelebrationEffect() {
    const celebrationEmojis = ['🎉', '🎊', '🐼', '🌹', '💙', '💖', '✨', '🌸'];
    
    for (let i = 0; i < 25; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * window.innerWidth + 'px';
        emoji.style.top = window.innerHeight + 'px';
        emoji.style.fontSize = '2rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '1000';
        emoji.style.animation = 'celebration 4s ease-out forwards';
        emoji.style.animationDelay = i * 0.1 + 's';
        
        document.body.appendChild(emoji);
        
        setTimeout(() => {
            if (emoji.parentNode) {
                emoji.parentNode.removeChild(emoji);
            }
        }, 4000 + i * 100);
    }
}

function showSpecialCelebration() {
    const pandaInteractive = document.querySelector('.panda-interactive');
    if (pandaInteractive) {
        pandaInteractive.style.animation = 'specialCelebration 2s ease-in-out';
        
        setTimeout(() => {
            pandaInteractive.style.animation = '';
        }, 2000);
    }
    
    createCelebrationEffect();
}

function showBloomMessage(plantIndex) {
    const messageIndex = Math.min(plantIndex, apologyData.bloomMessages.length - 1);
    const message = apologyData.bloomMessages[messageIndex];
    
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.background = 'rgba(255, 182, 193, 0.95)';
    messageElement.style.padding = '1.5rem 2.5rem';
    messageElement.style.borderRadius = '20px';
    messageElement.style.fontSize = '1.3rem';
    messageElement.style.fontWeight = '600';
    messageElement.style.color = '#134252';
    messageElement.style.zIndex = '1000';
    messageElement.style.animation = 'popIn 3s ease-out forwards';
    messageElement.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
    messageElement.style.border = '3px solid rgba(107, 182, 255, 0.5)';
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }, 3000);
}

function showTemporaryMessage(message, element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'absolute';
    messageElement.style.left = rect.left + scrollLeft + rect.width/2 + 'px';
    messageElement.style.top = rect.top + scrollTop - 60 + 'px';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.background = 'rgba(255, 255, 255, 0.95)';
    messageElement.style.padding = '0.8rem 1.5rem';
    messageElement.style.borderRadius = '15px';
    messageElement.style.fontSize = '1rem';
    messageElement.style.fontWeight = '600';
    messageElement.style.color = '#134252';
    messageElement.style.zIndex = '1000';
    messageElement.style.animation = 'fadeInOut 2.5s ease-out forwards';
    messageElement.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    messageElement.style.border = '2px solid rgba(255, 182, 193, 0.6)';
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }, 2500);
}

function animateReasonCards() {
    const cards = document.querySelectorAll('.reason-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animatePromiseItems() {
    const items = document.querySelectorAll('.promise-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

function createFloatingHearts() {
    setInterval(() => {
        if (Math.random() > 0.7) { // Reduce frequency slightly
            const heart = document.createElement('div');
            const heartTypes = ['💖', '💙', '🌹', '✨', '🌸', '💕'];
            heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.bottom = '-50px';
            heart.style.fontSize = '1.8rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1';
            heart.style.opacity = '0.8';
            heart.style.animation = 'floatUpSlow 10s linear forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 10000);
        }
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { opacity: 1; transform: translateY(0px) scale(1) rotate(0deg); }
        50% { opacity: 0.8; transform: translateY(-60px) scale(1.1) rotate(180deg); }
        100% { opacity: 0; transform: translateY(-120px) scale(0.3) rotate(360deg); }
    }
    
    @keyframes sparkleFloat {
        0% { opacity: 1; transform: scale(1) rotate(0deg); }
        25% { opacity: 0.9; transform: scale(1.3) rotate(90deg); }
        50% { opacity: 0.7; transform: scale(1.5) rotate(180deg); }
        75% { opacity: 0.4; transform: scale(1.2) rotate(270deg); }
        100% { opacity: 0; transform: scale(0.3) rotate(360deg); }
    }
    
    @keyframes celebration {
        0% { opacity: 1; transform: translateY(0px) rotate(0deg) scale(1); }
        50% { opacity: 0.8; transform: translateY(-${window.innerHeight/2}px) rotate(360deg) scale(1.2); }
        100% { opacity: 0; transform: translateY(-${window.innerHeight + 100}px) rotate(720deg) scale(0.5); }
    }
    
    @keyframes specialCelebration {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.3) rotate(10deg); }
        50% { transform: scale(1.4) rotate(-10deg); }
        75% { transform: scale(1.2) rotate(5deg); }
    }
    
    @keyframes popIn {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    @keyframes floatUpSlow {
        0% { opacity: 0.8; transform: translateY(0px) rotate(0deg); }
        100% { opacity: 0; transform: translateY(-${window.innerHeight + 150}px) rotate(360deg); }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px) scale(0.8); }
        20% { opacity: 1; transform: translateY(0px) scale(1); }
        80% { opacity: 1; transform: translateY(0px) scale(1); }
        100% { opacity: 0; transform: translateY(-10px) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        if (e.target.id === 'interactivePanda' || 
            e.target.classList.contains('panda-face') ||
            e.target.classList.contains('rose-plant') || 
            e.target.classList.contains('clicking-rose')) {
            e.target.style.transform = 'scale(1.2)';
        }
    }, {passive: false});
    
    document.addEventListener('touchend', function(e) {
        if (e.target.id === 'interactivePanda' || 
            e.target.classList.contains('panda-face') ||
            e.target.classList.contains('rose-plant') || 
            e.target.classList.contains('clicking-rose')) {
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 200);
        }
    }, {passive: false});
}
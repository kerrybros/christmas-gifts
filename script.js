// Global variables
let raffleData = [];
let currentScreen = 'start';

// Initialize snow effect
function createSnow() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❉'];
    
    // Create 50 snowflakes
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        snowContainer.appendChild(snowflake);
    }
}

// Load CSV data
async function loadCSV() {
    try {
        const response = await fetch('gifts.csv');
        const text = await response.text();
        
        // Parse CSV
        const lines = text.trim().split('\n');
        raffleData = [];
        
        // Skip header row and parse data
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                // Simple CSV parsing (handles basic cases)
                const match = line.match(/^"?([^",]+)"?,\s*"?([^"]+)"?$/);
                if (match) {
                    raffleData.push({
                        name: match[1].trim(),
                        gift: match[2].trim()
                    });
                }
            }
        }
        
        console.log('Loaded raffle data:', raffleData);
        return raffleData.length > 0;
    } catch (error) {
        console.error('Error loading CSV:', error);
        // Fallback to sample data for testing
        raffleData = [
            { name: 'John Smith', gift: 'Wireless Headphones' },
            { name: 'Sarah Johnson', gift: 'Coffee Maker' },
            { name: 'Mike Wilson', gift: 'Gift Card $50' },
            { name: 'Emily Davis', gift: 'Cozy Blanket' },
            { name: 'James Brown', gift: 'Book Set' }
        ];
        return true;
    }
}

// Switch between screens
function switchScreen(screenName) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    currentScreen = screenName;
}

// Animate slot machine effect
function animateSlotMachine() {
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');
    
    const allNames = raffleData.map(r => r.name);
    const allGifts = raffleData.map(r => r.gift);
    
    let counter = 0;
    const interval = setInterval(() => {
        slot1.textContent = '🎅';
        slot2.textContent = allNames[Math.floor(Math.random() * allNames.length)];
        slot3.textContent = allGifts[Math.floor(Math.random() * allGifts.length)];
        
        counter++;
        
        if (counter > 30) { // Run for about 3 seconds
            clearInterval(interval);
            showResults();
        }
    }, 100);
}

// Confetti celebration
function celebrate() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#00ff00', '#ffd700', '#ffffff']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#00ff00', '#ffd700', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Display results
function showResults() {
    switchScreen('results');
    celebrate();
    
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    
    // Shuffle for visual effect (but use predetermined order from CSV)
    raffleData.forEach((result, index) => {
        setTimeout(() => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.style.animationDelay = `${index * 0.1}s`;
            
            resultItem.innerHTML = `
                <div class="result-name">🎁 ${result.name}</div>
                <div class="result-arrow">➜</div>
                <div class="result-gift">${result.gift} ✨</div>
            `;
            
            resultsContainer.appendChild(resultItem);
            
            // Small confetti burst for each result
            confetti({
                particleCount: 20,
                spread: 50,
                origin: { y: 0.6 }
            });
        }, index * 200);
    });
}

// Click handler for start screen
function handleClick() {
    if (currentScreen === 'start') {
        switchScreen('animation');
        animateSlotMachine();
    }
}

// Restart the raffle
function restartRaffle() {
    switchScreen('start');
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        confetti({
            particleCount: 200,
            spread: 180,
            origin: { y: 0.5 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffd700']
        });
        alert('🎄 Ho Ho Ho! You found the secret code! 🎅');
        konamiCode = [];
    }
});

// Hidden click Easter egg on snowflakes (click 5 times fast)
let snowClickCount = 0;
let snowClickTimer = null;

document.getElementById('snow-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('snowflake')) {
        snowClickCount++;
        
        if (snowClickTimer) clearTimeout(snowClickTimer);
        
        if (snowClickCount >= 5) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
            });
            snowClickCount = 0;
        }
        
        snowClickTimer = setTimeout(() => {
            snowClickCount = 0;
        }, 2000);
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    createSnow();
    
    // Load CSV data
    const loaded = await loadCSV();
    
    if (!loaded) {
        alert('Error loading gifts.csv. Using sample data for demo.');
    }
    
    // Add click handler to body for start screen
    document.body.addEventListener('click', handleClick);
    
    // Add restart button handler
    document.getElementById('restart-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        restartRaffle();
    });
});


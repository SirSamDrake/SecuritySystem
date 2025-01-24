let masterPIN = '';
let currentPIN = '';
let attempts = 3;

function playSound(audioId) {
    try {
        const audio = document.getElementById(audioId);
        if (audio) {
            audio.play().catch(e => console.log('Audio play error:', e));
        }
    } catch(error) {
        console.log('Errore riproduzione audio:', error);
    }
}

function setPIN() {
    const pinInput = document.getElementById('pin-input');
    if (pinInput.value.length === 4) {
        if (masterPIN === '') {
            masterPIN = pinInput.value;
            pinInput.value = '';
            alert('PIN impostato correttamente. Conferma il PIN.');
        } else if (pinInput.value === masterPIN) {
            document.getElementById('setup-screen').style.display = 'none';
            document.getElementById('security-panel').style.display = 'block';
            startYellowLedBlink();
        } else {
            alert('PIN non corrispondente. Riprova.');
            masterPIN = '';
        }
    } else {
        alert('Inserisci un PIN di 4 cifre');
    }
}

function startYellowLedBlink() {
    const yellowLed = document.getElementById('yellow-led');
    yellowLed.style.backgroundColor = 'yellow';
    setInterval(() => {
        yellowLed.style.opacity = yellowLed.style.opacity === '0' ? '1' : '0';
    }, 500);
}

function pressKey(key) {
    playSound('bip-short');
    
    if (currentPIN.length < 4) {
        currentPIN += key;
        updateLCDScreen();
    }
}

function updateLCDScreen() {
    const lcdText = document.getElementById('lcd-text');
    lcdText.innerHTML = '*'.repeat(currentPIN.length);
}

function checkPIN() {
    if (currentPIN.length === 4) {
        if (currentPIN === masterPIN) {
            accessGranted();
        } else {
            accessDenied();
        }
    }
}

function accessGranted() {
    document.getElementById('green-led').style.backgroundColor = 'green';
    document.getElementById('lcd-text').textContent = 'ACCESSO OK';
    playSound('bip-long');
    setTimeout(() => {
        // Reset system or add further logic
    }, 3000);
}

function accessDenied() {
    attempts--;
    document.getElementById('red-led').style.backgroundColor = 'red';
    document.getElementById('lcd-text').textContent = 'ACCESSO NEGATO';
    
    if (attempts > 0) {
        setTimeout(() => {
            document.getElementById('lcd-text').textContent = `Tentativi: ${attempts}`;
            currentPIN = '';
        }, 3000);
    } else {
        document.getElementById('lcd-text').textContent = 'SISTEMA BLOCCATO';
        playSound('bip-long');
    }
}


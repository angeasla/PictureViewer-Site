// Typing effect for subtitle
document.addEventListener("DOMContentLoaded", function () {
  const text = "A nostalgic glimpse into the DOS days and the BBS era";
  const typedTextElement = document.getElementById("typed-text");
  let index = 0;

  function typeText() {
    if (index < text.length) {
      typedTextElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 100);
    }
  }

  // Start typing effect after a short delay
  setTimeout(typeText, 1000);

  // Add retro sound effects (optional - requires user interaction)
  const buttons = document.querySelectorAll(".dos-button");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      // Create a subtle beep sound effect
      playBeep(800, 50);
    });

    button.addEventListener("click", function () {
      // Create a click sound effect
      playBeep(1000, 100);
    });
  });

  // Matrix-style falling characters effect (subtle)
  createMatrixEffect();

  // Add glitch effect to ASCII art occasionally
  setInterval(glitchEffect, 10000);
});

// Simple beep sound generator
function playBeep(frequency, duration) {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "square";

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration / 1000
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (e) {
    // Silently fail if audio context is not available
  }
}

// Subtle matrix effect in background
function createMatrixEffect() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "-1";
  canvas.style.opacity = "0.1";

  document.body.appendChild(canvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const chars = "01";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 100);
}

// Glitch effect for ASCII art
function glitchEffect() {
  const asciiArt = document.getElementById("ascii-logo");
  const originalContent = asciiArt.textContent;

  // Apply glitch
  asciiArt.style.animation = "none";
  asciiArt.style.color = "#ff0000";
  asciiArt.style.textShadow = "2px 0 #00ffff, -2px 0 #ff00ff";

  // Restore after short time
  setTimeout(() => {
    asciiArt.style.animation = "glow 2s ease-in-out infinite alternate";
    asciiArt.style.color = "#00ff41";
    asciiArt.style.textShadow = "0 0 10px #00ff41";
  }, 200);
}

// Add scan line effect to buttons
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".dos-button");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.animation = "scanline 0.5s ease-in-out";
    });

    button.addEventListener("mouseleave", function () {
      this.style.animation = "";
    });
  });
});

// Add CSS for scan line animation
const style = document.createElement("style");
style.textContent = `
    @keyframes scanline {
        0% { box-shadow: inset 0 0 0 0 rgba(0, 255, 255, 0.1); }
        50% { box-shadow: inset 0 -2px 0 0 rgba(0, 255, 255, 0.8); }
        100% { box-shadow: inset 0 0 0 0 rgba(0, 255, 255, 0.1); }
    }
`;
document.head.appendChild(style);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.code);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.length === konamiSequence.length) {
    let match = true;
    for (let i = 0; i < konamiSequence.length; i++) {
      if (konamiCode[i] !== konamiSequence[i]) {
        match = false;
        break;
      }
    }

    if (match) {
      activateEasterEgg();
      konamiCode = [];
    }
  }
});

function activateEasterEgg() {
  // Create a retro popup
  const popup = document.createElement("div");
  popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #000080;
        border: 3px solid #00ffff;
        padding: 20px;
        color: #ffffff;
        font-family: 'Courier New', monospace;
        text-align: center;
        z-index: 10000;
        animation: popup 0.5s ease-in-out;
    `;

  popup.innerHTML = `
        <h3> EASTER EGG FOUND! </h3>
        <p>This is the hint for the app's easter egg!</p>
        <p>Just type "LALUNA" (without the " ") in the app and you will see it!</p>
        <button onclick="this.parentElement.remove()" style="
            background: #004400;
            color: #00ff00;
            border: 1px solid #00aa00;
            padding: 5px 15px;
            margin-top: 10px;
            font-family: 'Courier New', monospace;
            cursor: pointer;
        ">OK</button>
    `;

  document.body.appendChild(popup);

  // Add popup animation
  const popupStyle = document.createElement("style");
  popupStyle.textContent = `
        @keyframes popup {
            0% { transform: translate(-50%, -50%) scale(0); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
    `;
  document.head.appendChild(popupStyle);

  // Auto-remove after 15 seconds
  setTimeout(() => {
    if (popup.parentElement) {
      popup.remove();
    }
  }, 15000);
}

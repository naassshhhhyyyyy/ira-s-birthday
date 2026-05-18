let currentPage = 1;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;

let typingFlags = { 3: false, 5: false, 6: false };
let cakeClicked = false;

// 🔒 SECURITY
let isUnlocked = false;
let lastTimeCheck = Date.now();
const targetDate = new Date("May 19, 2026 00:00:00").getTime();

// DOM elements
const countEl = document.getElementById('count');
const cakeDiv = document.getElementById('cake');
const nextCakeBtn = document.getElementById('nextCakeBtn');
const nextMsg3Btn = document.getElementById('nextMsg3Btn');
const nextTypingBtn = document.getElementById('nextTypingBtn');
const giftBox = document.getElementById('giftBox');
const giftTitle = document.getElementById('giftTitle');
const spotifyContainer = document.getElementById('spotifyContainer');
const birthdaySong = document.getElementById('birthdaySong');
const themeToggleBtn = document.getElementById('themeToggle');

// ========== SUPER ANTI-DEVTOOLS ==========

// 1. Disable right click completely
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// 2. Disable all keyboard shortcuts for devtools
document.addEventListener('keydown', function(e) {
  const key = e.key;
  const ctrl = e.ctrlKey;
  const shift = e.shiftKey;
  
  // F12
  if (key === 'F12') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
  if (ctrl && shift && (key === 'I' || key === 'J' || key === 'C')) {
    e.preventDefault();
    return false;
  }
  // Ctrl+U (view source)
  if (ctrl && key === 'u') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+K (Firefox)
  if (ctrl && shift && key === 'K') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+E (Firefox)
  if (ctrl && shift && key === 'E') {
    e.preventDefault();
    return false;
  }
  // Ctrl+S (save)
  if (ctrl && key === 's') {
    e.preventDefault();
    return false;
  }
  // Ctrl+P (print)
  if (ctrl && key === 'p') {
    e.preventDefault();
    return false;
  }
  // Command+Option+I (Mac)
  if (e.metaKey && e.altKey && key === 'i') {
    e.preventDefault();
    return false;
  }
  // Command+Option+J (Mac)
  if (e.metaKey && e.altKey && key === 'j') {
    e.preventDefault();
    return false;
  }
  // Command+Option+C (Mac)
  if (e.metaKey && e.altKey && key === 'c') {
    e.preventDefault();
    return false;
  }
  // Command+U (Mac)
  if (e.metaKey && key === 'u') {
    e.preventDefault();
    return false;
  }
});

// 3. Disable inspect element via debugger loop
setInterval(function() {
  debugger;
}, 100);

// 4. Disable console methods
console.log = function() {};
console.warn = function() {};
console.error = function() {};
console.info = function() {};
console.debug = function() {};
console.table = function() {};

// 5. Detect devtools opening via width/height difference
let devtoolsOpen = false;
const devtoolsChecker = setInterval(function() {
  const widthDiff = window.outerWidth - window.innerWidth > 160;
  const heightDiff = window.outerHeight - window.innerHeight > 160;
  
  if ((widthDiff || heightDiff) && !devtoolsOpen) {
    devtoolsOpen = true;
    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Poppins;text-align:center;background:#020617;color:white;flex-direction:column;padding:20px;">
        <div>
          <h1 style="font-size:2rem;margin-bottom:20px;">🚫 Access Denied</h1>
          <p style="margin-bottom:10px;">Please close DevTools to continue.</p>
          <p style="font-size:0.8rem;opacity:0.7;">Let's keep the surprise magical! ✨</p>
        </div>
      </div>
    `;
  } else if (!widthDiff && !heightDiff && devtoolsOpen) {
    devtoolsOpen = false;
    location.reload();
  }
}, 1000);

// 6. Disable text selection
document.addEventListener('selectstart', function(e) {
  e.preventDefault();
  return false;
});

// 7. Disable copy/paste
document.addEventListener('copy', function(e) {
  e.preventDefault();
  return false;
});
document.addEventListener('cut', function(e) {
  e.preventDefault();
  return false;
});

// 8. Disable dragging
document.querySelectorAll('img, div, span, button').forEach(el => {
  el.setAttribute('draggable', 'false');
});

// 9. Block element inspection by adding fake attributes
const blockInspect = function() {
  document.querySelectorAll('*').forEach(el => {
    el.setAttribute('data-devtools-block', 'true');
  });
};
setInterval(blockInspect, 500);

// 10. Override console.clear to prevent clearing
const originalClear = console.clear;
console.clear = function() {};

// ========== TIME VALIDATION ==========
function validateTime() {
  const now = Date.now();

  if (now < lastTimeCheck - 5000) {
    console.warn("⚠️ Time tampering detected!");

    isUnlocked = false;

    // Reset to page 1
    currentPage = 1;
    pages.forEach((page, index) => {
      page.classList.remove('active');
      page.classList.add('prev');

      if (index === 0) {
        page.classList.add('active');
        page.classList.remove('prev');
      }
    });
  }

  lastTimeCheck = now;
}

setInterval(validateTime, 2000);

// ========== PAGE TRANSITION ==========
function goToPage(pageNum) {
  validateTime();

  if (!isUnlocked && pageNum !== 1) return;
  if (pageNum > totalPages) return;

  pages.forEach(page => {
    page.classList.remove('active');
    page.classList.add('prev');
  });

  const newPage = pages[pageNum - 1];
  if (!newPage) return;

  newPage.classList.remove('prev');
  newPage.classList.add('active');

  currentPage = pageNum;

  if (currentPage === 3 && !typingFlags[3]) {
    startTyping(
      'message3',
      "Hi po! 👋\n\nHappy Birthday! 🎉 Sana masaya ang araw mo. PS: Ang ganda mo talaga. lagi naman. 💙",
      'nextMsg3Btn',
      3
    );
  }

  else if (currentPage === 4 && !typingFlags[5]) {
    startTyping(
      'typing',
      "Eden Ira,\n\nHappy Birthday! 🎂\n\nUna sa lahat, gusto ko lang sabihin na ang saya ko na nakilala kita. Hindi ko alam kung paano sasabihin 'to ng maayos, pero lagi kitang naiisip. Tuwing nakikita kita, parang ang saya saya ng araw ko.\n\nGinawa ko 'tong website na 'to hindi lang dahil birthday mo, kundi dahil gusto kong gumawa ng something special para sa isang taong special para sa'kin. 💙\n\nSana ngayong birthday mo, maging masaya ka. Sana makuha mo lahat ng gusto mo. At sana... malaman mo na may isang tao na nababaliw na sa'yo. (Spoiler: ako 'yun HAHAHA)\n\nKidding aside (not really), gusto ko lang malaman mo na tuwing tatawa ka, napapangiti din ako. Tuwing magkikita tayo, nagiging maganda ang buong araw ko.\n\nSo ayun. Happy Birthday, Ira. 💙\n\nIngat ka palagi. 😊",
      'nextTypingBtn',
      5
    );
  }
}

// Next page
function nextPage() {
  if (!isUnlocked) return;
  goToPage(currentPage + 1);
}

// ========== COUNTDOWN ==========
function startCountdown() {
  const timer = setInterval(() => {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(timer);

      isUnlocked = true; // 🔓 UNLOCK
      startFinalCountdown();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countEl.innerHTML = `
      <div style="font-size:2rem">${days}d</div>
      <div style="font-size:2rem">${hours}h ${minutes}m</div>
      <div style="font-size:3rem">${seconds}s</div>
    `;
  }, 1000);
}

function startFinalCountdown() {
  let count = 3;
  countEl.textContent = count;

  const timer = setInterval(() => {
    count--;

    if (count >= 0) countEl.textContent = count;

    if (count < 0) {
      clearInterval(timer);
      goToPage(2);
    }
  }, 1000);
}

// ========== TYPING ==========
function startTyping(elementId, message, btnId, flagKey) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.textContent = "";
  let i = 0;

  function typeChar() {
    if (i < message.length) {
      element.textContent += message.charAt(i);
      i++;
      setTimeout(typeChar, 30);
    } else {
      if (btnId) {
        const btn = document.getElementById(btnId);
        if (btn) btn.disabled = false;
      }

      typingFlags[flagKey] = true;

      if (flagKey === 6 && spotifyContainer) {
        spotifyContainer.classList.add('show');
      }
    }
  }

  typeChar();
}

// ========== CAKE ==========
function handleCakeClick(e) {
  if (!isUnlocked) return;

  e.stopPropagation();

  if (cakeDiv.textContent === "🧁") {
    cakeDiv.textContent = "🎂";
    nextCakeBtn.disabled = false;

    if (!cakeClicked) {
      birthdaySong.play().catch(() => {});
      cakeClicked = true;
    }
  }
}

// ========== GIFT ==========
function handleGiftOpen(e) {
  if (!isUnlocked) return;

  e.stopPropagation();

  if (!giftBox || giftBox.classList.contains('flyAway')) return;

  giftBox.classList.add('flyAway');

  giftBox.addEventListener('animationend', () => {
    giftBox.style.display = 'none';
    giftTitle.textContent = "Hope you loved my surprise! 💕";

    if (!typingFlags[6]) {
      startTyping(
        'giftText',
        "Ira, gusto ko lang malaman mo... ikaw yung favorite kong part ng araw ko. Sana maging masaya ka today. At sana mapasaya pa din kita sa susunod na mga araw. 💙✨",
        null,
        6
      );
    }
  }, { once: true });
}

// ========== THEME ==========
function toggleTheme() {
  document.body.classList.toggle('dark');
  themeToggleBtn.textContent =
    document.body.classList.contains('dark') ? "☀️" : "🌙";
}

// ========== SWIPE ==========
let touchStart = 0;

document.addEventListener('touchstart', (e) => {
  touchStart = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  if (!isUnlocked) return;

  const touchEnd = e.changedTouches[0].clientX;

  if (touchStart - touchEnd > 55) {
    nextPage();
  }
});

// ========== KEYBOARD ==========
document.addEventListener('keydown', (e) => {
  if (!isUnlocked) return;

  if (e.key === 'ArrowRight' && currentPage < totalPages) {
    nextPage();
  }
});

// ========== EVENTS ==========
cakeDiv?.addEventListener('click', handleCakeClick);
nextCakeBtn?.addEventListener('click', nextPage);
nextMsg3Btn?.addEventListener('click', nextPage);
nextTypingBtn?.addEventListener('click', nextPage);
giftBox?.addEventListener('click', handleGiftOpen);
themeToggleBtn?.addEventListener('click', toggleTheme);

// ========== INIT ==========
pages.forEach((page, index) => {
  if (index === 0) {
    page.classList.add('active');
    page.classList.remove('prev');
  } else {
    page.classList.add('prev');
  }
});

startCountdown();

console.log("🔒 Locked until birthday...");

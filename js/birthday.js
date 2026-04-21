// ========== STATE ==========
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
      "Happy Birthday, Sai! Wishing you the best this year and sana maabot mo pangarap mo.",
      'nextMsg3Btn',
      3
    );
  }

  else if (currentPage === 4 && !typingFlags[5]) {
    startTyping(
      'typing',
      "Hello! First of all, ginawa ko ’to na website greetings for you kasi it's common for me to give all my friends a website greetings. Anyways, Happy Birthday kasi you are 19 years old living in this world, sana maging masaya ka sa buhay mo kahit ngayong araw lang, wishing you a good health, and malusog.\n\nSana sa age mo ngayon, mas marami kang matutunang bagay at mas ma-enjoy mo pa ang life. Hindi man perfect ang araw-araw, sana lagi ka pa ring may dahilan para ngumiti at magpatuloy.\n\nHappy Birthday! 💖✨🎉",
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
    giftTitle.textContent = "Hope you loved your surprise! 💕";

    if (!typingFlags[6]) {
      startTyping(
        'giftText',
        "Surprise! 🎉 You are truly special and loved 💕",
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

// ========== ANTI-INSPECT ==========
document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();
  }
});

// ========== DEVTOOLS DETECT ==========
setInterval(() => {
  const devtoolsOpen =
    window.outerWidth - window.innerWidth > 160 ||
    window.outerHeight - window.innerHeight > 160;

  if (devtoolsOpen) {
    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Poppins;text-align:center;">
        <div>
          <h1>🚫 Access Denied</h1>
          <p>Nice try 😏</p>
        </div>
      </div>
    `;
  }
}, 1000);

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

// ========== STATE ==========
let currentPage = 1;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;

let typingFlags = { 3: false, 5: false, 6: false };
let cakeClicked = false;

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

// ========== PAGE TRANSITION ==========
function goToPage(pageNum) {
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

  // Page-specific actions
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
      "Hello! First of all, ginawa ko ’to na website greetings for you kasi it's common for me to give all my friends a website greetings. Anyways, Happy Birthday kasi you are 19 years old living in this world, sana maging masaya ka sa buhay mo kahit ngayong araw lang, wishing you a good health, and malusog. \n\n Sana sa age mo ngayon, mas marami kang matutunang bagay at mas ma-enjoy mo pa ang life. Hindi man perfect ang araw-araw, sana lagi ka pa ring may dahilan para ngumiti at magpatuloy. Nandito lang din mga tao na nagmamalasakit sa’yo, kaya wag mong kalimutan na alagaan din sarili mo. \n\n Sana matupad mo yung mga goals at dreams mo sa buhay, kahit unti-unti lang. Hindi kailangang madali, basta tuloy-tuloy lang. Always believe in yourself kahit may times na parang hindi mo kaya. \n\n Happy Birthday! 💖✨🎉\n Enjoy your day, you deserve it!",
      'nextTypingBtn',
      5
    );
  }
}

// Next page
function nextPage() {
  goToPage(currentPage + 1);
}

// ========== COUNTDOWN ==========
function startCountdown() {
  const targetDate = new Date("April 21, 2026 21:05:00").getTime();

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // If it's already May 14 or past
    if (distance <= 0) {
      clearInterval(timer);
      startFinalCountdown(); // 🔥 trigger your old 3..2..1
      return;
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    // Display countdown
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

    if (count >= 0) {
      countEl.textContent = count;
    }

    if (count < 0) {
      clearInterval(timer);
      goToPage(2); // 🎉 start your birthday pages
    }
  }, 1000);
}

// ========== TYPING EFFECT ==========
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

      // ✅ Spotify ONLY after gift typing finishes
      if (flagKey === 6 && spotifyContainer) {
        spotifyContainer.classList.add('show');
      }
    }
  }

  typeChar();
}

// ========== CAKE CLICK ==========
function handleCakeClick(e) {
  e.stopPropagation();

  if (cakeDiv.textContent === "🧁") {
    cakeDiv.textContent = "🎂";
    nextCakeBtn.disabled = false;

    if (!cakeClicked) {
      birthdaySong.play().catch(() => {
        document.body.addEventListener('click', function playOnce() {
          birthdaySong.play().catch(() => {});
          document.body.removeEventListener('click', playOnce);
        }, { once: true });
      });

      cakeClicked = true;
    }
  }
}

// ========== GIFT OPEN ==========
function handleGiftOpen(e) {
  e.stopPropagation();

  if (!giftBox || giftBox.classList.contains('flyAway')) return;

  giftBox.classList.add('flyAway');

  giftBox.addEventListener('animationend', () => {
    giftBox.style.display = 'none';
    giftTitle.textContent = "Hope you loved your surprise! 💕";

    if (!typingFlags[6]) {
      startTyping(
        'giftText',
        "Surprise! 🎉 You are truly special and loved 💕 Every moment with you is a treasure. May this year overflow with happiness! 🌟",
        null,
        6
      );
    }
  }, { once: true });
}

// ========== DARK MODE ==========
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
  if (currentPage >= totalPages) return;

  const touchEnd = e.changedTouches[0].clientX;

  if (touchStart - touchEnd > 55) {
    nextPage();
  }
});

// ========== KEYBOARD ==========
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    e.preventDefault();
  }

  if (e.key === 'ArrowRight' && currentPage < totalPages) {
    let canProceed = true;

    if (currentPage === 2 && nextCakeBtn.disabled) canProceed = false;
    if (currentPage === 3 && nextMsg3Btn.disabled) canProceed = false;
    if (currentPage === 4 && nextTypingBtn.disabled) canProceed = false;

    if (canProceed) nextPage();
  }
});

// ========== EVENTS ==========
if (cakeDiv) {
  cakeDiv.addEventListener('click', handleCakeClick);
  cakeDiv.addEventListener('touchstart', handleCakeClick);
}

if (nextCakeBtn) nextCakeBtn.addEventListener('click', nextPage);
if (nextMsg3Btn) nextMsg3Btn.addEventListener('click', nextPage);
if (nextTypingBtn) nextTypingBtn.addEventListener('click', nextPage);

if (giftBox) {
  giftBox.addEventListener('click', handleGiftOpen);
  giftBox.addEventListener('touchstart', handleGiftOpen);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// ========== INITIALIZE ==========
pages.forEach((page, index) => {
  if (index === 0) {
    page.classList.add('active');
    page.classList.remove('prev');
  } else {
    page.classList.remove('active');
    page.classList.add('prev');
  }
});

// Start countdown
startCountdown();

// Enable audio preload
document.body.addEventListener('click', function () {
  if (birthdaySong && birthdaySong.paused && !cakeClicked) {
    birthdaySong.load();
  }
}, { once: true });

console.log("Ready! Click the cupcake 🧁 to start the party!");

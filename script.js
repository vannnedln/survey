const pages = {
  survey: document.querySelector('[data-page="survey"]'),
  landing: document.querySelector('[data-page="landing"]'),
  journey: document.querySelector('[data-page="journey"]'),
  letter: document.querySelector('[data-page="letter"]'),
};

function switchPage(to) {
  Object.values(pages).forEach(page => page.classList.remove('is-active'));
  pages[to].classList.add('is-active');
}

// Landing interactions
const startBtn = document.getElementById('btn-start');
startBtn.addEventListener('click', () => {
  switchPage('journey');
});

// Survey intro navigation
const continueBtn = document.getElementById('btn-continue');
continueBtn.addEventListener('click', (e) => {
  e.preventDefault();
  switchPage('landing');
});

// Journey
const storyLinesContainer = document.getElementById('story-lines');
const nextBtn = document.getElementById('btn-next');
const lines = [
  'I made this simple site kay trip lang nako char HAHAHA',
  'I think cringe sya para saimo pero bahala na HAHAHA',
];
let indexToShow = 0;

function revealNextLine() {
  if (indexToShow < lines.length) {
    const p = document.createElement('p');
    p.textContent = lines[indexToShow];
    storyLinesContainer.appendChild(p);
    requestAnimationFrame(() => {
      p.classList.add('is-visible');
    });
    indexToShow += 1;
    if (indexToShow === lines.length) {
      nextBtn.textContent = 'Continue';
    }
  } else {
    switchPage('letter');
  }
}

nextBtn.addEventListener('click', revealNextLine);

// Reset journey if user comes back (not exposed, but safe)
function resetJourney() {
  storyLinesContainer.innerHTML = '';
  indexToShow = 0;
  nextBtn.textContent = 'Next';
}

// Letter
const envelope = document.getElementById('envelope');
const inLetter = document.getElementById('letter-content');

// Toggle open/close when clicking envelope, but allow clicks inside the letter without closing
envelope.addEventListener('click', (e) => {
  const clickedInsideLetter = inLetter.contains(e.target);
  if (clickedInsideLetter) return; // do not toggle when interacting with letter content
  const expanded = envelope.getAttribute('aria-expanded') === 'true';
  envelope.setAttribute('aria-expanded', String(!expanded));
  inLetter.setAttribute('aria-hidden', expanded ? 'true' : 'false');
});

// Cursor follower (desktop)
const dot = document.querySelector('.cursor-dot');
let dotX = window.innerWidth / 2;
let dotY = window.innerHeight / 2;
let targetX = dotX;
let targetY = dotY;

window.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

window.addEventListener('touchmove', (e) => {
  if (e.touches && e.touches[0]) {
    targetX = e.touches[0].clientX;
    targetY = e.touches[0].clientY;
  }
}, { passive: true });

function animateDot() {
  dotX += (targetX - dotX) * 0.15;
  dotY += (targetY - dotY) * 0.15;
  dot.style.left = dotX + 'px';
  dot.style.top = dotY + 'px';
  requestAnimationFrame(animateDot);
}
animateDot();

// Ensure landing is active initially
switchPage('survey');



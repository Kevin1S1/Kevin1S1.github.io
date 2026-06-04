/* =========================================
   SCRIPT.JS — Kevin Setz Portfolio
   ========================================= */

/* ---------- NAV SCROLL (shadow on scroll) ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---------- TYPEWRITER EFFECT ---------- */
const phrases = [
  'Building detections that catch what matters.',
  'Turning telemetry into actionable intelligence.',
  'Sigma · CrowdStrike · Incident Response.',
  'Defending enterprise infrastructure from within.',
  'Engineering the defense. Anticipating the threat.',
];

const typewriterEl = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 35 : 65;

  if (!isDeleting && charIndex === current.length) {
    delay = 2400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 350;
  }

  setTimeout(typeWriter, delay);
}

typeWriter();

/* ---------- SCROLL FADE-IN ---------- */
function initFadeAnimations() {
  const selectors = [
    '#about .about-text',
    '#about .about-glass-card',
    '.skill-card',
    '.timeline-item',
    '.cert-card',
    '.contact-glass',
  ];

  const elements = document.querySelectorAll(selectors.join(','));
  elements.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  elements.forEach(el => observer.observe(el));
}

/* ---------- STAGGER GRID ITEMS ---------- */
function staggerCards() {
  document.querySelectorAll('.skills-grid .skill-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 70}ms`;
  });
  document.querySelectorAll('.certs-grid .cert-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 55}ms`;
  });
}

initFadeAnimations();
staggerCards();

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinksAll.forEach(link => {
        link.classList.toggle('active-nav', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(section => sectionObserver.observe(section));

/* ---------- DYNAMIC YEAR ---------- */
document.querySelectorAll('.footer-inner span').forEach(el => {
  if (el.textContent.includes('2026')) {
    el.textContent = el.textContent.replace('2026', new Date().getFullYear());
  }
});

/* ---------- PARALLAX ORBS (subtle) ---------- */
const orbs = document.querySelectorAll('.orb');
window.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  orbs.forEach((orb, i) => {
    const depth = (i + 1) * 10;
    orb.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
}, { passive: true });

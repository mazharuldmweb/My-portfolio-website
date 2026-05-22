/* ============================================
   MAZHARUL ISLAM - PORTFOLIO
   main.js - Main JavaScript
   ============================================ */

'use strict';

// ---- Cursor Glow ----
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ---- Active Nav Link ----
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
setActiveNav();

// ---- Navbar Scroll ----
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ---- Mobile Hamburger ----
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ---- Progress Bars ----
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  if (!bars.length) return;

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const pct = bar.getAttribute('data-width') || '0';
        setTimeout(() => {
          bar.style.width = pct + '%';
        }, 200);
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => barObserver.observe(bar));
}
animateProgressBars();

// ---- Project Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      if (filter === 'all' || category === filter) {
        card.style.display = '';
        card.style.animation = 'fadeUp 0.4s ease both';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---- Contact Form (Formspree) ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const successMsg = document.getElementById('formSuccess');
    const errorMsg = document.getElementById('formError');

    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = new FormData(contactForm);

    try {
      const res = await fetch('https://formspree.io/f/jihadseopro@gmail.com', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      } else {
        btn.textContent = 'Send Message →';
        btn.disabled = false;
        if (errorMsg) errorMsg.style.display = 'block';
      }
    } catch (err) {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      if (errorMsg) errorMsg.style.display = 'block';
    }
  });
}

// ---- Typed Text Effect (Hero) ----
function typeEffect(el, texts, speed = 80, pause = 2200) {
  if (!el) return;
  let textIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = texts[textIdx];
    el.textContent = current.slice(0, charIdx);

    if (!deleting && charIdx === current.length) {
      deleting = true;
      setTimeout(tick, pause);
      return;
    }
    if (deleting && charIdx === 0) {
      deleting = false;
      textIdx = (textIdx + 1) % texts.length;
    }
    charIdx += deleting ? -1 : 1;
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

const typedEl = document.getElementById('typedText');
if (typedEl) {
  typeEffect(typedEl, [
    'Frontend Developer',
    'Web Designer',
    'UI Builder',
    'Creative Coder'
  ]);
}

// ---- Counter Animation ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + (el.getAttribute('data-suffix') || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + (el.getAttribute('data-suffix') || '');
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ---- Skill Chip Hover Animation ----
document.querySelectorAll('.skill-chip').forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    chip.style.transform = 'scale(1.07) translateY(-2px)';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.transform = '';
  });
});

// ---- Page Load Transition ----
document.body.classList.add('page-transition');

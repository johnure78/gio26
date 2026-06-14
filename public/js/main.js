/**
 * God's Invasion Outreach - Safe Main JavaScript
 * Crash-proof version
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollSpy();
  initNavbarBehavior();
  initBackToTop();
  initFormHandling();
  initScrollAnimations();
});

/* ================= NAVIGATION ================= */

function initNavigation() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  function updateNavbarHeight() {
    document.documentElement.style.setProperty(
      '--navbar-height',
      `${navbar.offsetHeight}px`
    );
  }

  updateNavbarHeight();
  window.addEventListener('resize', updateNavbarHeight);

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        navbar.classList.toggle('scrolled', currentScroll > 50);
        navbar.classList.toggle(
          'hidden',
          currentScroll > lastScroll && currentScroll > 500
        );

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  const links = navLinks.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active')
      ? 'hidden'
      : '';
  });

  links.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (!targetId.startsWith('#')) return;

      e.preventDefault();

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';

      const navHeight = navbar.offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      history.pushState(null, null, targetId);
    });
  });
}

/* ================= SCROLL SPY ================= */

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  });

  sections.forEach(section => observer.observe(section));
}

/* ================= NAVBAR BEHAVIOR ================= */

function initNavbarBehavior() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    navbar.classList.toggle('scrolled', currentScroll > 100);
    navbar.classList.toggle(
      'hidden',
      currentScroll > lastScroll && currentScroll > 500
    );

    lastScroll = currentScroll;
  });
}

/* ================= BACK TO TOP ================= */

function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.textContent = '↑';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.pageYOffset > 500);
  });

  btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

/* ================= SIMPLE FORM HANDLING ================= */

function initFormHandling() {
  const form = document.querySelector('.join-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Form submitted (demo)');
  });
}

/* ================= SCROLL ANIMATIONS ================= */

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  });

  elements.forEach(el => observer.observe(el));
}


// Impact Statistics Counter Animation
document.addEventListener('DOMContentLoaded', function() {
  const statNumbers = document.querySelectorAll('.impact-stat-number');
  
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 60; // 60 frames for ~1 second animation
    const duration = 1500; // 1.5 seconds
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  };

  // Intersection Observer to trigger animation when section is visible
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => observer.observe(stat));
});

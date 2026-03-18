/**
 * Program Banner Slider
 * Handles program switching with auto-slide and manual controls
 */

document.addEventListener('DOMContentLoaded', () => {
  initProgramSlider();
});

function initProgramSlider() {
  const programs = {
    prison: {
      title: "Prison Outreach",
      image: "images/prison.jpeg",
      text: "Through our prison outreach program, we bring hope, restoration, and spiritual guidance to inmates, reminding them that redemption and transformation are always possible through Christ."
    },
    orphanage: {
      title: "Orphanage Outreach",
      image: "images/orphanage.jpeg",
      text: "Our orphanage outreach focuses on nurturing vulnerable children with love, care, educational support, and essential resources to help them grow with dignity and hope."
    },
    widows: {
      title: "Widows Outreach",
      image: "images/widows.jpeg",
      text: "This program supports widows facing economic and emotional hardship through food assistance, empowerment initiatives, and encouragement, restoring dignity and purpose."
    },
    community: {
      title: "Community Outreach",
      image: "images/community.jpg",
      text: "Our community outreach serves underserved communities through relief distribution, health awareness, and spiritual engagement, demonstrating compassion in action."
    }
  };

  const banner = document.getElementById('bannerSlide');
  const title = document.getElementById('bannerTitle');
  const text = document.getElementById('bannerText');
  const buttons = document.querySelectorAll('.nav-btn');
  
  if (!banner || !title || !text) return;

  let currentIndex = 0;
  const keys = Object.keys(programs);
  let autoSlideInterval;
  let isPaused = false;

  // Initialize with first program
  updateProgram(keys[0]);

  // Button click handlers
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.program;
      currentIndex = index;
      updateProgram(key);
      resetAutoSlide();
    });
  });

  // Pause on hover
  const bannerContainer = document.querySelector('.programs-banner');
  if (bannerContainer) {
    bannerContainer.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    
    bannerContainer.addEventListener('mouseleave', () => {
      isPaused = false;
    });
    
    // Also pause on focus for accessibility
    buttons.forEach(btn => {
      btn.addEventListener('focus', () => {
        isPaused = true;
      });
      btn.addEventListener('blur', () => {
        isPaused = false;
      });
    });
  }

  function updateProgram(key) {
    const program = programs[key];
    if (!program) return;

    // Fade out
    banner.style.opacity = '0';
    
    setTimeout(() => {
      // Update content
      banner.style.backgroundImage = `url(${program.image})`;
      title.textContent = program.title;
      text.textContent = program.text;
      
      // Update active button
      buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.program === key) {
          btn.classList.add('active');
        }
      });
      
      // Fade in
      banner.style.opacity = '1';
    }, 400);
  }

  function nextSlide() {
    if (isPaused) return;
    currentIndex = (currentIndex + 1) % keys.length;
    updateProgram(keys[currentIndex]);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 6000);
  }

  // Start auto-slide
  resetAutoSlide();

  // Cleanup on page hide
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(autoSlideInterval);
    } else {
      resetAutoSlide();
    }
  });
}
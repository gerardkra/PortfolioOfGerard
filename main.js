// main.js — navigation, theme toggle, scroll-in animations, and small helpers
(() => {
  const toggle = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  // Mobile nav toggle
  if (navToggle) navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const expanded = mainNav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    mainNav.style.display = mainNav.style.display === 'flex' ? '' : 'flex';
    mainNav.style.flexDirection = 'column';
  });

  // Theme toggle — persists in localStorage
  const userPref = localStorage.getItem('theme');
  if (userPref === 'light') document.documentElement.classList.add('light-mode');

  toggle && toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-mode');
    const isLight = document.documentElement.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    if (isLight) {
      document.documentElement.style.setProperty('--bg', '#f7fbff');
      document.documentElement.style.setProperty('--card', '#ffffff');
      document.documentElement.style.setProperty('--text', '#061223');
      document.documentElement.style.setProperty('--muted', '#445566');
      document.documentElement.style.setProperty('--glass', 'rgba(0,0,0,0.03)');
    } else {
      document.documentElement.style.removeProperty('--bg');
      document.documentElement.style.removeProperty('--card');
      document.documentElement.style.removeProperty('--text');
      document.documentElement.style.removeProperty('--muted');
      document.documentElement.style.removeProperty('--glass');
    }
  });

  // IntersectionObserver for .slide-in elements
  const observers = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.slide-in').forEach(el => observers.observe(el));

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Keyboard helper: close nav on Escape
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && mainNav && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      mainNav.style.display = '';
    }
  });

  // ===== SHOW MORE / SHOW LESS SKILLS =====
  const showMoreBtn = document.getElementById('show-more-skills');
  if (showMoreBtn) {
    const extraSkills = document.querySelectorAll('.extra-skill');

    // Initialize: hide extra skills
    extraSkills.forEach(skill => {
      skill.style.display = 'none';
      skill.style.opacity = 0;
      skill.style.transform = 'translateY(10px)';
      skill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    showMoreBtn.addEventListener('click', () => {
      const isHidden = extraSkills[0].style.display === 'none';

      extraSkills.forEach(skill => {
        if (isHidden) {
          skill.style.display = 'block';
          setTimeout(() => {
            skill.style.opacity = 1;
            skill.style.transform = 'translateY(0)';
          }, 50); // slight delay to trigger transition
        } else {
          skill.style.opacity = 0;
          skill.style.transform = 'translateY(10px)';
          setTimeout(() => {
            skill.style.display = 'none';
          }, 400); // match transition duration
        }
      });

      showMoreBtn.textContent = isHidden ? 'Show Less' : 'Show More';
    });
  }

})();

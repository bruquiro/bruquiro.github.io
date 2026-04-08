const elements = {
  body: document.body,
  themeBtn: document.getElementById('toggle-theme'),
  themeBtnIcon: document.querySelector('#toggle-theme .material-symbols-outlined'),
  mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
  navLinks: document.querySelector('.nav-links'),
};

const isLightMode = () => elements.body?.classList.contains('light-mode');

function toggleTheme() {
  elements.body?.classList.toggle('light-mode');
  const isLight = isLightMode();
  const label = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  
  if (elements.themeBtnIcon) {
    elements.themeBtnIcon.textContent = isLight ? 'dark_mode' : 'light_mode';
  }
  elements.themeBtn?.setAttribute('aria-label', label);
}

function initTheme() {
  const setInitialTheme = () => {
    const isLight = isLightMode();
    const label = isLight ? 'Switch to dark mode' : 'Switch to light mode';
    if (elements.themeBtnIcon) {
      elements.themeBtnIcon.textContent = isLight ? 'dark_mode' : 'light_mode';
    }
    elements.themeBtn?.setAttribute('aria-label', label);
  };

  elements.themeBtn?.addEventListener('click', toggleTheme);
  setInitialTheme();
}

function initMobileMenu() {
  const menuIcon = elements.mobileMenuToggle?.querySelector('.material-symbols-outlined');
  
  if (elements.mobileMenuToggle && elements.navLinks) {
    elements.mobileMenuToggle.addEventListener('click', () => {
      const isOpen = elements.navLinks.classList.toggle('mobile-open');
      elements.mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      if (menuIcon) {
        menuIcon.textContent = isOpen ? 'close' : 'menu';
      }
    });
    
    // Close menu when clicking on a link
    elements.navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        elements.navLinks.classList.remove('mobile-open');
        if (menuIcon) {
          menuIcon.textContent = 'menu';
        }
      });
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (!elements.body) return;
  initTheme();
  initMobileMenu();
  initSmoothScroll();
});

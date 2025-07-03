// Modo oscuro/claro
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const btns = [
    document.getElementById('toggle-theme'),
    document.getElementById('toggle-theme-mobile'),
  ];
  btns.forEach((btn) => {
    if (btn)
      btn.textContent = document.body.classList.contains('light-mode')
        ? '🌞'
        : '🌙';
  });
}

const themeBtn = document.getElementById('toggle-theme');
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
const themeBtnMobile = document.getElementById('toggle-theme-mobile');
if (themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

// Transición y animación para botón Top
const backToTop = document.getElementById('back-to-top');
const content = document.querySelector('.content');
if (content) {
  content.addEventListener('scroll', () => {
    if (content.scrollTop > 200) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
}
// Al hacer click, scroll arriba en .content
backToTop.addEventListener('click', () => {
  if (content) {
    smoothContentScrollTo(content, 0, 700, () => animateSection(content));
    animateSection(backToTop); // animación visual en el botón Top
  }
});

// Smooth Scroll for Navigation con animación de sección
function animateSection(section) {
  section.classList.remove('section-animate');
  void section.offsetWidth; // trigger reflow
  section.classList.add('section-animate');
  // Remueve la clase después de la animación para permitir futuras animaciones
  setTimeout(() => section.classList.remove('section-animate'), 800);
}

// Scroll animado tipo mouse wheel
function smoothScrollTo(targetY, duration = 700) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start;
  function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuad(percent));
    if (percent < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function scrollToSection(section) {
  const yOffset = -20;
  const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
  smoothScrollTo(y, 700);
}

document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section) {
      scrollToSection(section);
      await new Promise((resolve) => setTimeout(resolve, 600));
      animateSection(section);
    }
  });
});

// --- Scroll suave en .content para navegación interna ---
function smoothContentScrollTo(content, targetY, duration = 700, callback) {
  const startY = content.scrollTop;
  const diff = targetY - startY;
  let start;
  function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    content.scrollTop = startY + diff * easeInOutQuad(percent);
    if (percent < 1) {
      requestAnimationFrame(step);
    } else if (typeof callback === 'function') {
      callback();
    }
  }
  requestAnimationFrame(step);
}

document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const content = document.querySelector('.content');
      const nav = document.querySelector('nav');
      // Busca el destino por id global si no está dentro de .content
      let target = content.querySelector(href);
      if (!target) target = document.querySelector(href);
      if (target) {
        const contentRect = content.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const scrollTop = content.scrollTop;
        const navHeight = nav.offsetHeight;
        const offset =
          targetRect.top - contentRect.top + scrollTop - navHeight - 8;
        smoothContentScrollTo(content, offset, 700, () =>
          animateSection(target)
        );
      }
    }
  });
});

// Lazy loading para imágenes
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
  });
});

// Animaciones de entrada para secciones
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  },
  { threshold: 0.1 }
);
document
  .querySelectorAll('h2, h3, .content > p, .content > ul')
  .forEach((el) => {
    observer.observe(el);
  });

// --- Menú hamburguesa para móvil ---
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');
if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    menuToggle.setAttribute(
      'aria-label',
      navList.classList.contains('open') ? 'Close menu' : 'Open menu'
    );
  });
  // Cierra el menú al hacer click en un enlace o el botón de modo
  navList.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('click', () => {
      navList.classList.remove('open');
      menuToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

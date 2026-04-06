const elements = {
  body: document.body,
  themeBtn: document.getElementById('toggle-theme'),
  themeBtnIcon: document.querySelector('#toggle-theme .material-symbols-outlined'),
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

document.addEventListener('DOMContentLoaded', () => {
  if (!elements.body) return;
  initTheme();
});

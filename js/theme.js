const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

const THEME_KEY = 'atlas-theme';
const DENSITY_KEY = 'atlas-density';
const VALID_THEMES = ['auto', 'light', 'dark'];
const VALID_DENSITIES = ['normal', 'compact'];

// Безопасная работа с localStorage
function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* Игнорируем ошибки доступа */ }
}

// Применение темы
function applyTheme(choice) {
  if (!VALID_THEMES.includes(choice)) choice = 'auto';
  if (choice === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.dataset.theme = choice;
  }
  if (themeSelect) themeSelect.value = choice;
}

// Применение плотности
function applyDensity(choice) {
  if (!VALID_DENSITIES.includes(choice)) choice = 'normal';
  if (choice === 'compact') {
    root.dataset.density = 'compact';
  } else {
    root.removeAttribute('data-density');
  }
  if (densitySelect) densitySelect.value = choice;
}

// Инициализация при загрузке
const storedTheme = safeGet(THEME_KEY);
applyTheme(VALID_THEMES.includes(storedTheme) ? storedTheme : 'auto');

const storedDensity = safeGet(DENSITY_KEY);
applyDensity(VALID_DENSITIES.includes(storedDensity) ? storedDensity : 'normal');

// Обработчики событий
themeSelect?.addEventListener('change', (e) => {
  applyTheme(e.target.value);
  safeSet(THEME_KEY, e.target.value);
});

densitySelect?.addEventListener('change', (e) => {
  applyDensity(e.target.value);
  safeSet(DENSITY_KEY, e.target.value);
});

// Демонстрация работы кнопки
demoAction?.addEventListener('click', () => {
  if (demoFeedback) {
    demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
  }
});
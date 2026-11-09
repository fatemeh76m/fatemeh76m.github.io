(() => {
  const toggle = document.getElementById('language-toggle');
  const year = document.getElementById('year');
  const applyLanguage = (language) => {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-it]').forEach((element) => {
      element.innerHTML = element.dataset[language];
    });
    toggle.innerHTML = language === 'en' ? 'IT <span>↗</span>' : 'EN <span>↗</span>';
    toggle.setAttribute('aria-label', language === 'en' ? 'Switch to Italian' : 'Passa all’inglese');
    try { localStorage.setItem('portfolio-language', language); } catch (_) { /* local preview may block storage */ }
  };
  let language = 'en';
  try { language = localStorage.getItem('portfolio-language') || 'en'; } catch (_) { /* use English by default */ }
  applyLanguage(language === 'it' ? 'it' : 'en');
  toggle.addEventListener('click', () => applyLanguage(document.documentElement.lang === 'en' ? 'it' : 'en'));
  year.textContent = new Date().getFullYear();
})();

(() => {
  const toggle = document.getElementById('language-toggle');
  const year = document.getElementById('year');
  const copyEmail = document.getElementById('copy-email');
  const copyStatus = document.getElementById('copy-status');
  const emailAction = document.getElementById('email-action');
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
  copyEmail.addEventListener('click', async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(copyEmail.dataset.email);
      copied = true;
    } catch (_) {
      const fallback = document.createElement('textarea');
      fallback.value = copyEmail.dataset.email;
      fallback.setAttribute('readonly', '');
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      copied = document.execCommand('copy');
      fallback.remove();
    }
    const italian = document.documentElement.lang === 'it';
    copyStatus.textContent = copied
      ? (italian ? 'Indirizzo email copiato negli appunti.' : 'Email address copied to clipboard.')
      : (italian ? 'Copia questo indirizzo: ' + copyEmail.dataset.email : 'Copy this address: ' + copyEmail.dataset.email);
    emailAction.textContent = copied ? (italian ? 'Copiato ✓' : 'Copied ✓') : (italian ? 'Seleziona ↗' : 'Select ↗');
  });
  year.textContent = new Date().getFullYear();
})();

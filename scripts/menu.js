document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burgerBtn');
  const closeBtn = document.getElementById('closeMenuBtn');
  const menu = document.getElementById('menu');

  burgerBtn.addEventListener('click', () => {
    menu.classList.add('open');
    menu.removeAttribute('hidden');
    burgerBtn.setAttribute('aria-expanded', 'true');
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('open');
    menu.setAttribute('hidden', '');
    burgerBtn.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeBtn.click();
    }
  });
});
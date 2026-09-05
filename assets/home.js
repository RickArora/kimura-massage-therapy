(() => {
  const root = document.querySelector('#kimura-homepage');
  if (!root) return;
  const options = root.querySelector('.km-segments');
  const link = root.querySelector('#home-book-link');
  if (!options || !link) return;
  options.hidden = false;
  options.querySelectorAll('[data-visit]').forEach(button => {
    button.addEventListener('click', () => {
      const first = button.dataset.visit === 'first';
      options.querySelectorAll('button').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
      root.querySelector('#km-rate').textContent = first ? '$109' : '$120';
      root.querySelector('#km-rate-context').textContent = first ? 'New client offer · Regular $120' : 'Returning client · Regular rate';
      root.querySelector('#km-main-label').textContent = first ? 'Book your first visit' : 'Book your next visit';
      root.querySelector('#km-inclusions').textContent = first ? 'Assessment & personalized care · Optional cupping · Hot towels' : 'Personalized care · Treatment adapted to your progress';
      link.href = first ? 'https://kimuramassage.noterro.com/book-online/service/314303/Initial-Appointment-first-time-clients-only' : 'https://kimuramassage.noterro.com/book-online/service/314304/Follow-up-Appointment';
      link.dataset.cta = first ? 'home_hero_first_visit' : 'home_hero_returning';
    });
  });
})();

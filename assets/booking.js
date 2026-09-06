(() => {
  'use strict';
  const destinations = {
    first: 'https://kimuramassage.noterro.com/book-online/service/314303/Initial-Appointment-first-time-clients-only',
    return: 'https://kimuramassage.noterro.com/book-online/service/314304/Follow-up-Appointment'
  };
  let selected = 'first';
  try { if (sessionStorage.getItem('kimura-visit') === 'return') selected = 'return'; } catch (_) {}
  if (document.querySelector('[data-first-visit-page]')) selected = 'first';
  function render(visit) {
    selected = visit === 'return' ? 'return' : 'first';
    const first = selected === 'first';
    try { sessionStorage.setItem('kimura-visit', selected); } catch (_) {}
    document.querySelectorAll('[data-visit]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.visit === selected)));
    const fields = {'#km-rate': first ? '$109' : '$120', '#km-rate-context': first ? 'First visit · Regular $120 + HST' : 'Returning client · Regular rate', '#km-inclusions': first ? 'Assessment + personalized treatment' : 'Treatment adapted to your progress'};
    Object.entries(fields).forEach(([selector, value]) => { const field = document.querySelector(selector); if (field) field.textContent = value; });
    document.querySelectorAll('[data-booking-choice]').forEach(link => {
      const placement = link.dataset.bookingChoice;
      link.href = destinations[selected];
      link.dataset.cta = `${placement}_${first ? 'first_visit' : 'returning'}`;
      const label = link.querySelector('[data-booking-label], #km-main-label');
      const text = first ? 'First-visit times' : 'Returning-visit times';
      if (label) label.textContent = text;
      else link.textContent = text + ' ↗';
      link.setAttribute('aria-label', `${text} — ${first ? 'first visit' : 'returning visit'}`);
    });
    document.querySelectorAll('[data-visit-summary]').forEach(field => field.textContent = first ? 'First 60 min · $109 + HST' : 'Returning 60 min · $120 + HST');
  }
  document.querySelectorAll('.km-segments').forEach(options => options.hidden = false);
  document.querySelectorAll('[data-visit]').forEach(button => button.addEventListener('click', () => render(button.dataset.visit)));
  render(selected);
})();

(() => {
  'use strict';
  const mobile = document.querySelector('.site-mobile-menu');
  const services = document.querySelector('.site-service-menu');
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    for (const menu of [mobile, services]) {
      if (menu?.open) { menu.open = false; menu.querySelector('summary').focus(); }
    }
  });
  document.addEventListener('click', event => {
    for (const menu of [mobile, services]) {
      if (menu?.open && (!menu.contains(event.target) || event.target.closest('a'))) menu.open = false;
    }
  });
  const dock = document.querySelector('.booking-dock');
  const primary = document.querySelector('#home-book-link, .page-hero-actions a[href*="Initial-Appointment"], .hero-cta-group a[href*="Initial-Appointment"]');
  if (dock && primary && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => dock.classList.toggle('dock-hidden', entries[0].isIntersecting), {threshold: .15}).observe(primary);
  }
  window.toggleFaq = button => {
    const item = button.closest('.faq-item');
    if (!item) return;
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  };
  const query = document.querySelector('#guide-search');
  if (query) {
    const status = document.querySelector('#guide-search-status');
    const items = [...document.querySelectorAll('.blog-card, .seo-link-list > li')];
    const sections = [...document.querySelectorAll('.blog-listing, .content-section')].filter(section => section.querySelector('.blog-card, .seo-link-list'));
    const normalized = text => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const searchable = items.map(item => ({item, text: normalized(item.textContent)}));
    query.addEventListener('input', () => {
      const words = normalized(query.value.trim()).split(/\s+/).filter(Boolean);
      let count = 0;
      searchable.forEach(({item, text}) => { item.hidden = !words.every(word => text.includes(word)); if (!item.hidden) count++; });
      sections.forEach(section => { section.hidden = ![...section.querySelectorAll('.blog-card, .seo-link-list > li')].some(item => !item.hidden); });
      status.textContent = words.length ? `${count} matching guide${count === 1 ? '' : 's'}${count ? '' : '. Try a shorter topic or occupation.'}` : 'Browse by topic below, or search for a specific concern or occupation.';
    });
  }
})();

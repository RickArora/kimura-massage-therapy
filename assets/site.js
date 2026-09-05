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
  document.addEventListener('focusin', event => { if (dock && event.target.matches('input, textarea, select')) dock.classList.add('dock-keyboard'); });
  document.addEventListener('focusout', () => dock?.classList.remove('dock-keyboard'));
  const primary = document.querySelector('#home-book-link, [data-booking-choice="service"], .page-hero-actions a[href*="Initial-Appointment"], .hero-cta-group a[href*="Initial-Appointment"]');
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
    const categoryBar = document.querySelector('.guide-categories');
    if (categoryBar) categoryBar.hidden = false;
    const normalized = text => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const patterns = {pain: /tight|pain|posture|deep.tissue|swedish/, training: /sport|training|running|gym|exercise|stretch|recovery/, first: /first.visit|first.rmt|first.massage|what.to.expect|choosing|deep.tissue.vs/, insurance: /insurance|benefit|billing|cost|price/};
    let category = 'all';
    const sections = [...document.querySelectorAll('.blog-listing, .content-section')].filter(section => section.querySelector('.blog-card, .seo-link-list'));
    const groups = sections.map(section => {
      const items = [...section.querySelectorAll('.blog-card, .seo-link-list > li')].map(item => ({item, text: normalized(item.textContent + ' ' + (item.querySelector('a')?.getAttribute('href') || ''))}));
      const more = document.createElement('button');
      more.type = 'button'; more.className = 'guide-more'; more.hidden = true;
      const group = {section, items, more, limit: 12, details: section.querySelector('.guide-library')};
      (group.details || section.querySelector('.container') || section).append(more);
      more.addEventListener('click', () => { group.limit += 24; apply(); });
      return group;
    });
    function apply() {
      const words = normalized(query.value.trim()).split(/\s+/).filter(Boolean);
      const filtering = words.length > 0 || category !== 'all';
      let total = 0;
      groups.forEach(group => {
        let matches = 0;
        group.items.forEach(({item, text}) => {
          const topicMatch = category === 'all' || (patterns[category].test(text) && !(category === 'training' && /work-recovery-guide/.test(text)));
          const match = topicMatch && words.every(word => text.includes(word));
          if (match) matches++;
          item.hidden = !match || matches > group.limit;
        });
        total += matches;
        group.section.hidden = matches === 0;
        if (group.details && filtering) group.details.open = matches > 0;
        group.more.hidden = matches <= group.limit;
        group.more.textContent = `Show more guides (${Math.max(0, matches - group.limit)} more)`;
      });
      status.textContent = filtering ? `${total} matching guide${total === 1 ? '' : 's'}${total ? '. Results grouped below.' : '. Try another topic or clear filters.'}` : 'Start with a topic, search, or open a guide collection below.';
      categoryBar?.querySelectorAll('[data-guide-category]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.guideCategory === category)));
    }
    function resetLimits() { groups.forEach(group => { group.limit = 12; if (group.details) group.details.open = false; }); }
    query.addEventListener('input', () => { resetLimits(); apply(); });
    categoryBar?.querySelectorAll('[data-guide-category]').forEach(button => button.addEventListener('click', () => { category = button.dataset.guideCategory; resetLimits(); apply(); }));
    document.querySelector('#guide-reset')?.addEventListener('click', () => { query.value = ''; category = 'all'; resetLimits(); apply(); query.focus(); });
    apply();
  }
})();

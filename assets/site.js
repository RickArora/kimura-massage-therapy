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
  // Track all prominent in-page booking controls, excluding navigation and the dock itself.
  const prominent = [...document.querySelectorAll('main a[href*="kimuramassage.noterro.com"]')].filter(link => link.matches('.km-action, .btn-primary, .btn-white, .site-button'));
  if (dock && prominent.length && 'IntersectionObserver' in window) {
    const visible = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= .5) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      dock.classList.toggle('dock-hidden', visible.size > 0);
    }, {threshold: [0, .5, 1], rootMargin: '-85px 0px -82px 0px'});
    prominent.forEach(link => observer.observe(link));
  }
  function revealAnswer(hash, focus = false) {
    if (!hash) return;
    let id; try { id = decodeURIComponent(hash.slice(1)); } catch (_) { return; }
    const answer = document.getElementById(id);
    if (answer?.matches('details')) {
      answer.open = true;
      if (focus) answer.querySelector('summary')?.focus({preventScroll: true});
    }
  }
  document.querySelectorAll('a[data-open-details]').forEach(link => link.addEventListener('click', () => revealAnswer(link.hash, true)));
  window.addEventListener('hashchange', () => revealAnswer(window.location.hash, true));
  revealAnswer(window.location.hash);
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

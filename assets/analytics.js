(function () {
  var measurementId = 'G-MTQK49YP14';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(tag);

  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  function sendEvent(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, Object.assign({
      event_category: 'conversion',
      page_path: window.location.pathname
    }, params || {}));
  }

  window.trackCTA = function (label) {
    sendEvent('cta_click', { event_label: label || 'cta' });
  };

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var label = (link.getAttribute('aria-label') || link.textContent || '').trim().replace(/\s+/g, ' ');

    if (href.indexOf('tel:9052266336') === 0) {
      sendEvent('call_click', {
        event_label: label || 'phone',
        link_url: href
      });
      return;
    }

    if (href.indexOf('https://wa.me/16472873777') === 0) {
      sendEvent('whatsapp_click', {
        event_label: label || 'whatsapp',
        link_url: href
      });
      return;
    }

    if (href.indexOf('https://kimuramassage.noterro.com') === 0) {
      sendEvent('book_online_click', {
        event_label: label || 'book_online',
        link_url: href
      });
    }
  });
})();

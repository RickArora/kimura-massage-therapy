(function () {
  var measurementId = 'G-MTQK49YP14';
  var adsId = 'AW-18223992858';
  var adsConversionSendTo = 'AW-18223992858/dum6CLTV-8YcEJqg8PFD';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  var hasGoogleTag = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
  var hasAdsTag = document.querySelector('script[src*="googletagmanager.com/gtag/js?id=' + adsId + '"]');
  if (!hasGoogleTag) {
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(tag);
    window.gtag('js', new Date());
  }

  window.gtag('config', measurementId);
  if (!hasAdsTag) {
    window.gtag('config', adsId);
  }

  function sendEvent(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, Object.assign({
      event_category: 'conversion',
      transport_type: 'beacon',
      page_path: window.location.pathname
    }, params || {}));
  }

  function sendAdsConversion(label, linkUrl) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', {
      send_to: adsConversionSendTo,
      event_label: label || 'contact',
      link_url: linkUrl || '',
      transport_type: 'beacon',
      page_path: window.location.pathname
    });
  }

  function trackBookOnline(label, linkUrl) {
    sendEvent('book_online', {
      event_label: label || 'book_online',
      link_url: linkUrl || '',
      booking_provider: 'noterro'
    });
    sendEvent('book_online_click', {
      event_label: label || 'book_online',
      link_url: linkUrl || '',
      booking_provider: 'noterro'
    });
    sendEvent('generate_lead', {
      event_label: label || 'book_online',
      link_url: linkUrl || '',
      method: 'noterro'
    });
    sendAdsConversion(label || 'book_online', linkUrl || '');
  }

  window.trackCTA = function (label) {
    sendEvent('cta_click', { event_label: label || 'cta' });
  };

  window.trackBookOnline = trackBookOnline;

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
      sendAdsConversion(label || 'phone', href);
      return;
    }

    if (href.indexOf('https://wa.me/16472873777') === 0) {
      sendEvent('whatsapp_click', {
        event_label: label || 'whatsapp',
        link_url: href
      });
      sendAdsConversion(label || 'whatsapp', href);
      return;
    }

    if (href.indexOf('https://kimuramassage.noterro.com') === 0) {
      trackBookOnline(label || 'book_online', href);
    }
  });
})();

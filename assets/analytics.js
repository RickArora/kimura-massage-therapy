(function () {
  'use strict';
  var measurementId = 'G-MTQK49YP14';
  var adsId = 'AW-18223992858';
  // Existing Ads action measures clicks, NOT confirmed appointments. Retain it
  // until the account can use a verified booking/offline conversion integration.
  var legacyClickAction = 'AW-18223992858/dum6CLTV-8YcEJqg8PFD';
  var productionHosts = ['kimuramassage.com', 'www.kimuramassage.com', 'rickarora.github.io'];
  var isProduction = productionHosts.indexOf(window.location.hostname) !== -1;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  if (isProduction) {
    if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      var tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
      document.head.appendChild(tag);
      window.gtag('js', new Date());
    }
    [measurementId, adsId].forEach(function (id) {
      if (!window.dataLayer.some(function (item) { return item && item[0] === 'config' && item[1] === id; })) window.gtag('config', id);
    });
  }
  function sendEvent(name, params) {
    if (!isProduction) return;
    window.gtag('event', name, Object.assign({event_category: 'booking_intent', transport_type: 'beacon', page_path: window.location.pathname}, params || {}));
  }
  function legacyAdsClick(label, href) {
    sendEvent('conversion', {send_to: legacyClickAction, event_label: label, link_url: href, conversion_stage: 'link_click'});
  }
  function trackBooking(label, href, placement) {
    var visit = href.indexOf('/314303/') !== -1 ? 'first_visit' : href.indexOf('/314304/') !== -1 ? 'returning_visit' : 'unspecified';
    sendEvent('book_online_click', {event_label: label, cta_location: placement || label, link_url: href, booking_provider: 'noterro', visit_type: visit, conversion_stage: 'link_click'});
    legacyAdsClick('booking_link_click', href);
  }
  // Compatibility for older campaign pages; a click is not a lead or booking.
  window.trackCTA = function (label) { sendEvent('cta_click', {event_label: label || 'cta'}); };
  window.trackBookOnline = function (label, href) { trackBooking(label || 'booking_link', href || '', label); };
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.js-year').forEach(function (node) { node.textContent = String(new Date().getFullYear()); });
  });
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var href = link.href || link.getAttribute('href') || '';
    var container = link.closest('header, footer, aside, section, .booking-dock');
    var placement = link.getAttribute('data-cta') || (container && (container.id || container.className || container.tagName.toLowerCase())) || 'page_link';
    var label = link.getAttribute('data-cta') || (link.getAttribute('aria-label') || link.textContent || '').trim().replace(/\s+/g, ' ');
    if (/^tel:/.test(href)) {
      sendEvent('call_click', {event_label: label, cta_location: placement, conversion_stage: 'link_click'});
      legacyAdsClick('phone_link_click', href);
      return;
    }
    try {
      if (new URL(href, window.location.href).hostname === 'kimuramassage.noterro.com') trackBooking(label, href, placement);
    } catch (_) { /* Non-URL links do not represent booking intent. */ }
  });
})();

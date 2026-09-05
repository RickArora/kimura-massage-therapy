export const initialBooking = 'https://kimuramassage.noterro.com/book-online/service/314303/Initial-Appointment-first-time-clients-only';
export const returningBooking = 'https://kimuramassage.noterro.com/book-online/service/314304/Follow-up-Appointment';
export const release = '20260905';

export function siteHeader(prefix = './') {
  return `<header class="site-header">
  <nav class="site-nav container" aria-label="Main navigation">
    <a class="site-brand" href="${prefix}">Kimura Massage<span>Therapy &amp; Rehab · Brampton RMT</span></a>
    <div class="site-nav-links">
      <details class="site-service-menu"><summary>Our care</summary><div><a href="${prefix}swedish-massage-brampton.html">Swedish massage</a><a href="${prefix}deep-tissue-massage-brampton.html">Deep tissue massage</a><a href="${prefix}sports-massage-brampton.html">Sports massage</a></div></details>
      <a href="${prefix}#prices">Prices</a><a href="${prefix}#about">Meet Ricky</a><a href="${prefix}blog/">Guides</a>
    </div>
    <div class="site-nav-booking"><a class="site-return" href="${returningBooking}" data-cta="header_returning">Returning client?</a><a class="site-button" href="${initialBooking}" data-cta="header_first_visit">Book first visit <span aria-hidden="true">↗</span></a></div>
    <details class="site-mobile-menu"><summary>Menu <span aria-hidden="true">☰</span></summary><nav aria-label="Mobile navigation"><a href="${prefix}#services">Our care</a><a href="${prefix}#prices">Prices</a><a href="${prefix}#about">Meet Ricky</a><a href="${prefix}#faq">First-visit questions</a><a href="${prefix}blog/">Health &amp; recovery guides</a><a href="${prefix}intro-offer.html">$109 + HST first visit</a><a href="${initialBooking}" data-cta="mobile_menu_first_visit">Book your first visit ↗</a><a href="${returningBooking}" data-cta="mobile_menu_returning">Book a returning visit ↗</a><a href="tel:9052266336">Call (905) 226-6336</a></nav></details>
  </nav>
</header>`;
}

export function siteFooter(prefix = './') {
  return `<footer class="site-footer"><div class="container site-footer-grid"><div><a class="site-brand" href="${prefix}">Kimura Massage<span>Therapy &amp; Rehab · Brampton RMT</span></a><p>Care with Ricky Arora, RMT.<br>14 Block Road, Brampton, ON L7A 5B2<br>Open daily, 9AM–9PM · By appointment</p><a href="tel:9052266336">(905) 226-6336</a></div><div><h2>Plan your visit</h2><a href="${prefix}intro-offer.html">First visit · $109 + HST</a><a href="${prefix}#prices">Appointment prices</a><a href="${prefix}#insurance">Direct billing</a><a href="${prefix}#book">Location &amp; parking</a><a href="${prefix}policies.html">Policies &amp; privacy</a></div><div><h2>Explore our care</h2><a href="${prefix}swedish-massage-brampton.html">Swedish massage</a><a href="${prefix}deep-tissue-massage-brampton.html">Deep tissue massage</a><a href="${prefix}sports-massage-brampton.html">Sports massage</a><a href="${prefix}blog/">Health &amp; recovery guides</a><a href="${returningBooking}" data-cta="footer_returning">Returning client booking ↗</a></div></div><div class="container site-footer-bottom"><span>© <span class="js-year">2026</span> Kimura Massage Therapy &amp; Rehab</span><div><a href="${prefix}massage-therapy-northwest-brampton.html">Northwest Brampton</a><a href="${prefix}massage-therapy-mississauga.html">Mississauga</a><a href="${prefix}massage-therapy-caledon.html">Caledon</a></div></div></footer>`;
}

export function bookingDock() {
  return `<div class="booking-dock" aria-label="Quick booking"><a href="tel:9052266336" class="dock-call" data-cta="mobile_call">Call</a><a class="site-button" href="${initialBooking}" data-cta="mobile_first_visit">First visit · $109 + HST <span aria-hidden="true">↗</span></a></div>`;
}

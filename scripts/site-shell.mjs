export const initialBooking = 'https://kimuramassage.noterro.com/book-online/service/314303/Initial-Appointment-first-time-clients-only';
export const returningBooking = 'https://kimuramassage.noterro.com/book-online/service/314304/Follow-up-Appointment';
export const release = '20260905-mobile2';

export function siteHeader(prefix = './') {
  return `<header class="site-header">
  <nav class="site-nav container" aria-label="Main navigation">
    <a class="site-brand" href="${prefix}">Kimura Massage<span>Therapy &amp; Rehab · Brampton RMT</span></a>
    <div class="site-nav-links">
      <details class="site-service-menu"><summary>Our care</summary><div><a href="${prefix}swedish-massage-brampton.html">Swedish massage</a><a href="${prefix}deep-tissue-massage-brampton.html">Deep tissue massage</a><a href="${prefix}sports-massage-brampton.html">Sports massage</a></div></details>
      <a href="${prefix}#prices">Prices</a><a href="${prefix}#about">Meet Ricky</a><a href="${prefix}blog/">Guides</a>
    </div>
    <div class="site-nav-booking"><a class="site-return" href="${returningBooking}" data-cta="header_returning">Returning client?</a><a class="site-button" href="${initialBooking}" data-booking-choice="header" data-cta="header_first_visit"><span data-booking-label>See available appointments</span> <span aria-hidden="true">↗</span></a></div>
    <a class="site-mobile-prices" href="${prefix}#prices">Prices</a><details class="site-mobile-menu"><summary>Menu <span aria-hidden="true">☰</span></summary><nav aria-label="Mobile navigation"><a class="site-menu-book" data-booking-choice="menu" href="${initialBooking}" data-cta="mobile_menu_first_visit"><span data-booking-label>See available appointments</span> ↗</a><a href="${prefix}#services">Treatments</a><a href="${prefix}#about">Meet Ricky</a><a href="${prefix}#book">Location &amp; parking</a><a href="${prefix}#faq">First-visit questions</a><a href="${prefix}blog/">Health &amp; recovery guides</a><a href="${returningBooking}" data-cta="mobile_menu_returning">Returning appointments ↗</a><a href="tel:9052266336">Call (905) 226-6336</a></nav></details>
  </nav>
</header>`;
}

export function siteFooter(prefix = './') {
  return `<footer class="site-footer"><div class="container site-footer-grid"><div><a class="site-brand" href="${prefix}">Kimura Massage<span>Therapy &amp; Rehab · Brampton RMT</span></a><p>Care with Ricky Arora, RMT.<br>14 Block Road, Brampton, ON L7A 5B2<br>Open daily, 9AM–9PM · By appointment</p><a href="tel:9052266336">(905) 226-6336</a></div><div><h2>Plan your visit</h2><a href="${prefix}intro-offer.html">First visit · $109 + HST</a><a href="${prefix}#prices">Appointment prices</a><a href="${prefix}#insurance">Direct billing</a><a href="${prefix}#book">Location &amp; parking</a><a href="${prefix}policies.html">Policies &amp; privacy</a></div><div><h2>Explore our care</h2><a href="${prefix}swedish-massage-brampton.html">Swedish massage</a><a href="${prefix}deep-tissue-massage-brampton.html">Deep tissue massage</a><a href="${prefix}sports-massage-brampton.html">Sports massage</a><a href="${prefix}blog/">Health &amp; recovery guides</a><a href="${returningBooking}" data-cta="footer_returning">Returning client booking ↗</a></div></div><div class="container site-footer-bottom"><span>© <span class="js-year">2026</span> Kimura Massage Therapy &amp; Rehab</span><div><a href="${prefix}massage-therapy-northwest-brampton.html">Northwest Brampton</a><a href="${prefix}massage-therapy-mississauga.html">Mississauga</a><a href="${prefix}massage-therapy-caledon.html">Caledon</a></div></div></footer>`;
}

export function bookingDock() {
  return `<div class="booking-dock" aria-label="Quick booking"><a href="tel:9052266336" class="dock-call" data-cta="mobile_call">Call</a><a class="site-button" href="${initialBooking}" data-booking-choice="dock" data-cta="mobile_first_visit"><span><strong data-booking-label>See available times</strong><small data-visit-summary>First visit · $109 + HST</small></span><span aria-hidden="true">↗</span></a></div>`;
}

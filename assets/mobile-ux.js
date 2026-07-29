(function () {
  var mobileNav = document.getElementById('mobileNav');
  var hamburger = document.getElementById('hamburger');
  var closeButton = document.getElementById('mobileNavClose');
  var mobileCta = document.querySelector('.site-mobile-cta');
  var previousFocus = null;

  function navIsOpen() {
    return mobileNav && mobileNav.classList.contains('open');
  }

  function getNavFocusables() {
    if (!mobileNav) return [];
    return Array.prototype.slice.call(
      mobileNav.querySelectorAll('a[href], button:not([disabled])')
    );
  }

  function openMobileNav() {
    if (!mobileNav || !hamburger) return;
    previousFocus = document.activeElement;
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-nav-open');
    if (closeButton) closeButton.focus();
  }

  function closeMobileNav(options) {
    if (!mobileNav || !hamburger) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-open');
    if ((!options || options.restoreFocus !== false) && previousFocus && previousFocus.focus) {
      previousFocus.focus();
    }
  }

  if (mobileNav && hamburger) {
    hamburger.addEventListener('click', openMobileNav);
    if (closeButton) closeButton.addEventListener('click', function () {
      closeMobileNav();
    });
    mobileNav.addEventListener('click', function (event) {
      if (event.target === mobileNav) closeMobileNav();
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileNav({ restoreFocus: false });
      });
    });

    document.addEventListener('keydown', function (event) {
      if (!navIsOpen()) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobileNav();
        return;
      }

      if (event.key !== 'Tab') return;
      var focusables = getNavFocusables();
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.closeMobileNav = closeMobileNav;
  }

  if (mobileCta) {
    var heroCta = document.querySelector(
      '.hero-actions .btn-primary, .page-hero-actions .btn-primary'
    );

    function setMobileCtaVisible(visible) {
      mobileCta.classList.toggle('is-visible', visible);
    }

    if (heroCta && window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        setMobileCtaVisible(!entries[0].isIntersecting);
      }, { threshold: 0.2 }).observe(heroCta);
    } else {
      setMobileCtaVisible(true);
    }
  }
})();

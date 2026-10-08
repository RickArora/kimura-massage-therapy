(() => {
  'use strict';

  const dismissedKey = 'kimura-booking-popup-dismissed';
  const bookingUrl = 'https://kimuramassage.noterro.com/book-online/service/314303/Initial-Appointment-first-time-clients-only';
  let previousFocus = null;
  let shown = false;

  try {
    if (sessionStorage.getItem(dismissedKey)) return;
  } catch (_) {}
  if (/intro-offer/.test(window.location.pathname)) return;

  const css = `
    .ip-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(8,15,28,.76);backdrop-filter:blur(4px);animation:ip-fade .2s ease}
    .ip-modal{position:relative;width:min(100%,440px);max-height:calc(100dvh - 32px);overflow:auto;padding:32px 26px calc(26px + env(safe-area-inset-bottom));border-radius:16px;background:#14283f;color:#fff;box-shadow:0 24px 80px rgba(0,0,0,.48);animation:ip-rise .24s ease}
    .ip-close{position:absolute;top:10px;right:10px;width:44px;height:44px;border:1px solid rgba(255,255,255,.22);border-radius:9px;background:rgba(255,255,255,.08);color:#fff;font-size:21px;cursor:pointer}
    .ip-kicker{display:block;margin:0 48px 10px 0;color:#ff8a3d;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
    .ip-title{margin:0;font-family:"Oswald",sans-serif;font-size:clamp(28px,7vw,38px);font-weight:600;line-height:1.08;letter-spacing:.01em;text-transform:uppercase}
    .ip-copy{margin:12px 0 18px;color:#d8e2ec;font-size:15px;line-height:1.55}
    .ip-offer{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:16px;padding:15px 0;border-block:1px solid rgba(255,255,255,.14)}
    .ip-offer strong{display:block;font-family:"Oswald",sans-serif;font-size:38px;line-height:1}.ip-offer strong small{font-family:"DM Sans",sans-serif;font-size:12px;font-weight:500}.ip-offer span{color:#cbd7e2;font-size:13px;line-height:1.45;text-align:right}
    .ip-proof{display:grid;gap:8px;margin:0 0 20px;padding:0;list-style:none;color:#e7edf3;font-size:14px}.ip-proof li{display:flex;gap:9px}.ip-proof li::before{content:"✓";color:#ff8a3d;font-weight:800}
    .ip-cta{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:56px;padding:14px 18px;border:0;border-radius:8px;background:#c94d00;color:#fff;font-size:17px;font-weight:800;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.2)}
    .ip-cta:hover{background:#e15b08}.ip-cta:focus-visible,.ip-close:focus-visible,.ip-dismiss:focus-visible{outline:3px solid #fff;outline-offset:3px}
    .ip-reassure{margin:10px 0 0;color:#cbd7e2;font-size:12px;line-height:1.5;text-align:center}
    .ip-dismiss{display:block;width:100%;min-height:44px;margin-top:4px;border:0;background:transparent;color:#d8e2ec;font-size:13px;text-decoration:underline;text-underline-offset:3px;cursor:pointer}
    @keyframes ip-fade{from{opacity:0}to{opacity:1}}@keyframes ip-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
    @media(max-width:640px){.ip-overlay{align-items:flex-end;padding:0}.ip-modal{width:100%;max-height:calc(100dvh - 12px);padding:26px 20px calc(20px + env(safe-area-inset-bottom));border-radius:18px 18px 0 0}.ip-title{font-size:30px}.ip-copy{font-size:15px}.ip-offer strong{font-size:34px}}
    @media(prefers-reduced-motion:reduce){.ip-overlay,.ip-modal{animation:none}}
  `;

  const html = `
    <div class="ip-overlay" id="introPopupOverlay" role="dialog" aria-modal="true" aria-labelledby="ipTitle" aria-describedby="ipDescription">
      <div class="ip-modal" tabindex="-1">
        <button class="ip-close" type="button" aria-label="Close booking offer">×</button>
        <span class="ip-kicker">New client offer · Brampton RMT</span>
        <h2 class="ip-title" id="ipTitle">Start with your first visit.</h2>
        <p class="ip-copy" id="ipDescription">Start with a 60-minute RMT visit tailored to what feels tight, sore, or overworked.</p>
        <div class="ip-offer"><strong>$109 <small>+ HST</small></strong><span>First 60-minute visit<br><s>$120 + HST regular</s></span></div>
        <ul class="ip-proof">
          <li>Assessment and treatment within the booked 60 minutes</li>
          <li>Direct billing available for many plans</li>
          <li>Private room and free street parking</li>
        </ul>
        <a href="${bookingUrl}" class="ip-cta" data-cta="popup_book_first_visit"><span>Book first visit</span><span aria-hidden="true">→</span></a>
        <p class="ip-reassure">Choose your appointment length, then see available times</p>
        <button class="ip-dismiss" type="button">Not now</button>
      </div>
    </div>`;

  function rememberDismissal() {
    try { sessionStorage.setItem(dismissedKey, '1'); } catch (_) {}
  }

  function dismiss() {
    const overlay = document.getElementById('introPopupOverlay');
    if (!overlay) return;
    rememberDismissal();
    overlay.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeydown);
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  }

  function handleKeydown(event) {
    const overlay = document.getElementById('introPopupOverlay');
    if (!overlay) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      dismiss();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...overlay.querySelectorAll('a[href],button:not([disabled])')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function show() {
    if (shown || document.getElementById('introPopupOverlay')) return;
    try { if (sessionStorage.getItem(dismissedKey)) return; } catch (_) {}
    shown = true;
    previousFocus = document.activeElement;
    if (!document.getElementById('introPopupStyles')) {
      const style = document.createElement('style');
      style.id = 'introPopupStyles';
      style.textContent = css;
      document.head.appendChild(style);
    }
    document.body.insertAdjacentHTML('beforeend', html);
    document.body.style.overflow = 'hidden';
    const overlay = document.getElementById('introPopupOverlay');
    overlay.querySelector('.ip-close').addEventListener('click', dismiss);
    overlay.querySelector('.ip-dismiss').addEventListener('click', dismiss);
    overlay.querySelector('.ip-cta').addEventListener('click', rememberDismissal);
    overlay.addEventListener('click', event => { if (event.target === overlay) dismiss(); });
    document.addEventListener('keydown', handleKeydown);
    overlay.querySelector('.ip-cta').focus();
  }

  const timer = window.setTimeout(show, 6000);
  window.addEventListener('scroll', function onScroll() {
    const pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    if ((window.scrollY + window.innerHeight) / pageHeight >= 0.4) {
      window.clearTimeout(timer);
      show();
      window.removeEventListener('scroll', onScroll);
    }
  }, {passive: true});

  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mouseleave', function onExit(event) {
      if (event.clientY <= 0) {
        window.clearTimeout(timer);
        show();
        document.removeEventListener('mouseleave', onExit);
      }
    });
  }
})();

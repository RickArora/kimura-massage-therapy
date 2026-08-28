(function(){
  if(sessionStorage.getItem('introDismissed')) return;
  if (/intro-offer/.test(window.location.pathname)) return;

  var offerUrl = 'https://kimuramassage.noterro.com/book-online/practitioner/1594190/Ricky-Arora';
  var offerInfoUrl = 'intro-offer.html';
  var regularBookingUrl = 'https://kimuramassage.noterro.com/service-category/59418/Appointments';

  var css = [
    '.ip-overlay{position:fixed;inset:0;z-index:9999;background:rgba(8,15,28,.75);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;animation:ipFadeIn .25s ease;}',
    '@keyframes ipFadeIn{from{opacity:0}to{opacity:1}}',
    '.ip-modal{background:#0F2742;border-radius:16px;width:100%;max-width:460px;max-height:calc(100dvh - 32px);overflow-y:auto;padding:36px 28px 32px;position:relative;box-shadow:0 24px 80px rgba(0,0,0,.55);animation:ipSlideUp .28s cubic-bezier(.4,0,.2,1);}',
    '@keyframes ipSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}',
    '.ip-close{position:absolute;top:10px;right:10px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.72);font-size:22px;cursor:pointer;line-height:1;width:44px;height:44px;display:flex;align-items:center;justify-content:center;padding:0;border-radius:8px;}',
    '.ip-close:hover{color:rgba(255,255,255,.7);}',
    '.ip-badge{display:inline-block;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#F97316;margin-bottom:12px;}',
    '.ip-headline{font-family:"Oswald",sans-serif;font-size:clamp(22px,5vw,30px);font-weight:700;color:#fff;line-height:1.1;letter-spacing:.02em;text-transform:uppercase;margin-bottom:8px;}',
    '.ip-sub{font-size:14px;color:rgba(255,255,255,.5);line-height:1.6;margin-bottom:20px;}',
    '.ip-price-row{display:flex;align-items:baseline;gap:10px;margin-bottom:6px;}',
    '.ip-price{font-family:"Oswald",sans-serif;font-size:56px;font-weight:700;color:#fff;line-height:1;letter-spacing:.01em;}',
    '.ip-price sup{font-size:.4em;vertical-align:super;color:#F97316;}',
    '.ip-tax{font-family:"DM Sans",sans-serif;font-size:11px;font-weight:500;color:rgba(255,255,255,.58);text-transform:none;white-space:nowrap;}',
    '.ip-was{font-size:14px;color:rgba(255,255,255,.28);text-decoration:line-through;}',
    '.ip-includes{list-style:none;margin:0 0 22px;padding:0;border-top:1px solid rgba(255,255,255,.08);padding-top:16px;}',
    '.ip-includes li{display:flex;align-items:center;gap:9px;font-size:14px;color:rgba(255,255,255,.7);padding:5px 0;}',
    '.ip-includes li::before{content:"✓";color:#F97316;font-weight:700;font-size:13px;flex-shrink:0;}',
    '.ip-actions{display:grid;gap:10px;}',
    '.ip-cta{display:flex;width:100%;min-height:54px;align-items:center;justify-content:center;text-align:center;background:#C94D00;color:#fff;font-size:16px;font-weight:700;padding:13px 20px;border:2px solid #C94D00;border-radius:8px;text-decoration:none;transition:background .15s,border-color .15s;}',
    '.ip-cta:hover{background:#C44D00;}',
    '.ip-cta-secondary{background:transparent;border-color:rgba(255,255,255,.42);color:#fff;}',
    '.ip-cta-secondary:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.65);}',
    '.ip-full-price{display:flex;align-items:center;justify-content:center;text-align:center;margin-top:8px;font-size:13px;color:rgba(255,255,255,.64);width:100%;min-height:44px;text-decoration:underline;text-underline-offset:3px;}',
    '.ip-full-price:hover{color:#fff;}',
    '@media(max-width:640px){.ip-overlay{align-items:flex-end;padding:0;}.ip-modal{max-width:none;max-height:calc(100dvh - 24px);padding:28px 20px calc(24px + env(safe-area-inset-bottom));border-radius:18px 18px 0 0;}.ip-price{font-size:44px;}}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var html = [
    '<div class="ip-overlay" id="introPopupOverlay" role="dialog" aria-modal="true" aria-labelledby="ipTitle" aria-describedby="ipDescription">',
    '<div class="ip-modal" tabindex="-1">',
    '<button class="ip-close" id="introPopupClose" aria-label="Close offer">✕</button>',
    '<span class="ip-badge">New clients only · Capped at 10 per month</span>',
    '<h2 class="ip-headline" id="ipTitle">Claim Your $109 <span class="ip-tax">+ HST</span><br>First Visit Intro</h2>',
    '<p class="ip-sub" id="ipDescription">60-min RMT massage — cupping + hot towels included. Insurance receipt ready when you walk out.</p>',
    '<div class="ip-price-row">',
    '<span class="ip-price"><sup>$</sup>109 <span class="ip-tax">+ HST</span></span>',
    '<span class="ip-was">$120 + HST reg.</span>',
    '</div>',
    '<ul class="ip-includes">',
    '<li>60-min RMT massage (insurance receipt included)</li>',
    '<li>Cupping therapy — no extra charge</li>',
    '<li>Hot towel treatment</li>',
    '</ul>',
    '<div class="ip-actions">',
    '<a href="'+offerUrl+'" class="ip-cta" id="introPopupCTA">Claim Now →</a>',
    '<a href="'+offerInfoUrl+'" class="ip-cta ip-cta-secondary" id="introPopupInfo">Show Me More Info</a>',
    '</div>',
    '<a href="'+regularBookingUrl+'" class="ip-full-price" id="introPopupFullPrice">No thanks, I\'ll pay full price</a>',
    '</div>',
    '</div>'
  ].join('');

  var previousFocus = null;

  function handleDialogKeydown(e){
    var overlay = document.getElementById('introPopupOverlay');
    if (!overlay) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      dismiss();
      return;
    }
    if (e.key !== 'Tab') return;
    var focusable = Array.prototype.slice.call(
      overlay.querySelectorAll('a[href], button:not([disabled])')
    );
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function dismiss(){
    var overlays = document.querySelectorAll('#introPopupOverlay');
    overlays.forEach(function(overlay){
      overlay.style.opacity='0';
      overlay.style.transition='opacity .2s';
      setTimeout(function(){
        overlay.remove();
        if (previousFocus && previousFocus.focus) previousFocus.focus();
      },200);
    });
    sessionStorage.setItem('introDismissed','1');
    document.body.style.overflow='';
    document.removeEventListener('keydown', handleDialogKeydown);
  }

  function show(){
    if(sessionStorage.getItem('introDismissed')) return;
    if(document.getElementById('introPopupOverlay')) return;
    previousFocus = document.activeElement;
    document.body.insertAdjacentHTML('beforeend', html);
    document.body.style.overflow='hidden';
    document.getElementById('introPopupClose').addEventListener('click', dismiss);
    document.getElementById('introPopupCTA').addEventListener('click', function(){ sessionStorage.setItem('introDismissed','1'); document.body.style.overflow=''; });
    document.getElementById('introPopupInfo').addEventListener('click', function(){ sessionStorage.setItem('introDismissed','1'); document.body.style.overflow=''; });
    document.getElementById('introPopupFullPrice').addEventListener('click', function(){ sessionStorage.setItem('introDismissed','1'); document.body.style.overflow=''; });
    document.getElementById('introPopupOverlay').addEventListener('click', function(e){ if(e.target===this) dismiss(); });
    document.addEventListener('keydown', handleDialogKeydown);
    document.getElementById('introPopupClose').focus();
  }

  // Make the offer visible early even when a visitor does not scroll.
  // Existing session dismissal still prevents repeat interruptions.
  window.setTimeout(show, 3000);

  // Scroll-depth trigger: wait for demonstrated interest before interrupting.
  window.addEventListener('scroll', function onScroll(){
    var pct = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    if (pct > 0.6) {
      show();
      window.removeEventListener('scroll', onScroll);
    }
  }, { passive: true });

  // Exit-intent trigger: mouse leaves viewport toward top (desktop only)
  document.addEventListener('mouseleave', function onExit(e) {
    if (e.clientY <= 0 && !sessionStorage.getItem('introDismissed')) {
      show();
      document.removeEventListener('mouseleave', onExit);
    }
  });
})();

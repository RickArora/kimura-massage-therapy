(function(){
  if(sessionStorage.getItem('introDismissed')) return;

  var isInBlog = window.location.pathname.indexOf('/blog/') !== -1;
  var offerUrl = isInBlog ? '../intro-offer.html' : 'intro-offer.html';

  var css = [
    '.ip-overlay{position:fixed;inset:0;z-index:9999;background:rgba(8,15,28,.75);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;animation:ipFadeIn .25s ease;}',
    '@keyframes ipFadeIn{from{opacity:0}to{opacity:1}}',
    '.ip-modal{background:#0F2742;border-radius:16px;width:100%;max-width:460px;padding:36px 28px 32px;position:relative;box-shadow:0 24px 80px rgba(0,0,0,.55);animation:ipSlideUp .28s cubic-bezier(.4,0,.2,1);}',
    '@keyframes ipSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}',
    '.ip-close{position:absolute;top:14px;right:16px;background:none;border:none;color:rgba(255,255,255,.35);font-size:22px;cursor:pointer;line-height:1;padding:4px 6px;border-radius:4px;}',
    '.ip-close:hover{color:rgba(255,255,255,.7);}',
    '.ip-badge{display:inline-block;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#F97316;margin-bottom:12px;}',
    '.ip-headline{font-family:"Oswald",sans-serif;font-size:clamp(22px,5vw,30px);font-weight:700;color:#fff;line-height:1.1;letter-spacing:.02em;text-transform:uppercase;margin-bottom:8px;}',
    '.ip-sub{font-size:14px;color:rgba(255,255,255,.5);line-height:1.6;margin-bottom:20px;}',
    '.ip-price-row{display:flex;align-items:baseline;gap:10px;margin-bottom:6px;}',
    '.ip-price{font-family:"Oswald",sans-serif;font-size:56px;font-weight:700;color:#fff;line-height:1;letter-spacing:.01em;}',
    '.ip-price sup{font-size:.4em;vertical-align:super;color:#F97316;}',
    '.ip-was{font-size:14px;color:rgba(255,255,255,.28);text-decoration:line-through;}',
    '.ip-includes{list-style:none;margin:0 0 22px;padding:0;border-top:1px solid rgba(255,255,255,.08);padding-top:16px;}',
    '.ip-includes li{display:flex;align-items:center;gap:9px;font-size:14px;color:rgba(255,255,255,.7);padding:5px 0;}',
    '.ip-includes li::before{content:"✓";color:#F97316;font-weight:700;font-size:13px;flex-shrink:0;}',
    '.ip-cta{display:block;width:100%;text-align:center;background:#C94D00;color:#fff;font-size:16px;font-weight:600;padding:16px 20px;border-radius:8px;text-decoration:none;transition:background .15s;}',
    '.ip-cta:hover{background:#C44D00;}',
    '.ip-dismiss{display:block;text-align:center;margin-top:12px;font-size:12px;color:rgba(255,255,255,.25);cursor:pointer;background:none;border:none;width:100%;}',
    '.ip-dismiss:hover{color:rgba(255,255,255,.5);}',
    '@media(max-width:480px){.ip-modal{padding:28px 20px 24px;}.ip-price{font-size:44px;}}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var html = [
    '<div class="ip-overlay" id="introPopupOverlay" role="dialog" aria-modal="true" aria-labelledby="ipTitle">',
    '<div class="ip-modal">',
    '<button class="ip-close" id="introPopupClose" aria-label="Close offer">✕</button>',
    '<span class="ip-badge">New clients only · 4 spots left this month</span>',
    '<h2 class="ip-headline" id="ipTitle">Claim Your $99<br>First Visit Intro</h2>',
    '<p class="ip-sub">60-min RMT massage — cupping + hot towels included. Insurance receipt ready when you walk out.</p>',
    '<div class="ip-price-row">',
    '<span class="ip-price"><sup>$</sup>99</span>',
    '<span class="ip-was">$110 reg.</span>',
    '</div>',
    '<ul class="ip-includes">',
    '<li>60-min RMT massage (insurance receipt included)</li>',
    '<li>Cupping therapy — no extra charge</li>',
    '<li>Hot towel treatment</li>',
    '</ul>',
    '<a href="'+offerUrl+'" class="ip-cta" id="introPopupCTA">Claim the $99 Intro Offer →</a>',
    '<button class="ip-dismiss" id="introPopupDismiss">No thanks, I\'ll pay full price</button>',
    '</div>',
    '</div>'
  ].join('');

  function dismiss(){
    var overlays = document.querySelectorAll('#introPopupOverlay');
    overlays.forEach(function(overlay){
      overlay.style.opacity='0';
      overlay.style.transition='opacity .2s';
      setTimeout(function(){ overlay.remove(); },200);
    });
    sessionStorage.setItem('introDismissed','1');
    document.body.style.overflow='';
  }

  function show(){
    if(sessionStorage.getItem('introDismissed')) return;
    if(document.getElementById('introPopupOverlay')) return;
    document.body.insertAdjacentHTML('beforeend', html);
    document.body.style.overflow='hidden';
    document.getElementById('introPopupClose').addEventListener('click', dismiss);
    document.getElementById('introPopupDismiss').addEventListener('click', dismiss);
    document.getElementById('introPopupCTA').addEventListener('click', function(){ sessionStorage.setItem('introDismissed','1'); document.body.style.overflow=''; });
    document.getElementById('introPopupOverlay').addEventListener('click', function(e){ if(e.target===this) dismiss(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') dismiss(); });
  }

  // Time-delay trigger: 5s
  setTimeout(show, 5000);

  // Exit-intent trigger: mouse leaves viewport toward top (desktop only)
  document.addEventListener('mouseleave', function onExit(e) {
    if (e.clientY <= 0 && !sessionStorage.getItem('introDismissed')) {
      show();
      document.removeEventListener('mouseleave', onExit);
    }
  });
})();

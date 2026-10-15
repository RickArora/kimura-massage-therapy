(() => {
  const trigger = document.querySelector('[data-room-intro]');
  const dialog = document.querySelector('#room-intro-dialog');
  const video = dialog?.querySelector('video');
  if (!trigger || !dialog || !video || typeof dialog.showModal !== 'function') return;
  trigger.hidden = false;
  trigger.addEventListener('click', () => {
    dialog.showModal();
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    video.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
  });
  dialog.querySelector('[data-close-intro]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    video.pause();
    trigger.focus({preventScroll: true});
  });
})();

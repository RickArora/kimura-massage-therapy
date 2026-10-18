(() => {
  const trigger = document.querySelector('[data-room-intro]');
  const dialog = document.querySelector('#room-intro-dialog');
  const video = dialog?.querySelector('video');
  if (!trigger || !dialog || !video || typeof dialog.showModal !== 'function') return;
  let started = false;
  let milestones = new Set();
  const videoDetails = () => ({
    video_duration: Math.round(video.duration || 0),
    video_current_time: Math.round(video.currentTime || 0)
  });
  const track = (eventName, params) => {
    if (typeof window.trackVideoEngagement === 'function') window.trackVideoEngagement(eventName, Object.assign(videoDetails(), params || {}));
  };
  trigger.hidden = false;
  trigger.addEventListener('click', () => {
    started = false;
    milestones = new Set();
    track('video_tour_click', {cta_location: 'homepage_room_card'});
    dialog.showModal();
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    video.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
  });
  const trackStart = () => {
    if (started) return;
    started = true;
    track('video_start');
  };
  video.addEventListener('play', () => {
    if (video.duration) trackStart();
    else video.addEventListener('loadedmetadata', trackStart, {once: true});
  });
  const trackProgress = () => {
    if (!started || !video.duration) return;
    const percent = Math.floor((video.currentTime / video.duration) * 100);
    [25, 50, 75].forEach(milestone => {
      if (percent >= milestone && !milestones.has(milestone)) {
        milestones.add(milestone);
        track('video_progress', {video_percent: milestone});
      }
    });
  };
  video.addEventListener('timeupdate', trackProgress);
  video.addEventListener('seeked', trackProgress);
  video.addEventListener('ended', () => {
    if (started) track('video_complete', {video_percent: 100});
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

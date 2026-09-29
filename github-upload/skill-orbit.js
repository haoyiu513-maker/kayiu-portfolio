(() => {
  const orbit = document.querySelector('.skill-orbit');
  if (!orbit) return;
  const bubbles = [...orbit.querySelectorAll('.skill-bubble')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0, last = 0, elapsed = 0, visible = false;
  function position() {
    bubbles.forEach((bubble, index) => {
      const angle = elapsed / 18000 * Math.PI * 2 + index * Math.PI * 2 / 3 - Math.PI / 2;
      const depth = Math.sin(angle);
      const x = Math.cos(angle) * width / 2;
      const y = depth * height / 2;
      const tilt = -12 * Math.PI / 180;
      bubble.style.left = `${width / 2 + x * Math.cos(tilt) - y * Math.sin(tilt)}px`;
      bubble.style.top = `${height / 2 + x * Math.sin(tilt) + y * Math.cos(tilt)}px`;
      bubble.style.transform = `translate(-50%, -50%) scale(${0.9 + depth * 0.14})`;
      bubble.style.zIndex = depth >= 0 ? '3' : '1';
      bubble.style.opacity = String(0.88 + depth * 0.12);
    });
  }
  function tick(now) {
    if (last) elapsed += Math.min(now - last, 64);
    last = now;
    position();
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    last = 0;
    if (visible && !reduced.matches && !document.hidden) frame = requestAnimationFrame(tick);
    else position();
  }
  new ResizeObserver(() => {
    width = orbit.clientWidth;
    height = orbit.clientHeight;
    position();
  }).observe(orbit);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(orbit);
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
})();

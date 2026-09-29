(() => {
  const canvas = document.querySelector('#glitter-transition');
  const section = document.querySelector('#experience');
  const context = canvas.getContext('2d');
  if (!context || !section) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0;
  // Stable positions keep the dust attached to scroll progress in either direction.
  let seed = 71;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const dust = Array.from({length:210}, () => ({
    along:random(), spread:random() - .5, size:1 + random() * 2.4,
    phase:random() * Math.PI * 2, star:random() > .87,
    color:['255,239,189','255,219,231','255,255,246'][Math.floor(random()*3)]
  }));
  function draw() {
    frame = 0;
    context.clearRect(0,0,width,height);
    if (reduced.matches) return;
    const top = section.getBoundingClientRect().top;
    const progress = (height - top) / height;
    if (progress <= 0 || progress >= 1) return;
    const opacity = Math.sin(progress * Math.PI);
    const centerX = (-.35 + progress * 1.7) * width;
    const centerY = height * (.75 - progress * .45);
    context.save();
    context.globalCompositeOperation = 'source-over';
    const glow = context.createRadialGradient(centerX,centerY,0,centerX,centerY,width*.42);
    glow.addColorStop(0,`rgba(255,235,218,${opacity*.22})`);
    glow.addColorStop(1,'rgba(255,235,218,0)');
    context.fillStyle=glow;
    context.fillRect(0,0,width,height);
    dust.forEach(p => {
      const trail = (p.along - .5) * width * .8;
      const x = centerX + trail;
      const y = centerY - trail*.32 + Math.sin(p.along*6+progress*5)*height*.055 + p.spread*height*.18;
      const alpha = opacity * (.35 + .65*Math.abs(Math.sin(p.phase+progress*12)));
      const size = p.size * (p.star ? 2.5 : 1);
      context.fillStyle=`rgba(${p.color},${alpha})`;
      context.shadowColor=`rgba(${p.color},${alpha*.65})`;
      context.shadowBlur=p.star?10:3;
      context.beginPath();
      if(p.star) {
        context.moveTo(x,y-size);
        context.quadraticCurveTo(x+size*.18,y-size*.18,x+size,y);
        context.quadraticCurveTo(x+size*.18,y+size*.18,x,y+size);
        context.quadraticCurveTo(x-size*.18,y+size*.18,x-size,y);
        context.quadraticCurveTo(x-size*.18,y-size*.18,x,y-size);
      } else context.arc(x,y,size,0,Math.PI*2);
      context.fill();
    });
    context.restore();
  }
  function queue() { if (!frame) frame = requestAnimationFrame(draw); }
  function resize() {
    width=window.innerWidth; height=window.innerHeight;
    const ratio=Math.min(window.devicePixelRatio || 1,2);
    canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);
    context.setTransform(ratio,0,0,ratio,0,0);
    queue();
  }
  window.addEventListener('scroll',queue,{passive:true});
  window.addEventListener('resize',resize);
  reduced.addEventListener('change',queue);
  resize();
})();

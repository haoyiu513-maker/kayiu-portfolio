(() => {
  const hero=document.querySelector('.hero');
  if(!hero)return;
  for(const side of ['left','right']){
    const corner=document.createElement('div');
    corner.className=`floral-corner floral-corner-${side}`;
    corner.setAttribute('aria-hidden','true');
    corner.innerHTML=`<svg viewBox="0 0 300 230" preserveAspectRatio="xMinYMin meet">
      <defs>
        <radialGradient id="petal-${side}"><stop stop-color="#fffbe9"/><stop offset=".6" stop-color="#f9d9e7"/><stop offset="1" stop-color="#d9b6da"/></radialGradient>
        <linearGradient id="wing-${side}" x2="1" y2="1"><stop stop-color="#f6e3ff"/><stop offset=".5" stop-color="#bcd8f4"/><stop offset="1" stop-color="#f6bfd8"/></linearGradient>
        <g id="flower-${side}"><g fill="url(#petal-${side})" stroke="#fff9f8" stroke-width="1.5"><ellipse cy="-18" rx="15" ry="23"/><ellipse cy="-18" rx="15" ry="23" transform="rotate(72)"/><ellipse cy="-18" rx="15" ry="23" transform="rotate(144)"/><ellipse cy="-18" rx="15" ry="23" transform="rotate(216)"/><ellipse cy="-18" rx="15" ry="23" transform="rotate(288)"/></g><circle r="9" fill="#e6bf77"/><circle cx="-2" cy="-2" r="3" fill="#fff5ce"/></g>
        <g id="butterfly-${side}" stroke="#fff7ff" stroke-width="1.4"><path d="M0 0C-55-65-61 4-7 9C-45 24-18 51 0 12C18 51 45 24 7 9C61 4 55-65 0 0Z" fill="url(#wing-${side})"/><path d="M0 18V-7M0-5Q-4-18-11-17M0-5Q4-18 11-17" fill="none" stroke="#9c84b5" stroke-width="2"/></g>
      </defs>
      <path d="M0 0H190Q171 18 123 27Q73 29 50 63Q21 93 0 118Z" fill="#f4e8f2"/>
      <path d="M-8 8Q80 48 235 12M10 0Q40 89 12 173" fill="none" stroke="#b6bba2" stroke-width="2"/>
      <g fill="#c6d1bc"><ellipse cx="84" cy="28" rx="7" ry="19" transform="rotate(65 84 28)"/><ellipse cx="144" cy="24" rx="7" ry="23" transform="rotate(65 144 24)"/><ellipse cx="208" cy="17" rx="6" ry="17" transform="rotate(68 208 17)"/><ellipse cx="26" cy="84" rx="7" ry="21" transform="rotate(-30 26 84)"/><ellipse cx="23" cy="140" rx="6" ry="18" transform="rotate(35 23 140)"/></g>
      <use href="#flower-${side}" transform="translate(24 23) scale(.95)"/><use href="#flower-${side}" transform="translate(71 18) scale(.72) rotate(24)"/><use href="#flower-${side}" transform="translate(22 69) scale(.65)"/><use href="#flower-${side}" transform="translate(121 15) scale(.5)"/>
      <g class="corner-butterfly"><use href="#butterfly-${side}" transform="translate(171 74) rotate(-18) scale(.48)"/></g><g class="corner-butterfly corner-butterfly-small"><use href="#butterfly-${side}" transform="translate(51 166) rotate(20) scale(.32)"/></g>
      <g class="corner-sparkles" fill="#fff5d8"><path d="M114 74q2 10 9 12q-7 2-9 12q-2-10-9-12q7-2 9-12Z"/><path d="M230 45q1 7 6 9q-5 1-6 9q-1-8-6-9q5-2 6-9Z"/><circle cx="81" cy="124" r="2"/><circle cx="194" cy="42" r="2"/></g>
    </svg>`;
    const decorations=corner.querySelector('svg');
    [...decorations.children].forEach(node=>{
      if(node.tagName.toLowerCase()!=='defs' && !node.classList.contains('corner-butterfly') && !node.classList.contains('corner-sparkles'))node.remove();
    });
    const flowers=document.createElement('img');
    flowers.src='botanical-corner.png';
    flowers.alt='';
    flowers.className='botanical-corner-image';
    corner.prepend(flowers);
    hero.append(corner);
  }
})();

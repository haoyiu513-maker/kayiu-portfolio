(() => {
  const projects = [
    {category:'01 / Fan diary',title:'A circle of light',description:'Capture these memorable moments worth collecting with photos.',note:'追星紀錄 · 現場回憶'},
    {category:'02 / Fan diary',title:'I was here',description:'Taking the support fans and dolls with me to leave a memory, turning the love for the idol into real life recollections. These experiences are also the inspiration for my creation of support materials.',note:'追星紀錄 · 個人足跡'},
    {category:'03 / Fan-made design',title:'A little sweetness',description:'Independently designed a full series of fan-made merchandise, including badge sets, sticker packs and hand-held props, covering concept development, graphic layout to final physical outputs tailored for community audiences.',note:'應援物料 · 小卡 / 鎖匙扣 / 徽章'},
    {category:'04 / Fan-made design',title:'K-pop X Animate (Aikatsu)',description:'Beyond documentary observation, I also experimented with cross-media creative design. I created crossover collectible cards blending K-pop and anime aesthetics. The concept stemmed from an interesting parallel, the real-life idol group debuted via competitive survival reality shows, which shared striking narrative similarities with idol-themed anime storylines. I drew upon this thematic resonance and visual language to design stylised collectible cards as part of my fan-driven creative series.',note:'應援物料 · 卡片設計'},
    {category:'05 / Fan-made design',title:'hand-made stuff',description:'I also dabbled in hands-on physical craft creation. I designed and hand-built mini pickets. Beyond digital graphic work, I manually fitted plush materials, ribbons and decorative details.',note:'應援物料 · 迷你應援扇 / 貼紙包'},
    {category:'06 / Stories on Threads',title:'My voice, my values',description:'At a large-scale pop concert with first-come-first-served standing-zone entry, I discovered that some fans began queuing and camping **two full days ahead of the event**. Finding this practice problematic, I travelled to the venue to gather first-hand photographic evidence of the overnight queue.\n\nI shared this raw, unedited field footage on Threads. The post quickly gained traction and reached **21.5 K views**, triggering widespread community debate about the unfairness of event ticketing and queuing arrangements.',note:'21.5K 次瀏覽 · 180 個讚 · 18 則回覆\n以上數字來自提供的貼文截圖，並非即時數據。'}
  ];
  const dialog = document.querySelector('#portfolio-detail');
  const image = dialog.querySelector('img');
  let opener;
  let previousOverflow;
  document.querySelectorAll('[data-project]').forEach(button => {
    button.addEventListener('click', () => {
      const project = projects[Number(button.dataset.project)];
      opener = button;
      image.src = button.querySelector('img').src;
      image.alt = button.querySelector('img').alt;
      document.querySelector('#portfolio-detail-category').textContent = project.category;
      document.querySelector('#portfolio-detail-title').textContent = project.title;
      const description = document.querySelector('#portfolio-detail-description');
      description.replaceChildren(...project.description.split('**').map((text, index) => {
        if (index % 2 === 0) return document.createTextNode(text);
        const emphasis = document.createElement('strong');
        emphasis.textContent = text;
        return emphasis;
      }));
      document.querySelector('#portfolio-detail-note').textContent = project.note;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      dialog.scrollTop = 0;
    });
  });
  dialog.querySelector('.portfolio-detail-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if(event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus({preventScroll:true});
  });
})();

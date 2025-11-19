// Modern interactions: dynamic year, smooth scroll, reveal on scroll
document.addEventListener('DOMContentLoaded', ()=>{
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // staggered reveal animation
  const revealEls = Array.from(document.querySelectorAll('.section, .card, .proj, .hero'));
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const idx = revealEls.indexOf(entry.target);
        const delay = (idx >= 0 ? idx : 0) * 80;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  revealEls.forEach(el=>observer.observe(el));

  // keyboard nav: allow left/right arrows to move focus across nav links
  const navLinks = Array.from(document.querySelectorAll('.nav-right a'));
  document.addEventListener('keydown',(e)=>{
    const active = document.activeElement;
    if(!active) return;
    if(active.closest && active.closest('.nav-right')){
      const idx = navLinks.indexOf(active);
      if(e.key === 'ArrowRight'){
        e.preventDefault();
        const next = navLinks[(idx+1) % navLinks.length];
        next.focus();
      } else if(e.key === 'ArrowLeft'){
        e.preventDefault();
        const prev = navLinks[(idx-1+navLinks.length) % navLinks.length];
        prev.focus();
      }
    }
  });
});


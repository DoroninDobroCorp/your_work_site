// CoFound IT interactions
(function(){
  // Калькулятор выплат
  const salaryInput = document.getElementById('salary');
  const m1 = document.getElementById('m1');
  const m2 = document.getElementById('m2');
  const m3 = document.getElementById('m3');
  const m4 = document.getElementById('m4');
  const total = document.getElementById('total');
  function format(num){
    return new Intl.NumberFormat('ru-RU').format(Math.round(num || 0)) + ' ₽';
  }
  function recalc(){
    const s = Number(salaryInput?.value || 0);
    const v1 = s * 0.5;
    const v2 = s * 0.25;
    const v4 = s * 0.10;
    if(m1) m1.textContent = format(v1);
    if(m2) m2.textContent = format(v2);
    if(m3) m3.textContent = format(v2);
    if(m4) m4.textContent = format(v4);
    if(total) total.textContent = format(v1 + v2 + v2 + (v4 * 9));
  }
  if(salaryInput){
    salaryInput.addEventListener('input', recalc);
    recalc();
  }

  // Scroll animations для карточек и секций
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Применяем анимацию к карточкам с задержкой
  document.querySelectorAll('.card, .metric, .steps li').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if(id && id.length > 1){
        const el = document.querySelector(id);
        if(el){
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Contact
  const contactBtn = document.getElementById('contactBtn');
  if(contactBtn){
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const subject = encodeURIComponent('CoFound IT — партнёрство/сооснователи');
      const body = encodeURIComponent('Расскажите о себе: опыт, сильные стороны, чем можете усилить GTM/операции/продюсирование.');
      window.location.href = `mailto:founders@cofoundit.example?subject=${subject}&body=${body}`;
    });
  }

  // Copy link
  const copyLink = document.getElementById('copyLink');
  if(copyLink){
    copyLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard?.writeText(window.location.href).then(() => {
        copyLink.textContent = 'Ссылка скопирована';
        setTimeout(()=> copyLink.textContent = 'Скопировать ссылку', 2000);
      });
    });
  }

  // Print to PDF
  const printBtn = document.getElementById('printBtn');
  if(printBtn){
    printBtn.addEventListener('click', () => window.print());
  }

  // Параллакс эффект для hero секции
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < 600) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = 1 - (scrolled / 800);
    }
  });

  // Улучшенный header при скролле
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(11,15,26,.85)';
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,.3)';
    } else {
      header.style.background = 'rgba(11,15,26,.55)';
      header.style.boxShadow = 'none';
    }
  });
})();

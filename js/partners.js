// Партнёрская страница CoFound IT

document.addEventListener('DOMContentLoaded', () => {
  // Калькулятор партнёрского дохода
  const referralsInput = document.getElementById('referrals');
  const avgSalaryInput = document.getElementById('avgSalary');
  
  function calculatePartnerIncome() {
    const referrals = parseInt(referralsInput.value) || 0;
    const avgSalary = parseInt(avgSalaryInput.value) || 0;
    
    // Комиссия партнёра: 20% от всех выплат клиента
    // Клиент платит: 50% + 25%×2 + 10%×9 = 50 + 50 + 90 = 190% от месячной зарплаты за год
    // Партнёр получает: 20% от 190% = 38% от месячной зарплаты клиента
    const partnerCommissionPerClient = avgSalary * 0.38;
    
    // Доход за год от всех рефералов
    const yearlyIncome = partnerCommissionPerClient * referrals * 12;
    
    // Доход по месяцам (накопительно)
    // Месяц 1: привели X клиентов, они платят первый взнос
    const month1 = referrals * avgSalary * 0.10; // 10% от зарплаты (20% от 50%)
    
    // Месяц 3: первая волна + новые клиенты
    const month3 = referrals * 3 * avgSalary * 0.05; // примерно 5% средний
    
    // Месяц 12: накопленный доход
    const month12 = yearlyIncome;
    
    // Обновляем UI
    document.getElementById('perClient').textContent = formatMoney(partnerCommissionPerClient);
    document.getElementById('yearlyIncome').textContent = formatMoney(yearlyIncome);
    document.getElementById('month1').textContent = formatMoney(month1);
    document.getElementById('month3').textContent = formatMoney(month3);
    document.getElementById('month12').textContent = formatMoney(month12);
  }
  
  function formatMoney(value) {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
  
  // Обработчики событий
  referralsInput.addEventListener('input', calculatePartnerIncome);
  avgSalaryInput.addEventListener('input', calculatePartnerIncome);
  
  // Первоначальный расчёт
  calculatePartnerIncome();
  
  // Кнопка подачи заявки
  const applyBtn = document.getElementById('applyBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const subject = 'Заявка на партнёрство CoFound IT';
      const body = `Здравствуйте!

Хочу стать партнёром CoFound IT.

Информация обо мне:
- Имя/Компания: 
- Сфера деятельности: 
- Размер аудитории/клиентской базы: 
- Предполагаемое количество рефералов в месяц: 
- Контакты (телефон, email): 

Буду рад обсудить детали сотрудничества!`;
      
      window.location.href = `mailto:partners@cofoundit.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
  
  // Плавная прокрутка к якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#apply') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
  
  // Анимация появления элементов при скролле
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Применяем анимацию к карточкам
  document.querySelectorAll('.card, .stat-card, .partner-type').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Динамический header при скролле
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.background = 'rgba(11,15,26,.95)';
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,.3)';
    } else {
      header.style.background = 'rgba(11,15,26,.55)';
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
});

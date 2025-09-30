// CoFound IT - Клиентский сайт JavaScript

// Калькулятор выплат
const salaryInput = document.getElementById('clientSalary');
const m1 = document.getElementById('cm1');
const m2 = document.getElementById('cm2');
const m3 = document.getElementById('cm3');
const m4 = document.getElementById('cm4');
const total = document.getElementById('ctotal');

function formatRuble(num) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
}

function calculatePayments() {
  const salary = parseFloat(salaryInput.value) || 0;
  
  const month1 = salary * 0.5;
  const month2 = salary * 0.25;
  const month3 = salary * 0.25;
  const month4to12 = salary * 0.1;
  const totalAmount = month1 + month2 + month3 + (month4to12 * 9);
  
  m1.textContent = formatRuble(month1);
  m2.textContent = formatRuble(month2);
  m3.textContent = formatRuble(month3);
  m4.textContent = formatRuble(month4to12);
  total.textContent = formatRuble(totalAmount);
}

if (salaryInput) {
  salaryInput.addEventListener('input', calculatePayments);
  calculatePayments();
}

// Контактная кнопка
const contactBtn = document.getElementById('clientContactBtn');
if (contactBtn) {
  contactBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const email = 'hello@cofoundit.example';
    const subject = 'Хочу получить оффер с CoFound IT';
    const body = 'Здравствуйте! Я хочу записаться на бесплатную диагностическую сессию и узнать больше о вашей программе.';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#contact') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Анимация появления элементов при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Применяем анимацию ко всем карточкам
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.problem-card, .timeline-item, .service-card, .pricing-card, .case-card, .faq-item');
  
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
});

// Изменение header при скролле
let lastScroll = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  }
  
  lastScroll = currentScroll;
});

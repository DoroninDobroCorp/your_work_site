// JS для страницы партнёрского предложения (proposal.html)

document.addEventListener('DOMContentLoaded', () => {

  // Кнопки печати в PDF
  const printBtn = document.getElementById('printBtn');
  const printBtn2 = document.getElementById('printBtn2');
  [printBtn, printBtn2].forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); window.print(); });
  });

  // Кнопка написать письмо — заготовка шаблона
  const emailBtn = document.getElementById('emailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const subject = `Совместный пилот — предложение о со‑основании`;
      const body = `Привет!\n\nПредлагаю запустить совместный пилот на 6–8 недель.\n\nКлючевые пункты:\n- Цель: 10–30 офферов за 60–90 дней\n- Роли: Один ко‑фаундер — маркетинг/трафик; Другой — продукт/операционка\n- Экономика: 50/50 валового дохода (вариативно по вкладам)\n- SLA: <24ч отклик, еженедельные отчёты\n\nГотов на звонок 30 минут, чтобы обсудить детали?\n\nЖду ответа!`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Плавная прокрутка по якорям
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

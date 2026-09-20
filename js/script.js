// ========== МОБИЛЬНОЕ МЕНЮ ==========
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('is-open');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => nav.classList.remove('is-open'));
    });
}

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== ФОРМА ЗАЯВКИ (визуальная) ==========
const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = leadForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Отправка...";
        submitBtn.disabled = true;

        // Просто показываем сообщение, никуда не отправляем
        setTimeout(function () {
            alert("✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с Вами в течение 30 минут.");
            leadForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 800);
    });
}

// ========== АНИМАЦИЯ ПРИ СКРОЛЛЕ ==========
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.advantage, .product-card, .step, .review').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

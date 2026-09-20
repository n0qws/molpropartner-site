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

// ========== ФОРМА ЗАЯВКИ → TELEGRAM ==========
const TELEGRAM_BOT_TOKEN = "8754533937:AAGUo1uDWbfpClzCLcUgh1WZZVRDXKfN_Pc";
const TELEGRAM_CHAT_ID = "7555990786";

const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const submitBtn = leadForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Отправка...";
        submitBtn.disabled = true;

        const text =
            `🔔 *Новая заявка с сайта*\n\n` +
            `👤 *Имя:* ${name}\n` +
            `📞 *Телефон:* ${phone}\n` +
            `✉️ *E-mail:* ${email || "не указан"}\n` +
            `💬 *Комментарий:* ${message || "без комментария"}`;

        try {
            const response = await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: text,
                        parse_mode: "Markdown"
                    })
                }
            );

            if (response.ok) {
                alert("✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с Вами в течение 30 минут.");
                leadForm.reset();
            } else {
                alert("❌ Ошибка отправки. Попробуйте позвонить нам напрямую.");
            }
        } catch (error) {
            alert("❌ Ошибка соединения. Попробуйте позвонить нам напрямую.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
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

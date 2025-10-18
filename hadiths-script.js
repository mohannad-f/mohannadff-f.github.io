// وظائف صفحة وصايا النبي

// فتح صفحة الحديث
function openHadithPage(hadithId) {
    // إضافة تأثير انتقال
    addTransitionEffect();
    
    // الانتقال إلى صفحة الحديث
    setTimeout(() => {
        window.location.href = `hadith-${hadithId}.html`;
    }, 300);
}

// إضافة تأثير انتقال سلس
function addTransitionEffect() {
    const body = document.body;
    body.style.transition = 'opacity 0.3s ease-out';
    body.style.opacity = '0.7';
}

// تأثيرات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تأثير ظهور تدريجي للعناصر
    const elements = document.querySelectorAll('.page-header, .section-description, .encouragement-section, .stats-section');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
    
    // تأثير للهلال
    const crescent = document.querySelector('.crescent-background');
    if (crescent) {
        crescent.style.opacity = '0';
        setTimeout(() => {
            crescent.style.transition = 'opacity 2s ease-in-out';
            crescent.style.opacity = '1';
        }, 1000);
    }
    
    // تأثير تذكير الصلاة على النبي
    const prophetReminder = document.querySelector('.prophet-reminder');
    if (prophetReminder) {
        prophetReminder.style.opacity = '0';
        prophetReminder.style.transform = 'translateX(-50%) translateY(-20px)';
        
        setTimeout(() => {
            prophetReminder.style.transition = 'all 0.6s ease-out';
            prophetReminder.style.opacity = '1';
            prophetReminder.style.transform = 'translateX(-50%) translateY(0)';
        }, 500);
    }
});

// تأثيرات تفاعلية للبطاقات
document.querySelectorAll('.hadith-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // تأثير عند المرور
        this.style.transform = 'translateY(-8px) scale(1.02)';
        
        // تأثير للأيقونة
        const icon = this.querySelector('.hadith-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(-5deg)';
        }
        
        // تأثير للسهم
        const arrow = this.querySelector('.hadith-arrow');
        if (arrow) {
            arrow.style.transform = 'translateX(-5px)';
            arrow.style.color = '#1565c0';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        
        const icon = this.querySelector('.hadith-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
        
        const arrow = this.querySelector('.hadith-arrow');
        if (arrow) {
            arrow.style.transform = 'translateX(0)';
            arrow.style.color = '#999';
        }
    });
    
    card.addEventListener('click', function() {
        // تأثير النقر
        this.style.transform = 'translateY(-5px) scale(0.98)';
        
        setTimeout(() => {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        }, 150);
    });
});

// تأثير تحريك الهلال مع حركة الماوس
document.addEventListener('mousemove', function(e) {
    const crescent = document.querySelector('.crescent-background');
    if (crescent) {
        const x = (e.clientX / window.innerWidth) * 10 - 5;
        const y = (e.clientY / window.innerHeight) * 10 - 5;
        
        crescent.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }
});

// تأثير نبضة لتذكير الصلاة على النبي
setInterval(() => {
    const reminder = document.querySelector('.prophet-reminder');
    if (reminder) {
        reminder.style.transform = 'translateX(-50%) scale(1.05)';
        setTimeout(() => {
            reminder.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
    }
}, 10000); // كل 10 ثوانٍ

// تأثير تحميل الصفحة
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// إضافة تأثيرات لوحة المفاتيح
document.addEventListener('keydown', function(e) {
    // الضغط على Enter أو Space لتفعيل البطاقة المحددة
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('hadith-card')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
    
    // الضغط على الرقم 1 للانتقال للحديث الأول
    if (e.key === '1') {
        openHadithPage(1);
    }
});

// جعل البطاقات قابلة للتركيز بلوحة المفاتيح
document.querySelectorAll('.hadith-card').forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', card.querySelector('.hadith-title-ar').textContent);
    
    // إضافة تأثير التركيز
    card.addEventListener('focus', function() {
        this.style.outline = '3px solid rgba(21, 101, 192, 0.5)';
        this.style.outlineOffset = '3px';
    });
    
    card.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// تأثير العد التصاعدي للإحصائيات
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 30; // 30 إطار للرسوم المتحركة
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                stat.textContent = finalNumber;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentNumber);
            }
        }, 50);
    });
}

// تشغيل تأثير الإحصائيات عند التحميل
setTimeout(animateStats, 1500);

// إضافة تأثير الجسيمات المتحركة
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // إنشاء جسيمات متحركة
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createParticle(particleContainer);
        }, i * 1500);
    }
}

// إنشاء جسيم واحد
function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 2;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        animation: floatUp ${Math.random() * 6 + 5}s linear infinite;
        left: ${Math.random() * 100}%;
        bottom: -10px;
    `;
    
    container.appendChild(particle);
    
    // إزالة الجسيم بعد انتهاء الرسوم المتحركة
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        // إنشاء جسيم جديد
        createParticle(container);
    }, 11000);
}

// تشغيل تأثير الجسيمات بعد تحميل الصفحة
setTimeout(createFloatingParticles, 2500);

// إضافة أنماط CSS للرسوم المتحركة
const additionalStyles = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .floating-particles {
        overflow: hidden;
    }
    
    .hadith-card:focus {
        box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.5);
    }
    
    .coming-soon-card:hover .coming-soon-icon {
        animation-duration: 1s;
    }
    
    .encouragement-icon:hover {
        animation-duration: 1s;
        color: #ff5252;
    }
`;

// إضافة الأنماط الإضافية
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// تأثير التمرير السلس
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// إضافة تأثيرات صوتية بصرية
function addVisualFeedback(element, type = 'click') {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(21, 101, 192, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// إضافة تأثير الموجة للبطاقات
document.querySelectorAll('.hadith-card').forEach(card => {
    card.addEventListener('click', function(e) {
        addVisualFeedback(this);
    });
});

// إضافة أنماط CSS للموجة
const rippleStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);

// تحسين الأداء - تحميل كسول
function lazyLoadElements() {
    const elements = document.querySelectorAll('[data-lazy]');
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                elementObserver.unobserve(element);
            }
        });
    });
    
    elements.forEach(element => elementObserver.observe(element));
}

// تشغيل التحميل الكسول
document.addEventListener('DOMContentLoaded', lazyLoadElements);

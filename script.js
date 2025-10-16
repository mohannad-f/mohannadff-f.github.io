// وظائف التنقل للصفحة الرئيسية

// الانتقال إلى صفحة آيات المشاعر
function navigateToAyat() {
    addTransitionEffect();
    setTimeout(() => {
        window.location.href = 'ayat.html';
    }, 300);
}

// الانتقال إلى صفحة وصايا النبي
function navigateToHadiths() {
    addTransitionEffect();
    setTimeout(() => {
        window.location.href = 'hadiths.html';
    }, 300);
}

// الانتقال إلى صفحة التواصل
function navigateToContact() {
    addTransitionEffect();
    setTimeout(() => {
        window.location.href = 'contact.html';
    }, 300);
}

// إضافة تأثير انتقال سلس
function addTransitionEffect() {
    const body = document.body;
    body.style.transition = 'opacity 0.3s ease-out';
    body.style.opacity = '0.7';
}

// تأثيرات إضافية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تأثير ظهور تدريجي للعناصر
    const elements = document.querySelectorAll('.option-card, .main-header, .main-footer');
    
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

// تأثيرات تفاعلية إضافية
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // تأثير صوتي بصري عند المرور
        this.style.transform = 'translateY(-8px) scale(1.02)';
        
        // تأثير نبضة للأيقونة
        const icon = this.querySelector('.option-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        
        const icon = this.querySelector('.option-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
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

// وظيفة للعودة إلى الصفحة الرئيسية (ستُستخدم في الصفحات الأخرى)
function goHome() {
    addTransitionEffect();
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 300);
}

// تأثير تحميل الصفحة
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// إضافة تأثيرات لوحة المفاتيح
document.addEventListener('keydown', function(e) {
    // الضغط على Enter أو Space لتفعيل الخيار المحدد
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('option-card')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
    
    // الضغط على الأرقام للانتقال المباشر
    if (e.key === '1') {
        navigateToAyat();
    } else if (e.key === '2') {
        navigateToHadiths();
    } else if (e.key === '3') {
        navigateToContact();
    }
});

// جعل البطاقات قابلة للتركيز بلوحة المفاتيح
document.querySelectorAll('.option-card').forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', card.querySelector('.option-title-ar').textContent);
    
    // إضافة تأثير التركيز
    card.addEventListener('focus', function() {
        this.style.outline = '3px solid #4a7c59';
        this.style.outlineOffset = '3px';
    });
    
    card.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

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
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createParticle(particleContainer);
        }, i * 1000);
    }
}

// إنشاء جسيم واحد
function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        animation: floatUp ${Math.random() * 5 + 4}s linear infinite;
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
    }, 9000);
}

// تشغيل تأثير الجسيمات بعد تحميل الصفحة
setTimeout(createFloatingParticles, 2000);

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
    
    .option-card:focus {
        box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.5);
    }
`;

// إضافة الأنماط الإضافية
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

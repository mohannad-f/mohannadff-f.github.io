// وظائف صفحة التواصل

// تأثيرات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تأثير ظهور تدريجي للعناصر
    const elements = document.querySelectorAll('.page-header, .contact-description, .stats-section');
    
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
    
    // إضافة تأثيرات للروابط الاجتماعية
    setupSocialLinksEffects();
    
    // تشغيل العد التصاعدي للإحصائيات
    setTimeout(animateStats, 1500);
});

// إعداد تأثيرات الروابط الاجتماعية
function setupSocialLinksEffects() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        // تأثير المرور
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // تأثير للأيقونة
            const icon = this.querySelector('.social-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
            
            // تأثير للسهم
            const arrow = this.querySelector('.social-arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(-5px) scale(1.2)';
            }
            
            // إضافة تأثير الإضاءة
            addGlowEffect(this);
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.social-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            const arrow = this.querySelector('.social-arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(0) scale(1)';
            }
            
            // إزالة تأثير الإضاءة
            removeGlowEffect(this);
        });
        
        // تأثير النقر
        link.addEventListener('click', function(e) {
            // تأثير الموجة
            addRippleEffect(this, e);
            
            // تأثير النقر
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
            
            // إحصائيات النقر
            trackSocialClick(this);
        });
        
        // إضافة خصائص إمكانية الوصول
        link.setAttribute('tabindex', '0');
        link.setAttribute('role', 'button');
        
        const platform = link.classList[1].replace('-link', '');
        const platformName = link.querySelector('.social-title-ar').textContent;
        link.setAttribute('aria-label', `فتح ${platformName} في نافذة جديدة`);
    });
}

// إضافة تأثير الإضاءة
function addGlowEffect(element) {
    const socialColor = getComputedStyle(element).getPropertyValue('--social-color');
    element.style.boxShadow = `0 20px 40px rgba(0,0,0,0.25), 0 0 20px ${socialColor}40`;
}

// إزالة تأثير الإضاءة
function removeGlowEffect(element) {
    element.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
}

// إضافة تأثير الموجة
function addRippleEffect(element, event) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// تتبع النقرات على الروابط الاجتماعية
function trackSocialClick(element) {
    const platform = element.classList[1].replace('-link', '');
    const clicks = JSON.parse(localStorage.getItem('social_clicks') || '{}');
    
    clicks[platform] = (clicks[platform] || 0) + 1;
    localStorage.setItem('social_clicks', JSON.stringify(clicks));
    
    // إظهار إشعار
    showClickNotification(platform);
}

// إظهار إشعار النقر
function showClickNotification(platform) {
    const platformNames = {
        'whatsapp': 'واتساب',
        'instagram': 'إنستغرام',
        'facebook': 'فيسبوك',
        'tiktok': 'تيك توك'
    };
    
    const notification = document.createElement('div');
    notification.className = 'click-notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: 'Amiri', serif;
        font-size: 0.9rem;
        animation: slideInUp 0.3s ease-out;
    `;
    
    notification.textContent = `جاري فتح ${platformNames[platform]}...`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// تأثير العد التصاعدي للإحصائيات
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 30;
        
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
}, 12000); // كل 12 ثانية

// تأثيرات لوحة المفاتيح
document.addEventListener('keydown', function(e) {
    // الضغط على Enter أو Space لتفعيل الرابط المحدد
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('social-link')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
    
    // اختصارات لوحة المفاتيح للمنصات
    if (e.altKey) {
        switch(e.key) {
            case '1':
                document.querySelector('.whatsapp-link').click();
                break;
            case '2':
                document.querySelector('.instagram-link').click();
                break;
            case '3':
                document.querySelector('.facebook-link').click();
                break;
            case '4':
                document.querySelector('.tiktok-link').click();
                break;
        }
    }
});

// جعل الروابط قابلة للتركيز بلوحة المفاتيح
document.querySelectorAll('.social-link').forEach((link, index) => {
    // إضافة تأثير التركيز
    link.addEventListener('focus', function() {
        this.style.outline = '3px solid rgba(74, 124, 89, 0.5)';
        this.style.outlineOffset = '3px';
        this.style.transform = 'translateY(-5px) scale(1.01)';
    });
    
    link.addEventListener('blur', function() {
        this.style.outline = 'none';
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// إضافة تأثيرات للأقسام الأخرى
document.querySelectorAll('.support-content, .encouragement-content').forEach(section => {
    section.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.01)';
    });
    
    section.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
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
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createParticle(particleContainer);
        }, i * 2000);
    }
}

// إنشاء جسيم واحد
function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const colors = ['#25D366', '#E4405F', '#1877F2', '#000000'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color}40;
        border-radius: 50%;
        animation: floatUp ${Math.random() * 8 + 6}s linear infinite;
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
    }, 14000);
}

// تشغيل تأثير الجسيمات بعد تحميل الصفحة
setTimeout(createFloatingParticles, 3000);

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
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    .social-link:focus {
        box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.5);
    }
    
    .floating-particles {
        overflow: hidden;
    }
`;

// إضافة الأنماط الإضافية
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// تأثير التحميل
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// حفظ إحصائيات الزيارة
function saveVisitStats() {
    const visits = JSON.parse(localStorage.getItem('contact_visits') || '0');
    localStorage.setItem('contact_visits', JSON.stringify(parseInt(visits) + 1));
}

// تشغيل حفظ الإحصائيات
document.addEventListener('DOMContentLoaded', saveVisitStats);

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

// إضافة تأثيرات صوتية بصرية متقدمة
function addAdvancedEffects() {
    // تأثير النبضة للأيقونات
    const icons = document.querySelectorAll('.description-icon, .support-icon, .encouragement-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animationDuration = '0.5s';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animationDuration = '2s';
        });
    });
    
    // تأثير التموج للخلفيات
    const sections = document.querySelectorAll('.contact-description, .support-section, .encouragement-section');
    sections.forEach(section => {
        section.addEventListener('click', function() {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                animation: wave 1s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(wave);
            
            setTimeout(() => {
                wave.remove();
            }, 1000);
        });
    });
}

// تشغيل التأثيرات المتقدمة
setTimeout(addAdvancedEffects, 2000);

// إضافة أنماط CSS للتأثيرات المتقدمة
const advancedStyles = `
    @keyframes wave {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;

const advancedStyleSheet = document.createElement('style');
advancedStyleSheet.textContent = advancedStyles;
document.head.appendChild(advancedStyleSheet);

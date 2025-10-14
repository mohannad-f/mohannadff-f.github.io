// وظائف صفحات الأحاديث الفردية

// العودة للصفحة السابقة
function goBack() {
    // إضافة تأثير انتقال
    addTransitionEffect();
    
    setTimeout(() => {
        window.history.back();
    }, 300);
}

// نسخ الحديث
function copyHadith() {
    const hadithArabic = document.querySelector('.hadith-arabic').textContent;
    const hadithEnglish = document.querySelector('.hadith-english').textContent;
    const source = document.querySelector('.source-badge span').textContent;
    
    const textToCopy = `${hadithArabic}\n\n${hadithEnglish}\n\nالمصدر: ${source}\n\nمن موقع بصيرة إيمان - BASIRA IMAN`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showCopySuccess();
    }).catch(() => {
        // طريقة بديلة للنسخ
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopySuccess();
    });
}

// عرض رسالة نجاح النسخ
function showCopySuccess() {
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.classList.add('copy-success');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i><span>تم النسخ</span>';
        
        setTimeout(() => {
            copyBtn.classList.remove('copy-success');
            copyBtn.innerHTML = originalText;
        }, 2000);
    }
    
    // إظهار إشعار
    showNotification('تم نسخ الحديث بنجاح', 'success');
}

// مشاركة الحديث
function shareHadith() {
    const hadithArabic = document.querySelector('.hadith-arabic').textContent;
    const hadithEnglish = document.querySelector('.hadith-english').textContent;
    const source = document.querySelector('.source-badge span').textContent;
    const title = document.querySelector('.title-ar').textContent;
    
    const shareText = `${title}\n\n${hadithArabic}\n\n${hadithEnglish}\n\nالمصدر: ${source}\n\nمن موقع بصيرة إيمان - BASIRA IMAN`;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: shareText,
            url: window.location.href
        }).then(() => {
            showNotification('تم مشاركة الحديث', 'success');
        }).catch(() => {
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

// مشاركة بديلة
function fallbackShare(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('تم نسخ الحديث للمشاركة', 'info');
    }).catch(() => {
        showNotification('فشل في المشاركة', 'error');
    });
}

// حفظ الحديث في المفضلة
function bookmarkHadith() {
    const hadithId = getCurrentHadithId();
    const title = document.querySelector('.title-ar').textContent;
    
    let bookmarks = JSON.parse(localStorage.getItem('hadith_bookmarks') || '[]');
    
    if (bookmarks.includes(hadithId)) {
        // إزالة من المفضلة
        bookmarks = bookmarks.filter(id => id !== hadithId);
        localStorage.setItem('hadith_bookmarks', JSON.stringify(bookmarks));
        updateBookmarkButton(false);
        showNotification('تم إزالة الحديث من المفضلة', 'info');
    } else {
        // إضافة للمفضلة
        bookmarks.push(hadithId);
        localStorage.setItem('hadith_bookmarks', JSON.stringify(bookmarks));
        updateBookmarkButton(true);
        showNotification('تم حفظ الحديث في المفضلة', 'success');
    }
}

// الحصول على معرف الحديث الحالي
function getCurrentHadithId() {
    const path = window.location.pathname;
    const match = path.match(/hadith-(\d+)\.html/);
    return match ? match[1] : '1';
}

// تحديث زر المفضلة
function updateBookmarkButton(isBookmarked) {
    const bookmarkBtn = document.querySelector('.bookmark-btn');
    if (bookmarkBtn) {
        const icon = bookmarkBtn.querySelector('i');
        const text = bookmarkBtn.querySelector('span');
        
        if (isBookmarked) {
            icon.className = 'fas fa-bookmark';
            text.textContent = 'محفوظ';
            bookmarkBtn.style.background = '#f57c00';
        } else {
            icon.className = 'far fa-bookmark';
            text.textContent = 'حفظ';
            bookmarkBtn.style.background = '#4a7c59';
        }
    }
}

// إظهار الإشعارات
function showNotification(message, type = 'info') {
    // إزالة الإشعارات السابقة
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Amiri', serif;
        font-size: 1rem;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوانٍ
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// إضافة أنماط CSS للإشعارات
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// إضافة تأثير انتقال
function addTransitionEffect() {
    const body = document.body;
    body.style.transition = 'opacity 0.3s ease-out';
    body.style.opacity = '0.7';
}

// تأثيرات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // فحص حالة المفضلة
    const hadithId = getCurrentHadithId();
    const bookmarks = JSON.parse(localStorage.getItem('hadith_bookmarks') || '[]');
    updateBookmarkButton(bookmarks.includes(hadithId));
    
    // تأثير ظهور تدريجي للعناصر
    const elements = document.querySelectorAll('.page-header, .hadith-source-section');
    
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
    
    // تأثير للنصائح العملية
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // تأثير النقر
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
            
            // إظهار تفاصيل إضافية
            showTipDetails(this);
        });
    });
});

// إظهار تفاصيل النصيحة
function showTipDetails(tipCard) {
    const title = tipCard.querySelector('h3').textContent;
    const description = tipCard.querySelector('p').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'tip-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            margin: 20px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: modalSlideIn 0.4s ease-out;
        ">
            <h3 style="color: #2d5016; font-size: 1.5rem; margin-bottom: 15px;">${title}</h3>
            <p style="color: #555; font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">${description}</p>
            <button onclick="this.closest('.tip-modal').remove()" style="
                background: #4a7c59;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 15px;
                cursor: pointer;
                font-family: 'Amiri', serif;
                font-size: 1rem;
            ">إغلاق</button>
        </div>
    `;
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
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
}, 15000); // كل 15 ثانية

// تأثيرات لوحة المفاتيح
document.addEventListener('keydown', function(e) {
    // الضغط على Escape لإغلاق النوافذ المنبثقة
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.tip-modal');
        modals.forEach(modal => modal.remove());
    }
    
    // اختصارات لوحة المفاتيح
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'c':
                e.preventDefault();
                copyHadith();
                break;
            case 's':
                e.preventDefault();
                shareHadith();
                break;
            case 'b':
                e.preventDefault();
                bookmarkHadith();
                break;
        }
    }
    
    // الضغط على Backspace للعودة
    if (e.key === 'Backspace' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        goBack();
    }
});

// تحسين الأداء - تحميل كسول للصور
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// تشغيل التحميل الكسول
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// تأثير التمرير السلس للأقسام
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// إضافة تأثيرات صوتية بصرية للأزرار
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // تأثير الموجة
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
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
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);

// تأثير التحميل
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// حفظ موضع التمرير
window.addEventListener('beforeunload', function() {
    localStorage.setItem('hadith_scroll_position', window.scrollY);
});

// استعادة موضع التمرير
window.addEventListener('load', function() {
    const scrollPosition = localStorage.getItem('hadith_scroll_position');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        localStorage.removeItem('hadith_scroll_position');
    }
});

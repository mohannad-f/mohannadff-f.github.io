// بيانات الأحاديث مضمنة مباشرة
const hadithsData = [
    {
        "id": 1,
        "title": "حسن الخلق",
        "title_en": "Good Character",
        "source": "البخاري ٣٥٥٩",
        "verse_text": "إن من خيركم أحسنكم أخلاقاً",
        "content": "اسمع يا عزيزي القارئ، هذا الحديث الشريف يضع لك معياراً واضحاً للخيرية في الإسلام. النبي صلى الله عليه وسلم يخبرنا أن أفضل الناس هم أحسنهم أخلاقاً. ليس المقياس المال أو الجاه أو المنصب، بل الأخلاق الحسنة.\n\nDear reader, this noble hadith sets a clear standard for goodness in Islam. The Prophet (peace be upon him) tells us that the best people are those with the best character. The measure is not wealth, status, or position, but good morals."
    }
];

// متغيرات عامة
let currentHadith = null;

// تحميل البيانات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadHadithsData();
});

// تحميل بيانات الأحاديث
function loadHadithsData() {
    try {
        displayHadiths();
        console.log('تم تحميل بيانات الأحاديث بنجاح');
    } catch (error) {
        console.error('خطأ في تحميل بيانات الأحاديث:', error);
        showError('حدث خطأ في تحميل بيانات الأحاديث');
    }
}

// عرض الأحاديث
function displayHadiths() {
    const hadithsContainer = document.getElementById('hadiths-container');
    if (!hadithsContainer) return;

    hadithsContainer.innerHTML = '';

    // إضافة الحديث المتاح
    hadithsData.forEach(hadith => {
        const hadithCard = createHadithCard(hadith);
        hadithsContainer.appendChild(hadithCard);
    });

    // إضافة بطاقة "قريباً"
    const comingSoonCard = createComingSoonCard();
    hadithsContainer.appendChild(comingSoonCard);
}

// إنشاء بطاقة حديث
function createHadithCard(hadith) {
    const card = document.createElement('div');
    card.className = 'hadith-card available';
    card.onclick = () => showHadithModal(hadith);

    card.innerHTML = `
        <div class="hadith-icon">
            <i class="fas fa-quote-right"></i>
        </div>
        <div class="hadith-content">
            <h3 class="hadith-title-ar">${hadith.title}</h3>
            <p class="hadith-title-en">${hadith.title_en}</p>
            <span class="hadith-source">${hadith.source}</span>
            <p class="hadith-preview">${hadith.verse_text}...</p>
        </div>
        <div class="hadith-arrow">
            <i class="fas fa-chevron-left"></i>
        </div>
    `;

    return card;
}

// إنشاء بطاقة "قريباً"
function createComingSoonCard() {
    const card = document.createElement('div');
    card.className = 'hadith-card coming-soon';

    card.innerHTML = `
        <div class="hadith-icon">
            <i class="fas fa-hourglass-half"></i>
        </div>
        <div class="hadith-content">
            <h3 class="hadith-title-ar">قريباً</h3>
            <p class="hadith-title-en">Coming Soon</p>
            <span class="hadith-source">99 حديث إضافي</span>
        </div>
    `;

    return card;
}

// عرض نافذة الحديث المنبثقة
function showHadithModal(hadith) {
    const modal = document.getElementById('hadith-modal');
    if (!modal) {
        // إنشاء النافذة المنبثقة إذا لم تكن موجودة
        createHadithModal();
    }

    // تحديث محتوى النافذة
    document.getElementById('modal-hadith-title').textContent = hadith.title;
    document.getElementById('modal-hadith-title-en').textContent = hadith.title_en;
    document.getElementById('modal-hadith-source').textContent = hadith.source;
    document.getElementById('modal-hadith-text').textContent = hadith.verse_text;
    document.getElementById('modal-hadith-content').textContent = hadith.content;

    // إظهار النافذة
    document.getElementById('hadith-modal').style.display = 'flex';
}

// إنشاء النافذة المنبثقة للحديث
function createHadithModal() {
    const modal = document.createElement('div');
    modal.id = 'hadith-modal';
    modal.className = 'modal';
    modal.onclick = (e) => {
        if (e.target === modal) closeHadithModal();
    };

    modal.innerHTML = `
        <div class="modal-content hadith-modal-content">
            <div class="modal-header">
                <h2 id="modal-hadith-title"></h2>
                <p id="modal-hadith-title-en"></p>
                <span id="modal-hadith-source" class="hadith-source"></span>
                <button class="close-btn" onclick="closeHadithModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="hadith-text-section">
                    <h3>نص الحديث:</h3>
                    <p id="modal-hadith-text" class="hadith-text"></p>
                </div>
                
                <div class="hadith-explanation-section">
                    <h3>شرح الحديث:</h3>
                    <p id="modal-hadith-content" class="hadith-explanation"></p>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="action-btn copy-btn" onclick="copyHadithText()">
                    <i class="fas fa-copy"></i>
                    نسخ الحديث
                </button>
                <button class="action-btn share-btn" onclick="shareHadithText()">
                    <i class="fas fa-share"></i>
                    مشاركة
                </button>
                <button class="action-btn save-btn" onclick="saveHadith()">
                    <i class="fas fa-bookmark"></i>
                    حفظ
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// إغلاق نافذة الحديث المنبثقة
function closeHadithModal() {
    const modal = document.getElementById('hadith-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// نسخ نص الحديث
function copyHadithText() {
    const hadithText = document.getElementById('modal-hadith-text').textContent;
    const hadithSource = document.getElementById('modal-hadith-source').textContent;
    const fullText = `${hadithText}\n\n${hadithSource}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
        showNotification('تم نسخ الحديث');
    });
}

// مشاركة نص الحديث
function shareHadithText() {
    const hadithText = document.getElementById('modal-hadith-text').textContent;
    const hadithSource = document.getElementById('modal-hadith-source').textContent;
    const fullText = `${hadithText}\n\n${hadithSource}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'حديث شريف',
            text: fullText
        });
    } else {
        copyHadithText();
    }
}

// حفظ الحديث
function saveHadith() {
    showNotification('تم حفظ الحديث في المفضلة');
}

// البحث في الأحاديث
function searchHadiths() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (!searchTerm) {
        displayHadiths();
        return;
    }

    const searchResults = hadithsData.filter(hadith =>
        hadith.title.toLowerCase().includes(searchTerm) ||
        hadith.title_en.toLowerCase().includes(searchTerm) ||
        hadith.verse_text.toLowerCase().includes(searchTerm) ||
        hadith.content.toLowerCase().includes(searchTerm) ||
        hadith.source.toLowerCase().includes(searchTerm)
    );

    displaySearchResults(searchResults);
}

// عرض نتائج البحث
function displaySearchResults(results) {
    const hadithsContainer = document.getElementById('hadiths-container');
    if (!hadithsContainer) return;

    hadithsContainer.innerHTML = '';

    if (results.length === 0) {
        hadithsContainer.innerHTML = '<p class="no-results">لم يتم العثور على نتائج</p>';
        return;
    }

    results.forEach(hadith => {
        const hadithCard = createHadithCard(hadith);
        hadithsContainer.appendChild(hadithCard);
    });
}

// عرض رسالة خطأ
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const container = document.getElementById('hadiths-container') || document.body;
    container.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// إظهار إشعار
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// العودة للصفحة الرئيسية
function goHome() {
    window.location.href = 'index.html';
}

// إضافة مستمع للبحث
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', searchHadiths);
    }
    
    // إضافة مستمع لإغلاق النافذة بالضغط على Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeHadithModal();
        }
    });
});

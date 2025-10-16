// بيانات المشاعر والآيات
let feelingsData = {};
let currentFeeling = '';
let allVerses = [];

// تحميل البيانات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadFeelingsData();
    setupEventListeners();
});

// تحميل بيانات المشاعر
async function loadFeelingsData() {
    try {
        const response = await fetch('./data/verses-data.json');
        if (!response.ok) {
            throw new Error('فشل في تحميل البيانات');
        }
        const data = await response.json();
        feelingsData = data.feelings;
        
        // جمع جميع الآيات للبحث
        allVerses = [];
        Object.keys(feelingsData).forEach(feelingKey => {
            const feeling = feelingsData[feelingKey];
            feeling.verses.forEach(verse => {
                allVerses.push({
                    ...verse,
                    feeling: feeling.name_ar,
                    feelingKey: feelingKey,
                    color: feeling.color
                });
            });
        });
        
        displayFeelings();
        updateStats();
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        showError('حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.');
    }
}

// عرض المشاعر
function displayFeelings() {
    const feelingsContainer = document.getElementById('feelingsContainer');
    if (!feelingsContainer) return;
    
    feelingsContainer.innerHTML = '';
    
    Object.keys(feelingsData).forEach(feelingKey => {
        const feeling = feelingsData[feelingKey];
        const feelingCard = createFeelingCard(feeling, feelingKey);
        feelingsContainer.appendChild(feelingCard);
    });
    
    // إضافة تأثيرات الرسوم المتحركة
    const cards = feelingsContainer.querySelectorAll('.feeling-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
}

// إنشاء بطاقة الشعور
function createFeelingCard(feeling, feelingKey) {
    const card = document.createElement('div');
    card.className = 'feeling-card';
    card.style.setProperty('--feeling-color', feeling.color);
    card.onclick = () => showFeelingVerses(feelingKey);
    
    card.innerHTML = `
        <div class="feeling-icon">
            <i class="${feeling.icon}"></i>
        </div>
        <div class="feeling-content">
            <h3 class="feeling-title-ar">${feeling.name_ar}</h3>
            <p class="feeling-title-en">${feeling.name_en}</p>
            <span class="verses-count">${feeling.verses.length} آية</span>
        </div>
        <div class="feeling-arrow">
            <i class="fas fa-chevron-left"></i>
        </div>
    `;
    
    return card;
}

// عرض آيات الشعور المحدد
function showFeelingVerses(feelingKey) {
    currentFeeling = feelingKey;
    const feeling = feelingsData[feelingKey];
    
    // إخفاء قائمة المشاعر وإظهار الآيات
    document.getElementById('feelingsSection').style.display = 'none';
    document.getElementById('versesSection').style.display = 'block';
    
    // تحديث العنوان
    document.getElementById('feelingTitle').textContent = feeling.name_ar;
    document.getElementById('feelingTitleEn').textContent = feeling.name_en;
    
    // عرض الآيات
    displayVerses(feeling.verses, feeling);
    
    // تحديث الإحصائيات
    updateVersesStats(feeling.verses.length);
}

// عرض الآيات
function displayVerses(verses, feeling) {
    const versesContainer = document.getElementById('versesContainer');
    versesContainer.innerHTML = '';
    
    if (verses.length === 0) {
        versesContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>لا توجد آيات</h3>
                <p>لم يتم العثور على آيات لهذا الشعور</p>
            </div>
        `;
        return;
    }
    
    verses.forEach((verse, index) => {
        const verseCard = createVerseCard(verse, feeling, index);
        versesContainer.appendChild(verseCard);
    });
}

// إنشاء بطاقة الآية
function createVerseCard(verse, feeling, index) {
    const card = document.createElement('div');
    card.className = 'verse-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="verse-header">
            <div class="verse-number">${verse.id}</div>
            <h3 class="verse-title">${verse.title}</h3>
            <button class="verse-menu-btn" onclick="toggleVerseMenu(${verse.id})">
                <i class="fas fa-ellipsis-v"></i>
            </button>
        </div>
        
        <div class="verse-text">
            ${verse.verse_text}
        </div>
        
        <div class="verse-content">
            ${verse.content}
        </div>
        
        <div class="verse-actions">
            <button class="action-btn copy-btn" onclick="copyVerse(${verse.id})" title="نسخ الآية">
                <i class="fas fa-copy"></i>
                <span>نسخ</span>
            </button>
            <button class="action-btn share-btn" onclick="shareVerse(${verse.id})" title="مشاركة الآية">
                <i class="fas fa-share-alt"></i>
                <span>مشاركة</span>
            </button>
            <button class="action-btn details-btn" onclick="showVerseDetails(${verse.id})" title="تفاصيل أكثر">
                <i class="fas fa-info-circle"></i>
                <span>تفاصيل</span>
            </button>
        </div>
        
        <div class="verse-menu" id="verseMenu${verse.id}" style="display: none;">
            <button onclick="copyVerse(${verse.id})">
                <i class="fas fa-copy"></i> نسخ النص
            </button>
            <button onclick="shareVerse(${verse.id})">
                <i class="fas fa-share-alt"></i> مشاركة
            </button>
            <button onclick="saveVerse(${verse.id})">
                <i class="fas fa-bookmark"></i> حفظ
            </button>
        </div>
    `;
    
    return card;
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // البحث
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // زر البحث
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // زر مسح البحث
    const clearBtn = document.getElementById('clearSearch');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearSearch);
    }
    
    // زر العودة للمشاعر
    const backToFeelingsBtn = document.getElementById('backToFeelings');
    if (backToFeelingsBtn) {
        backToFeelingsBtn.addEventListener('click', backToFeelings);
    }
    
    // زر العودة للصفحة الرئيسية
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}

// البحث في الآيات
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (searchTerm === '') {
        if (currentFeeling) {
            showFeelingVerses(currentFeeling);
        } else {
            displayFeelings();
        }
        return;
    }
    
    const results = searchVerses(searchTerm);
    displaySearchResults(results, searchTerm);
}

// البحث في الآيات
function searchVerses(searchTerm) {
    const results = [];
    const term = searchTerm.toLowerCase();
    
    allVerses.forEach(verse => {
        let score = 0;
        
        // البحث في العنوان
        if (verse.title.toLowerCase().includes(term)) {
            score += 3;
        }
        
        // البحث في نص الآية
        if (verse.verse_text.toLowerCase().includes(term)) {
            score += 2;
        }
        
        // البحث في المحتوى
        if (verse.content.toLowerCase().includes(term)) {
            score += 1;
        }
        
        // البحث في اسم الشعور
        if (verse.feeling.toLowerCase().includes(term)) {
            score += 2;
        }
        
        if (score > 0) {
            results.push({ ...verse, score });
        }
    });
    
    // ترتيب النتائج حسب النقاط
    return results.sort((a, b) => b.score - a.score);
}

// عرض نتائج البحث
function displaySearchResults(results, searchTerm) {
    // إخفاء قسم المشاعر وإظهار قسم الآيات
    document.getElementById('feelingsSection').style.display = 'none';
    document.getElementById('versesSection').style.display = 'block';
    
    // تحديث العنوان
    document.getElementById('feelingTitle').textContent = `نتائج البحث: "${searchTerm}"`;
    document.getElementById('feelingTitleEn').textContent = `Search Results: "${searchTerm}"`;
    
    // عرض النتائج
    const versesContainer = document.getElementById('versesContainer');
    versesContainer.innerHTML = '';
    
    if (results.length === 0) {
        versesContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>لا توجد نتائج</h3>
                <p>لم يتم العثور على آيات تحتوي على "${searchTerm}"</p>
                <button class="btn-primary" onclick="clearSearch()">مسح البحث</button>
            </div>
        `;
        updateVersesStats(0);
        return;
    }
    
    results.forEach((verse, index) => {
        const feeling = feelingsData[verse.feelingKey];
        const verseCard = createSearchResultCard(verse, feeling, index, searchTerm);
        versesContainer.appendChild(verseCard);
    });
    
    updateVersesStats(results.length);
}

// إنشاء بطاقة نتيجة البحث
function createSearchResultCard(verse, feeling, index, searchTerm) {
    const card = document.createElement('div');
    card.className = 'verse-card search-result';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // تمييز النص المطابق
    const highlightedTitle = highlightText(verse.title, searchTerm);
    const highlightedContent = highlightText(verse.content.substring(0, 200) + '...', searchTerm);
    
    card.innerHTML = `
        <div class="verse-header">
            <div class="verse-number">${verse.id}</div>
            <h3 class="verse-title">${highlightedTitle}</h3>
            <div class="feeling-badge" style="background-color: ${feeling.color}">
                ${verse.feeling}
            </div>
        </div>
        
        <div class="verse-text">
            ${verse.verse_text}
        </div>
        
        <div class="verse-content">
            ${highlightedContent}
        </div>
        
        <div class="verse-actions">
            <button class="action-btn copy-btn" onclick="copyVerse(${verse.id})" title="نسخ الآية">
                <i class="fas fa-copy"></i>
                <span>نسخ</span>
            </button>
            <button class="action-btn share-btn" onclick="shareVerse(${verse.id})" title="مشاركة الآية">
                <i class="fas fa-share-alt"></i>
                <span>مشاركة</span>
            </button>
            <button class="action-btn details-btn" onclick="showVerseDetails(${verse.id})" title="تفاصيل أكثر">
                <i class="fas fa-info-circle"></i>
                <span>تفاصيل</span>
            </button>
        </div>
    `;
    
    return card;
}

// تمييز النص المطابق
function highlightText(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// مسح البحث
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('feelingsSection').style.display = 'block';
    document.getElementById('versesSection').style.display = 'none';
    currentFeeling = '';
    updateStats();
}

// العودة للمشاعر
function backToFeelings() {
    document.getElementById('versesSection').style.display = 'none';
    document.getElementById('feelingsSection').style.display = 'block';
    currentFeeling = '';
    document.getElementById('searchInput').value = '';
    updateStats();
}

// تحديث الإحصائيات
function updateStats() {
    const totalFeelingsElement = document.getElementById('totalFeelings');
    const totalVersesElement = document.getElementById('totalVerses');
    
    if (totalFeelingsElement) {
        totalFeelingsElement.textContent = Object.keys(feelingsData).length;
    }
    
    if (totalVersesElement) {
        totalVersesElement.textContent = allVerses.length;
    }
}

// تحديث إحصائيات الآيات
function updateVersesStats(count) {
    const versesCountElement = document.getElementById('versesCount');
    if (versesCountElement) {
        versesCountElement.textContent = count;
    }
}

// نسخ الآية
function copyVerse(verseId) {
    const verse = allVerses.find(v => v.id === verseId);
    if (!verse) return;
    
    const textToCopy = `${verse.title}\n\n${verse.verse_text}\n\n${verse.content}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showNotification('تم نسخ الآية بنجاح!', 'success');
    }).catch(() => {
        showNotification('فشل في نسخ الآية', 'error');
    });
}

// مشاركة الآية
function shareVerse(verseId) {
    const verse = allVerses.find(v => v.id === verseId);
    if (!verse) return;
    
    const shareText = `${verse.title}\n\n${verse.verse_text}\n\nمن موقع بصيرة إيمان`;
    
    if (navigator.share) {
        navigator.share({
            title: verse.title,
            text: shareText,
            url: window.location.href
        });
    } else {
        // نسخ للحافظة كبديل
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('تم نسخ الآية للمشاركة!', 'success');
        });
    }
}

// عرض تفاصيل الآية
function showVerseDetails(verseId) {
    const verse = allVerses.find(v => v.id === verseId);
    if (!verse) return;
    
    const modal = createVerseModal(verse);
    document.body.appendChild(modal);
    
    // إظهار المودال
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// إنشاء مودال الآية
function createVerseModal(verse) {
    const modal = document.createElement('div');
    modal.className = 'verse-modal';
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    };
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${verse.title}</h2>
                <button class="close-btn" onclick="closeModal(this.closest('.verse-modal'))">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="verse-text-full">
                    ${verse.verse_text}
                </div>
                
                <div class="verse-content-full">
                    ${verse.content}
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn-secondary" onclick="copyVerse(${verse.id})">
                    <i class="fas fa-copy"></i> نسخ
                </button>
                <button class="btn-primary" onclick="shareVerse(${verse.id})">
                    <i class="fas fa-share-alt"></i> مشاركة
                </button>
            </div>
        </div>
    `;
    
    return modal;
}

// إغلاق المودال
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// تبديل قائمة الآية
function toggleVerseMenu(verseId) {
    const menu = document.getElementById(`verseMenu${verseId}`);
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
}

// حفظ الآية
function saveVerse(verseId) {
    const verse = allVerses.find(v => v.id === verseId);
    if (!verse) return;
    
    let savedVerses = JSON.parse(localStorage.getItem('savedVerses') || '[]');
    
    if (!savedVerses.find(v => v.id === verseId)) {
        savedVerses.push(verse);
        localStorage.setItem('savedVerses', JSON.stringify(savedVerses));
        showNotification('تم حفظ الآية!', 'success');
    } else {
        showNotification('الآية محفوظة مسبقاً', 'info');
    }
}

// عرض الإشعار
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// عرض الخطأ
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <h3>حدث خطأ</h3>
        <p>${message}</p>
        <button onclick="location.reload()" class="btn-primary">إعادة المحاولة</button>
    `;
    
    const container = document.getElementById('feelingsContainer') || document.getElementById('versesContainer');
    if (container) {
        container.innerHTML = '';
        container.appendChild(errorDiv);
    }
}

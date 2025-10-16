// بيانات الأحاديث
let hadithsData = {};
let allHadiths = [];

// تحميل البيانات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadHadithsData();
    setupEventListeners();
});

// تحميل بيانات الأحاديث
async function loadHadithsData() {
    try {
        const response = await fetch('./data/hadiths-data.json');
        if (!response.ok) {
            throw new Error('فشل في تحميل البيانات');
        }
        const data = await response.json();
        hadithsData = data;
        allHadiths = data.hadiths;
        
        displayHadiths();
        updateStats();
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        showError('حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.');
    }
}

// عرض الأحاديث
function displayHadiths() {
    const hadithsContainer = document.getElementById('hadithsContainer');
    if (!hadithsContainer) return;
    
    hadithsContainer.innerHTML = '';
    
    allHadiths.forEach((hadith, index) => {
        const hadithCard = createHadithCard(hadith, index);
        hadithsContainer.appendChild(hadithCard);
    });
    
    // إضافة تأثيرات الرسوم المتحركة
    const cards = hadithsContainer.querySelectorAll('.hadith-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
}

// إنشاء بطاقة الحديث
function createHadithCard(hadith, index) {
    const card = document.createElement('div');
    card.className = 'hadith-card';
    card.onclick = () => showHadithDetails(hadith.id);
    
    card.innerHTML = `
        <div class="hadith-number">${hadith.id}</div>
        <div class="hadith-content">
            <h3 class="hadith-title">${hadith.title}</h3>
            <p class="hadith-preview">${hadith.verse_text}</p>
            <div class="hadith-meta">
                <span class="hadith-type">حديث نبوي شريف</span>
            </div>
        </div>
        <div class="hadith-arrow">
            <i class="fas fa-chevron-left"></i>
        </div>
    `;
    
    return card;
}

// عرض تفاصيل الحديث
function showHadithDetails(hadithId) {
    const hadith = allHadiths.find(h => h.id === hadithId);
    if (!hadith) return;
    
    // إنشاء صفحة الحديث ديناميكياً
    const hadithPage = createHadithPage(hadith);
    document.body.innerHTML = hadithPage;
    
    // إعداد مستمعي الأحداث للصفحة الجديدة
    setupHadithPageListeners(hadith);
}

// إنشاء صفحة الحديث
function createHadithPage(hadith) {
    return `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${hadith.title} - BASIRA IMAN</title>
            <link rel="stylesheet" href="styles.css">
            <link rel="stylesheet" href="hadith-styles.css">
            <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        </head>
        <body>
            <!-- تذكير الصلاة على النبي -->
            <div class="prophet-reminder">
                <div class="reminder-content">
                    <span class="reminder-ar">صل على النبي محمد 💚</span>
                    <span class="reminder-en">Peace and blessings be upon our Prophet Muhammad 💚</span>
                </div>
            </div>

            <div class="container">
                <!-- رأس الصفحة -->
                <header class="page-header">
                    <button class="back-btn" onclick="goBackToHadiths()">
                        <i class="fas fa-arrow-right"></i>
                        <span>العودة للأحاديث</span>
                    </button>
                    
                    <div class="page-title">
                        <h1 class="title-ar">${hadith.title}</h1>
                        <p class="title-en">Prophet's Teaching</p>
                    </div>
                </header>

                <!-- محتوى الحديث -->
                <main class="hadith-content">
                    <div class="hadith-card-full">
                        <div class="hadith-header">
                            <div class="hadith-icon">
                                <i class="fas fa-mosque"></i>
                            </div>
                            <h2>الحديث الشريف</h2>
                        </div>
                        
                        <div class="hadith-text">
                            ${hadith.verse_text}
                        </div>
                        
                        <div class="hadith-source">
                            <i class="fas fa-book"></i>
                            <span>حديث نبوي شريف</span>
                        </div>
                    </div>

                    <div class="explanation-card">
                        <div class="explanation-header">
                            <div class="explanation-icon">
                                <i class="fas fa-lightbulb"></i>
                            </div>
                            <h2>شرح الحديث</h2>
                        </div>
                        
                        <div class="explanation-content">
                            ${hadith.content}
                        </div>
                    </div>

                    <!-- أزرار العمل -->
                    <div class="action-buttons">
                        <button class="action-btn copy-btn" onclick="copyHadith()">
                            <i class="fas fa-copy"></i>
                            <span>نسخ الحديث</span>
                        </button>
                        <button class="action-btn share-btn" onclick="shareHadith()">
                            <i class="fas fa-share-alt"></i>
                            <span>مشاركة</span>
                        </button>
                        <button class="action-btn save-btn" onclick="saveHadith()">
                            <i class="fas fa-bookmark"></i>
                            <span>حفظ</span>
                        </button>
                    </div>
                </main>
            </div>

            <!-- الهلال الإسلامي في الخلفية -->
            <div class="crescent-background">
                <i class="fas fa-moon"></i>
            </div>
        </body>
        </html>
    `;
}

// إعداد مستمعي الأحداث لصفحة الحديث
function setupHadithPageListeners(hadith) {
    // تخزين بيانات الحديث الحالي
    window.currentHadith = hadith;
    
    // إعداد الوظائف العامة
    window.goBackToHadiths = function() {
        window.location.href = 'hadiths.html';
    };
    
    window.copyHadith = function() {
        const textToCopy = `${hadith.title}\n\n${hadith.verse_text}\n\n${hadith.content}`;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('تم نسخ الحديث بنجاح!', 'success');
        }).catch(() => {
            showNotification('فشل في نسخ الحديث', 'error');
        });
    };
    
    window.shareHadith = function() {
        const shareText = `${hadith.title}\n\n${hadith.verse_text}\n\nمن موقع بصيرة إيمان`;
        
        if (navigator.share) {
            navigator.share({
                title: hadith.title,
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('تم نسخ الحديث للمشاركة!', 'success');
            });
        }
    };
    
    window.saveHadith = function() {
        let savedHadiths = JSON.parse(localStorage.getItem('savedHadiths') || '[]');
        
        if (!savedHadiths.find(h => h.id === hadith.id)) {
            savedHadiths.push(hadith);
            localStorage.setItem('savedHadiths', JSON.stringify(savedHadiths));
            showNotification('تم حفظ الحديث!', 'success');
        } else {
            showNotification('الحديث محفوظ مسبقاً', 'info');
        }
    };
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
    
    // زر العودة للصفحة الرئيسية
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}

// البحث في الأحاديث
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (searchTerm === '') {
        displayHadiths();
        return;
    }
    
    const results = searchHadiths(searchTerm);
    displaySearchResults(results, searchTerm);
}

// البحث في الأحاديث
function searchHadiths(searchTerm) {
    const results = [];
    const term = searchTerm.toLowerCase();
    
    allHadiths.forEach(hadith => {
        let score = 0;
        
        // البحث في العنوان
        if (hadith.title.toLowerCase().includes(term)) {
            score += 3;
        }
        
        // البحث في نص الحديث
        if (hadith.verse_text.toLowerCase().includes(term)) {
            score += 2;
        }
        
        // البحث في المحتوى
        if (hadith.content.toLowerCase().includes(term)) {
            score += 1;
        }
        
        if (score > 0) {
            results.push({ ...hadith, score });
        }
    });
    
    return results.sort((a, b) => b.score - a.score);
}

// عرض نتائج البحث
function displaySearchResults(results, searchTerm) {
    const hadithsContainer = document.getElementById('hadithsContainer');
    hadithsContainer.innerHTML = '';
    
    if (results.length === 0) {
        hadithsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>لا توجد نتائج</h3>
                <p>لم يتم العثور على أحاديث تحتوي على "${searchTerm}"</p>
                <button class="btn-primary" onclick="clearSearch()">مسح البحث</button>
            </div>
        `;
        updateSearchStats(0);
        return;
    }
    
    results.forEach((hadith, index) => {
        const hadithCard = createSearchResultCard(hadith, index, searchTerm);
        hadithsContainer.appendChild(hadithCard);
    });
    
    updateSearchStats(results.length);
}

// إنشاء بطاقة نتيجة البحث
function createSearchResultCard(hadith, index, searchTerm) {
    const card = document.createElement('div');
    card.className = 'hadith-card search-result';
    card.style.animationDelay = `${index * 0.1}s`;
    card.onclick = () => showHadithDetails(hadith.id);
    
    // تمييز النص المطابق
    const highlightedTitle = highlightText(hadith.title, searchTerm);
    const highlightedContent = highlightText(hadith.content.substring(0, 150) + '...', searchTerm);
    
    card.innerHTML = `
        <div class="hadith-number">${hadith.id}</div>
        <div class="hadith-content">
            <h3 class="hadith-title">${highlightedTitle}</h3>
            <p class="hadith-preview">${hadith.verse_text}</p>
            <p class="hadith-excerpt">${highlightedContent}</p>
            <div class="hadith-meta">
                <span class="hadith-type">حديث نبوي شريف</span>
                <span class="search-score">نقاط التطابق: ${hadith.score}</span>
            </div>
        </div>
        <div class="hadith-arrow">
            <i class="fas fa-chevron-left"></i>
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
    displayHadiths();
    updateStats();
}

// تحديث الإحصائيات
function updateStats() {
    const totalHadithsElement = document.getElementById('totalHadiths');
    const availableHadithsElement = document.getElementById('availableHadiths');
    
    if (totalHadithsElement) {
        totalHadithsElement.textContent = '100'; // العدد المخطط له
    }
    
    if (availableHadithsElement) {
        availableHadithsElement.textContent = allHadiths.length;
    }
}

// تحديث إحصائيات البحث
function updateSearchStats(count) {
    const searchCountElement = document.getElementById('searchCount');
    if (searchCountElement) {
        searchCountElement.textContent = count;
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
    
    const container = document.getElementById('hadithsContainer');
    if (container) {
        container.innerHTML = '';
        container.appendChild(errorDiv);
    }
}

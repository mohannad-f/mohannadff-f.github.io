// بيانات المشاعر والآيات
let feelingsData = [];
let allVersesData = {};
let currentFeeling = null;
let currentVerse = null;

// تحميل البيانات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', async function() {
    await loadFeelingsData();
    await loadVersesData();
    renderFeelings();
    setupSearch();
    updateStats();
});

// تحميل بيانات المشاعر
async function loadFeelingsData() {
    try {
        const response = await fetch('data/all-feelings.json');
        const data = await response.json();
        feelingsData = data.feelings;
    } catch (error) {
        console.error('خطأ في تحميل بيانات المشاعر:', error);
        showError('فشل في تحميل بيانات المشاعر');
    }
}

// تحميل بيانات الآيات من جميع الملفات
async function loadVersesData() {
    const fileMapping = {
        'happy': '0_Hg0FlOsnAdqX01pirRlYPT_1760382303171_na1fn_L2hvbWUvdWJ1bnR1L291dHB1dA.json',
        'angry': '1_UvO093QbQmJZGWfvJBfMBq_1760383211720_na1fn_L2hvbWUvdWJ1bnR1L291dHB1dA.json',
        'sad': '2_1z7sKm7tHfLibboMfAH0sh_1760382290669_na1fn_L2hvbWUvdWJ1bnR1L291dHB1dA.json',
        'alone': '3_qXlF2OAEsXQ5GRehjD6mW0_1760382267595_na1fn_L2hvbWUvdWJ1bnR1L291dHB1dA.json',
        'regret': '4_5lR5R7qfmGbKrplvQdD7Vv_1760382268777_na1fn_L2hvbWUvdWJ1bnR1L291dHB1dA.json',
        'afraid': '5_R8uCyJfWNH6WB1rAbE21A0_1760382291121_na1fn_L2hvbWUvdWJ1bnR1L291dHB1dF92ZXJzZXM.json',
        'lost': '6_bO7cs4yRkH5YkAg8YTvmoV_1760382303832_na1fn_L2hvbWUvdWJ1bnR1L291dHB1dA.json',
        'message': '7_pPqKx7ZmhSo2Ue4QhrLoIv_1760382322900_na1fn_L2hvbWUvdWJ1bnR1L291dHB1dA.json'
    };

    for (const [feelingId, fileName] of Object.entries(fileMapping)) {
        try {
            const response = await fetch(`data/${fileName}`);
            const data = await response.json();
            allVersesData[feelingId] = data.verses || [];
        } catch (error) {
            console.error(`خطأ في تحميل بيانات ${feelingId}:`, error);
            allVersesData[feelingId] = [];
        }
    }
}

// عرض المشاعر
function renderFeelings() {
    const container = document.getElementById('feelingsContainer');
    if (!container) return;

    container.innerHTML = '';

    feelingsData.forEach(feeling => {
        const versesCount = allVersesData[feeling.id] ? allVersesData[feeling.id].length : 0;
        
        const feelingCard = document.createElement('div');
        feelingCard.className = 'feeling-card';
        feelingCard.style.setProperty('--feeling-color', feeling.color);
        feelingCard.setAttribute('tabindex', '0');
        feelingCard.setAttribute('role', 'button');
        feelingCard.setAttribute('aria-label', `${feeling.name_ar} - ${versesCount} آيات`);
        
        feelingCard.innerHTML = `
            <div class="feeling-icon">
                <i class="${feeling.icon}"></i>
            </div>
            <h3 class="feeling-name-ar">${feeling.name_ar}</h3>
            <p class="feeling-name-en">${feeling.name_en}</p>
            <div class="feeling-verses-count">${versesCount} آيات</div>
        `;
        
        feelingCard.addEventListener('click', () => openFeelingModal(feeling));
        feelingCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFeelingModal(feeling);
            }
        });
        
        container.appendChild(feelingCard);
    });
}

// فتح نافذة منبثقة للشعور
function openFeelingModal(feeling) {
    currentFeeling = feeling;
    const verses = allVersesData[feeling.id] || [];
    
    const modal = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    title.textContent = `${feeling.name_ar} - ${feeling.name_en}`;
    
    if (verses.length === 0) {
        body.innerHTML = `
            <div class="no-results">
                <i class="fas fa-book-open"></i>
                <p>لا توجد آيات متاحة لهذا الشعور حالياً</p>
                <p>سيتم إضافة المزيد قريباً إن شاء الله</p>
            </div>
        `;
    } else {
        body.innerHTML = verses.map(verse => `
            <div class="verse-item" onclick="openVerseModal('${feeling.id}', ${verse.id})" style="--feeling-color: ${feeling.color}">
                <h4 class="verse-title">${verse.title}</h4>
                <div class="verse-text">${verse.verse_text}</div>
                <div class="verse-preview">${verse.content.substring(0, 200)}...</div>
            </div>
        `).join('');
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// فتح نافذة منبثقة للآية
function openVerseModal(feelingId, verseId) {
    const verses = allVersesData[feelingId] || [];
    const verse = verses.find(v => v.id === verseId);
    
    if (!verse) return;
    
    currentVerse = verse;
    
    const modal = document.getElementById('verseModalOverlay');
    const title = document.getElementById('verseModalTitle');
    const body = document.getElementById('verseModalBody');
    
    title.textContent = verse.title;
    
    body.innerHTML = `
        <div class="verse-text">${verse.verse_text}</div>
        <div class="verse-content">
            <h4>التفسير:</h4>
            <p>${verse.content}</p>
            ${verse.english_content ? `
                <h4>English Interpretation:</h4>
                <p style="direction: ltr; text-align: left; font-family: 'Roboto', sans-serif;">${verse.english_content}</p>
            ` : ''}
        </div>
    `;
    
    modal.classList.add('show');
}

// إغلاق النافذة المنبثقة الرئيسية
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentFeeling = null;
}

// إغلاق نافذة منبثقة الآية
function closeVerseModal() {
    const modal = document.getElementById('verseModalOverlay');
    modal.classList.remove('show');
    currentVerse = null;
}

// إعداد البحث
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const clearButton = document.getElementById('clearSearch');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (query.length === 0) {
            hideSearchResults();
            clearButton.classList.remove('show');
            updateSearchCount(0);
            return;
        }
        
        clearButton.classList.add('show');
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            clearSearch();
        }
    });
}

// تنفيذ البحث
function performSearch(query) {
    const results = [];
    
    // البحث في أسماء المشاعر
    feelingsData.forEach(feeling => {
        if (feeling.name_ar.includes(query) || feeling.name_en.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                type: 'feeling',
                feeling: feeling,
                title: `${feeling.name_ar} - ${feeling.name_en}`,
                preview: `شعور ${feeling.name_ar} مع ${allVersesData[feeling.id] ? allVersesData[feeling.id].length : 0} آيات`
            });
        }
    });
    
    // البحث في الآيات
    Object.keys(allVersesData).forEach(feelingId => {
        const feeling = feelingsData.find(f => f.id === feelingId);
        const verses = allVersesData[feelingId] || [];
        
        verses.forEach(verse => {
            if (verse.title.includes(query) || 
                verse.verse_text.includes(query) || 
                verse.content.includes(query) ||
                (verse.english_content && verse.english_content.toLowerCase().includes(query.toLowerCase()))) {
                
                results.push({
                    type: 'verse',
                    feeling: feeling,
                    verse: verse,
                    title: verse.title,
                    preview: verse.content.substring(0, 150) + '...'
                });
            }
        });
    });
    
    displaySearchResults(results);
    updateSearchCount(results.length);
}

// عرض نتائج البحث
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item">
                <div class="result-title">لا توجد نتائج</div>
                <div class="result-preview">لم يتم العثور على نتائج مطابقة لبحثك</div>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="handleSearchResult('${result.type}', '${result.feeling.id}', ${result.verse ? result.verse.id : 'null'})">
                <div class="result-title">${result.title}</div>
                <div class="result-preview">${result.preview}</div>
            </div>
        `).join('');
    }
    
    searchResults.classList.add('show');
}

// التعامل مع نتيجة البحث
function handleSearchResult(type, feelingId, verseId) {
    hideSearchResults();
    
    const feeling = feelingsData.find(f => f.id === feelingId);
    if (!feeling) return;
    
    if (type === 'feeling') {
        openFeelingModal(feeling);
    } else if (type === 'verse' && verseId !== 'null') {
        openFeelingModal(feeling);
        setTimeout(() => {
            openVerseModal(feelingId, parseInt(verseId));
        }, 300);
    }
}

// إخفاء نتائج البحث
function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.classList.remove('show');
    }
}

// مسح البحث
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    
    if (clearButton) {
        clearButton.classList.remove('show');
    }
    
    hideSearchResults();
    updateSearchCount(0);
}

// تحديث عداد البحث
function updateSearchCount(count) {
    const searchCountElement = document.getElementById('searchCount');
    if (searchCountElement) {
        searchCountElement.textContent = count;
    }
}

// تحديث الإحصائيات
function updateStats() {
    const totalVersesElement = document.getElementById('totalVerses');
    if (totalVersesElement) {
        const totalVerses = Object.values(allVersesData).reduce((sum, verses) => sum + verses.length, 0);
        totalVersesElement.textContent = totalVerses;
    }
}

// نسخ الآية
function copyVerse() {
    if (!currentVerse) return;
    
    const textToCopy = `${currentVerse.title}\n\n${currentVerse.verse_text}\n\n${currentVerse.content}`;
    
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
}

// مشاركة الآية
function shareVerse() {
    if (!currentVerse) return;
    
    const shareText = `${currentVerse.title}\n\n${currentVerse.verse_text}\n\nمن موقع بصيرة إيمان - BASIRA IMAN`;
    
    if (navigator.share) {
        navigator.share({
            title: currentVerse.title,
            text: shareText,
            url: window.location.href
        });
    } else {
        // نسخ رابط المشاركة
        navigator.clipboard.writeText(shareText).then(() => {
            alert('تم نسخ النص للمشاركة');
        });
    }
}

// عرض رسالة خطأ
function showError(message) {
    const container = document.getElementById('feelingsContainer');
    if (container) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <button onclick="location.reload()" class="action-btn">
                    <i class="fas fa-refresh"></i>
                    <span>إعادة المحاولة</span>
                </button>
            </div>
        `;
    }
}

// إغلاق النوافذ المنبثقة بالضغط على Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeVerseModal();
        hideSearchResults();
    }
});

// إغلاق نتائج البحث عند النقر خارجها
document.addEventListener('click', function(e) {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(e.target)) {
        hideSearchResults();
    }
});

// تأثيرات إضافية عند التحميل
window.addEventListener('load', function() {
    // تأثير ظهور تدريجي للعناصر
    const elements = document.querySelectorAll('.page-header, .search-section, .stats-section');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 100);
    });
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

// حفظ حالة البحث في التخزين المحلي
function saveSearchState() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value) {
        localStorage.setItem('ayat_search_query', searchInput.value);
    }
}

// استعادة حالة البحث
function restoreSearchState() {
    const savedQuery = localStorage.getItem('ayat_search_query');
    const searchInput = document.getElementById('searchInput');
    
    if (savedQuery && searchInput) {
        searchInput.value = savedQuery;
        performSearch(savedQuery);
        document.getElementById('clearSearch').classList.add('show');
    }
}

// حفظ الحالة عند مغادرة الصفحة
window.addEventListener('beforeunload', saveSearchState);

// استعادة الحالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(restoreSearchState, 1000);
});

// بيانات المشاعر والآيات مضمنة مباشرة
const feelingsData = {
  "happy": {
    "name_ar": "سعيد",
    "name_en": "Happy",
    "icon": "fas fa-smile",
    "color": "#4CAF50",
    "verses": [
      {
        "id": 1,
        "title": "الحديد ١٢ / Al-Hadid 12",
        "verse_text": "﴿يَوْمَ تَرَى ٱلۡمُؤۡمِنِينَ وَٱلۡمُؤۡمِنَـٰتِ يَسۡعَىٰ نُورُهُم بَيۡنَ أَيۡدِيهِمۡ وَبِأَيۡمَـٰنِهِم بُشۡرَىٰكُمُ ٱلۡيَوۡمَ جَنَّـٰتٞ تَجۡرِي مِن تَحۡتِهَا ٱلۡأَنۡهَـٰرُ خَـٰلِدِينَ فِيهَاۚ ذَٰلِكَ هُوَ ٱلۡفَوۡزُ ٱلۡعَظِيمُ﴾ [الحديد: ١٢]",
        "content": "اسمع يا عزيزي القارئ، هذه الآية الكريمة ترسم لوحة من أعظم مشاهد يوم القيامة، لحظة السعادة الكبرى التي تفوق كل سعادة عرفها البشر في الدنيا. يقول الله تعالى إنك سترى المؤمنين والمؤمنات يوم القيامة، والنور يفيض من أمامهم وعن أيمانهم، يضيء طريقهم في ظلمات ذلك اليوم العظيم."
      },
      {
        "id": 2,
        "title": "الأحقاف ١٤ / Al-Ahqaf 14",
        "verse_text": "﴿أُو۟لَـٰٓئِكَ أَصْحَـٰبُ ٱلۡجَنَّةِ خَـٰلِدِينَ فِيهَا جَزَآءًۢ بِمَا كَانُوا۟ يَعۡمَلُونَ﴾ [الأحقاف: ١٤]",
        "content": "اسمع يا عزيزي القارئ، هذه الآية تأتي بعد أن ذكر الله حال المؤمنين الذين قالوا: ربنا الله ثم استقاموا، ما التفتوا لغيره ولا بدّلوا ولا انحرفوا. النتيجة التي يعلنها الله لهم هنا هي خلاصة السعادة والطمأنينة."
      }
    ]
  },
  "angry": {
    "name_ar": "الغضب",
    "name_en": "Angry",
    "icon": "fas fa-angry",
    "color": "#F44336",
    "verses": [
      {
        "id": 1,
        "title": "الشورى ٤٠ / Ash-Shura 40",
        "verse_text": "﴿وَجَزَآءُ سَيِّئَةٍ سَيِّئَةٞ مِّثۡلُهَاۖ فَمَنۡ عَفَا وَأَصۡلَحَ فَأَجۡرُهُۥ عَلَى ٱللَّهِۚ إِنَّهُۥ لَا يُحِبُّ ٱلظَّـٰلِمِينَ﴾ [الشورى: ٤٠]",
        "content": "اسمع يا عزيزي القارئ، هذه الآية تعلمك كيف تتعامل مع الغضب بحكمة. الله يقول إن من حقك أن تردّ السيئة بمثلها، لكن العفو والإصلاح أعظم أجراً عند الله. فعندما تغضب، تذكر أن العفو طريق إلى رضا الله."
      }
    ]
  },
  "sad": {
    "name_ar": "حزن",
    "name_en": "Sad",
    "icon": "fas fa-sad-tear",
    "color": "#2196F3",
    "verses": [
      {
        "id": 1,
        "title": "البقرة ١٥٥-١٥٦ / Al-Baqarah 155-156",
        "verse_text": "﴿وَلَنَبۡلُوَنَّكُم بِشَيۡءٍ مِّنَ ٱلۡخَوۡفِ وَٱلۡجُوعِ وَنَقۡصٍ مِّنَ ٱلۡأَمۡوَٰلِ وَٱلۡأَنفُسِ وَٱلثَّمَرَٰتِۗ وَبَشِّرِ ٱلصَّـٰبِرِينَ ٱلَّذِينَ إِذَآ أَصَـٰبَتۡهُم مُّصِيبَةٞ قَالُوٓاْ إِنَّا لِلَّهِ وَإِنَّآ إِلَيۡهِ رَٰجِعُونَ﴾ [البقرة: ١٥٥-١٥٦]",
        "content": "اسمع يا عزيزي القارئ، هذه الآية تخاطب قلبك المحزون بلطف ورحمة. الله يخبرك أن الابتلاء سنة الحياة، وأن الحزن جزء من الامتحان. لكن الصابرين لهم بشارة عظيمة، فعندما تقول 'إنا لله وإنا إليه راجعون' تتحول مصيبتك إلى أجر."
      }
    ]
  },
  "lonely": {
    "name_ar": "وحدة",
    "name_en": "Lonely",
    "icon": "fas fa-user",
    "color": "#9C27B0",
    "verses": [
      {
        "id": 1,
        "title": "البقرة ١٨٦ / Al-Baqarah 186",
        "verse_text": "﴿وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌۖ أُجِيبُ دَعۡوَةَ ٱلدَّاعِ إِذَا دَعَانِۖ فَلۡيَسۡتَجِيبُواْ لِي وَلۡيُؤۡمِنُواْ بِي لَعَلَّهُمۡ يَرۡشُدُونَ﴾ [البقرة: ١٨٦]",
        "content": "اسمع يا عزيزي القارئ، هذه الآية تمحو شعور الوحدة من قلبك تماماً. الله يقول لك إنه قريب منك، أقرب إليك من حبل الوريد. عندما تشعر بالوحدة، تذكر أن الله معك دائماً، يسمع دعاءك ويجيب نداءك."
      }
    ]
  },
  "regret": {
    "name_ar": "الندم",
    "name_en": "Regret",
    "icon": "fas fa-heart-broken",
    "color": "#795548",
    "verses": [
      {
        "id": 1,
        "title": "الزمر ٥٣ / Az-Zumar 53",
        "verse_text": "﴿قُلۡ يَـٰعِبَادِيَ ٱلَّذِينَ أَسۡرَفُواْ عَلَىٰٓ أَنفُسِهِمۡ لَا تَقۡنَطُواْ مِن رَّحۡمَةِ ٱللَّهِۚ إِنَّ ٱللَّهَ يَغۡفِرُ ٱلذُّنُوبَ جَمِيعًاۚ إِنَّهُۥ هُوَ ٱلۡغَفُورُ ٱلرَّحِيمُ﴾ [الزمر: ٥٣]",
        "content": "اسمع يا عزيزي القارئ، هذه الآية تشفي قلبك من ألم الندم. مهما كانت ذنوبك، مهما كان خطؤك، الله يقول لك: لا تيأس من رحمتي. إن الله يغفر الذنوب جميعاً، فقط ارجع إليه بصدق."
      }
    ]
  },
  "fear": {
    "name_ar": "الخوف",
    "name_en": "Fear",
    "icon": "fas fa-exclamation-triangle",
    "color": "#FF9800",
    "verses": [
      {
        "id": 1,
        "title": "البقرة ٦٢ / Al-Baqarah 62",
        "verse_text": "﴿إِنَّ ٱلَّذِينَ ءَامَنُواْ وَٱلَّذِينَ هَادُواْ وَٱلنَّصَـٰرَىٰ وَٱلصَّـٰبِـِٔينَ مَنۡ ءَامَنَ بِٱللَّهِ وَٱلۡيَوۡمِ ٱلۡأٓخِرِ وَعَمِلَ صَـٰلِحًا فَلَهُمۡ أَجۡرُهُمۡ عِندَ رَبِّهِمۡ وَلَا خَوۡفٌ عَلَيۡهِمۡ وَلَا هُمۡ يَحۡزَنُونَ﴾ [البقرة: ٦٢]",
        "content": "اسمع يا عزيزي القارئ، هذه الآية تزيل الخوف من قلبك. الله يعدك أنه إذا آمنت به وعملت صالحاً، فلا خوف عليك في الدنيا ولا في الآخرة. هذا وعد من الله، والله لا يخلف الميعاد."
      }
    ]
  },
  "lost": {
    "name_ar": "تائه",
    "name_en": "Lost",
    "icon": "fas fa-compass",
    "color": "#607D8B",
    "verses": [
      {
        "id": 1,
        "title": "الشرح ٥-٦ / Ash-Sharh 5-6",
        "verse_text": "﴿فَإِنَّ مَعَ ٱلۡعُسۡرِ يُسۡرًا إِنَّ مَعَ ٱلۡعُسۡرِ يُسۡرًا﴾ [الشرح: ٥-٦]",
        "content": "اسمع يا عزيزي القارئ، عندما تشعر بأنك تائه ولا تعرف طريقك، تذكر هذه الآية. الله يؤكد لك مرتين أن مع العسر يسراً. معنى ذلك أن الفرج قادم، وأن الطريق سيتضح، وأن الله سيهديك."
      }
    ]
  },
  "message": {
    "name_ar": "رسالة",
    "name_en": "Message",
    "icon": "fas fa-envelope-open-text",
    "color": "#E91E63",
    "verses": [
      {
        "id": 1,
        "title": "الإسراء ٩ / Al-Isra 9",
        "verse_text": "﴿إِنَّ هَـٰذَا ٱلۡقُرۡءَانَ يَهۡدِي لِلَّتِي هِيَ أَقۡوَمُ وَيُبَشِّرُ ٱلۡمُؤۡمِنِينَ ٱلَّذِينَ يَعۡمَلُونَ ٱلصَّـٰلِحَـٰتِ أَنَّ لَهُمۡ أَجۡرًا كَبِيرًا﴾ [الإسراء: ٩]",
        "content": "اسمع يا عزيزي القارئ، هذه رسالة الله إليك. القرآن هو دليلك في الحياة، يهديك للطريق الأقوم والأصح. كل آية فيه رسالة حب ورحمة وهداية من الله إليك شخصياً."
      }
    ]
  }
};

// متغيرات عامة
let currentFeeling = null;
let allVerses = [];
let filteredVerses = [];

// تحميل البيانات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadFeelingsData();
});

// تحميل بيانات المشاعر
function loadFeelingsData() {
    try {
        displayFeelings();
        updateStats();
        console.log('تم تحميل البيانات بنجاح');
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        showError('حدث خطأ في تحميل البيانات');
    }
}

// عرض المشاعر
function displayFeelings() {
    const feelingsContainer = document.getElementById('feelings-container');
    if (!feelingsContainer) return;

    feelingsContainer.innerHTML = '';

    Object.keys(feelingsData).forEach(feelingKey => {
        const feeling = feelingsData[feelingKey];
        const feelingCard = createFeelingCard(feelingKey, feeling);
        feelingsContainer.appendChild(feelingCard);
    });
}

// إنشاء بطاقة شعور
function createFeelingCard(feelingKey, feeling) {
    const card = document.createElement('div');
    card.className = 'feeling-card';
    card.style.borderColor = feeling.color;
    card.onclick = () => showFeelingVerses(feelingKey);

    card.innerHTML = `
        <div class="feeling-icon" style="color: ${feeling.color};">
            <i class="${feeling.icon}"></i>
        </div>
        <div class="feeling-content">
            <h3 class="feeling-title-ar">${feeling.name_ar}</h3>
            <p class="feeling-title-en">${feeling.name_en}</p>
            <span class="verses-count">${feeling.verses.length} آية</span>
        </div>
    `;

    return card;
}

// عرض آيات الشعور المحدد
function showFeelingVerses(feelingKey) {
    const feeling = feelingsData[feelingKey];
    if (!feeling) return;

    currentFeeling = feelingKey;
    
    // إخفاء المشاعر وإظهار الآيات
    document.getElementById('feelings-section').style.display = 'none';
    document.getElementById('verses-section').style.display = 'block';
    
    // تحديث العنوان
    document.getElementById('feeling-title-ar').textContent = feeling.name_ar;
    document.getElementById('feeling-title-en').textContent = feeling.name_en;
    
    // عرض الآيات
    displayVerses(feeling.verses);
    
    // تحديث الإحصائيات
    updateVersesStats(feeling.verses.length);
}

// عرض الآيات
function displayVerses(verses) {
    const versesContainer = document.getElementById('verses-container');
    if (!versesContainer) return;

    versesContainer.innerHTML = '';

    verses.forEach(verse => {
        const verseCard = createVerseCard(verse);
        versesContainer.appendChild(verseCard);
    });
}

// إنشاء بطاقة آية
function createVerseCard(verse) {
    const card = document.createElement('div');
    card.className = 'verse-card';
    card.onclick = () => showVerseModal(verse);

    card.innerHTML = `
        <div class="verse-header">
            <h4 class="verse-title">${verse.title}</h4>
        </div>
        <div class="verse-text">
            ${verse.verse_text}
        </div>
        <div class="verse-preview">
            ${verse.content.substring(0, 100)}...
        </div>
    `;

    return card;
}

// عرض نافذة الآية المنبثقة
function showVerseModal(verse) {
    const modal = document.getElementById('verse-modal');
    if (!modal) return;

    document.getElementById('modal-verse-title').textContent = verse.title;
    document.getElementById('modal-verse-text').textContent = verse.verse_text;
    document.getElementById('modal-verse-content').textContent = verse.content;

    modal.style.display = 'flex';
}

// إغلاق النافذة المنبثقة
function closeModal() {
    const modal = document.getElementById('verse-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// العودة للمشاعر
function backToFeelings() {
    document.getElementById('verses-section').style.display = 'none';
    document.getElementById('feelings-section').style.display = 'block';
    currentFeeling = null;
    updateStats();
}

// البحث في الآيات
function searchVerses() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (!searchTerm) {
        if (currentFeeling) {
            displayVerses(feelingsData[currentFeeling].verses);
            updateVersesStats(feelingsData[currentFeeling].verses.length);
        } else {
            displayFeelings();
            updateStats();
        }
        return;
    }

    let searchResults = [];

    if (currentFeeling) {
        // البحث في الشعور الحالي فقط
        searchResults = feelingsData[currentFeeling].verses.filter(verse =>
            verse.title.toLowerCase().includes(searchTerm) ||
            verse.verse_text.toLowerCase().includes(searchTerm) ||
            verse.content.toLowerCase().includes(searchTerm)
        );
        displayVerses(searchResults);
        updateVersesStats(searchResults.length);
    } else {
        // البحث في جميع المشاعر
        Object.keys(feelingsData).forEach(feelingKey => {
            const feeling = feelingsData[feelingKey];
            const matchingVerses = feeling.verses.filter(verse =>
                verse.title.toLowerCase().includes(searchTerm) ||
                verse.verse_text.toLowerCase().includes(searchTerm) ||
                verse.content.toLowerCase().includes(searchTerm) ||
                feeling.name_ar.toLowerCase().includes(searchTerm) ||
                feeling.name_en.toLowerCase().includes(searchTerm)
            );
            
            if (matchingVerses.length > 0) {
                searchResults.push({
                    feeling: feeling,
                    feelingKey: feelingKey,
                    verses: matchingVerses
                });
            }
        });

        displaySearchResults(searchResults);
    }
}

// عرض نتائج البحث
function displaySearchResults(results) {
    const feelingsContainer = document.getElementById('feelings-container');
    if (!feelingsContainer) return;

    feelingsContainer.innerHTML = '';

    if (results.length === 0) {
        feelingsContainer.innerHTML = '<p class="no-results">لم يتم العثور على نتائج</p>';
        return;
    }

    results.forEach(result => {
        const resultCard = createSearchResultCard(result);
        feelingsContainer.appendChild(resultCard);
    });

    updateStats(results.length);
}

// إنشاء بطاقة نتيجة بحث
function createSearchResultCard(result) {
    const card = document.createElement('div');
    card.className = 'feeling-card search-result';
    card.style.borderColor = result.feeling.color;
    card.onclick = () => showFeelingVerses(result.feelingKey);

    card.innerHTML = `
        <div class="feeling-icon" style="color: ${result.feeling.color};">
            <i class="${result.feeling.icon}"></i>
        </div>
        <div class="feeling-content">
            <h3 class="feeling-title-ar">${result.feeling.name_ar}</h3>
            <p class="feeling-title-en">${result.feeling.name_en}</p>
            <span class="verses-count">${result.verses.length} نتيجة</span>
        </div>
    `;

    return card;
}

// تحديث الإحصائيات
function updateStats(searchCount = null) {
    const totalFeelings = Object.keys(feelingsData).length;
    const totalVerses = Object.values(feelingsData).reduce((sum, feeling) => sum + feeling.verses.length, 0);

    document.getElementById('feelings-count').textContent = searchCount !== null ? searchCount : totalFeelings;
    document.getElementById('verses-count').textContent = totalVerses;
    document.getElementById('total-count').textContent = totalFeelings;
}

// تحديث إحصائيات الآيات
function updateVersesStats(count) {
    document.getElementById('verses-count').textContent = count;
}

// عرض رسالة خطأ
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const container = document.getElementById('feelings-container') || document.body;
    container.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// نسخ النص
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('تم نسخ النص');
    });
}

// مشاركة النص
function shareText(text) {
    if (navigator.share) {
        navigator.share({
            title: 'آية كريمة',
            text: text
        });
    } else {
        copyText(text);
    }
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

// إضافة مستمع للبحث
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', searchVerses);
    }
});

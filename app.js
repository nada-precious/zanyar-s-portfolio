/**
 * ITER — AI-POWERED MULTILINGUAL STUDENT PLATFORM
 * Client Application Logic & Multilingual Engine
 * Developed by Zanyar Z Ahmed
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. MULTILINGUAL UI DICTIONARY (English, Kurdish, Arabic, Spanish, German)
  // =========================================================================
  const i18n = {
    en: {
      searchPlaceholder: "Search communities, topics, peers, or events...",
      feedTab: "Community Feed",
      chatTab: "Live Peer Chat",
      aiTab: "AI Study & Translation",
      eventsTab: "Academic Events",
      composerPlaceholder: "Share a study question, academic insight, or cross-cultural note... (Auto-translates for international scholars!)",
      publishBtn: "Publish Post",
      instantTranslate: "Instant AI Translation",
      online: "online",
      verifiedStudent: "Verified Student"
    },
    ku: {
      searchPlaceholder: "گەڕان لە کۆمەڵگە، بابەت، هاوڕێ و چالاکییەکان...",
      feedTab: "پێگەی کۆمەڵگە",
      chatTab: "چاتی ڕاستەوخۆ",
      aiTab: "یاریدەدەری زیرەکی دەستکرد",
      eventsTab: "چالاکییە زانستییەکان",
      composerPlaceholder: "پرسیارێکی زانستی یان بابەتێک هاوبەش بکە... (وەرگێڕانی خۆکاری زیرەکی دەستکرد)",
      publishBtn: "بڵاوکردنەوەی پۆست",
      instantTranslate: "وەرگێڕانی دەستبەجێی AI",
      online: "سەرهێڵە",
      verifiedStudent: "خوێندکاری باوەڕپێکراو"
    },
    ar: {
      searchPlaceholder: "البحث في المجتمعات والمواضيع والزملاء...",
      feedTab: "منشورات المجتمع",
      chatTab: "المحادثة المباشرة",
      aiTab: "المساعد الذكي والترجمة",
      eventsTab: "الفعاليات الأكاديمية",
      composerPlaceholder: "شارك سؤالاً دراسياً أو فكرة أكاديمية... (ترجمة فورية بالذكاء الاصطناعي)",
      publishBtn: "نشر المنشور",
      instantTranslate: "ترجمة فورية بالذكاء الاصطناعي",
      online: "متصل الآن",
      verifiedStudent: "طالب موثق"
    },
    es: {
      searchPlaceholder: "Buscar comunidades, temas, compañeros o eventos...",
      feedTab: "Feed de la Comunidad",
      chatTab: "Chat en Vivo",
      aiTab: "Estudio y Traducción AI",
      eventsTab: "Eventos Académicos",
      composerPlaceholder: "¿Tienes una pregunta o apunte de estudio? (¡Traducción automática en vivo!)",
      publishBtn: "Publicar Post",
      instantTranslate: "Traducción AI en Tiempo Real",
      online: "en línea",
      verifiedStudent: "Estudiante Verificado"
    },
    de: {
      searchPlaceholder: "Community, Themen, Kommilitonen oder Events suchen...",
      feedTab: "Community-Feed",
      chatTab: "Live-Peer-Chat",
      aiTab: "KI-Studienassistent",
      eventsTab: "Akademische Events",
      composerPlaceholder: "Teile eine Lernfrage oder Notiz... (Automatische KI-Übersetzung!)",
      publishBtn: "Beitrag veröffentlichen",
      instantTranslate: "Echtzeit-KI-Übersetzung",
      online: "online",
      verifiedStudent: "Verifizierter Student"
    }
  };

  let currentLang = localStorage.getItem('iter_lang') || 'en';

  const langDropdownBtn = document.getElementById('langDropdownBtn');
  const langDropdownMenu = document.getElementById('langDropdownMenu');
  const currentLangLabel = document.getElementById('currentLangLabel');

  const langNames = {
    en: 'English (EN)',
    ku: 'Kurdî (KU)',
    ar: 'العربية (AR)',
    es: 'Español (ES)',
    de: 'Deutsch (DE)'
  };

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('iter_lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    if (lang === 'ku' || lang === 'ar') {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }

    if (currentLangLabel) currentLangLabel.innerText = langNames[lang] || lang.toUpperCase();

    // Update active dropdown item
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    const dict = i18n[lang] || i18n.en;
    const globalSearchInput = document.getElementById('globalSearchInput');
    if (globalSearchInput) globalSearchInput.placeholder = dict.searchPlaceholder;

    const composerInput = document.getElementById('composerInput');
    if (composerInput) composerInput.placeholder = dict.composerPlaceholder;

    showToast(`🌐 Language switched to ${langNames[lang]}`);
  }

  if (langDropdownBtn && langDropdownMenu) {
    langDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdownMenu.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      langDropdownMenu.classList.remove('open');
    });

    langDropdownMenu.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
        langDropdownMenu.classList.remove('open');
      });
    });
  }

  setLanguage(currentLang);


  // =========================================================================
  // 2. VIEW SWITCHER (Feed, Chat, AI Assistant, Events)
  // =========================================================================
  const navButtons = document.querySelectorAll('.sidebar-nav .nav-item');
  const viewPanels = {
    feed: document.getElementById('feedView'),
    chat: document.getElementById('chatView'),
    'ai-assistant': document.getElementById('aiAssistantView'),
    events: document.getElementById('eventsView')
  };

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (!viewPanels[view]) return;

      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      Object.values(viewPanels).forEach(panel => {
        if (panel) panel.classList.remove('active');
      });
      viewPanels[view].classList.add('active');
    });
  });


  // =========================================================================
  // 3. COMMUNITY FEED & INTERACTIVE POSTS
  // =========================================================================
  let feedPosts = [
    {
      id: 1,
      author: 'Zanyar Z Ahmed',
      avatar: 'assets/images/zanyar.jpg',
      isVerified: true,
      campus: 'Sulaimani Polytechnic University · CS & Database',
      time: '15m ago',
      topic: 'mobile',
      originalLang: 'en',
      content: 'Just deployed our real-time synchronization architecture using Flutter and Cloud Firestore for the Iter mobile application! Sub-100ms message delivery with offline caching enabled.',
      translatedKu: 'هەر ئێستا مۆدێلی هاوکاتکردنی کاتی ڕاستەقینەمان لە ڕێگەی فڵاتەر و فایەربەیس کلاود فایەرستۆر بۆ ئەپڵیکەیشنی ئیتر جێبەجێ کرد! ناردنی نامە لە کەمتر لە ١٠٠ میلی‌چرکە بە پاشەکەوتکردنی ئۆفلاین.',
      likes: 24,
      isLiked: false,
      comments: 6
    },
    {
      id: 2,
      author: 'Maria Garcia',
      fallbackLetter: 'M',
      color: 'purple',
      campus: 'Universidad Politécnica de Madrid · Exchange Student',
      time: '1h ago',
      topic: 'database',
      originalLang: 'es',
      content: '¿Alguien tiene un resumen claro de cómo los índices B-Tree reducen la complejidad de búsqueda en MySQL de O(n) a O(log n)? ¡Gracias!',
      translatedEn: 'Does anyone have a clear summary of how B-Tree indices reduce search complexity in MySQL from O(n) to O(log n)? Thanks!',
      translatedKu: 'ئایا کەسێک کورتەیەکی ڕوونی هەیە لەسەر ئەوەی چۆن هێماکانی B-Tree ئاڵۆزی گەڕان لە MySQL لە O(n) بۆ O(log n) کەم دەکەنەوە؟ سوپاس!',
      likes: 18,
      isLiked: false,
      comments: 4
    },
    {
      id: 3,
      author: 'Ahmad K.',
      fallbackLetter: 'A',
      color: 'teal',
      campus: 'Sulaimani Polytechnic University (SPU)',
      time: '3h ago',
      topic: 'cs',
      originalLang: 'ku',
      content: 'ڕۆژی پێنجشەممە لە کتێبخانەی زانکۆی پۆلیتەکنیکی سلێمانی کۆدەبینەوە بۆ پێداچوونەوەی سیستەمی کارپێکردن (Operating Systems) و بەڕێوەبردنی بیرگە. کێ بەشدار دەبێت؟',
      translatedEn: 'We are gathering this Thursday at the Sulaimani Polytechnic University library to review Operating Systems & memory management. Who is joining?',
      likes: 31,
      isLiked: true,
      comments: 11
    }
  ];

  const feedStream = document.getElementById('feedStream');
  const feedFilterPills = document.querySelectorAll('.feed-filters-bar .filter-pill');
  let currentFeedFilter = 'all';

  function renderFeed() {
    if (!feedStream) return;
    feedStream.innerHTML = '';

    const filtered = feedPosts.filter(p => currentFeedFilter === 'all' || p.topic === currentFeedFilter);

    filtered.forEach(post => {
      const card = document.createElement('article');
      card.className = 'post-card glass-panel';
      
      const avatarHTML = post.avatar 
        ? `<img src="${post.avatar}" alt="${post.author}" class="author-avatar">`
        : `<div class="author-avatar-fallback ${post.color || 'teal'}">${post.fallbackLetter || post.author[0]}</div>`;

      // Multilingual translation block
      let translationSnippet = '';
      if (currentLang === 'ku' && post.translatedKu) {
        translationSnippet = `
          <div class="ai-translation-box">
            <div class="translation-header"><i class="fa-solid fa-wand-magic-sparkles"></i> وەرگێڕدراوی زیرەکی دەستکرد بۆ کوردی (AI Translation):</div>
            <p>${post.translatedKu}</p>
          </div>
        `;
      } else if (post.translatedEn && post.originalLang !== 'en') {
        translationSnippet = `
          <div class="ai-translation-box">
            <div class="translation-header"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Translated to English:</div>
            <p>${post.translatedEn}</p>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="post-header">
          <div class="post-author">
            ${avatarHTML}
            <div>
              <div class="author-name">${post.author} ${post.isVerified ? '<i class="fa-solid fa-circle-check text-cyan" style="font-size:0.8rem;" title="Verified SPU Developer"></i>' : ''}</div>
              <div class="author-campus">${post.campus}</div>
            </div>
          </div>
          <span class="post-time">${post.time}</span>
        </div>

        <div class="post-body">
          <p>${post.content}</p>
        </div>

        ${translationSnippet}

        <div class="post-actions">
          <button class="post-action-btn like-btn ${post.isLiked ? 'liked' : ''}" data-id="${post.id}">
            <i class="${post.isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            <span>${post.likes}</span>
          </button>
          <button class="post-action-btn comment-btn" data-id="${post.id}">
            <i class="fa-regular fa-comment"></i>
            <span>${post.comments} Comments</span>
          </button>
          <button class="post-action-btn share-post-btn" data-id="${post.id}">
            <i class="fa-solid fa-share-nodes"></i>
            <span>Share</span>
          </button>
        </div>
      `;
      feedStream.appendChild(card);
    });
  }

  renderFeed();

  // Filter pills
  feedFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      feedFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFeedFilter = pill.dataset.topic;
      renderFeed();
    });
  });

  // Like & Share interactions
  document.addEventListener('click', (e) => {
    const likeBtn = e.target.closest('.like-btn');
    if (likeBtn) {
      const id = parseInt(likeBtn.dataset.id);
      const post = feedPosts.find(p => p.id === id);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        renderFeed();
      }
    }

    const shareBtn = e.target.closest('.share-post-btn');
    if (shareBtn) {
      showToast('🔗 Post link copied to clipboard!');
    }
  });

  // Publish new post
  const publishPostBtn = document.getElementById('publishPostBtn');
  const composerInput = document.getElementById('composerInput');
  const postTopicSelect = document.getElementById('postTopicSelect');

  if (publishPostBtn && composerInput) {
    publishPostBtn.addEventListener('click', () => {
      const text = composerInput.value.trim();
      if (!text) {
        showToast('Please type a question or thought to share.', 'warning');
        return;
      }

      const newPost = {
        id: Date.now(),
        author: 'Zanyar Z Ahmed',
        avatar: 'assets/images/zanyar.jpg',
        isVerified: true,
        campus: 'Sulaimani Polytechnic University (SPU) · Student',
        time: 'Just now',
        topic: postTopicSelect ? postTopicSelect.value : 'cs',
        originalLang: 'en',
        content: text,
        translatedKu: `[وەڕگێڕدراوی خۆکار]: ${text}`,
        likes: 1,
        isLiked: true,
        comments: 0
      };

      feedPosts.unshift(newPost);
      composerInput.value = '';
      renderFeed();
      showToast('✓ Post published to the global student stream!');
    });
  }


  // =========================================================================
  // 4. LIVE PEER CHAT & REAL-TIME TRANSLATION SIMULATOR
  // =========================================================================
  const chatMessagesThread = document.getElementById('chatMessagesThread');
  const chatMessageInput = document.getElementById('chatMessageInput');
  const sendChatMessageBtn = document.getElementById('sendChatMessageBtn');
  const promptChips = document.querySelectorAll('.prompt-chip');
  const realtimeTranslationToggle = document.getElementById('realtimeTranslationToggle');

  const chatMessagesData = [
    {
      sender: 'Maria Garcia',
      campus: 'Madrid',
      text: '¡Hola a todos! Does anyone know the room for the SPU algorithm workshop?',
      translated: '🇬🇧 [AI Translation]: Hello everyone! Does anyone know the room for the SPU algorithm workshop?',
      time: '14:20',
      isMe: false
    },
    {
      sender: 'Zanyar Z Ahmed',
      campus: 'SPU Sulaimani',
      text: 'Yes! It will be in Hall 3 at the College of Informatics, or live via our Iter stream.',
      translated: '☀️ [Kurdî]: بەڵێ! لە هۆڵی ژمارە ٣ی کۆلێژی ئینفۆرماتیک دەبێت، یان بە ڕاستەوخۆ لە ڕێگەی ئیتر.',
      time: '14:22',
      isMe: true
    },
    {
      sender: 'Yuki Tanaka',
      campus: 'Tokyo',
      text: 'Arigato! The AI real-time translation in this Flutter app is so fast!',
      translated: '🇬🇧 [AI Translation]: Thank you! The AI real-time translation in this app is so fast!',
      time: '14:23',
      isMe: false
    }
  ];

  function renderChat() {
    if (!chatMessagesThread) return;
    chatMessagesThread.innerHTML = '';

    const showTranslation = realtimeTranslationToggle ? realtimeTranslationToggle.checked : true;

    chatMessagesData.forEach(msg => {
      const row = document.createElement('div');
      row.className = `chat-bubble-row ${msg.isMe ? 'me' : ''}`;
      row.innerHTML = `
        <div class="chat-bubble">
          <div class="bubble-sender">
            <span>${msg.sender} (${msg.campus})</span>
            <span class="bubble-time">${msg.time}</span>
          </div>
          <div class="bubble-text">${escapeHTML(msg.text)}</div>
          ${showTranslation && msg.translated ? `<div class="bubble-ai-translation"><i class="fa-solid fa-wand-magic-sparkles"></i> ${msg.translated}</div>` : ''}
        </div>
      `;
      chatMessagesThread.appendChild(row);
    });

    chatMessagesThread.scrollTop = chatMessagesThread.scrollHeight;
  }

  renderChat();

  if (realtimeTranslationToggle) {
    realtimeTranslationToggle.addEventListener('change', renderChat);
  }

  function sendChatMessage(text) {
    if (!text.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    chatMessagesData.push({
      sender: 'Zanyar Z Ahmed',
      campus: 'SPU Sulaimani',
      text: text.trim(),
      translated: `☀️ [Kurdî]: ${text.trim()} (وەرگێڕدراوی دەستبەجێ)`,
      time: timeStr,
      isMe: true
    });

    if (chatMessageInput) chatMessageInput.value = '';
    renderChat();

    // Simulated active peer bot reply after 1.2s
    setTimeout(() => {
      const peerReplies = [
        { sender: 'Maria Garcia', campus: 'Madrid', text: '¡Excelente punto! Thanks for sharing this insight.', translated: '🇬🇧 [AI Translation]: Excellent point! Thanks for sharing this insight.' },
        { sender: 'Ahmad K.', campus: 'SPU Sulaimani', text: 'دەستخۆش زانیار، بەتەواوی ڕوونە و یارمەتیدەر بوو.', translated: '🇬🇧 [AI Translation]: Well done Zanyar, that is completely clear and helpful!' },
        { sender: 'Yuki Tanaka', campus: 'Tokyo', text: 'Confirmed, added this to our shared research notebook.', translated: '🇬🇧 [AI Translation]: Confirmed, added this to our shared research notebook.' }
      ];
      const randomReply = peerReplies[Math.floor(Math.random() * peerReplies.length)];
      chatMessagesData.push({
        ...randomReply,
        time: timeStr,
        isMe: false
      });
      renderChat();
    }, 1200);
  }

  if (sendChatMessageBtn && chatMessageInput) {
    sendChatMessageBtn.addEventListener('click', () => sendChatMessage(chatMessageInput.value));
    chatMessageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage(chatMessageInput.value);
    });
  }

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (chatMessageInput) {
        chatMessageInput.value = chip.dataset.text;
        chatMessageInput.focus();
      }
    });
  });


  // =========================================================================
  // 5. AI STUDY & TRANSLATION ENGINE
  // =========================================================================
  const aiSourceText = document.getElementById('aiSourceText');
  const aiOutputScreen = document.getElementById('aiOutputScreen');
  const runAiAnalysisBtn = document.getElementById('runAiAnalysisBtn');
  const copyAiOutputBtn = document.getElementById('copyAiOutputBtn');
  const aiConfidence = document.getElementById('aiConfidence');
  const presetButtons = document.querySelectorAll('.preset-btn');

  const aiPresets = {
    'explain-sql': {
      prompt: 'Explain MySQL Indexing and B-Tree performance in simple terms for student developers.',
      output: `### 🚀 MySQL Indexing & B-Trees Explained
- **Why Index?** Without an index, MySQL executes a full table scan ($O(n)$ complexity), reading every single row from disk.
- **How B-Trees Work:** A B-Tree balances search, insertion, and deletion in $O(\log n)$ operations. Keys are kept sorted in hierarchical pages.
- **Best Practice:** Index columns used heavily in \`WHERE\`, \`JOIN\`, and \`ORDER BY\` clauses (e.g., \`user_id\`, \`created_at\`).
- **Kurdish Summary:** هێمای B-Tree کاتی گەڕان لە ملیۆنان داتا کەم دەکاتەوە بۆ چەند میلی‌چرکەیەک بەبێ هیلاککردنی سێرڤەر.`
    },
    'kurdish-cs': {
      prompt: 'Translate and define key Computer Science terms between Kurdish and English.',
      output: `### 🌐 Key Computer Science Lexicon (English ↔ Kurdish)
1. **Relational Database** ➔ داتابەیسی پەیوەندیدار (MySQL, PostgreSQL)
2. **State Management** ➔ بەڕێوەبردنی بارودۆخی ئەپڵیکەیشن (Flutter Riverpod / Bloc)
3. **Concurrency** ➔ هاوکاتی و جێبەجێکردنی هاوتەریب لە پڕۆسێسەردا
4. **Foreign Key Constraint** ➔ مەرجی کلیلی دەرەکی بۆ پاراستنی یەکپارچەیی داتا
5. **NoSQL Real-Time Sync** ➔ هاوکاتکردنی کاتی ڕاستەقینەی داتابەیسی ناپەیوەندیدار (Firebase Firestore)`
    },
    'flutter-async': {
      prompt: 'How does async/await and Futures work in Dart / Flutter?',
      output: `### 📱 Dart / Flutter Asynchronous Programming
\`\`\`dart
// Fetching student communities from Cloud Firestore
Future<List<Community>> fetchCommunities() async {
  try {
    final snapshot = await FirebaseFirestore.instance.collection('communities').get();
    return snapshot.docs.map((doc) => Community.fromMap(doc.data())).toList();
  } catch (e) {
    debugPrint('Error: $e');
    return [];
  }
}
\`\`\`
- **Non-blocking UI:** Ensures smooth 60fps / 120fps animations while network requests complete.
- **Kurdish Note:** بەکارهێنانی \`async/await\` ڕێگری لە بەستنی ڕووکاری ئەپەکە دەکات لە کاتی دابەزاندنی زانیارییەکان لە ئینتەرنێتەوە.`
    }
  };

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sample;
      if (aiPresets[key] && aiSourceText) {
        aiSourceText.value = aiPresets[key].prompt;
        executeAiTranslation(aiPresets[key].output);
      }
    });
  });

  function executeAiTranslation(customOutput) {
    if (!aiOutputScreen) return;

    aiOutputScreen.innerHTML = `<p style="color:var(--accent-cyan); display:flex; align-items:center; gap:0.5rem;"><i class="fa-solid fa-spinner fa-spin"></i> Iter Neural Engine processing text and cross-referencing multilingual corpora...</p>`;
    if (aiConfidence) aiConfidence.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Translating...`;

    setTimeout(() => {
      const textToRender = customOutput || `
### ⚡ AI Translation & Analysis
- **Detected Language:** English / Multilingual Academic
- **Analysis:** Clean database and software engineering concepts verified.
- **Translated Translation (Kurdî):**
بابەتەکە بە سەرکەوتوویی شیکاری بۆ کرا. زانیارییەکان لەگەڵ ستانداردەکانی ئەندازیاری نەرمەکاڵا و داتابەیس یەکدەگرنەوە.
      `;

      aiOutputScreen.innerHTML = textToRender.replace(/\n/g, '<br>');
      if (aiConfidence) aiConfidence.innerHTML = `<i class="fa-solid fa-circle-check"></i> Accuracy: 99.4% · Latency: 120ms`;
      showToast('✓ AI Translation generated successfully!');
    }, 700);
  }

  if (runAiAnalysisBtn && aiSourceText) {
    runAiAnalysisBtn.addEventListener('click', () => {
      if (!aiSourceText.value.trim()) {
        showToast('Please enter text or select a preset prompt first.', 'warning');
        return;
      }
      executeAiTranslation();
    });
  }

  if (copyAiOutputBtn && aiOutputScreen) {
    copyAiOutputBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(aiOutputScreen.innerText).then(() => {
        showToast('AI analysis copied to clipboard!');
      });
    });
  }


  // =========================================================================
  // 6. ACADEMIC EVENTS & WORKSHOPS
  // =========================================================================
  const eventsGrid = document.getElementById('eventsGrid');
  const eventsData = [
    {
      id: 1,
      title: 'Sulaimani Mobile Dev Hackathon 2026',
      category: 'Mobile / Flutter',
      date: 'Oct 18, 2026 · 10:00 AM',
      location: 'SPU Campus Hall & Virtual Stream',
      attendees: 84,
      rsvpd: true
    },
    {
      id: 2,
      title: 'Database Schema Optimization & Query Tuning',
      category: 'Database / SQL',
      date: 'Oct 25, 2026 · 2:00 PM',
      location: 'Lab 4, College of Informatics, SPU',
      attendees: 52,
      rsvpd: false
    },
    {
      id: 3,
      title: 'Global AI & Multilingual LLMs in Education',
      category: 'AI / Research',
      date: 'Nov 04, 2026 · 6:00 PM (UTC+3)',
      location: 'Iter Virtual Auditorium',
      attendees: 130,
      rsvpd: false
    }
  ];

  function renderEvents() {
    if (!eventsGrid) return;
    eventsGrid.innerHTML = '';

    eventsData.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'event-card glass-panel';
      card.innerHTML = `
        <div>
          <div class="event-badge-row">
            <span class="event-category">${ev.category}</span>
            <span class="event-status"><i class="fa-solid fa-users"></i> ${ev.attendees} Attending</span>
          </div>
          <h3 class="event-title">${ev.title}</h3>
          <div class="event-meta">
            <span><i class="fa-regular fa-clock"></i> ${ev.date}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${ev.location}</span>
          </div>
        </div>

        <div class="event-footer">
          <button class="btn btn-sm ${ev.rsvpd ? 'btn-glass' : 'btn-primary'} rsvp-btn" data-id="${ev.id}">
            <i class="fa-solid ${ev.rsvpd ? 'fa-circle-check text-emerald' : 'fa-calendar-check'}"></i>
            <span>${ev.rsvpd ? 'Registered (RSVP)' : 'Join / RSVP'}</span>
          </button>
          <button class="btn btn-sm btn-glass share-event-btn" title="Share event">
            <i class="fa-solid fa-share-nodes"></i>
          </button>
        </div>
      `;
      eventsGrid.appendChild(card);
    });
  }

  renderEvents();

  document.addEventListener('click', (e) => {
    const rsvpBtn = e.target.closest('.rsvp-btn');
    if (rsvpBtn) {
      const id = parseInt(rsvpBtn.dataset.id);
      const ev = eventsData.find(item => item.id === id);
      if (ev) {
        ev.rsvpd = !ev.rsvpd;
        ev.attendees += ev.rsvpd ? 1 : -1;
        renderEvents();
        showToast(ev.rsvpd ? `✓ You are registered for: ${ev.title}` : `RSVP cancelled for: ${ev.title}`);
      }
    }
  });


  // =========================================================================
  // 7. TOAST NOTIFICATION UTILITY
  // =========================================================================
  const iterToastContainer = document.getElementById('iterToastContainer');

  function showToast(msg, type = 'info') {
    if (!iterToastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'iter-toast';
    toast.innerHTML = `<i class="fa-solid ${type === 'warning' ? 'fa-triangle-exclamation text-amber' : 'fa-circle-check text-cyan'}"></i> <span>${msg}</span>`;
    iterToastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

});

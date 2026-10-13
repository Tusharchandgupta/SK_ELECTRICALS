// ==========================================================================
// SK ELECTRICALS — MAIN JAVASCRIPT LOGIC
// Siswa Bazar, Maharajganj, Uttar Pradesh
// Interactive Features: Mobile Drawer, Load Calculator, Gallery Lightbox,
// i18n Language Toggle, and Scroll Animations.
// ==========================================================================

(function () {
  'use strict';

  // 1. Mobile Navigation & Drawer Toggle
  function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.mobile-drawer-overlay');
    const drawerClose = document.querySelector('.drawer-close');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const siteHeader = document.querySelector('.site-header');

    function openDrawer() {
      if (drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('open');
        if (navToggle) navToggle.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        if (navToggle) navToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    if (navToggle) {
      navToggle.addEventListener('click', function () {
        if (drawer && drawer.classList.contains('open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    // Sticky Header Scroll Effect
    if (siteHeader) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  }

  // 2. Scroll Reveal Animations
  function initReveal() {
    const animatedElements = document.querySelectorAll('.animate');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      animatedElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      animatedElements.forEach(function (el) {
        el.classList.add('in-view');
      });
    }
  }

  // 3. Interactive Inverter & Backup Calculator (Bilingual Support)
  let updateCalculatorLanguage = null;

  function initCalculator() {
    const optionButtons = document.querySelectorAll('.calc-option-btn');
    const resultSystem = document.getElementById('calc-result-system');
    const resultInverter = document.getElementById('calc-inverter-spec');
    const resultBattery = document.getElementById('calc-battery-spec');
    const resultBackup = document.getElementById('calc-backup-spec');
    const resultWhatsappBtn = document.getElementById('calc-whatsapp-btn');

    if (!optionButtons.length || !resultSystem) return;

    const LOAD_CONFIGS = {
      'small-home': {
        en: {
          system: 'Luminous 900VA Eco Volt Neo (1-2 BHK Small Home)',
          inverter: '900VA / 12V Pure Sine Wave Inverter',
          battery: '150Ah Tall Tubular Battery',
          backup: '4 to 6 Hours continuous backup (2 Fans, 3 LED, Mobile charging)',
          msg: 'Hello SK Electricals, please share best price for 900VA Inverter + 150Ah Battery for small home in Siswa Bazar.'
        },
        hi: {
          system: 'Luminous 900VA Eco Volt Neo (छोटा घर 1-2 BHK)',
          inverter: '900VA / 12V साइन वेव इन्वर्टर (Pure Sine Wave)',
          battery: '150Ah ट्यूबलर बैटरी (Tall Tubular Battery)',
          backup: '4 से 6 घंटे लगातार बैकअप (2 पंखे, 3 LED, मोबाइल चार्जिंग)',
          msg: 'नमस्ते SK Electricals, मुझे सिसवा बाज़ार में 1-2 कमरों के घर के लिए 900VA इन्वर्टर + 150Ah बैटरी का सबसे अच्छा रेट बताएं।'
        }
      },
      'medium-home': {
        en: {
          system: 'Luminous 1100VA / Microtek 1250VA (3-4 BHK Medium Home)',
          inverter: '1100VA - 1250VA Pure Sine Wave Inverter',
          battery: '160Ah - 180Ah Heavy Duty Tall Tubular Battery',
          backup: '5 to 8 Hours backup (3 Fans, 6 LED lights, TV & Wi-Fi)',
          msg: 'Hello SK Electricals, please share offer and price for 1100VA Inverter + 180Ah Battery set for 3-4 room home.'
        },
        hi: {
          system: 'Luminous 1100VA / Microtek 1250VA (मध्यम घर 3-4 BHK)',
          inverter: '1100VA - 1250VA साइन वेव इन्वर्टर',
          battery: '160Ah - 180Ah हैवी ड्यूटी ट्यूबलर बैटरी',
          backup: '5 से 8 घंटे बैकअप (3 पंखे, 6 LED बल्ब, टीवी व Wi-Fi)',
          msg: 'नमस्ते SK Electricals, 3-4 कमरों के घर के लिए 1100VA इन्वर्टर + 180Ah बैटरी सेट का रेट और ऑफर बताएं।'
        }
      },
      'heavy-home': {
        en: {
          system: 'Luminous Cruze 2KVA / 24V Double Battery (Large Home / Villa)',
          inverter: '2000VA (2kVA) / 24V Heavy Duty Inverter UPS',
          battery: '2x 150Ah / 200Ah Tall Tubular Batteries',
          backup: '6 to 10 Hours full home backup (Fans, Refrigerator, Mixer, LED TV)',
          msg: 'Hello SK Electricals, please provide price & installation details for 2KVA 24V Double Battery Inverter system.'
        },
        hi: {
          system: 'Luminous Cruze 2KVA / 24V डबल बैटरी (बड़ा मकान / कोठी)',
          inverter: '2000VA (2KVA) / 24V हैवी ड्यूटी इन्वर्टर यूपीएस',
          battery: '2x 150Ah/200Ah ट्यूबलर बैटरियां (Double Battery)',
          backup: '6 से 10 घंटे फुल होम बैकअप (पंखे, फ्रिज, मिक्सी, एलईडी टीवी)',
          msg: 'नमस्ते SK Electricals, बड़े मकान के लिए 2KVA 24V डबल बैटरी इन्वर्टर सिस्टम का रेट और इंस्टॉलेशन बताएं।'
        }
      },
      'commercial-shop': {
        en: {
          system: 'Commercial Pure Sine Wave 1500VA - 2.5kVA (Shop & Office)',
          inverter: '1500VA - 2500VA Industrial Grade Power UPS',
          battery: '2x 150Ah - 200Ah High-Cycle Tubular Battery Set',
          backup: 'Uninterrupted power for billing computers, printers, CCTV & lights',
          msg: 'Hello SK Electricals, I need quotation for commercial inverter & battery backup setup for my shop/office.'
        },
        hi: {
          system: 'कमर्शियल प्योर साइन वेव 1500VA - 2.5KVA (दुकान व ऑफिस)',
          inverter: '1500VA - 2500VA इंडस्ट्रियल ग्रेड यूपीएस',
          battery: '2x 150Ah - 200Ah हाई साइकल बैटरी सेट',
          backup: 'दुकान का निर्बाध बैकअप (बिलिंग कंप्यूटर, प्रिंटर, CCTV, लाइट्स)',
          msg: 'नमस्ते SK Electricals, दुकान/ऑफिस के लिए कमर्शियल इन्वर्टर-बैटरी सेटअप का कोटेशन चाहिए।'
        }
      },
      'stabilizer-ac': {
        en: {
          system: 'V-Guard / Automatic Mainline Copper Stabilizer',
          inverter: '4kVA - 5kVA 100% Copper Winding Voltage Stabilizer',
          battery: 'For 1.5 Ton Inverter AC or Full Home Mainline Protection',
          backup: 'Safe and constant 220V power even during severe 90V low voltage',
          msg: 'Hello SK Electricals, please share price and availability for V-Guard AC / Mainline Stabilizer.'
        },
        hi: {
          system: 'V-Guard / ऑटोमैटिक मेनलाइन स्टेबलाइजर',
          inverter: '4kVA - 5kVA 100% कॉपर वाइंडिंग स्टेबलाइजर',
          battery: '1.5 टन एसी / पूरे घर की मेनलाइन सुरक्षा',
          backup: '90V से 280V लो वोल्टेज में भी सुरक्षित और स्थिर करंट',
          msg: 'नमस्ते SK Electricals, वी-गार्ड एसी स्टेबलाइजर / मेनलाइन कॉपर स्टेबलाइजर का रेट व स्टॉक बताएं।'
        }
      },
      'scale-shop': {
        en: {
          system: 'Digital Electronic Weighing Scale (Legal Metrology Stamped)',
          inverter: 'Capacity: 30kg Counter Scale / 100kg-200kg Platform Machine',
          battery: 'Built-in 6V rechargeable battery (20+ hours continuous backup)',
          backup: 'Includes official UP Legal Metrology government verification stamping',
          msg: 'Hello SK Electricals, I want to purchase government stamped digital weighing scale in Siswa Bazar.'
        },
        hi: {
          system: 'डिजिटल इलेक्ट्रॉनिक कांटा मशीन (बांट-माप सरकारी मुहरशुदा)',
          inverter: 'क्षमता: 30kg काउंटर / 100kg-200kg हैवी प्लेटफॉर्म',
          battery: 'इन-बिल्ट रिचार्जेबल 6V बैटरी (20 घंटे बैकअप)',
          backup: 'उत्तर प्रदेश विधिक माप विज्ञान मुहर व कैलिब्रेशन प्रमाण पत्र',
          msg: 'नमस्ते SK Electricals, सिसवा बाज़ार में डिजिटल तराजू (कांटा मशीन) सरकारी मुहर सहित चाहिए, कीमत बताएं।'
        }
      }
    };

    let activeKey = 'small-home';

    function renderActiveSpec() {
      const currentLang = document.documentElement.lang === 'hi' ? 'hi' : 'en';
      const configObj = LOAD_CONFIGS[activeKey] || LOAD_CONFIGS['small-home'];
      const data = configObj[currentLang] || configObj['en'];

      resultSystem.textContent = data.system;
      if (resultInverter) resultInverter.textContent = data.inverter;
      if (resultBattery) resultBattery.textContent = data.battery;
      if (resultBackup) resultBackup.textContent = data.backup;

      if (resultWhatsappBtn) {
        resultWhatsappBtn.href = 'https://wa.me/919935743755?text=' + encodeURIComponent(data.msg);
      }
    }

    optionButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        optionButtons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        activeKey = this.getAttribute('data-load-key') || 'small-home';
        renderActiveSpec();
      });
    });

    updateCalculatorLanguage = renderActiveSpec;
    renderActiveSpec();
  }

  // 4. Interactive Photo Gallery & Lightbox
  function initGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-card-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    function openLightbox(src, caption) {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      lightboxImg.alt = caption || 'SK Electricals Siswa Bazar';
      if (lightboxCaption) lightboxCaption.textContent = caption || '';
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.setAttribute('aria-hidden', 'true');
      if (lightboxImg) lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const img = this.querySelector('img');
        const caption = this.getAttribute('data-caption') || (img ? img.alt : '');
        if (img) openLightbox(img.src, caption);
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox && lightbox.getAttribute('aria-hidden') === 'false') {
        closeLightbox();
      }
    });
  }

  // 5. Bilingual Hindi / English i18n & Language Selection Pop-Up Modal
  const TRANSLATIONS = {
    en: {
      brand_sub: 'Siswa Bazar · Maharajganj (UP)',
      top_status: '🟢 Store Open: 9:30 AM – 8:00 PM (Mon–Sat)',
      nav_home: 'Home',
      nav_products: 'Products',
      nav_inverters: 'Inverters',
      nav_batteries: 'Batteries',
      nav_stabilizers: 'Stabilizers',
      nav_scales: 'Weighing Scales',
      nav_services: 'Repairs & Services',
      nav_about: 'About Us',
      nav_contact: 'Contact',
      nav_call: 'Call Shop',
      hero_badge: '⚡ Authorized Dealer & Certified Service Center',
      hero_title_prefix: 'Trusted Inverters, Batteries, Stabilizers & ',
      hero_title_highlight: 'Digital Weighing Scales',
      hero_lead: '25+ years of trusted power backup and electronics expertise in Siswa Bazar, Maharajganj, Nichlaul & Kushinagar. Authorized dealer for Luminous, Exide & V-Guard with in-house chip-level motherboard repair and Legal Metrology certified weighing scale calibration.',
      btn_call_instant: '📞 Call Now: +91 99357 43755',
      btn_whatsapp: '💬 Chat on WhatsApp',
      btn_calculator: '⚡ Load Calculator',
      trust_1: '25+ Years of Trust',
      trust_4: 'Authorized Brand Dealer',
      trust_2: '100% Genuine Spares',
      trust_3: 'Govt Certified Stamping',
      why_title: 'Why Choose SK Electricals?',
      why_lead: 'Decades of field experience, authentic transparent pricing, and the most dependable technical service in Maharajganj district.',
      calc_title: 'Inverter & Battery Load Calculator',
      calc_lead: 'Select your home or shop backup requirement to see the recommended inverter VA rating, tubular battery size, and estimated backup hours.',
      dock_call: 'Call',
      dock_whatsapp: 'WhatsApp',
      dock_team: 'Team',
      dock_map: 'Map'
    },
    hi: {
      brand_sub: 'सिसवा बाज़ार · महराजगंज (उ.प्र.)',
      top_status: '🟢 खुली है: सुबह 9:30 – रात 8:00 (सोम–शनि)',
      nav_home: 'होम',
      nav_products: 'उत्पाद',
      nav_inverters: 'इन्वर्टर',
      nav_batteries: 'बैटरी',
      nav_stabilizers: 'स्टेबलाइजर',
      nav_scales: 'कांटा मशीन',
      nav_services: 'मरम्मत सेवाएं',
      nav_about: 'हमारे बारे में',
      nav_contact: 'संपर्क करें',
      nav_call: 'कॉल करें',
      hero_badge: '⚡ अधिकृत डीलर एवं प्रमाणित सर्विस सेंटर',
      hero_title_prefix: 'विश्वसनीय इन्वर्टर, स्टेबलाइजर, बैटरी और ',
      hero_title_highlight: 'इलेक्ट्रॉनिक कांटा मशीन',
      hero_lead: 'सिसवा बाज़ार और महराजगंज क्षेत्र में ल्यूमिनस, एक्साइड, वी-गार्ड के अधिकृत उत्पाद, इन-हाउस मदरबोर्ड कम्पोनेंट रिपेयर और तराजू कैलिब्रेशन सेवा।',
      btn_call_instant: '📞 तुरंत कॉल करें: +91 99357 43755',
      btn_whatsapp: '💬 व्हाट्सएप पर बात करें',
      btn_calculator: '⚡ लोड कैलकुलेटर',
      trust_1: '25+ वर्षों का विश्वास',
      trust_4: 'अधिकृत ब्रांड डीलर',
      trust_2: '100% असली स्पेयर पार्ट्स',
      trust_3: 'सरकारी कांटा मुहर व जांच',
      why_title: 'क्यों चुनें एसके इलेक्ट्रिकल्स?',
      why_lead: 'दशकों का व्यावहारिक अनुभव, उचित मूल्य और महराजगंज जिले में सबसे भरोसेमंद आफ्टर-सेल्स सपोर्ट।',
      calc_title: 'इन्वर्टर व बैकअप लोड कैलकुलेटर',
      calc_lead: 'अपनी जरूरत के अनुसार सही इन्वर्टर और बैटरी क्षमता चुनें और तुरंत व्हाट्सएप पर कोट पाएं।',
      dock_call: 'कॉल',
      dock_whatsapp: 'व्हाट्सएप',
      dock_team: 'टीम',
      dock_map: 'नक्शा'
    }
  };

  function applyLanguage(lang) {
    const targetLang = (lang === 'hi') ? 'hi' : 'en';
    document.documentElement.lang = targetLang;

    const dict = TRANSLATIONS[targetLang] || TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update Language buttons in UI
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.innerHTML = (targetLang === 'hi')
        ? '🌐 भाषा: <strong>हिन्दी</strong>'
        : '🌐 Language: <strong>English</strong>';
      btn.setAttribute('title', (targetLang === 'hi') ? 'Change language to English' : 'भाषा बदलकर हिन्दी करें');
    });

    document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
      const label = btn.querySelector('.lang-label');
      if (label) {
        label.textContent = (targetLang === 'hi') ? 'हिन्दी' : 'English';
      }
    });

    // Update active state in Language Modal
    document.querySelectorAll('.lang-option-card').forEach(function (card) {
      const cardLang = card.getAttribute('data-lang');
      if (cardLang === targetLang) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    // If load calculator is on page, re-render spec in target language
    if (typeof updateCalculatorLanguage === 'function') {
      updateCalculatorLanguage();
    }
  }

  function initLangModalAndSwitcher() {
    // 1. Ensure Language Modal HTML exists in document
    let modalBackdrop = document.getElementById('lang-modal');
    if (!modalBackdrop) {
      modalBackdrop = document.createElement('div');
      modalBackdrop.className = 'lang-modal-backdrop';
      modalBackdrop.id = 'lang-modal';
      modalBackdrop.setAttribute('aria-hidden', 'true');
      modalBackdrop.setAttribute('role', 'dialog');
      modalBackdrop.setAttribute('aria-labelledby', 'lang-modal-title');
      modalBackdrop.innerHTML = `
        <div class="lang-modal-dialog">
          <button type="button" class="lang-modal-close" id="lang-modal-close" aria-label="Close language selector">&times;</button>
          <div class="lang-modal-header">
            <div class="lang-modal-icon-badge">🌐</div>
            <h3 class="lang-modal-title" id="lang-modal-title">Choose Language / भाषा चुनें</h3>
            <p class="lang-modal-subtitle">
              Select your preferred language to browse SK Electricals<br>
              वेबसाइट देखने के लिए अपनी भाषा चुनें
            </p>
          </div>
          <div class="lang-modal-options">
            <div class="lang-option-card selected" data-lang="en">
              <div class="lang-option-left">
                <span class="lang-flag">🇬🇧</span>
                <div class="lang-option-meta">
                  <h4>English</h4>
                  <span>Default Language · Full Site Navigation</span>
                </div>
              </div>
              <div class="lang-option-radio"></div>
            </div>
            <div class="lang-option-card" data-lang="hi">
              <div class="lang-option-left">
                <span class="lang-flag">🇮🇳</span>
                <div class="lang-option-meta">
                  <h4>हिन्दी (Hindi)</h4>
                  <span>स्थानीय भाषा · सिसवा बाज़ार व महराजगंज</span>
                </div>
              </div>
              <div class="lang-option-radio"></div>
            </div>
          </div>
          <div class="lang-modal-actions">
            <button type="button" class="lang-modal-submit-btn" id="lang-modal-submit">Apply & Continue / भाषा लागू करें</button>
          </div>
          <p class="lang-modal-footnote">
            💡 You can switch language anytime using the 🌐 button in the top navigation.<br>
            आप ऊपर दिए गए 🌐 बटन से इसे कभी भी बदल सकते हैं।
          </p>
        </div>
      `;
      document.body.appendChild(modalBackdrop);
    }

    // 2. Ensure header has a Language Trigger button on every page
    const headerActions = document.querySelector('.header-actions');
    if (headerActions && !headerActions.querySelector('.lang-toggle-btn')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'lang-toggle-btn';
      toggleBtn.setAttribute('aria-label', 'Change Language / भाषा बदलें');
      toggleBtn.setAttribute('title', 'Change Language (English / हिन्दी)');
      toggleBtn.innerHTML = '<span class="lang-icon">🌐</span><span class="lang-label">English</span>';
      headerActions.insertBefore(toggleBtn, headerActions.firstChild);
    }

    function openLangModal() {
      if (!modalBackdrop) return;
      modalBackdrop.classList.add('open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const current = document.documentElement.lang === 'hi' ? 'hi' : 'en';
      document.querySelectorAll('.lang-option-card').forEach(function (card) {
        if (card.getAttribute('data-lang') === current) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
    }

    function closeLangModal() {
      if (!modalBackdrop) return;
      modalBackdrop.classList.remove('open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Modal Events
    let selectedLang = 'en';

    document.querySelectorAll('.lang-option-card').forEach(function (card) {
      card.addEventListener('click', function () {
        document.querySelectorAll('.lang-option-card').forEach(function (c) { c.classList.remove('selected'); });
        this.classList.add('selected');
        selectedLang = this.getAttribute('data-lang') || 'en';

        // Auto-apply on option click
        try {
          localStorage.setItem('sk_site_lang', selectedLang);
          localStorage.setItem('sk_lang_prompt_seen', 'true');
        } catch (e) {}

        applyLanguage(selectedLang);
        setTimeout(closeLangModal, 220);
      });
    });

    const submitBtn = document.getElementById('lang-modal-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        const selectedCard = document.querySelector('.lang-option-card.selected');
        const chosen = selectedCard ? selectedCard.getAttribute('data-lang') : selectedLang;
        try {
          localStorage.setItem('sk_site_lang', chosen);
          localStorage.setItem('sk_lang_prompt_seen', 'true');
        } catch (e) {}
        applyLanguage(chosen);
        closeLangModal();
      });
    }

    const closeBtn = document.getElementById('lang-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        try {
          localStorage.setItem('sk_lang_prompt_seen', 'true');
        } catch (e) {}
        closeLangModal();
      });
    }

    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        try {
          localStorage.setItem('sk_lang_prompt_seen', 'true');
        } catch (e) {}
        closeLangModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeLangModal();
      }
    });

    // Attach trigger to all language buttons
    document.addEventListener('click', function (e) {
      const target = e.target.closest('.lang-btn, .lang-toggle-btn');
      if (target) {
        e.preventDefault();
        openLangModal();
      }
    });

    // 3. Determine Initial Language: DEFAULT IS ENGLISH
    let initialLang = 'en';
    let promptSeen = false;
    try {
      const saved = localStorage.getItem('sk_site_lang');
      if (saved === 'hi') {
        initialLang = 'hi';
      }
      promptSeen = !!localStorage.getItem('sk_lang_prompt_seen');
    } catch (e) {}

    // Apply initial language (English by default unless user previously picked Hindi)
    applyLanguage(initialLang);

    // 4. Pop-up language change prompt on first visit
    if (!promptSeen) {
      setTimeout(function () {
        openLangModal();
      }, 850);
    }
  }

  // 6. Smooth Internal Link Scrolling
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.length > 1) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // Initialize all features on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initReveal();
    initCalculator();
    initGallery();
    initLangModalAndSwitcher();
    initSmoothScroll();
  });
})();
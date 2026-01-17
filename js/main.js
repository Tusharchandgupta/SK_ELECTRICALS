// Main JS for SK Electricals: mobile nav toggle and reveal-on-scroll animations
(function(){
  'use strict';

  // Mobile nav toggle
  function initNavToggle(){
    const toggles = document.querySelectorAll('.nav-toggle');
    toggles.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const nav = document.querySelector('.main-nav');
        if(!nav) return;
        nav.classList.toggle('open');
        // lock body scroll when open
        if(nav.classList.contains('open')) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
      });
    });
    // close nav when clicking outside on small screens
    document.addEventListener('click', (e)=>{
      const nav = document.querySelector('.main-nav');
      const toggle = document.querySelector('.nav-toggle');
      if(!nav || !toggle) return;
      if(nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)){
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // IntersectionObserver for reveal animations
  function initReveal(){
    const animated = document.querySelectorAll('.animate');
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries, obs)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },{threshold:0.12});
      animated.forEach(el=>io.observe(el));
    } else {
      // fallback: add in-view immediately
      animated.forEach(el=>el.classList.add('in-view'));
    }
  }

  // Smooth internal link scrolling
  function initSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href.length>1){
          const target = document.querySelector(href);
          if(target){
            e.preventDefault();
            target.scrollIntoView({behavior:'smooth',block:'start'});
          }
        }
      });
    });
  }

  // Image gallery lightbox
  function initLightbox(){
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    if(!lightbox) return;

    function open(src, alt){
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightboxCaption.textContent = alt || '';
      lightbox.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }
    function close(){
      lightbox.setAttribute('aria-hidden','true');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.gallery-item').forEach(item=>{
      item.addEventListener('click', function(e){
        e.preventDefault();
        const img = this.querySelector('img');
        if(img) open(img.src, img.alt);
      });
    });
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e)=>{
      if(e.target === lightbox || e.target === lightboxImg) close();
    });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
  }

  // --- i18n / language toggle implementation ---
  const TRANSLATIONS = {
    hi: {
      brand: 'एसके इलेक्ट्रिकल्स',
      nav_home: 'होम',
      nav_about: 'हमारे बारे में',
      nav_products: 'उत्पाद',
      nav_services: 'सेवाएं',
      nav_contact: 'संपर्क',
      hero_title: 'विश्वसनीय इलेक्ट्रॉनिक्स व इलेक्ट्रिकल स्टोर — सिसवा बाजार, महाराजगंज',
      hero_lead: 'इन्वर्टर, स्टैबिलाइज़र, तराजू, इलेक्ट्रॉनिक पुर्जे और ऑन-साइट मरम्मत — घरों व व्यवसायों का भरोसा।',
      cta_call: 'अभी कॉल करें: +91 99357 43755',
      cta_visit: 'दुकान पर आइए',
      why_choose: 'क्यों चुनें एसके इलेक्ट्रिकल्स?',
      popular_products: 'लोकप्रिय उत्पाद',
      our_services: 'हमारी सेवाएं',
      testimonials_title: 'ग्राहकों की राय',
      testi_1: '"जल्दी मरम्मत और वाजिब दाम। मेरा इन्वर्टर अब बिलकुल नए जैसा काम कर रहा है — एसके इलेक्ट्रिकल्स की मेरी सिफारिश।" — रमेश के., महाराजगंज',
      testi_2: '"तराजू सही से कैलिब्रेट हुआ और सेवा बहुत अच्छी रही। धन्यवाद!" — सीता प., सिसवा बाजार',
      find_us: 'एसके इलेक्ट्रिकल्स कहाँ है',
      address: 'श्री राम जानकी मंदिर रोड, सिसवा बाजार, महाराजगंज, उत्तर प्रदेश',
      ready_help: 'सेवा के लिए तैयार',
      ready_help_lead: 'त्वरित कोट, पार्ट उपलब्धता और विशेषज्ञ मरम्मत के लिए हमसे संपर्क करें।',
      cta_call2: 'कॉल करें: +91 99357 43755',
      cta_directions: 'रास्ते जानें'
    }
    // If you add more languages later, add a new key here (e.g., 'en': {...})
  };

  // Read saved language (returns 'hi' or null). We default to English on load.
  function getSavedLang(){
    try{ return localStorage.getItem('site-lang'); }catch(e){ return null; }
  }
  // Save language: persist only when Hindi is chosen; remove key for English so site starts English next visit.
  function saveLang(lang){
    try{
      if(lang === 'hi') localStorage.setItem('site-lang', 'hi');
      else localStorage.removeItem('site-lang');
    }catch(e){}
  }

  function applyTranslations(lang){
    if(!lang || lang === 'en'){
      // For English, we assume original markup is English. No change needed.
      // But we still update the lang button label if present.
      document.documentElement.lang = 'en';
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        // If we previously stored an original text on dataset, restore it
        if(el.dataset.origText) el.textContent = el.dataset.origText;
      });
    } else {
      const map = TRANSLATIONS[lang] || {};
      document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.dataset.i18n;
        if(!key) return;
        // store original English text if not stored
        if(!el.dataset.origText) el.dataset.origText = el.textContent.trim();
        // set translated text if available
        if(map[key]){
          // preserve innerHTML only for elements that may contain simple tags — generally use textContent for safety
          el.textContent = map[key];
        }
      });
    }

    // Update any language toggle buttons' label / aria-label
    document.querySelectorAll('.lang-toggle').forEach(btn=>{
      const current = (lang === 'hi') ? 'EN' : 'हिन्दी';
      btn.textContent = current;
      btn.setAttribute('aria-pressed', String(lang === 'hi'));
      btn.setAttribute('title', (lang === 'hi') ? 'Switch to English' : 'हिन्दी में दिखाएं');
    });
  }

  function initLangToggle(){
    let langBtn = document.querySelector('.lang-toggle');

    // If no header lang-toggle exists, inject a small floating toggle button (CSS handles styling)
    if(!langBtn){
      langBtn = document.createElement('button');
      langBtn.className = 'lang-toggle floating';
      langBtn.title = 'हिन्दी में दिखाएं';
      // initial label will be set by applyTranslations
      document.body.appendChild(langBtn);
    }

    const toggle = (e)=>{
      // Use the current document language to decide next state. Default is English.
      const current = document.documentElement.lang === 'hi' ? 'hi' : 'en';
      const next = (current === 'hi') ? 'en' : 'hi';
      // persist only when user chooses Hindi; remove on English so site starts English next time
      saveLang(next);
      applyTranslations(next);
    };

    langBtn.addEventListener('click', toggle);

    // Initialize language on load: always start in English (user will click to switch to Hindi)
    applyTranslations('en');
  }

  // Rotating circular image showcase: cycles gallery images into two circular slots
  function initRotatingShowcase(){
    try{
      const galleryImgs = Array.from(document.querySelectorAll('.gallery-img')).map(img=>img.src).filter(Boolean);
      if(!galleryImgs.length) return;
      const slot1 = document.getElementById('rotor1');
      const slot2 = document.getElementById('rotor2');
      if(!slot1 || !slot2) return;

      // add subtle spin class for visual effect
      slot1.classList.add('spin');
      slot2.classList.add('spin');

      const img1 = slot1.querySelector('img');
      const img2 = slot2.querySelector('img');
      let idx = 0;
      // initial images already set in HTML; set idx to next image after those
      // Find initial positions to avoid immediate repeats
      const initial = [img1.src, img2.src];
      // build list ensuring all images get used
      const imgs = galleryImgs.slice();
      // rotate through imgs
      function nextImage(){
        // pick next index and wrap
        idx = (idx + 1) % imgs.length;
        return imgs[idx];
      }

      // Alternate updates between slot1 and slot2
      let toggle = 0;
      const interval = 3000; // change every 3s
      setInterval(()=>{
        const src = nextImage();
        const targetImg = (toggle % 2 === 0) ? img1 : img2;
        const targetSlot = (toggle % 2 === 0) ? slot1 : slot2;

        // crossfade: add fade class to slot, then swap src, then remove fade
        targetSlot.classList.add('fade');
        setTimeout(()=>{
          targetImg.src = src;
          // ensure images have alt attribute set (best-effort)
          targetImg.alt = targetImg.alt || 'SK Electricals photo';
          // remove fade after image loads for smoothness
          targetImg.onload = ()=>{ targetSlot.classList.remove('fade'); };
          // fallback to remove class if load doesn't fire
          setTimeout(()=>{ targetSlot.classList.remove('fade'); }, 900);
        }, 350);

        toggle++;
      }, interval);
    }catch(e){ console.warn('rotating showcase init failed', e); }
  }

  // init on DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{
    initNavToggle();
    initReveal();
    initSmoothScroll();
    initLightbox();
    initLangToggle();
    initRotatingShowcase();
  });

})();
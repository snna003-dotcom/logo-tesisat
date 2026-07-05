/* ============================================================
   logo — su ve doğal gaz tesisatı
   i18n (TR/AR) + GSAP/ScrollTrigger + معرض مرن + lightbox
   ملاحظة أداء: تمرير المتصفح الأصلي (بدون مكتبة smooth scroll)
   وكل الأنيميشن transform/opacity فقط.
============================================================ */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================
     1) قاموس الترجمة — عدّل النصوص من هنا
  ========================================================== */
  var I18N = {
    tr: {
      'meta.title': 'logo — Su ve Doğal Gaz Tesisatı | Mersin',
      'meta.desc': "Mersin Mezitli'de su ve doğal gaz tesisat malzemeleri satışı. Lavabo, klozet, duş sistemleri, su filtreleri, kombi ve doğal gaz malzemeleri. Perakende & toptan.",
      'nav.tag': 'su & doğal gaz tesisatı',
      'nav.home': 'Anasayfa', 'nav.products': 'Ürünler', 'nav.gallery': 'Galeri',
      'nav.about': 'Hakkımızda', 'nav.contact': 'İletişim', 'nav.wa': 'WhatsApp',
      'hero.badge': "Mersin / Mezitli — 2019'dan beri",
      'hero.title': 'Su ve doğal gaz tesisatında <span class="text-gradient-gold">güvenilir</span> adresiniz',
      'hero.desc': 'Bireyler, kurumlar ve evler için su ve doğal gaz tesisat malzemeleri satışında uzman mağazanız.',
      'hero.cta1': "WhatsApp'tan yazın", 'hero.cta2': 'Ürünleri gör',
      'hero.stat1': 'Kuruluş',
      'hero.stat2v': 'Bireysel & Kurumsal', 'hero.stat2': 'Müşterilerimiz',
      'hero.stat3v': 'Perakende & Toptan', 'hero.stat3': 'Satış modeli',
      'products.kicker': 'Ürünlerimiz',
      'products.title': 'Su ve doğal gaz tesisat malzemeleri',
      'products.sub': 'İhtiyacınız olan tüm tesisat malzemeleri tek adreste — perakende ve toptan satış.',
      'products.ask': "WhatsApp'tan sorun",
      'products.p1t': 'Lavabolar', 'products.p1d': 'Modern ve klasik tasarımlarda, her banyoya uygun lavabo çeşitleri.',
      'products.p2t': 'Klozet & Tuvalet', 'products.p2d': 'Kaliteli klozetler, rezervuarlar ve tuvalet ekipmanları.',
      'products.p3t': 'Duş sistemleri', 'products.p3d': 'Robot duş setleri, duş başlıkları ve banyo bataryaları.',
      'products.p4t': 'Su filtreleri', 'products.p4d': 'Temiz ve sağlıklı su için filtre çözümleri ve kartuşlar.',
      'products.p5t': 'Su hortumları', 'products.p5d': 'Dayanıklı paslanmaz ve esnek su hortumu çeşitleri.',
      'products.p6t': 'Banyo yedek parçaları', 'products.p6d': 'İç takımlar, sifonlar ve tüm banyo yedek parçaları.',
      'products.p7t': 'Kombi', 'products.p7d': 'Verimli kombi ve su ısıtıcı modelleri.',
      'products.p8t': 'Doğal gaz malzemeleri', 'products.p8d': 'Sertifikalı ve güvenilir doğal gaz tesisat malzemeleri.',
      'gallery.kicker': 'Galeri', 'gallery.title': 'Mağazamızdan kareler',
      'gallery.sub': 'Ürünlerimizden ve mağazamızdan bazı görüntüler.',
      'about.kicker': 'Hakkımızda', 'about.title': "2019'dan beri Mersin'de güvenilir hizmet",
      'about.text': "2019 yılından bu yana Mersin'de su ve doğal gaz tesisat malzemeleri satışı yapıyoruz. Bireysel ve kurumsal müşterilerimize perakende ve toptan olarak orijinal ürünleri rekabetçi fiyatlarla sunuyoruz.",
      'about.t1t': 'Orijinal ürünler', 'about.t1d': 'Sadece güvenilir markaların orijinal ürünleri.',
      'about.t2t': 'Uygun fiyat', 'about.t2d': 'Perakende ve toptanda rekabetçi fiyat garantisi.',
      'about.t3t': 'Bireysel & kurumsal', 'about.t3d': 'Evler, kurumlar ve projeler için çözümler.',
      'contact.kicker': 'İletişim', 'contact.title': 'Bize ulaşın',
      'contact.sub': "Sorularınız için WhatsApp'tan yazın veya mağazamızı ziyaret edin.",
      'contact.wa': 'WhatsApp: +90 537 353 2470',
      'contact.addrLabel': 'Adres', 'contact.hoursLabel': 'Çalışma saatleri',
      'contact.hours': 'Pazartesi – Cumartesi: 09:00 – 19:00',
      'contact.directions': 'Yol tarifi al',
      'footer.desc': "Su ve doğal gaz tesisat malzemelerinde güvenilir adresiniz. 2019'dan beri Mersin'de perakende ve toptan satış.",
      'footer.links': 'Hızlı bağlantılar', 'footer.contact': 'İletişim',
      'footer.rights': 'Tüm hakları saklıdır'
    },
    ar: {
      'meta.title': 'logo — مستلزمات المياه والغاز الطبيعي | مرسين',
      'meta.desc': 'متجر في مزيتلي/مرسين لبيع مستلزمات المياه والغاز الطبيعي: مغاسل، كلوزيت، أنظمة دش، فلاتر مياه، كومبي ومستلزمات الغاز الطبيعي. تجزئة وجملة.',
      /* اسم العلامة وسلوغانها لا يُترجمان — يبقيان كما في الشعار الأصلي */
      'nav.tag': 'su & doğal gaz tesisatı',
      'nav.home': 'الرئيسية', 'nav.products': 'المنتجات', 'nav.gallery': 'المعرض',
      'nav.about': 'من نحن', 'nav.contact': 'تواصل', 'nav.wa': 'واتساب',
      'hero.badge': 'مرسين / مزيتلي — منذ 2019',
      'hero.title': 'عنوانكم <span class="text-gradient-gold">الموثوق</span> لمستلزمات المياه والغاز الطبيعي',
      'hero.desc': 'متجر متخصص ببيع مستلزمات المياه والغاز الطبيعي للأفراد والمؤسسات والمنازل.',
      'hero.cta1': 'راسلنا واتساب', 'hero.cta2': 'اكتشف منتجاتنا',
      'hero.stat1': 'تأسّس',
      'hero.stat2v': 'أفراد ومؤسسات', 'hero.stat2': 'عملاؤنا',
      'hero.stat3v': 'تجزئة وجملة', 'hero.stat3': 'نظام البيع',
      'products.kicker': 'منتجاتنا',
      'products.title': 'مستلزمات المياه والغاز الطبيعي',
      'products.sub': 'كل مستلزمات التمديدات التي تحتاجها في مكان واحد — بيع تجزئة وجملة.',
      'products.ask': 'استفسر عبر واتساب',
      'products.p1t': 'المغاسل', 'products.p1d': 'مغاسل بتصاميم عصرية وكلاسيكية تناسب كل حمام.',
      'products.p2t': 'كلوزيت وتواليت', 'products.p2d': 'كلوزيتات وخزانات ومستلزمات تواليت عالية الجودة.',
      'products.p3t': 'أنظمة الدش', 'products.p3d': 'أطقم دش روبوت، رؤوس دش وخلاطات حمام.',
      'products.p4t': 'فلاتر المياه', 'products.p4d': 'حلول فلاتر وخراطيش لمياه نظيفة وصحية.',
      'products.p5t': 'خراطيم المياه', 'products.p5d': 'خراطيم مياه مرنة ومقاومة للصدأ بأنواعها.',
      'products.p6t': 'قطع غيار الحمام', 'products.p6d': 'أطقم داخلية وسيفونات وكل قطع غيار الحمام.',
      'products.p7t': 'سخانات وكومبي', 'products.p7d': 'موديلات كومبي وسخانات مياه موفّرة.',
      'products.p8t': 'مستلزمات الغاز الطبيعي', 'products.p8d': 'مستلزمات غاز طبيعي معتمدة وموثوقة.',
      'gallery.kicker': 'المعرض', 'gallery.title': 'لقطات من متجرنا',
      'gallery.sub': 'بعض الصور من منتجاتنا ومتجرنا.',
      'about.kicker': 'من نحن', 'about.title': 'خدمة موثوقة في مرسين منذ 2019',
      'about.text': 'منذ عام 2019 نعمل في مرسين ببيع مستلزمات المياه والغاز الطبيعي. نقدّم لعملائنا من الأفراد والمؤسسات منتجات أصلية بأسعار منافسة، تجزئة وجملة.',
      'about.t1t': 'منتجات أصلية', 'about.t1d': 'منتجات أصلية فقط من ماركات موثوقة.',
      'about.t2t': 'أسعار منافسة', 'about.t2d': 'أفضل الأسعار في التجزئة والجملة.',
      'about.t3t': 'أفراد ومؤسسات', 'about.t3d': 'حلول للمنازل والمؤسسات والمشاريع.',
      'contact.kicker': 'تواصل', 'contact.title': 'تواصل معنا',
      'contact.sub': 'لأي استفسار راسلنا عبر واتساب أو قم بزيارة متجرنا.',
      'contact.wa': 'واتساب: 2470 353 537 90+',
      'contact.addrLabel': 'العنوان', 'contact.hoursLabel': 'ساعات العمل',
      'contact.hours': 'الاثنين – السبت: 09:00 – 19:00',
      'contact.directions': 'الاتجاهات',
      'footer.desc': 'عنوانكم الموثوق لمستلزمات المياه والغاز الطبيعي. تجزئة وجملة في مرسين منذ 2019.',
      'footer.links': 'روابط سريعة', 'footer.contact': 'تواصل',
      'footer.rights': 'جميع الحقوق محفوظة'
    }
  };

  /* ==========================================================
     2) تبديل اللغة + RTL
  ========================================================== */
  var langToggle = document.getElementById('langToggle');
  var currentLang = localStorage.getItem('site-lang') || 'tr';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('site-lang', lang);
    var dict = I18N[lang];

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-content');
      if (dict[key] !== undefined) el.setAttribute('content', dict[key]);
    });
    document.title = dict['meta.title'];

    document.querySelectorAll('[data-lang-label]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang-label') === lang);
    });

    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      applyLang(currentLang === 'tr' ? 'ar' : 'tr');
    });
  }
  applyLang(currentLang);

  /* ==========================================================
     3) اللوغو: إذا وُجد assets/logo.png الحقيقي يأخذ الأولوية
        على النسخة المرسومة logo.svg تلقائياً
  ========================================================== */
  (function () {
    var probe = new Image();
    probe.onload = function () {
      document.querySelectorAll('img[src$="logo.svg"]').forEach(function (img) {
        img.src = 'assets/logo.png';
        img.classList.add('object-cover');
      });
    };
    probe.src = 'assets/logo.png';
  })();

  /* ==========================================================
     4) Placeholder لأي صورة مفقودة
  ========================================================== */
  var PH_ICONS = {
    photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-4.5-4.5L9 19"/></svg>'
  };

  function toPlaceholder(img) {
    var ph = document.createElement('div');
    ph.className = img.className + ' ph ' + (img.classList.contains('about-img') ? 'ph-about' : 'ph-gallery');
    ph.setAttribute('role', 'img');
    ph.setAttribute('aria-label', img.alt || 'placeholder');
    ph.innerHTML = PH_ICONS.photo;
    img.replaceWith(ph);
  }

  document.querySelectorAll('img[data-ph]').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) { toPlaceholder(img); return; }
    img.addEventListener('error', function () { toPlaceholder(img); });
  });

  /* ==========================================================
     5) خلفية الـ Hero
  ========================================================== */
  var heroBg = document.getElementById('heroBg');
  (function () {
    var probe = new Image();
    probe.onload = function () {
      heroBg.style.backgroundImage = 'url("assets/hero.jpg")';
    };
    probe.src = 'assets/hero.jpg';
  })();

  /* ==========================================================
     6) المعرض المرن — يجرّب gallery-1..N ويعرض ما يجده
  ========================================================== */
  var GALLERY_MAX = 12;
  var PLACEHOLDER_COUNT = 6;
  var galleryGrid = document.getElementById('galleryGrid');
  var galleryImages = [];

  function buildGalleryItem(src, index) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gallery-item';
    btn.setAttribute('aria-label', 'Görsel ' + (index + 1) + ' — büyüt');
    btn.innerHTML =
      '<img src="' + src + '" alt="Ürün görseli ' + (index + 1) + '" loading="lazy" decoding="async" />' +
      '<span class="zoom-ic" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg>' +
      '</span>';
    btn.addEventListener('click', function () { openLightbox(index); });
    return btn;
  }

  function buildGalleryPlaceholder() {
    var div = document.createElement('div');
    div.className = 'gallery-item ph ph-gallery';
    div.style.cursor = 'default';
    div.setAttribute('aria-hidden', 'true');
    div.innerHTML = PH_ICONS.photo;
    return div;
  }

  (function loadGallery() {
    if (!galleryGrid) return;
    var results = [];
    var done = 0;
    for (var i = 1; i <= GALLERY_MAX; i++) {
      (function (n) {
        var img = new Image();
        img.onload = function () { results[n - 1] = 'assets/gallery-' + n + '.jpg'; check(); };
        img.onerror = function () { results[n - 1] = null; check(); };
        img.src = 'assets/gallery-' + n + '.jpg';
      })(i);
    }
    function check() {
      if (++done < GALLERY_MAX) return;
      galleryImages = results.filter(Boolean);
      if (galleryImages.length) {
        galleryImages.forEach(function (src, idx) {
          galleryGrid.appendChild(buildGalleryItem(src, idx));
        });
      } else {
        for (var j = 0; j < PLACEHOLDER_COUNT; j++) galleryGrid.appendChild(buildGalleryPlaceholder());
      }
      if (window.ScrollTrigger) ScrollTrigger.refresh();
      animateGroup(galleryGrid);
    }
  })();

  /* ==========================================================
     7) Lightbox
  ========================================================== */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbIndex = 0;
  var lastFocus = null;

  function openLightbox(i) {
    if (!galleryImages.length) return;
    lbIndex = i;
    lbImg.src = galleryImages[lbIndex];
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lastFocus = document.activeElement;
    document.getElementById('lbClose').focus();
  }
  function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function stepLightbox(dir) {
    lbIndex = (lbIndex + dir + galleryImages.length) % galleryImages.length;
    lbImg.src = galleryImages[lbIndex];
  }

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', function () { stepLightbox(-1); });
  document.getElementById('lbNext').addEventListener('click', function () { stepLightbox(1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });

  /* ==========================================================
     8) قائمة الموبايل + روابط التنقل (تمرير أصلي سلس)
  ========================================================== */
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', function () {
    var open = mobileMenu.classList.toggle('hidden') === false;
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.querySelectorAll('[data-nav-link]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id.charAt(0) !== '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      mobileMenu.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
      var y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: REDUCED ? 'auto' : 'smooth' });
    });
  });

  /* ==========================================================
     9) Navbar يصغر عند النزول (مقيّد بـ rAF)
  ========================================================== */
  var navbar = document.getElementById('navbar');
  var navTick = false;
  window.addEventListener('scroll', function () {
    if (navTick) return;
    navTick = true;
    requestAnimationFrame(function () {
      navbar.classList.toggle('shrink', window.scrollY > 60);
      navTick = false;
    });
  }, { passive: true });

  /* ==========================================================
     10) أنيميشن GSAP + ScrollTrigger
         data-reveal (up افتراضياً) | "left" | "right" | "scale"
  ========================================================== */
  function revealVars(dir) {
    var rtl = document.documentElement.dir === 'rtl';
    switch (dir) {
      case 'left':  return { opacity: 0, x: rtl ? 60 : -60 };
      case 'right': return { opacity: 0, x: rtl ? -60 : 60 };
      case 'scale': return { opacity: 0, scale: 0.9 };
      default:      return { opacity: 0, y: 44 };
    }
  }

  function animateGroup(group) {
    if (REDUCED || !window.gsap) return;
    var children = group.children;
    if (!children.length) return;
    var vars = {
      opacity: 0, y: 40,
      duration: 0.7, ease: 'power3.out', stagger: 0.1,
      clearProps: 'transform'
    };
    // مجموعات الـ Hero (شريط الإحصائيات) تظهر فور التحميل
    if (group.closest('#home')) vars.delay = 0.7;
    else vars.scrollTrigger = { trigger: group, start: 'top 85%' };
    gsap.from(children, vars);
  }

  if (!REDUCED && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // ظهور العناصر المفردة حسب الاتجاه
    // عناصر الـ Hero تتحرك فور التحميل (دائماً ظاهرة أعلى الصفحة) — البقية مع التمرير
    var heroDelay = 0;
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      var vars = revealVars(el.getAttribute('data-reveal'));
      vars.duration = 0.85;
      vars.ease = 'power3.out';
      vars.clearProps = 'transform';
      if (el.closest('#home')) {
        vars.delay = 0.15 + (heroDelay += 0.13);
      } else {
        vars.scrollTrigger = { trigger: el, start: 'top 88%' };
      }
      gsap.from(el, vars);
    });

    // المجموعات المتدرجة
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      if (group.id === 'galleryGrid') return; // يُحرَّك بعد البناء
      animateGroup(group);
    });

    // parallax خفيف لخلفية الـ Hero
    gsap.to('#heroBg', {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.6 }
    });

    // parallax عكسي خفيف لصورة "من نحن"
    gsap.fromTo('.about-img-wrap', { y: 30 }, {
      y: -30, ease: 'none',
      scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });

    // العدّاد الرقمي (2019)
    var statYear = document.getElementById('statYear');
    if (statYear) {
      var target = parseInt(statYear.getAttribute('data-count'), 10);
      var counter = { val: target - 120 };
      gsap.to(counter, {
        val: target, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: statYear, start: 'top 90%', once: true },
        onUpdate: function () { statYear.textContent = Math.round(counter.val); }
      });
    }
  }

  /* ==========================================================
     11) سنة الحقوق تلقائياً
  ========================================================== */
  document.getElementById('year').textContent = new Date().getFullYear();
})();

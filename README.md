# logo — su ve doğal gaz tesisatı 🇹🇷 / 🇸🇦

Landing Page ثابتة (HTML + CSS + JS vanilla) ثنائية اللغة **TR/AR** مع دعم RTL كامل، لمتجر مستلزمات المياه والغاز الطبيعي في مزيتلي / مرسين. الهدف: توجيه الزائر إلى واتساب.

## ✅ التشغيل

لا يوجد build ولا backend — افتح الملف مباشرة:

```
index.html   ← انقر عليه نقراً مزدوجاً (أو اسحبه للمتصفح)
```

> يُفضَّل التشغيل عبر سيرفر محلي بسيط (لتجنّب أي قيود متصفح على الملفات المحلية):
> ```
> cd logo-tesisat
> python -m http.server 8000
> # ثم افتح http://localhost:8000
> ```

المكتبات (Tailwind, GSAP, Google Fonts) تُحمَّل من CDN — تحتاج اتصال إنترنت أول مرة.

## 🚀 النشر (Deploy)

الموقع ثابت بالكامل — أي استضافة static تكفي، **كلها مجانية**:

1. **Netlify Drop** (الأسهل): افتح `app.netlify.com/drop` واسحب مجلد المشروع → رابط فوري.
2. **GitHub Pages**: ارفع الملفات لمستودع → Settings → Pages → فعّل من فرع main.
3. **Vercel / Cloudflare Pages**: استيراد المجلد من لوحة التحكم.

> بعد النشر بالدومين النهائي، حدّث `og:image` في `index.html` لرابط مطلق
> (مثل `https://yourdomain.com/assets/hero.jpg`) وأضف `<link rel="canonical">`.

## 🧪 الاختبارات

```
python tests/smoke_test.py
```

تفحص آلياً: تطابق مفاتيح الترجمة TR/AR، وجود الأصول، روابط واتساب، وسوم SEO، أمان الروابط الخارجية، وعدم وجود أسرار في الكود. شغّلها بعد أي تعديل.

## 🖼️ تبديل / إضافة الصور

كل الصور في مجلد `assets/` بأسماء ثابتة. أي صورة **مفقودة** يظهر مكانها placeholder فولاذي أنيق تلقائياً — الموقع لا ينكسر أبداً.

| الملف | المكان | ملاحظات |
|---|---|---|
| `assets/logo.svg` | Navbar + Footer + favicon | نسخة مرسومة من الشعار. **لو وضعت `logo.png` (صورة الشعار الحقيقية) فستأخذ الأولوية تلقائياً** |
| `assets/hero.jpg` | خلفية الـ Hero (parallax) | ✅ موجودة |
| `assets/store.jpg` | قسم "من نحن" | ✅ موجودة |
| `assets/gallery-1.jpg` … `gallery-9.jpg` | المعرض | ✅ 9 صور موجودة — يدعم حتى 12، ضع `gallery-10.jpg` وهكذا لإضافة المزيد |

لإضافة صورة معرض جديدة: سمِّها بالرقم التالي (`gallery-5.jpg` مثلاً) وضعها في `assets/` — تظهر تلقائياً.
لرفع الحد الأقصى فوق 12: عدّل `GALLERY_MAX` في `js/main.js`.

## ✍️ تعديل النصوص (TR/AR)

كل النصوص في كائن واحد أعلى `js/main.js`:

```js
var I18N = {
  tr: { 'hero.title': '...', ... },
  ar: { 'hero.title': '...', ... }
};
```

عدّل النص في اللغتين بنفس المفتاح. النصوص الافتراضية داخل `index.html` هي التركية (تُستبدل فوراً عند تبديل اللغة). **ساعات العمل** placeholder — عدّلها من مفتاح `contact.hours` في اللغتين.

## 📞 بيانات التواصل

- واتساب: `+90 537 353 2470` — الرابط مكرر في عدة أماكن في `index.html`، للتغيير ابحث عن `wa.me/905373532470` واستبدل.
- العنوان: Menderes Mah. Limon Cad. Akgün 13 Apt No:17A, Mezitli / Mersin
- الخريطة: iframe في قسم İletişim + زر الاتجاهات يفتح `maps.app.goo.gl/5k9cuiCXv65T6HjaA`

## 🧱 البنية

```
logo-tesisat/
├── index.html        ← الصفحة (كل الأقسام + SEO + schema.org)
├── css/styles.css    ← الهوية: glassmorphism، تدرجات كروم/فولاذ، RTL، placeholders
├── js/main.js        ← i18n، Lenis، GSAP/ScrollTrigger، المعرض، lightbox
├── assets/           ← الصور
└── README.md
```

## ⚙️ ملاحظات تقنية

- **الثيم:** غامق فخم (كحلي ليلي + كروم + أزرق فولاذي).
- **اللغة الافتراضية:** التركية، ويُحفظ اختيار الزائر في `localStorage`.
- **الأداء:** تمرير المتصفح الأصلي (بدون مكتبة smooth-scroll)، كل الأنيميشن transform/opacity فقط، وبدون blur ثقيل إلا في الـ navbar.
- **الأنيميشن:** GSAP ScrollTrigger — اتجاهات `data-reveal` (up/left/right/scale) + stagger للمجموعات، ويُعطَّل بالكامل عند `prefers-reduced-motion`.
- **الصور:** lazy-loading في المعرض وقسم من نحن.
- **SEO:** title/description يتبدلان مع اللغة + Open Graph + schema.org LocalBusiness.

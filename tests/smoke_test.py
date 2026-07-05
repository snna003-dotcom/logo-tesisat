# -*- coding: utf-8 -*-
"""
اختبارات سلامة المشروع (smoke tests) — تعمل بدون سيرفر:
    python tests/smoke_test.py
تفحص: تطابق مفاتيح الترجمة TR/AR، وجود كل الأصول المرجعية،
روابط واتساب الصحيحة، وسوم SEO الأساسية، وأمان الروابط الخارجية.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FAILURES = []


def check(name, ok, detail=""):
    status = "PASS" if ok else "FAIL"
    print(f"[{status}] {name}" + (f" — {detail}" if detail and not ok else ""))
    if not ok:
        FAILURES.append(name)


html = (ROOT / "index.html").read_text(encoding="utf-8")
js = (ROOT / "js" / "main.js").read_text(encoding="utf-8")
css = (ROOT / "css" / "styles.css").read_text(encoding="utf-8")

# 1) تطابق مفاتيح الترجمة بين اللغتين
def extract_keys(block):
    return set(re.findall(r"'([\w.]+)'\s*:", block))

tr_block = js.split("tr: {")[1].split("},")[0]
ar_block = js.split("ar: {")[1].split("}\n  };")[0]
tr_keys, ar_keys = extract_keys(tr_block), extract_keys(ar_block)
check("i18n: مفاتيح TR/AR متطابقة", tr_keys == ar_keys,
      f"فرق: {tr_keys ^ ar_keys}")

# 2) كل data-i18n في HTML له مفتاح في القاموس
html_keys = set(re.findall(r'data-i18n(?:-content)?="([\w.]+)"', html))
missing = html_keys - tr_keys
check("i18n: كل مفاتيح HTML موجودة بالقاموس", not missing, f"ناقص: {missing}")

# 3) الأصول المحلية المرجعية موجودة فعلاً
refs = set(re.findall(r'(?:src|href)="(assets/[^"]+)"', html))
refs |= set(re.findall(r"'(assets/[^']+\.(?:jpg|png|svg))'", js))
# logo.png اختياري بالتصميم (يُجرَّب كأولوية وله fallback إلى logo.svg)
OPTIONAL = {"assets/logo.png"}
missing_assets = [r for r in refs
                  if "gallery-" not in r and r not in OPTIONAL and not (ROOT / r).exists()]
check("الأصول: كل الملفات المرجعية موجودة", not missing_assets, str(missing_assets))

# 4) صور المعرض: توجد صورة واحدة على الأقل بالتسمية الصحيحة
gallery = list((ROOT / "assets").glob("gallery-*.jpg"))
check("المعرض: صور gallery-*.jpg موجودة", len(gallery) >= 1, "لا توجد صور معرض")

# 5) روابط واتساب: الرقم الصحيح فقط
wa_links = re.findall(r'wa\.me/(\d+)', html)
check("واتساب: كل الروابط للرقم 905373532470",
      wa_links and all(n == "905373532470" for n in wa_links),
      f"أرقام غريبة: {set(wa_links)}")

# 6) أمان: كل target=_blank معه rel=noopener
blank = len(re.findall(r'target="_blank"', html))
noopener = len(re.findall(r'rel="noopener"', html))
check("أمان: noopener على كل الروابط الخارجية", blank == noopener,
      f"{noopener}/{blank}")

# 7) SEO: الوسوم الأساسية
check("SEO: title موجود", "<title" in html)
check("SEO: meta description موجود", 'name="description"' in html)
check("SEO: schema.org JSON-LD موجود", "application/ld+json" in html)
check("SEO: Open Graph موجود", 'property="og:title"' in html)
check("SEO: h1 واحد فقط", html.count("<h1") == 1, f"{html.count('<h1')} عناوين h1")

# 8) a11y: لا صور بدون alt
imgs = re.findall(r"<img[^>]*>", html)
no_alt = [i[:60] for i in imgs if "alt=" not in i]
check("a11y: كل الصور لها alt", not no_alt, str(no_alt))

# 9) الأداء/الاحترام: prefers-reduced-motion مدعوم
check("a11y: دعم prefers-reduced-motion", "prefers-reduced-motion" in css)

# 10) لا أسرار أو مفاتيح API في الكود
secrets = re.findall(r'(?:api[_-]?key|secret|password|token)\s*[:=]\s*["\'][\w-]{8,}', html + js, re.I)
check("أمان: لا أسرار في الكود", not secrets, str(secrets))

print()
if FAILURES:
    print(f"النتيجة: فشل {len(FAILURES)} اختبار — {FAILURES}")
    sys.exit(1)
print("النتيجة: كل الاختبارات ناجحة ✅")

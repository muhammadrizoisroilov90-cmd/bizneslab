/* =========================================================
   BiznesLab — app.js
   ========================================================= */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fmt(n) {
    return Math.round(n).toLocaleString('ru-RU').replace(/\u00A0/g, ' ').replace(/,/g, ' ');
  }

  /* ---------------- Theme ---------------- */
  var root = document.documentElement;
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (themeMeta) themeMeta.setAttribute('content', '#07080f');
    } else {
      root.removeAttribute('data-theme');
      if (themeMeta) themeMeta.setAttribute('content', '#0b0d1f');
    }
  }

  var themeToggle = $('#themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('bizneslab-theme', next); } catch (e) {}
    });
  }

  /* ---------------- Header / progress ---------------- */
  var header = $('#siteHeader');
  var progress = $('#progress');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 16);
    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  var burger = $('#burger');
  var mobileMenu = $('#mobileMenu');

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    header.classList.remove('menu-open');
    if (burger) {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Menyuni ochish');
    }
    document.body.style.overflow = '';
  }

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      header.classList.toggle('menu-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Menyuni yopish' : 'Menyuni ochish');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    $$('a', mobileMenu).forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  var revealEls = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealIO.observe(el); });

    // Safety net: reveal above-the-fold content even if the observer is delayed.
    window.addEventListener('load', function () {
      setTimeout(function () {
        revealEls.forEach(function (el) {
          if (el.classList.contains('is-visible')) return;
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 1.15 && r.bottom > -100) el.classList.add('is-visible');
        });
      }, 1500);
    });
  }

  /* ---------------- Counters ---------------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = fmt(target) + suffix; return; }
    var start = performance.now();
    var dur = 1100;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target) + suffix;
    }
    requestAnimationFrame(tick);
  }

  var counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countIO.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------------- Filters ---------------- */
  var filterBtns = $$('.filter');
  var cards = $$('.idea-card');
  var emptyMsg = $('#filterEmpty');

  filterBtns.forEach(function (btn) {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      var visible = 0;
      cards.forEach(function (card) {
        var tags = ' ' + (card.getAttribute('data-tags') || '') + ' ';
        var show = filter === 'all' || tags.indexOf(' ' + filter + ' ') !== -1;
        card.classList.toggle('is-hidden', !show);
        if (show) {
          visible++;
          if (!reduceMotion) {
            card.style.animation = 'none';
            void card.offsetWidth;
            card.style.animation = '';
          }
        }
      });
      if (emptyMsg) emptyMsg.hidden = visible !== 0;
    });
  });

  /* ---------------- Card spotlight ---------------- */
  cards.forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------------- Idea details ---------------- */
  var IDEAS = {
    qr: {
      num: '03',
      icon: 'i-qr',
      title: 'QR menyu + buyurtma',
      tagline: 'Restoran va kafelar uchun',
      featured: true,
      problem: 'Menyu eskirgan, ofitsiant har stolga yugurib boradi, buyurtma oshxonaga kech yetadi. Egasi esa qaysi taom ko\'p sotilayotganini bilmaydi.',
      solution: [
        'Har stol uchun alohida QR kod — skanerda menyu ochiladi',
        'Rasm, narx, tarkib va mavjudlikni o\'zingiz yangilaysiz',
        'Buyurtma to\'g\'ridan-to\'g\'ri oshxona ekraniga yoki Telegram\'ga tushadi',
        'Statistika: eng ko\'p buyurtma qilingan taomlar va soatlar'
      ],
      money: [
        ['Asosiy model', 'Oylik obuna'],
        ['Obuna narxi', '100 000 – 300 000 so\'m /oy'],
        ['O\'rnatish (bir marta)', '300 000 – 500 000 so\'m'],
        ['QR stendlar', '20 000 so\'m / dona']
      ],
      why: [
        '2–3 haftada tayyor — eng qisqa MVP',
        'Egasi natijani birinchi kundan ko\'radi',
        'Demo stol ustida 30 soniyada ko\'rsatiladi',
        'Mahalliy bozorda raqobat hali past'
      ],
      steps: [
        'Menyu konstruktori: kategoriya, taom, rasm, narx',
        'QR generator va chiroyli mobil menyu',
        'Buyurtma → Telegram guruh yoki oshxona printeri',
        '3 ta restoranda 14 kunlik bepul sinov',
        'Birinchi to\'lov va texnik xizmat paketi'
      ],
      stack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Telegram Bot API', 'Vercel'],
      risk: 'Ba\'zi restoranlar QR menyuni «mijozni bezovta qiladi» deb qabul qiladi. Ofitsiant vaqtini tejashni aniq raqam bilan ko\'rsating: 1 ofitsiant = 2–3 mln so\'m/oy.'
    },
    bron: {
      num: '01',
      icon: 'i-cal',
      title: 'Onlayn bron tizimi',
      tagline: 'Barbershop, salon, klinika, avtoservis',
      problem: 'Vaqt daftar, Instagram Direct va qo\'ng\'iroqlar orqali yoziladi. Natijada ikki mijoz bir vaqtga tushadi, kimdir kelmaydi, egasi kunlik jadvalni boshida bilmaydi.',
      solution: [
        'Onlayn jadval: mijoz bo\'sh vaqtni ko\'radi va o\'zi yoziladi',
        'Avtomatik eslatma: Telegram yoki SMS orqali 2 soat oldin',
        'Egasi uchun panel: kunlik, haftalik va oylik bandlik',
        'Xizmat narxi, davomiyligi va usta tanlash'
      ],
      money: [
        ['Asosiy model', 'Oylik obuna'],
        ['Obuna narxi', '100 000 – 200 000 so\'m /oy'],
        ['2+ filial', '+50% qo\'shimcha'],
        ['SMS paket', 'alohida, oyiga 30 000 so\'mdan']
      ],
      why: [
        'Har mahallada 5–10 ta salon bor — mijoz bazasi juda yaqin',
        'Egasi yo\'qotilgan mijozni darhol his qiladi',
        'Oylik to\'lov — bashorat qilinadigan daromad',
        'Sotish uchun 10 daqiqalik demo yetarli'
      ],
      steps: [
        '1-hafta: bitta salon bilan 3 ta intervyu, jarayonni yozish',
        '2-hafta: jadval, bron oqimi va admin panel',
        '3-hafta: Telegram eslatma, QR kod va shaxsiy havola',
        '4-hafta: 3 ta salonni bepul sinovga ulash',
        'Fikrlar asosida narx va paketlarni sozlash'
      ],
      stack: ['Next.js', 'PostgreSQL', 'Telegram Bot API', 'Vercel', 'Supabase'],
      risk: 'Mijozlar Instagram Direct\'ga o\'rganib qolgan. Ko\'chirish uchun qulaylik va eslatma tizimini birinchi kundan yoqing.'
    },
    shop: {
      num: '02',
      icon: 'i-store',
      title: 'Do\'kon konstruktori',
      tagline: 'Instagram va Telegram sotuvchilari uchun',
      problem: 'Sotuvchilar buyurtmani Direct\'da qabul qiladi: nima bor, qancha, yetkazib berish qancha — hammasi qo\'lda. Katalog, savat va hisobot yo\'q.',
      solution: [
        '5 daqiqada do\'kon: nom, logo va mahsulotlar',
        'Shaxsiy havola — Instagram bio\'siga qo\'yiladi',
        'Savat va buyurtma formasi, Telegram\'ga avtomatik xabar',
        'Mahsulot qoldig\'i va oddiy statistika'
      ],
      money: [
        ['Asosiy model', 'Obuna + komissiya'],
        ['Obuna', '50 000 – 100 000 so\'m /oy'],
        ['Komissiya', 'har buyurtmadan 1–3%'],
        ['Premium', 'domen + brending 300 000 so\'m']
      ],
      why: [
        'Sotuvchilar soni juda ko\'p, kirish narxi past',
        'Viral o\'sish: har do\'kon o\'z mijozlarini olib keladi',
        'Komissiya daromadni sotuv hajmiga bog\'laydi',
        'Instagram\'dan tashqariga chiqish istagi kuchli'
      ],
      steps: [
        'Konstruktor: shablon va mahsulot kartochkalari',
        'Savat, buyurtma va Telegram xabarnoma',
        'To\'lov havolasi: Payme / Click (2-bosqich)',
        '10 ta sotuvchi bilan beta va fikr yig\'ish',
        'Premium tarif va domen ulash'
      ],
      stack: ['Next.js', 'Supabase', 'Telegram Bot API', 'Payme / Click', 'Cloudflare'],
      risk: 'Shablon yechimlar ko\'p. Tezlik, o\'zbek tilidagi qo\'llab-quvvatlash va mahalliy to\'lov integratsiyasi bilan ajralib turing.'
    },
    ijara: {
      num: '04',
      icon: 'i-key',
      title: 'Ijara platformasi',
      tagline: 'Mashina, kvartira va texnika',
      problem: 'Ijara asosan Telegram guruhlarida. E\'lon ishonchsiz, band kunlar chalkash, to\'lov kafolatsiz va nizolar qo\'lda hal qilinadi.',
      solution: [
        'E\'lon: rasm, narx, sana va lokatsiya',
        'Kalendar: band kunlar avtomatik yopiladi',
        'Bron va oldindan to\'lov (depozit)',
        'Reyting, sharhlar va egalarni tekshirish'
      ],
      money: [
        ['Asosiy model', 'Komissiya'],
        ['Har bir brondan', '10–15%'],
        ['Premium e\'lon', '50 000 so\'m /oy'],
        ['Depozit xizmati', 'tranzaksiyadan 1–2%']
      ],
      why: [
        'Har bir bron — daromad, obuna shart emas',
        'Taksi va qurilish texnikasi bozori katta',
        'Tarmoq effekti: e\'lon qancha ko\'p, mijoz shuncha ko\'p',
        'Takroriy bronlar bilan daromad barqarorlashadi'
      ],
      steps: [
        'E\'lonlar va qidiruv: sana, narx, hudud filtrlari',
        'Bron kalendari va egasiga avtomatik xabar',
        'To\'lov va depozit: Payme / Click',
        'Birinchi 50 ta e\'lonni qo\'lda yig\'ish',
        'Ishonch tizimi: telefon va hujjat tekshiruvi'
      ],
      stack: ['Next.js', 'PostgreSQL', 'Payme / Click', 'Mapbox', 'Supabase'],
      risk: 'Asosiy muammo — ishonch va nizolar. Foydalanuvchini tekshirish, depozit va aniq qoidalar bo\'lmasa, platforma obro\'sini yo\'qotadi.'
    },
    usta: {
      num: '05',
      icon: 'i-tool',
      title: 'Ustalar bozori',
      tagline: 'Frilanserlar va ustalar uchun',
      problem: 'Ustani faqat tanishlar orqali topish mumkin. Narx oldindan noma\'lum, sifat kafolatsiz, ish vaqti kelishilmaydi.',
      solution: [
        'Mijoz vazifani yozadi: elektr, santexnika, ta\'mirlash',
        'Ustalar narx va muddat bilan taklif yuboradi',
        'Reyting, sharh va bajarilgan ishlar portfoliosi',
        'To\'lov platforma orqali — himoyalangan'
      ],
      money: [
        ['Asosiy model', 'Komissiya'],
        ['Har buyurtmadan', '8–12%'],
        ['Premium profil', '30 000 – 50 000 so\'m /oy'],
        ['Ustani tekshirish', '20 000 so\'m (bir marta)']
      ],
      why: [
        'Talab har kuni — har xonadonda biror narsa buziladi',
        'Komissiya modeli boshlash uchun arzon',
        'Mahalliy ishonch brendi tez shakllanadi',
        'Ustalar uchun doimiy buyurtma oqimi — kuchli motiv'
      ],
      steps: [
        'Vazifa joylash: kategoriya, rasm, byudjet',
        'Takliflar ro\'yxati va chat',
        'Reyting, sharh va himoyalangan to\'lov',
        '10 ta ustani qo\'lda ro\'yxatga olish',
        'Bitta tumandan boshlab, keyin shaharga kengaytirish'
      ],
      stack: ['Next.js', 'PostgreSQL', 'Payme / Click', 'Telegram Bot', 'SMS'],
      risk: 'Bu ikki tomonlama bozor: avval ustalar, keyin mijozlar. Bir vaqtda ikkalasini to\'ldirish qiyin — bitta tuman va bitta kasbdan boshlang.'
    },
    crm: {
      num: '06',
      icon: 'i-chart',
      title: 'Kichik biznes CRM',
      tagline: 'Do\'kon, ustaxona va o\'quv markazlari',
      problem: 'Qarzdorlar daftarda yuritiladi. Kim qancha qarz, qachon to\'laydi — egasi eslay olmaydi, hisobot esa umuman yo\'q.',
      solution: [
        'Mijozlar bazasi va to\'liq qarz tarixi',
        'To\'lov qabul qilish va chek (print yoki Telegram)',
        'Eslatma: qarz muddati yaqinlashganda',
        'Hisobot: kunlik savdo, foyda va qarzdorlar'
      ],
      money: [
        ['Asosiy model', 'Oylik obuna'],
        ['Obuna narxi', '100 000 – 250 000 so\'m /oy'],
        ['O\'rnatish va o\'qitish', '200 000 so\'m (bir marta)'],
        ['Qo\'shimcha foydalanuvchi', '30 000 so\'m /oy']
      ],
      why: [
        'Egasi pulni ko\'zdan yo\'qotmaydi — foyda aniq ko\'rinadi',
        'Abonent daromad barqaror va bashorat qilinadi',
        'Mahalliy bozor uchun soddalashtirilgan, o\'zbek tilida',
        'Keyin QR menyu yoki bron modulini qo\'shish oson'
      ],
      steps: [
        'Mijoz va qarz moduli',
        'To\'lov qabul qilish va chek',
        'Kunlik / haftalik hisobotlar',
        '3 ta do\'konda sinov, Excel\'dan import',
        'O\'qitish va texnik xizmat paketi'
      ],
      stack: ['Next.js', 'PostgreSQL', 'Prisma', 'Telegram Bot', 'Vercel'],
      risk: 'Raqobat kuchli: 1C, Excel va daftar. Yengillik, o\'zbek tilidagi yordam va 10 daqiqada o\'rganish bilan ajralib turing.'
    }
  };

  var modal = $('#ideaModal');
  var modalBody = $('#modalBody');
  var modalClose = $('#modalClose');
  var lastTrigger = null;

  function checkList(items) {
    return '<ul class="check-list">' + items.map(function (t) {
      return '<li><svg class="icon" aria-hidden="true"><use href="#i-check"></use></svg> ' + t + '</li>';
    }).join('') + '</ul>';
  }

  function openIdea(key, trigger) {
    var d = IDEAS[key];
    if (!d || !modal) return;
    lastTrigger = trigger || null;

    modalBody.innerHTML =
      '<div class="m-head">' +
        '<span class="idea-icon"><svg class="icon" aria-hidden="true"><use href="#' + d.icon + '"></use></svg></span>' +
        '<div>' +
          '<div class="m-eyebrow">G\'oya ' + d.num + (d.featured ? ' · Tavsiya etilgan' : '') + '</div>' +
          '<h3 id="modalTitle">' + d.title + '</h3>' +
          '<p class="m-tagline">' + d.tagline + '</p>' +
        '</div>' +
      '</div>' +

      '<div class="m-section"><h4>Muammo</h4><p>' + d.problem + '</p></div>' +

      '<div class="m-section"><h4>Yechim</h4>' + checkList(d.solution) + '</div>' +

      '<div class="m-section"><h4>Kim to\'laydi va qancha</h4><div class="m-money">' +
        d.money.map(function (row) { return '<div><span>' + row[0] + '</span><b>' + row[1] + '</b></div>'; }).join('') +
      '</div></div>' +

      '<div class="m-section"><h4>Nega ishlaydi</h4>' + checkList(d.why) + '</div>' +

      '<div class="m-section"><h4>MVP bosqichlari</h4><ol class="m-steps">' +
        d.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
      '</ol></div>' +

      '<div class="m-section"><h4>Texnologiyalar</h4><div class="m-chips">' +
        d.stack.map(function (s) { return '<span>' + s + '</span>'; }).join('') +
      '</div></div>' +

      '<div class="m-section"><h4>Xavf va yechim</h4><div class="m-risk"><strong>!</strong><span>' + d.risk + '</span></div></div>' +

      '<div class="m-cta">' +
        '<div><p>Shu g\'oyani tanlaysizmi?<span>Bepul MVP rejasini yuboraman.</span></p></div>' +
        '<button class="btn btn-primary" type="button" data-pick="' + key + '">Rejani olish</button>' +
      '</div>';

    modalBody.scrollTop = 0;
    modal.showModal();
    modal.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';

    var pick = modalBody.querySelector('[data-pick]');
    if (pick) {
      pick.addEventListener('click', function () {
        var val = pick.getAttribute('data-pick');
        closeIdea();
        var select = $('#ideaSelect');
        if (select) select.value = val;
        var target = $('#aloqa');
        if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        setTimeout(function () { if ($('#name')) $('#name').focus({ preventScroll: true }); }, 500);
      });
    }
  }

  function closeIdea() {
    if (!modal || !modal.open) return;
    modal.close();
    document.body.style.overflow = '';
  }

  $$('.idea-link[data-idea]').forEach(function (btn) {
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.addEventListener('click', function () {
      openIdea(btn.getAttribute('data-idea'), btn);
    });
  });

  if (modal) {
    if (modalClose) modalClose.addEventListener('click', closeIdea);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeIdea();
    });
    modal.addEventListener('close', function () {
      document.body.style.overflow = '';
      var trigger = lastTrigger;
      if (trigger && document.contains(trigger) && !trigger.hidden) {
        setTimeout(function () { trigger.focus({ preventScroll: true }); }, 0);
      }
    });
  }

  /* ---------------- Calculator ---------------- */
  var CALC = {
    qr: { name: 'QR menyu', count: 20, maxCount: 150, price: 200000, min: 100000, max: 300000, step: 25000, note: 'Abonent modeli — har bir restoran oyiga to\'laydi.' },
    bron: { name: 'Onlayn bron', count: 25, maxCount: 200, price: 150000, min: 100000, max: 200000, step: 10000, note: 'Abonent modeli — har bir biznes oyiga to\'laydi.' },
    shop: { name: 'Do\'kon konstruktori', count: 40, maxCount: 250, price: 100000, min: 50000, max: 150000, step: 5000, note: 'Obuna + har buyurtmadan kichik komissiya.' },
    ijara: { name: 'Ijara platformasi', count: 60, maxCount: 300, price: 150000, min: 50000, max: 400000, step: 25000, note: 'Komissiya modeli — har brondan o\'rtacha 10–15%.' },
    usta: { name: 'Ustalar bozori', count: 80, maxCount: 400, price: 80000, min: 30000, max: 200000, step: 10000, note: 'Komissiya modeli — har buyurtmadan o\'rtacha 8–12%.' },
    crm: { name: 'Kichik biznes CRM', count: 30, maxCount: 200, price: 175000, min: 100000, max: 250000, step: 25000, note: 'Abonent modeli — har bir biznes oyiga to\'laydi.' }
  };

  var calcKey = 'qr';
  var calcCount = $('#calcCount');
  var calcPrice = $('#calcPrice');
  var calcMonthly = $('#calcMonthly');
  var calcYearly = $('#calcYearly');
  var calcUnit = $('#calcUnit');
  var calcCountLabel = $('#calcCountLabel');
  var calcPriceLabel = $('#calcPriceLabel');
  var calcNote = $('#calcNote');
  var calcTen = $('#calcTen');
  var calcMeter = $('#calcMeter');
  var calcIdeaBtns = $$('.calc-idea');

  function paintRange(el) {
    if (!el) return;
    var min = parseFloat(el.min), max = parseFloat(el.max), val = parseFloat(el.value);
    var p = max > min ? ((val - min) / (max - min)) * 100 : 0;
    el.style.setProperty('--p', p + '%');
  }

  function updateCalc() {
    if (!calcCount || !calcPrice) return;
    var d = CALC[calcKey];
    var count = parseInt(calcCount.value, 10);
    var price = parseInt(calcPrice.value, 10);
    var monthly = count * price;

    if (calcCountLabel) calcCountLabel.textContent = fmt(count) + ' ta';
    if (calcPriceLabel) calcPriceLabel.textContent = fmt(price) + ' so\'m';
    if (calcMonthly) calcMonthly.textContent = fmt(monthly);
    if (calcYearly) calcYearly.textContent = fmt(monthly * 12) + ' so\'m';
    if (calcUnit) calcUnit.textContent = fmt(price) + ' so\'m';
    if (calcTen) calcTen.textContent = fmt(price * 10) + ' so\'m';
    if (calcNote) calcNote.textContent = d.note;
    if (calcMeter) calcMeter.style.width = Math.min(100, Math.max(4, (monthly / 15000000) * 100)) + '%';

    paintRange(calcCount);
    paintRange(calcPrice);
  }

  function selectCalcIdea(key) {
    if (!CALC[key]) return;
    calcKey = key;
    var d = CALC[key];
    calcIdeaBtns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-key') === key); });

    if (calcCount) {
      calcCount.max = String(d.maxCount);
      calcCount.value = String(d.count);
    }
    if (calcPrice) {
      calcPrice.min = String(d.min);
      calcPrice.max = String(d.max);
      calcPrice.step = String(d.step);
      calcPrice.value = String(d.price);
    }
    updateCalc();
  }

  calcIdeaBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { selectCalcIdea(btn.getAttribute('data-key')); });
  });
  if (calcCount) calcCount.addEventListener('input', updateCalc);
  if (calcPrice) calcPrice.addEventListener('input', updateCalc);

  if (calcCount) {
    selectCalcIdea('qr');
  }

  /* ---------------- Compare bars ---------------- */
  var compareBars = $('#compareBars');
  var compareRendered = false;

  function renderCompare() {
    if (!compareBars) return;
    var rows = Object.keys(CALC).map(function (key) {
      var d = CALC[key];
      return { name: d.name, value: d.count * d.price, key: key };
    }).sort(function (a, b) { return b.value - a.value; });

    var max = rows[0].value;
    compareBars.innerHTML = rows.map(function (r, i) {
      var w = Math.max(6, Math.round((r.value / max) * 100));
      return '<div class="compare-row">' +
        '<span class="compare-label">' + r.name + '</span>' +
        '<span class="compare-track"><span class="compare-fill" style="--w:' + w + '%;--i:' + i + '"></span></span>' +
        '<span class="compare-val">' + fmt(r.value) + ' so\'m</span>' +
      '</div>';
    }).join('');
    compareRendered = true;
  }

  renderCompare();

  /* ---------------- FAQ ---------------- */
  var faqItems = $$('.faq-item');

  function closeFaq(item) {
    item.classList.remove('open');
    var q = $('.faq-q', item);
    var a = $('.faq-a', item);
    if (q) q.setAttribute('aria-expanded', 'false');
    if (a) a.style.maxHeight = '0px';
  }

  function openFaq(item) {
    item.classList.add('open');
    var q = $('.faq-q', item);
    var a = $('.faq-a', item);
    if (q) q.setAttribute('aria-expanded', 'true');
    if (a) a.style.maxHeight = a.scrollHeight + 40 + 'px';
  }

  faqItems.forEach(function (item) {
    var q = $('.faq-q', item);
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(closeFaq);
      if (!isOpen) openFaq(item);
    });
  });

  window.addEventListener('resize', function () {
    faqItems.forEach(function (item) {
      if (item.classList.contains('open')) {
        var a = $('.faq-a', item);
        if (a) a.style.maxHeight = a.scrollHeight + 40 + 'px';
      }
    });
  });

  /* ---------------- Active nav link ---------------- */
  var navLinks = $$('.nav-links a');
  var sections = navLinks.map(function (a) {
    var id = a.getAttribute('href');
    return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---------------- Form ---------------- */
  var form = $('#leadForm');
  var success = $('#formSuccess');
  var successName = $('#successName');
  var resetBtn = $('#resetForm');
  var toast = $('#toast');
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3200);
  }

  function markInvalid(input, invalid) {
    if (!input) return;
    input.classList.toggle('invalid', invalid);
    input.setAttribute('aria-invalid', invalid ? 'true' : 'false');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#name');
      var phone = $('#phone');
      var ok = true;

      if (!name || name.value.trim().length < 2) { markInvalid(name, true); ok = false; }
      else { markInvalid(name, false); }

      if (!phone || phone.value.replace(/\s/g, '').length < 7) { markInvalid(phone, true); ok = false; }
      else { markInvalid(phone, false); }

      if (!ok) {
        showToast('Ism va telefon raqamini to\'g\'ri kiriting');
        var firstBad = form.querySelector('.invalid');
        if (firstBad) firstBad.focus();
        return;
      }

      if (successName) successName.textContent = name.value.trim();
      form.hidden = true;
      if (success) success.hidden = false;
      showToast('So\'rov qabul qilindi ✓');

      try {
        localStorage.setItem('bizneslab-lead', JSON.stringify({
          name: name.value.trim(),
          phone: phone.value.trim(),
          idea: $('#ideaSelect') ? $('#ideaSelect').value : '',
          message: $('#message') ? $('#message').value.trim() : '',
          at: new Date().toISOString()
        }));
      } catch (err) {}
    });

    $$('input, select, textarea', form).forEach(function (el) {
      el.addEventListener('input', function () { markInvalid(el, false); });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (success) success.hidden = true;
      if (form) {
        form.hidden = false;
        form.reset();
        $$('.invalid', form).forEach(function (el) { markInvalid(el, false); });
      }
      var name = $('#name');
      if (name) name.focus();
    });
  }

  /* ---------------- Year ---------------- */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------------- Re-paint ranges on load ---------------- */
  paintRange(calcCount);
  paintRange(calcPrice);
})();

# BiznesLab

Tadbirkorlar uchun **6 ta tekshirilgan web mahsulot g'oyasi**ni ko'rsatadigan bir sahifali sayt: har bir g'oya uchun kim to'laydi, qancha daromad keltiradi, MVP qancha vaqtda tayyor bo'ladi va birinchi mijozni qanday topish mumkin.

**Live:** https://muhammadrizoisroilov90-cmd.github.io/bizneslab/  
**Repository:** https://github.com/muhammadrizoisroilov90-cmd/bizneslab

---

## Texnologiyalar

| Qatlam     | Tanlov                                         |
| ---------- | ---------------------------------------------- |
| UI         | React 19 + TypeScript                          |
| Build      | Vite 8                                         |
| Animatsiya | CSS (IntersectionObserver bilan scroll-reveal) |
| Icons      | `lucide-react`                                 |
| Forma      | `react-hook-form` + `zod`                      |
| Shriftlar  | Manrope + Sora (`@fontsource-variable`)        |
| Styling    | Custom CSS design system — Tailwind yo'q       |

Sayt statik fayllar sifatida yig'iladi. Backend alohida yoziladi; frontend tayyor API shartnomasi va demo rejim bilan keladi.

---

## Imkoniyatlar

- **6 ta g'oya** — QR menyu, onlayn bron, do'kon konstruktori, ijara platformasi, ustalar bozori, CRM.
- **Filtrlar** — tez boshlash, abonent, marketplace, tavsiya.
- **Batafsil modal** — muammo, yechim, daromad modeli, MVP bosqichlari, texnologiyalar, xavflar va birinchi qadam.
- **Daromad kalkulyatori** — g'oya, mijozlar soni va o'rtacha to'lov bo'yicha oylik/yillik hisob.
- **Taqqoslash jadvali** va **4 haftalik yo'l xaritasi**.
- **Birinchi mijoz** bo'limi — tayyor pitch matni va amaliy qadamlar.
- **FAQ akkordeoni**, lead formasi, tungi/kunduzgi rejim.
- **Responsiv** — 1440, 1024, 768 va 390px kengliklarda tekshirilgan.
- **A11y** — skip-link, focus trap modallarda, `aria-*`, klaviatura navigatsiyasi, `prefers-reduced-motion`.
- **SEO** — Open Graph, Twitter Card, JSON-LD, sitemap, `robots.txt`, `site.webmanifest`.

---

## Loyiha tuzilishi

```
.
├── .github/workflows/deploy.yml   # GitHub Pages deploy
├── public/                        # favicon, OG image, robots, sitemap
├── src/
│   ├── components/
│   │   ├── layout/                # Header, Footer, Logo, ProgressBar, BackToTop
│   │   ├── sections/              # Hero, Ideas, Calculator, Contact, ...
│   │   └── ui/                    # Button, Modal, Toast, Reveal, ...
│   ├── data/                      # ideas, calculator, comparison, roadmap, faqs, site
│   ├── hooks/                     # useTheme, useScrollSpy, useCountUp, ...
│   ├── lib/                       # api, validation, format, cn
│   ├── styles/                    # tokens, base, components, sections, animations
│   ├── types/                     # umumiy TypeScript tiplari
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── vite.config.ts
└── package.json
```

Kontentni o'zgartirish uchun asosan `src/data/` papkasidagi fayllar yetarli — komponentlarga tegish shart emas.

---

## Ishga tushirish

Talab: **Node.js 20.19+** (yoki 22.12+).

```bash
npm install
npm run dev
```

Sayt: http://localhost:5173

### Scriptlar

| Buyruq                 | Vazifa                                  |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Dev server (HMR)                        |
| `npm run build`        | Type check + production build (`dist/`) |
| `npm run preview`      | Build natijasini lokal ko'rish          |
| `npm run lint`         | ESLint                                  |
| `npm run lint:fix`     | ESLint auto-fix                         |
| `npm run typecheck`    | TypeScript                              |
| `npm run format`       | Prettier                                |
| `npm run format:check` | Prettier tekshiruvi                     |

---

## Backend shartnomasi

Frontend tayyor. Backend quyidagi bitta endpointni ta'minlashi kifoya.

### `POST /leads`

```http
POST {VITE_API_URL}/leads
Content-Type: application/json
Accept: application/json
```

**Request body**

```json
{
  "name": "Aziz Karimov",
  "phone": "+998 90 123 45 67",
  "idea": "qr",
  "budget": "100–200 ming so'm",
  "message": "Toshkentda 3 ta kafe bor.",
  "source": "landing"
}
```

| Maydon    | Tur                                                            | Majburiy | Izoh                     |
| --------- | -------------------------------------------------------------- | -------- | ------------------------ |
| `name`    | `string`                                                       | ha       | 2–60 belgi               |
| `phone`   | `string`                                                       | ha       | Telefon yoki `@username` |
| `idea`    | `"qr" \| "bron" \| "shop" \| "ijara" \| "usta" \| "crm" \| ""` | yo'q     | Tanlangan g'oya          |
| `budget`  | `string`                                                       | yo'q     | Byudjet oralig'i         |
| `message` | `string`                                                       | yo'q     | 600 belgigacha           |
| `source`  | `string`                                                       | yo'q     | Default: `landing`       |

**Muvaffaqiyatli javob**

```http
201 Created
Content-Type: application/json

{ "id": "lead_01J..." }
```

**Xato javobi**

```json
{ "message": "Telefon raqam noto'g'ri" }
```

Frontend `message` yoki `error` maydonini o'qiydi. `4xx/5xx` da foydalanuvchiga shu matn ko'rsatiladi.

**Talablar**

- CORS: frontend domeniga ruxsat (`https://muhammadrizoisroilov90-cmd.github.io` va lokal `http://localhost:5173`).
- Rate limit: IP bo'yicha daqiqada 5–10 so'rov tavsiya etiladi.
- Spam himoyasi: formada yashirin `company` maydoni bor; agar u to'ldirilgan bo'lsa, so'rovni rad etish mumkin.
- Maxfiylik: telefon raqamni faqat javob berish uchun ishlatish va saqlash muddatini belgilash.

### Ulash

1. `.env.example` dan nusxa oling:

   ```bash
   cp .env.example .env.local
   ```

2. Backend manzilini yozing (oxirida `/` bo'lmasin):

   ```env
   VITE_API_URL=https://api.bizneslab.uz
   ```

3. `npm run build`.

`VITE_API_URL` berilmasa sayt **demo rejimda** ishlaydi: forma muvaffaqiyatli ko'rinadi va so'rov `localStorage`dagi `bizneslab:leads` kalemiga yoziladi (oxirgi 20 ta). Bu backend tayyor bo'lgunga qadar oqimni sinash uchun.

---

## Dizayn tizimi

Barcha ranglar, radiuslar va shriftlar `src/styles/tokens.css` da CSS o'zgaruvchilari sifatida turadi:

```css
:root {
  --brand: #7a6cff;
  --mint: #46e3ae;
  --bg: #06070d;
  --text: #f3f4fb;
  --radius-lg: 22px;
  --gradient: linear-gradient(115deg, #9182ff, #6f8cff, #48e2b4);
}

[data-theme='light'] {
  --bg: #f6f6fa;
  --text: #0b0d18;
  /* ... */
}
```

Brend rangini almashtirsangiz, butun sayt uyg'un yangilanadi. Tungi/kunduzgi rejim `data-theme` atributi orqali boshqariladi va tanlov `localStorage`da saqlanadi.

Asosiy fayllar:

- `tokens.css` — ranglar, o'lchamlar, soyalar.
- `base.css` — reset, tipografiya, container, section heading.
- `components.css` — tugmalar, header, modal, forma, footer.
- `hero.css`, `ideas.css`, `sections.css` — bo'limlar.
- `animations.css` — keyframe'lar va reduced-motion.

---

## Kontentni o'zgartirish

| Nima                                | Fayl                     |
| ----------------------------------- | ------------------------ |
| Brend nomi, kontaktlar, navigatsiya | `src/data/site.ts`       |
| G'oyalar, narxlar, MVP, matnlar     | `src/data/ideas.ts`      |
| Kalkulyator parametrlari            | `src/data/calculator.ts` |
| Taqqoslash jadvali                  | `src/data/comparison.ts` |
| 4 haftalik reja                     | `src/data/roadmap.ts`    |
| FAQ                                 | `src/data/faqs.ts`       |
| Forma validatsiyasi                 | `src/lib/validation.ts`  |
| API klient                          | `src/lib/api.ts`         |

> Kontaktlar hozircha namuna: `+998 90 000 00 00`, `@bizneslab_uz`, `hello@bizneslab.uz`. Real ma'lumotlar bilan almashtiring.

---

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` `main` branchga push bo'lganda avtomatik:

1. `npm ci`
2. `npm run lint`
3. `npm run build`
4. `dist/` ni Pages artifact sifatida yuklaydi
5. Pages'ga deploy qiladi

Sozlash (bir marta):

1. Repository → **Settings → Pages → Source: GitHub Actions**.
2. `main` branchga push qiling.
3. Actions tugashini kuting.

`vite.config.ts` da production `base` qiymati repo nomiga mos:

```ts
base: mode === 'production' ? '/bizneslab/' : '/',
```

Agar repo nomi yoki custom domen o'zgarsa, shu qiymatni yangilang.

Boshqa platformalar:

- **Vercel / Netlify** — build command `npm run build`, output `dist`.
- **Custom domen** — `base: '/'` qilib, domenni Pages sozlamalarida ulang.

---

## Sifat va tekshiruv

- `npm run build` — TypeScript strict mode + production build.
- `npm run lint` — ESLint (React Hooks, Refresh, TypeScript qoidalari).
- `npm run format:check` — Prettier.
- Brauzer QA: 1440 / 1024 / 768 / 390px, tungi va kunduzgi rejim, forma, modal, filtrlar, kalkulyator, FAQ, mobil menyu.

---

## Litsenziya

MIT — `LICENSE` faylini ko'ring.

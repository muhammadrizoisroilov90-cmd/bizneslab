# BiznesLab — tadbirkorlik uchun web sayt g'oyalari

**Live demo:** https://muhammadrizoisroilov90-cmd.github.io/bizneslab/
**Repository:** https://github.com/muhammadrizoisroilov90-cmd/bizneslab

Tadbirkorlik yo'nalishidagi 6 ta tayyor web mahsulot g'oyasini ko'rsatadigan, har biri uchun daromad modeli, MVP muddati va birinchi mijoz rejasini beradigan bir sahifali sayt.

## Nimalar bor

- **6 ta g'oya kartochkasi** — kim to'laydi, narx, MVP muddati, teglar.
- **Filtrlar** — tez boshlash, abonent, marketplace, tavsiya etilgan.
- **Batafsil modal** — muammo, yechim, narxlar, MVP bosqichlari, texnologiyalar va xavflar.
- **Daromad kalkulyatori** — g'oya, mijozlar soni va o'rtacha to'lov bo'yicha oylik/yillik daromad.
- **Taqqoslash jadvali** va **4 haftalik yo'l xaritasi**.
- **Birinchi mijoz** bo'yicha amaliy qadamlar.
- **FAQ akkordeoni**.
- **Lead forma** — validatsiya va muvaffaqiyat holati (hozircha mahalliy, backend yo'q).
- **Tungi / kunduzgi rejim**, mobil menyu, scroll animatsiyalari.

## Fayllar

```
index.html            — barcha kontent va bo'limlar
assets/css/style.css  — dizayn, ranglar, responsivlik
assets/js/app.js      — filtrlar, kalkulyator, modal, FAQ, forma
```

Tashqi bog'liqlik faqat Google Fonts (Manrope). Boshqa kutubxona yo'q.

## Qanday ochish

Eng oddiy usul — `index.html` faylini brauzerda ochish.

Lokal server bilan (tavsiya etiladi):

```bash
npx serve .
# yoki
python -m http.server 8000
```

So'ng `http://localhost:8000` manziliga o'ting.

## Sozlash

Hammasi bitta joyda turishi uchun quyidagilarni o'zgartiring:

1. **Brend nomi** — `index.html` ichida `BiznesLab` (logo, footer, `<title>`).
2. **Kontaktlar** — `+998 90 000 00 00`, `@bizneslab_uz`, `hello@bizneslab.uz`. Ular `#aloqa` bo'limida va footerda.
3. **Ranglar** — `assets/css/style.css` boshidagi `:root` o'zgaruvchilari:
   - `--brand`, `--brand-2`, `--brand-3` — asosiy binafsha;
   - `--accent`, `--accent-2` — yashil urg'u;
   - `--bg`, `--surface`, `--text` — fon va matn.
4. **Narxlar va raqamlar** — `assets/js/app.js` ichidagi `IDEAS` (modal matnlari) va `CALC` (kalkulyator) obyektlari, shuningdek `index.html` dagi kartochkalar.
5. **Forma** — hozir ma'lumotni faqat `localStorage` ga saqlaydi va muvaffaqiyat holatini ko'rsatadi. Haqiqiy yuborish uchun `#leadForm` submit qismiga o'z API yoki Telegram bot so'rovini qo'shing.

## Deploy

Statik sayt bo'lgani uchun quyidagilarga bemalol joylash mumkin:

- **GitHub Pages** — repoga yuklab, Settings → Pages → branch `main` / root.
- **Vercel** — `npx vercel` yoki repozitoriyani ulash.
- **Netlify** — papkani drag & drop qilish.

## Eslatma

Saytdagi barcha narxlar va daromad raqamlari taxminiy. Ular mahalliy bozor, shahar va mijozlar soniga qarab farq qiladi. Kontaktlar — namuna, ularni real ma'lumotlar bilan almashtiring.

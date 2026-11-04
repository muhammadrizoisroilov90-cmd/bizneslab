# BiznesLab — Lead API shartnomasi

**Versiya:** 1.0 · **Sana:** 2026-11-05  
**Frontend:** React 19 + TypeScript (branch: `feat/react-frontend`)  
**Holat:** frontend tayyor, backend implementatsiyasi kutilmoqda

Bu hujjat saytdagi “Rejani olish” formasi backend bilan qanday ishlashini belgilaydi. Backend faqat bitta endpointni ta'minlashi kerak.

---

## 1. Umumiy

| Parametr         | Qiymat                                            |
| ---------------- | ------------------------------------------------- |
| Endpoint         | `POST {VITE_API_URL}/leads`                       |
| Autentifikatsiya | Yo'q (ochiq forma)                                |
| Content-Type     | `application/json`                                |
| Timeout          | 12 soniya (frontend tomonda)                      |
| Base URL         | `.env` dagi `VITE_API_URL`, oxirida `/` bo'lmasin |

`VITE_API_URL` berilmasa frontend **demo rejimda** ishlaydi va lead'larni brauzerdagi `localStorage`ga yozadi. Bu backend tayyor bo'lgunga qadar formani sinash uchun.

---

## 2. CORS

Brauzer quyidagi origin'lardan so'rov yuboradi:

```
https://muhammadrizoisroilov90-cmd.github.io
http://localhost:5173
http://127.0.0.1:5173
http://localhost:4173
http://127.0.0.1:4173
```

Talablar:

- `Access-Control-Allow-Origin` — yuqoridagi aniq origin'lar (yoki production uchun faqat GitHub Pages origin'i).
- `Access-Control-Allow-Methods: POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Accept`
- `OPTIONS` so'roviga `204 No Content` qaytarish.
- Cookie/credentials ishlatilmaydi.

---

## 3. So'rov

```http
POST {VITE_API_URL}/leads
Content-Type: application/json
Accept: application/json

{
  "name": "Aziz Karimov",
  "phone": "+998 90 123 45 67",
  "idea": "qr",
  "budget": "100–200 ming so'm",
  "message": "Toshkentda 3 ta kafe bor.",
  "source": "landing"
}
```

### Maydonlar

| Maydon    | Tur                                                            | Majburiy | Cheklov / izoh                                       |
| --------- | -------------------------------------------------------------- | -------- | ---------------------------------------------------- |
| `name`    | `string`                                                       | **ha**   | Trim qilinadi, 2–60 belgi                            |
| `phone`   | `string`                                                       | **ha**   | Trim, 7–40 belgi. Telefon (`+998…`) yoki `@username` |
| `idea`    | `"qr" \| "bron" \| "shop" \| "ijara" \| "usta" \| "crm" \| ""` | yo'q     | `""` — tanlanmagan. `""` ni “yo'q” deb qabul qiling  |
| `budget`  | `string`                                                       | yo'q     | Quyidagi variantlardan biri yoki `""`                |
| `message` | `string`                                                       | yo'q     | Trim, maksimum 600 belgi                             |
| `source`  | `string`                                                       | yo'q     | Frontend `"landing"` yuboradi; default `"landing"`   |

**Byudjet variantlari:**

```
50–100 ming so'm
100–200 ming so'm
200–500 ming so'm
500 ming so'mdan yuqori
Hali aniq emas
```

### Telefon validatsiyasi

Frontend quyidagi qoidani qo'llaydi:

```js
/^[+\d][\d\s()-]{6,}$/.test(value) || value.startsWith('@');
```

Server tomonda ham xuddi shu qoidani tekshirish tavsiya etiladi.

### Muhim

- `company` — formadagi yashirin honeypot maydoni. **Frontend uni API'ga yubormaydi.** Agar kelajakda yuborilsa, bo'sh bo'lmagan qiymatni spam deb rad etish mumkin.
- Noma'lum maydonlar e'tiborsiz qoldirilishi mumkin.
- `idea` va `budget` bo'sh string bo'lishi mumkin — bu xato emas.

---

## 4. Muvaffaqiyatli javob

```http
201 Created
Content-Type: application/json

{
  "id": "lead_01J8Z3K4M5N6P7Q8R9S0T1"
}
```

- `id` — `string` (UUID, ULID yoki bazadagi ID). Frontend uni qabul qiladi, lekin hozircha ishlatmaydi; javobda bo‘lishi majburiy emas.
- Status **201** bo'lishi kerak. `200` ham qabul qilinadi, ammo shartnomada `201`.

---

## 5. Xato javoblari

```json
{ "message": "Telefon raqam noto'g'ri" }
```

yoki

```json
{ "error": "Rate limit exceeded" }
```

Frontend `message` yoki `error` maydonini o'qiydi va foydalanuvchiga ko'rsatadi. Ikkalasi bo'lmasa, umumiy “Server xatosi (kod)” chiqadi.

| Kod | Holat                      | Tavsiya etilgan matn                                          |
| --- | -------------------------- | ------------------------------------------------------------- |
| 400 | Noto'g'ri JSON / maydonlar | `Ma'lumotlar to'liq emas`                                     |
| 422 | Validatsiya xatosi         | Aniq sabab: `Telefon raqam noto'g'ri`                         |
| 429 | Juda ko'p so'rov           | `Juda ko'p urinish. Bir daqiqadan so'ng qayta urinib ko'ring` |
| 500 | Server xatosi              | `Serverda xatolik. Keyinroq qayta urinib ko'ring`             |

Xato javobida stack trace yoki ichki ma'lumot qaytarmang.

---

## 6. Xavfsizlik va spam himoyasi

- **Rate limit:** IP bo'yicha daqiqada 5–10 so'rov. Oshsa `429`.
- **Server validatsiyasi:** barcha maydon uzunligi va `idea` enum qiymati tekshirilsin.
- **Sanitizatsiya:** `message` va `name` dan HTML teglar olib tashlansin.
- **CORS:** faqat ro'yxatdagi origin'lar.
- **Maxfiylik:** telefon raqam faqat javob berish uchun ishlatilsin; saqlash muddati belgilansin.
- **Logging:** to'liq telefon raqamni log'ga yozmaslik tavsiya etiladi.

Ixtiyoriy: yangi lead kelganda Telegram bot orqali adminga xabar yuborish.

---

## 7. Ma'lumotlar bazasi (tavsiya)

```sql
CREATE TABLE leads (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  idea        TEXT,
  budget      TEXT,
  message     TEXT,
  source      TEXT NOT NULL DEFAULT 'landing',
  status      TEXT NOT NULL DEFAULT 'new', -- new | contacted | won | lost
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip          TEXT,
  user_agent  TEXT
);
```

Indekslar: `created_at`, `status`, kerak bo'lsa `phone`.

---

## 8. Qo'lda tekshirish

```bash
curl -i -X POST "https://api.bizneslab.uz/leads" \
  -H "Content-Type: application/json" \
  -H "Origin: https://muhammadrizoisroilov90-cmd.github.io" \
  -d '{
    "name": "Aziz Karimov",
    "phone": "+998 90 123 45 67",
    "idea": "qr",
    "message": "Test lead",
    "source": "landing"
  }'
```

Kutilgan natija:

- `201` va `{ "id": "..." }`
- CORS header'larida `Access-Control-Allow-Origin`
- Bazada yangi yozuv

---

## 9. Frontend bilan ulash

1. `.env.local` yarating:

   ```env
   VITE_API_URL=https://api.bizneslab.uz
   ```

2. `npm run build` qiling.
3. Formani to'ldirib yuboring — Network tab'da `POST /leads` `201` qaytishi kerak.
4. Xato holatini ham tekshiring: server `500` qaytarsa, formada xabar ko'rinishi kerak.

**Kod joylashuvi:**

| Fayl                                  | Vazifasi                       |
| ------------------------------------- | ------------------------------ |
| `src/lib/api.ts`                      | API klient, timeout, demo mode |
| `src/lib/validation.ts`               | Zod validatsiya qoidalari      |
| `src/components/sections/Contact.tsx` | Forma va submit oqimi          |

---

## 10. Backend tayyorligi checklist

- [ ] `POST /leads` endpoint ishlaydi
- [ ] JSON body to'g'ri o'qiladi
- [ ] `201 { "id": "..." }` qaytadi
- [ ] CORS production va lokal origin'lar uchun sozlangan
- [ ] `OPTIONS` so'rovi `204` qaytaradi
- [ ] Server validatsiyasi va xato matnlari tayyor
- [ ] Rate limit ishlaydi
- [ ] Lead bazaga saqlanadi
- [ ] (Ixtiyoriy) Telegram xabarnomasi ishlaydi
- [ ] `curl` va brauzerdan test o'tkazilgan

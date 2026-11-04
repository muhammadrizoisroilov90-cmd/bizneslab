import type { FaqItem } from '../types';

export const faqs: FaqItem[] = [
  {
    question: "Qaysi g'oyadan boshlash eng mantiqiy?",
    answer:
      "QR menyu — eng qisqa MVP (2–3 hafta), eng oson demo va eng tushunarli to'lov modeli. Ikkinchi o'rinda onlayn bron: mijoz bazasi yaqin, lekin raqobat biroz kuchliroq. Marketplace va ijara platformalarini keyinroq, tarmoq effekti uchun resurs bo'lganda boshlang.",
  },
  {
    question: 'Nega aynan React va TypeScript?',
    answer:
      "React komponentlar asosida tez o'sish va jamoa bilan ishlash uchun qulay. TypeScript esa backend bilan shartnomani (API tiplarini) aniq ushlab turadi: yangi endpoint qo'shilganda xatolar kompilyatsiyada ko'rinadi. Build Vite orqali yig'iladi, natija statik fayllar — CDN yoki GitHub Pages'da arzon ishlaydi.",
  },
  {
    question: 'Backend qachon va qanday ulanadi?',
    answer:
      "Frontend tayyor API qatlami bilan keladi. `VITE_API_URL` muhit o'zgaruvchisini backend manziliga o'rnatasiz — forma `POST /leads` endpointiga yuboriladi. Hozircha backend yo'q bo'lsa, so'rov demo rejimda localStorage'ga saqlanadi. Aniq so'rov/ javob shartnomasi README'da yozilgan.",
  },
  {
    question: 'Daromad raqamlari realmi?',
    answer:
      "Yo'q, ular bozor bo'yicha o'rtacha taxmin. Haqiqiy raqam shahar, mijozlar soni va sotuv ko'nikmangizga bog'liq. Kalkulyatorni o'z taxminlaringiz bilan o'zgartirib, ehtiyotkor va optimistik stsenariylarni solishtiring.",
  },
  {
    question: 'Bir kishi bu loyihani qila oladimi?',
    answer:
      "Ha. Frontend, backend va sotuvni bir kishi boshlasa, QR menyu uchun 3–4 hafta real muddat. Eng katta xavf — kod emas, birinchi mijozni topish. Shuning uchun 1-hafta kod yozishga emas, suhbat va pilotga bag'ishlangan.",
  },
  {
    question: 'Dizaynni o‘zgartirsam bo‘ladimi?',
    answer:
      "Ha. Ranglar, shrift va bo'shliqlar CSS o'zgaruvchilari orqali boshqariladi. Brendingiz uchun asosiy rangni bitta joyda almashtirsangiz, butun sayt uyg'un yangilanadi. Komponentlar mustaqil, shuning uchun bo'limlarni alohida ham qayta ishlash mumkin.",
  },
  {
    question: "Ma'lumotlarim qayerda saqlanadi?",
    answer:
      "Forma hozircha faqat brauzeringizda demo sifatida saqlanadi (backend ulanmagan). Ishlab chiqarishda ma'lumot backendga yuboriladi; maxfiylik siyosati va saqlash muddati backend jamoasi tomonidan belgilanadi. Sayt hech qanday uchinchi tomon analitikasini yuklamaydi.",
  },
];

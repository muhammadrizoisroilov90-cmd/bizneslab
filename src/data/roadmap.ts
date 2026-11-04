import type { RoadmapStep } from '../types';

export const roadmap: RoadmapStep[] = [
  {
    week: '1-hafta',
    title: 'Tekshirish va sotish',
    goal: 'Mahsulot yozishdan oldin mijoz borligini isbotlang.',
    tasks: [
      "20 ta restoran ro'yxatini tuzing",
      '5 ta egasi bilan 15 daqiqalik suhbat',
      '2 ta 14 kunlik pilotga kelishuv',
      "Telefonda ko'rsatiladigan 3 ekranli demo",
    ],
    result: '2 ta pilot kelishuv',
    metric: '5 suhbat → 2 pilot',
  },
  {
    week: '2-hafta',
    title: 'MVP yadro',
    goal: 'Eng muhim oqimni ishlaydigan holatga keltiring.',
    tasks: [
      'Menyu konstruktori va kategoriyalar',
      'QR kod + mobil menyu',
      'Buyurtma → Telegram bot',
      'Egasi uchun oddiy buyurtmalar ekrani',
    ],
    result: 'Ishlaydigan demo',
    metric: 'Bitta restoran real menyusi',
  },
  {
    week: '3-hafta',
    title: 'Ishonch va pul',
    goal: "Mahsulotni to'lovga va kundalik ishlatishga tayyorlang.",
    tasks: [
      'Brend, onboarding va qo‘llanma',
      'Statistika: taomlar va soatlar',
      "Hisob-faktura va to'lov havolasi",
      'Xatolarni tuzatish, tezlikni oshirish',
    ],
    result: "To'lovga tayyor mahsulot",
    metric: '3 ta restoran yuklangan',
  },
  {
    week: '4-hafta',
    title: 'Birinchi mijoz',
    goal: "Birinchi to'lovni oling va keyingi mijozlar uchun dalil yarating.",
    tasks: [
      '3 ta restoranda 14 kunlik sinov',
      'Har kuni fikr yig‘ish va tuzatish',
      'Bitta case study va 1 ta referal',
      "Birinchi oylik to'lovni rasmiylashtirish",
    ],
    result: "Birinchi to'lov",
    metric: '1 to‘lov + 1 referal',
  },
];

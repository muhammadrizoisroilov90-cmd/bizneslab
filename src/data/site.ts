export const site = {
  name: 'BiznesLab',
  tagline: 'Tadbirkorlar uchun raqamli mahsulotlar',
  description:
    "6 ta tekshirilgan web mahsulot g'oyasi: kim to'laydi, qancha daromad keltiradi va MVP qancha vaqtda tayyor bo'ladi.",
  url: 'https://muhammadrizoisroilov90-cmd.github.io/bizneslab/',
  email: 'hello@bizneslab.uz',
  phone: '+998 90 000 00 00',
  phoneHref: 'tel:+998900000000',
  telegram: '@bizneslab_uz',
  telegramHref: 'https://t.me/bizneslab_uz',
  workHours: 'Dush–Shan, 9:00–19:00',
} as const;

export const navItems = [
  { href: '#goyalar', label: "G'oyalar" },
  { href: '#tavsiya', label: 'Tavsiya' },
  { href: '#kalkulyator', label: 'Kalkulyator' },
  { href: '#yol-xaritasi', label: "Yo'l xaritasi" },
  { href: '#faq', label: 'FAQ' },
] as const;

export const sectors = [
  'Barbershop',
  "Go'zallik saloni",
  'Klinika',
  'Avtoservis',
  'Restoran',
  'Kafe',
  "Onlayn do'kon",
  'Ustaxona',
  "O'quv markazi",
  'Ijara',
  'Frilanserlar',
  "Do'konlar",
] as const;

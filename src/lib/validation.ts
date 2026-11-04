import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Ismingizni to'liqroq yozing").max(60, 'Ism juda uzun'),
  phone: z
    .string()
    .trim()
    .min(7, 'Telefon yoki Telegram manzilini kiriting')
    .max(40, 'Kontakt juda uzun')
    .refine((value) => /^[+\d][\d\s()-]{6,}$/.test(value) || value.startsWith('@'), {
      message: 'Telefon raqam yoki @username kiriting',
    }),
  idea: z.enum(['qr', 'bron', 'shop', 'ijara', 'usta', 'crm', '']).optional(),
  budget: z.string().optional(),
  message: z.string().trim().max(600, 'Izoh 600 belgidan oshmasin').optional(),
  company: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

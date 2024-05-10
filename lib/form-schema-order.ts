import * as z from "zod";

export const orderSchema = z.object({
  vehicle: z.number().optional(),
  date: z.string().refine((value) => /^\d{2}\.\d{2}\.\d{4}$/.test(value), {
    message: "Das Datum sollte im Format TT.MM.JJJJ sein.",
  }),
  startTime: z
    .string()
    .optional()
    .transform((value) => (value ? value.trim() : ""))
    .refine(
      (value) => !value || /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
      {
        message: "Die Uhrzeit sollte im Format HH-MM sein.",
      },
    ),
  endTime: z
    .string()
    .optional()
    .transform((value) => (value ? value.trim() : ""))
    .refine(
      (value) => !value || /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
      {
        message: "Die Uhrzeit sollte im Format HH-MM sein.",
      },
    ),
  startLocation: z.string().optional(),
  endLocation: z.string().optional(),
  driver: z.string().optional(),
  client: z.string().optional(),
  paymentOption: z.string().optional(),
  invoiceStatus: z.string().optional(),
  price: z
    .string()
    .optional()
    .refine((value) => !value || /^\d+$/.test(value), {
      message: "Der Preis sollte nur aus Zahlen bestehen.",
    }),
  invoiceNumber: z.string().optional(),
  message: z.string().optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

import * as z from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Bitte geben Sie einen gültigen Namen ein." }),
  email: z
    .string()
    .email({ message: "Die E-Mail-Adresse muss ein gültiges Format haben." }),
  contactno: z.coerce.number(),
  country: z.string().min(1, { message: "Bitte geben Sie ein Land ein." }),
  postalCode: z
    .string()
    .min(1, { message: "Bitte geben Sie eine gültige Postleitzahl ein." }),
  city: z.string().min(1, { message: "Bitte geben Sie eine Stadt ein." }),
  startdate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "Das Startdatum sollte im Format TT-MM-JJJJ sein.",
  }),
  enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "Das Enddatum sollte im Format TT-MM-JJJJ sein.",
  }),
  starttime: z
    .string()
    .refine((value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value), {
      message: "Die Uhrzeit sollte im Format HH-MM sein.",
    }),
  endtime: z
    .string()
    .refine((value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value), {
      message: "Die Uhrzeit sollte im Format HH-MM sein.",
    }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

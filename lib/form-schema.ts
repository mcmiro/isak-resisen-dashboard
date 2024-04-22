import * as z from "zod";

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  lastname: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Product Name must be at least 3 characters" }),
  contactno: z.coerce.number(),
  country: z.string().min(1, { message: "Please select a category" }),
  city: z.string().min(1, { message: "Please select a category" }),
  // jobs array is for the dynamic fields
  jobs: z.array(
    z.object({
      jobcountry: z.string().min(1, { message: "Please select a category" }),
      jobcity: z.string().min(1, { message: "Please select a category" }),
      jobtitle: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
      employer: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
      startdate: z
        .string()
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
          message: "Start date should be in the format YYYY-MM-DD",
        }),
      enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: "End date should be in the format YYYY-MM-DD",
      }),
    }),
  ),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

//import * as z from "zod";

//export const profileSchema = z.object({
//  firstname: z
//    .string()
//    .min(3, { message: "Bitte geben Sie einen gültigen Namen ein." }),
//  lastname: z
//    .string()
//    .min(3, { message: "Bitte geben Sie einen gültigen Namen ein." }),
//  email: z
//    .string()
//    .email({ message: "Die E-Mail-Adresse muss ein gültiges Format haben." }),
//  contactno: z.coerce.number(),
//  country: z.string().min(1, { message: "Bitte geben Sie ein Land ein." }),
//  postalCode: z
//    .string()
//    .min(1, { message: "Bitte geben Sie eine gültige Postleitzahl ein." }),
//  city: z.string().min(1, { message: "Bitte geben Sie eine Stadt ein." }),
//  startdate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
//    message: "Das Startdatum sollte im Format TT-MM-JJJJ sein.",
//  }),
//  enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
//    message: "Das Enddatum sollte im Format TT-MM-JJJJ sein.",
//  }),
//  starttime: z
//    .string()
//    .refine((value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value), {
//      message: "Die Uhrzeit sollte im Format HH-MM sein.",
//    }),
//  endtime: z
//    .string()
//    .refine((value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value), {
//      message: "Die Uhrzeit sollte im Format HH-MM sein.",
//    }),
//});

//export type ProfileFormValues = z.infer<typeof profileSchema>;

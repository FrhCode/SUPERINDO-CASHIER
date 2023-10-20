import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({ required_error: "kolom email wajib diisi" })
    .email("email tidak valid"),
  password: z
    .string({ required_error: "kolom password wajib diisi" })
    .min(7, "kolom password minimal terdiri dari 5 karakter"),
});

export default formSchema;

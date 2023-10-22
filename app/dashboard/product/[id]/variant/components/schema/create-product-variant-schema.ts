import { z } from "zod";

const CreateProductVariantSchema = z.object({
  code: z
    .string({ required_error: "code harus disi" })
    .min(3, { message: "code harus memiliki setidaknya 3 karakter" }),
  name: z
    .string({ required_error: "Nama harus disi" })
    .min(3, { message: "Nama harus memiliki setidaknya 3 karakter" }),
  qty: z
    .number({
      required_error: "Kolom qty qty wajib diisi",
      invalid_type_error: "Kolom qty qty harus bernilai desimal",
    })
    .min(0),
  price: z
    .number({
      required_error: "Kolom price harga wajib diisi",
      invalid_type_error: "Kolom price harga harus bernilai desimal",
    })
    .min(0),
  active: z.boolean(),
  thumbnail: z
    .string({ required_error: "thumbnail harus disi" })
    .min(3, { message: "thumbnail harus memiliki setidaknya 3 karakter" }),
});

export default CreateProductVariantSchema;

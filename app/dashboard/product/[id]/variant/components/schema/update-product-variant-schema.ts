import { z } from "zod";

const UpdateProductVariantSchema = z.object({
  id: z.string({ required_error: "Nama harus disi" }),
  name: z
    .string({ required_error: "Nama harus disi" })
    .min(3, { message: "Nama harus memiliki setidaknya 3 karakter" }),
  thumbnail: z
    .string({ required_error: "thumbnail harus disi" })
    .min(3, { message: "thumbnail harus memiliki setidaknya 3 karakter" }),
  active: z.boolean(),
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
});

export default UpdateProductVariantSchema;

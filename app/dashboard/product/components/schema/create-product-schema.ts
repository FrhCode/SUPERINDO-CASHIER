import { z } from "zod";

const CreateProductSchema = z.object({
  productCategoryId: z.string({
    required_error: "product-category-id harus disi",
  }),
  name: z
    .string({ required_error: "Nama harus disi" })
    .min(3, { message: "Nama harus memiliki setidaknya 3 karakter" }),
  plu: z
    .string({ required_error: "plu harus disi" })
    .min(3, { message: "plu harus memiliki setidaknya 3 karakter" }),
  active: z.boolean(),
  thumbnail: z
    .string({ required_error: "thumbnail harus disi" })
    .min(3, { message: "thumbnail harus memiliki setidaknya 3 karakter" }),
});

export default CreateProductSchema;

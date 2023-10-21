import { z } from "zod";

const CreateProductCategorySchema = z.object({
  name: z
    .string({ required_error: "Nama harus disi" })
    .min(3, { message: "Nama harus memiliki setidaknya 3 karakter" }),
  active: z.boolean(),
});

export default CreateProductCategorySchema;

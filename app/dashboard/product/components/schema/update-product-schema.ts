import { z } from "zod";

const UpdateProductSchema = z.object({
  id: z.string().min(1),
  name: z
    .string({ required_error: "Nama harus disi" })
    .min(3, { message: "Nama harus memiliki setidaknya 3 karakter" }),
  active: z.boolean(),
  thumbnail: z
    .string({ required_error: "thumbnail harus disi" })
    .min(3, { message: "thumbnail harus memiliki setidaknya 3 karakter" }),
});

export default UpdateProductSchema;

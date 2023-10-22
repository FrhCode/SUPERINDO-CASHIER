import { z } from "zod";

const UpdateCartSchema = z.object({
  id: z.string(),
  qty: z.string(),
});

export default UpdateCartSchema;

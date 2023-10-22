import { z } from "zod";

const AddToCartSchema = z.object({
  productVariantId: z.string(),
  qty: z.string(),
});

export default AddToCartSchema;

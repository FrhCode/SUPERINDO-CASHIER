import UpdateProductVariantSchema from "@/app/dashboard/product/[id]/variant/components/schema/update-product-variant-schema";
import { z } from "zod";

interface Props {
  data: z.infer<typeof UpdateProductVariantSchema>;
  token: string;
}
export default async function updateProductVariant({ token, data }: Props) {
  const url =
    process.env.NEXT_PUBLIC_API_URL + `/api/v1/product_variants/${data.id}`;

  const res: Response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      active: data.active,
      name: data.name,
      price: data.price,
      qty: data.qty,
      thumbnail: data.thumbnail,
    } as Omit<z.infer<typeof UpdateProductVariantSchema>, "id">),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json") == false) {
    throw new Error("Invalid content type");
  }
  return res.json() as Promise<{
    status: string;
  }>;
}

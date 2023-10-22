import CreateProductVariantSchema from "@/app/dashboard/product/[id]/variant/components/schema/create-product-variant-schema";
import InvalidSessionException from "@/exception/InvalidSessionException";
import { z } from "zod";

interface Props {
  data: z.infer<typeof CreateProductVariantSchema>;
  token: string;
  id: string;
}
export default async function createProductVariant({ token, data, id }: Props) {
  const url =
    process.env.NEXT_PUBLIC_API_URL + `/api/v1/products/${id}/variants`;

  const res: Response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new InvalidSessionException();
  }

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json") == false) {
    throw new Error("Invalid content type");
  }
  return res.json() as Promise<{
    status: string;
  }>;
}

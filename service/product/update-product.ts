import UpdateProductSchema from "@/app/dashboard/product/components/schema/update-product-schema";
import InvalidSessionException from "@/exception/InvalidSessionException";
import { z } from "zod";

interface Props {
  data: z.infer<typeof UpdateProductSchema>;
  token: string;
}
export default async function updateProduct({ token, data }: Props) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/products/${data.id}`;

  const res: Response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      active: data.active,
      name: data.name,
      thumbnail: data.thumbnail,
    } as Omit<z.infer<typeof UpdateProductSchema>, "id">),
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

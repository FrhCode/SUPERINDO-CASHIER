import updateProductCategorySchema from "@/app/dashboard/category/components/schema/update-product-category";
import { z } from "zod";

interface Props {
  data: z.infer<typeof updateProductCategorySchema>;
  token: string;
}
export default async function updateProductCategory({ token, data }: Props) {
  const url =
    process.env.NEXT_PUBLIC_API_URL + `/api/v1/product_category/${data.id}`;

  const res: Response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ active: data.active, name: data.name } as Omit<
      z.infer<typeof updateProductCategorySchema>,
      "id"
    >),
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

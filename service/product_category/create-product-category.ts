import CreateProductCategorySchema from "@/app/dashboard/category/components/schema/create-product-category-schema";
import InvalidSessionException from "@/exception/InvalidSessionException";
import { z } from "zod";

interface Props {
  data: z.infer<typeof CreateProductCategorySchema>;
  token: string;
}
export default async function createProductCategory({ token, data }: Props) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/product_categories`;

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

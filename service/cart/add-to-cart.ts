import AddToCartSchema from "@/app/(sales)/product/[id]/variants/components/schema/add-to-cart-schema";
import { z } from "zod";

interface Props {
  data: z.infer<typeof AddToCartSchema>;
  token: string;
}
export default async function AddToCart({ token, data }: Props) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/carts`;

  const res: Response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
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

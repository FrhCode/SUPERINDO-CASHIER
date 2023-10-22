import UpdateCartSchema from "@/app/(sales)/product/[id]/variants/components/schema/update-cart-schema";
import { z } from "zod";

interface Props {
  data: z.infer<typeof UpdateCartSchema>;
  token: string;
}
export default async function updateCart({ token, data }: Props) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/carts/${data.id}`;

  const res: Response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ qty: data.qty } as Omit<
      z.infer<typeof UpdateCartSchema>,
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

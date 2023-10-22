import Page from "@/type/page";
import { fetcher } from "../fetcher";

import PaginateProduct from "@/type/paginate-product";
import Product from "@/type/product";

type Props = { token: string };

export async function checkout({ token }: Props) {
  return fetcher<{ message: string }>(`/api/v1/checkout`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

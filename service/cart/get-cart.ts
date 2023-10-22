import Cart from "@/type/cart";
import { fetcher } from "../fetcher";

import PaginateProduct from "@/type/paginate-product";
import Product from "@/type/product";

type Props = { token: string };
export async function getCart({ token }: Props) {
  return fetcher<{ content: Cart[] }>(`/api/v1/carts`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

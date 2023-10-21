import Page from "@/type/page";
import { fetcher } from "../fetcher";

import PaginateProduct from "@/type/paginate-product";
import Product from "@/type/product";

type Props = { token: string } & PaginateProduct;

export async function paginateProduct({
  token,
  size,
  sortBy,
  sortDirection,
  page,
  query,
}: Props) {
  const params = new URLSearchParams({
    size: size.toString(),
    page: page.toString(),
    sortBy,
    sortDirection,
    query,
  });

  return fetcher<Page<Product>>(`/api/v1/products?${params.toString()}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

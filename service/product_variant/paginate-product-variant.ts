import Page from "@/type/page";
import { fetcher } from "../fetcher";

import PaginateProductVariant from "@/type/paginate-product-variant";
import ProductVariant from "@/type/product-variant";

type Props = { token: string; productId: string } & PaginateProductVariant;

export async function paginateProductVariant({
  token,
  size,
  sortBy,
  sortDirection,
  page,
  query,
  productId,
}: Props) {
  const params = new URLSearchParams({
    size: size.toString(),
    page: page.toString(),
    sortBy,
    sortDirection,
    query,
  });

  return fetcher<Page<ProductVariant>>(
    `/api/v1/products/${productId}/variants?${params.toString()}`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

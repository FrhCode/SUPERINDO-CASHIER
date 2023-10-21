import Page from "@/type/page";
import { fetcher } from "../fetcher";
import PaginateProductCategoryRequest from "@/type/paginate-product-category";
import ProductCategory from "@/type/product-category";

type Props = { token: string } & PaginateProductCategoryRequest;

export async function paginateProductCategory({
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

  return fetcher<Page<ProductCategory>>(
    `/api/v1/product_category?${params.toString()}`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

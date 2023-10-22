import Page from "@/type/page";
import { fetcher } from "../fetcher";

import PaginateTransaction from "@/type/paginate-transaction";
import Transaction from "@/type/Transaction";

type Props = { token: string } & PaginateTransaction;

export async function paginateTransaction({
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

  return fetcher<Page<Transaction>>(
    `/api/v1/transactions?${params.toString()}`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

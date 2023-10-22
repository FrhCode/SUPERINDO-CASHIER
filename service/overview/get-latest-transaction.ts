import { fetcher } from "../fetcher";

import Transaction from "@/type/Transaction";

type Props = { token: string };
export async function getLatestTransaction({ token }: Props) {
  return fetcher<{ content: Transaction[] }>(
    `/api/v1/overview/latest-transaction`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

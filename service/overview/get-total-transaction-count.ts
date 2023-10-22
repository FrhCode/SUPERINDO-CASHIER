import { fetcher } from "../fetcher";

type Props = { token: string };

export async function getTotalTransactionCount({ token }: Props) {
  return fetcher<{ message: number }>(
    `/api/v1/overview/total-transaction-count`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

import { fetcher } from "../fetcher";

type Props = { token: string };

export async function getTotalTransactionAmmount({ token }: Props) {
  return fetcher<{ message: number }>(
    `/api/v1/overview/total-transaction-ammount`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

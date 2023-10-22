import { fetcher } from "../fetcher";

type Props = { token: string };

export async function getTotalProduct({ token }: Props) {
  return fetcher<{ message: number }>(`/api/v1/overview/total-product`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

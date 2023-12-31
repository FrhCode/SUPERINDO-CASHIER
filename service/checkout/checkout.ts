import { fetcher } from "../fetcher";

type Props = { token: string };

export async function checkout({ token }: Props) {
  return fetcher<{ message: string }>(`/api/v1/checkout`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

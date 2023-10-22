import { fetcher } from "../fetcher";

type Props = { token: string };

export async function getTotalVariant({ token }: Props) {
  return fetcher<{ message: number }>(`/api/v1/overview/total-variant`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

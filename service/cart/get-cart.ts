import Cart from "@/type/cart";
import { fetcher } from "../fetcher";


type Props = { token: string };
export async function getCart({ token }: Props) {
  return fetcher<{ content: Cart[] }>(`/api/v1/carts`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

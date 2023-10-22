import { Input } from "@/components/ui/input";
import updateCart from "@/service/cart/update-cart";
import Cart from "@/type/cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Props = {
  cart: Cart;
};

export default function QtyInput({ cart }: Props) {
  const [qty, setQty] = useState(cart.qty);
  const [value] = useDebounce(qty, 100);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    updateCart({
      data: { id: cart.id.toString(), qty: value.toString() },
      token: session!.jwtToken,
    }).then(() => {
      router.refresh();
    });
  }, [cart.id, router, session, value]);

  return (
    <Input
      className="h-7 w-14"
      value={cart.qty}
      type="number"
      onChange={(e) => {
        const quantity = e.currentTarget.value;
        setQty(parseInt(quantity));
      }}
    />
  );
}

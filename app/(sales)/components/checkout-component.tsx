"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "@/type/cart";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import QtyInput from "../product/[id]/variants/components/qty-input";
import { checkout } from "@/service/checkout/checkout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = { carts: Cart[] };

export default function CheckoutComponent({ carts }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative" role="button">
          <AiOutlineShoppingCart size={30} />
          <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 rounded-full bg-primary text-sm text-primary-foreground">
            {carts.length}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-3">
          <SheetTitle className="text-left font-medium">Checkout</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="grid gap-4 py-4">
          {carts.map((cart) => {
            return (
              <div key={cart.id} className="flex gap-3">
                <div className="relative h-20 w-20">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_API_URL +
                      "/" +
                      cart.productVariant.thumbnail
                    }
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                    alt="lele icon"
                  />
                </div>
                <div>
                  <p className="mb-1 mt-2 text-sm font-semibold text-slate-600">
                    {cart.productVariant.name}
                  </p>
                  <p className="mb-2 text-xs text-slate-600">
                    IDR. {cart.productVariant.price.toLocaleString()}
                  </p>

                  <div className="flex items-end gap-2">
                    <p className="text-xs text-slate-600">Qty: </p>
                    <QtyInput cart={cart} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              className="flex justify-between"
              onClick={async () => {
                const { message } = await checkout({
                  token: session!.jwtToken,
                });
                router.refresh();
                const link = document.createElement("a");
                link.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/checkout/${message}/download`;
                link.target = "_blank"; // Optional: Opens the link in a new tab/window
                document.body.appendChild(link);

                // Trigger a click event
                link.click();

                // Clean up: remove the link from the document
                document.body.removeChild(link);
              }}
            >
              <p>Checkout</p>
              <p>
                IDR.{" "}
                {carts
                  .reduce((totalAmount, cart) => {
                    totalAmount =
                      cart.qty * cart.productVariant.price + totalAmount;
                    return totalAmount;
                  }, 0)
                  .toLocaleString()}
              </p>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

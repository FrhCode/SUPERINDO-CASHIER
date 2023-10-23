"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container/Container";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import AddToCart from "@/service/cart/add-to-cart";
import ProductVariant from "@/type/product-variant";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  productVariants: ProductVariant[];
};

export default function Shop({ productVariants }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const [pcs, setPcs] = useState<number>(1);
  const [variant, setVariant] = useState(productVariants[0]);

  // useEffect(() => {
  //   if (pcs > variant.qty) {
  //     setPcs(variant.qty);
  //   }
  // }, [pcs, variant]);

  const handleAddToCart = async () => {
    try {
      await AddToCart({
        data: { productVariantId: variant.id.toString(), qty: pcs.toString() },
        token: session!.jwtToken,
      });
      toast({
        title: "Berhasil menambahkan ke keranjang",
        description: "Silakan Lakukan Checkout",
      });
    } catch (error) {
      toast({
        title: "Barang sudah ada dikeranjang",
        description: "Silakan Lakukan Checkout",
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <Container.Root className="mt-5">
      <Container.Content className="">
        <Tabs
          defaultValue={`${productVariants[0].id}`}
          className="gap-5 md:flex"
        >
          {productVariants.map((productVariant) => {
            return (
              <TabsContent
                key={productVariant.id}
                value={`${productVariant.id}`}
                className="w-full md:max-w-[400px]"
              >
                <div className="overflow-hidden rounded-xl border-2 p-5">
                  <div className="relative aspect-[4/4] w-full">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        "/" +
                        productVariant.thumbnail
                      }
                      fill
                      style={{
                        objectFit: "fill",
                      }}
                      alt="lele icon"
                    />
                  </div>
                </div>
              </TabsContent>
            );
          })}

          <div>
            <p className="mt-4 text-slate-800">Pilih varian: </p>

            <div className="mt-2">
              <TabsList className="flex h-auto flex-wrap justify-start gap-3 bg-white p-0">
                {productVariants.map((productVariant) => {
                  return (
                    <TabsTrigger
                      value={`${productVariant.id}`}
                      key={productVariant.id}
                      className="p-0 data-[state=active]:bg-none data-[state=active]:text-primary"
                      onClick={() => {
                        setVariant(productVariant);
                      }}
                      disabled={productVariant.qty === 0}
                    >
                      {productVariant.name}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
            <div className="mt-2">
              {productVariants.map((productVariant) => {
                return (
                  <TabsContent
                    key={productVariant.id}
                    value={`${productVariant.id}`}
                    className="text-slate-500"
                  >
                    {productVariant.qty.toLocaleString()} in stock
                  </TabsContent>
                );
              })}
            </div>

            <div className="mt-2 flex items-end gap-3">
              {productVariants.map((productVariant) => {
                return (
                  <TabsContent
                    key={productVariant.id}
                    value={`${productVariant.id}`}
                    className="text-slate-500"
                  >
                    <p className="mt-2 font-semibold text-primary">
                      IDR. {productVariant.price.toLocaleString()}
                    </p>
                  </TabsContent>
                );
              })}
              <div className="flex items-end gap-2">
                <Input
                  className="w-20"
                  type="number"
                  value={pcs}
                  onChange={(e) => {
                    setPcs(parseInt(e.currentTarget.value));
                  }}
                />
                <p>pcs</p>
              </div>
            </div>
            <Button className="mt-5 w-full" onClick={handleAddToCart}>
              Keranjang
            </Button>
          </div>
        </Tabs>
      </Container.Content>
    </Container.Root>
  );
}

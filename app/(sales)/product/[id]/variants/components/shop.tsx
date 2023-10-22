"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container/Container";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductVariant from "@/type/product-variant";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  productVariants: ProductVariant[];
};

export default function Shop({ productVariants }: Props) {
  const [pcs, setPcs] = useState(1);
  const [variant, setVariant] = useState(productVariants[0]);

  useEffect(() => {
    if (pcs > variant.qty) {
      setPcs(variant.qty);
    }
  }, [pcs, variant]);

  return (
    <Container.Root className="mt-5">
      <Container.Content className="">
        <Tabs defaultValue={`${productVariants[0].id}`} className="w-[400px]">
          {productVariants.map((productVariant) => {
            return (
              <TabsContent
                key={productVariant.id}
                value={`${productVariant.id}`}
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

          <p className="mt-4 text-slate-800">Pilih varian: </p>

          <div className="mt-2 ">
            <TabsList className="flex flex-wrap justify-start gap-3 bg-white p-0">
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

          <div className="mt-7">
            <div className="flex items-end gap-2">
              <Input
                className="w-20"
                type="number"
                value={pcs}
                onChange={(e) => {
                  const newPcs = parseInt(e.currentTarget.value);
                  if (newPcs > 0 && newPcs <= variant.qty) {
                    setPcs(newPcs);
                  }
                }}
              />
              <p>pcs</p>
            </div>
          </div>

          <div className="mt-7">
            {productVariants.map((productVariant) => {
              return (
                <TabsContent
                  key={productVariant.id}
                  value={`${productVariant.id}`}
                  className="text-primary"
                >
                  {productVariant.qty.toLocaleString()} in stock
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
        <Button className="mt-5 w-full">Keranjang</Button>
      </Container.Content>
    </Container.Root>
  );
}

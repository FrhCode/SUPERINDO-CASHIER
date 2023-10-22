"use client";
import { Switch } from "@/components/ui/switch";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import ProductVariant from "@/type/product-variant";
import updateProductVariant from "@/service/product_variant/update-product-variant";
import UpdateProductVariantSchema from "./schema/update-product-variant-schema";

type Props = {
  productVariant: ProductVariant;
};

export default function ToogleProductVariantActive({ productVariant }: Props) {
  const form = useForm<z.infer<typeof UpdateProductVariantSchema>>({
    resolver: zodResolver(UpdateProductVariantSchema),
    defaultValues: {
      active: productVariant.active,
      name: productVariant.name,
      id: `${productVariant.id}`,
      price: productVariant.price,
      qty: productVariant.qty,
      thumbnail: productVariant.thumbnail,
    },
  });

  const session = useSession();

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof UpdateProductVariantSchema>) {
    await updateProductVariant({
      data,
      token: session.data!.jwtToken,
    });

    router.refresh();

    toast({
      title: "Data Berhasil Di-update",
      description: "Data telah berhasil di-update ke dalam aplikasi.",
    });
  }

  useEffect(() => {
    form.reset({
      active: productVariant.active,
      name: productVariant.name,
      id: `${productVariant.id}`,
      price: productVariant.price,
      qty: productVariant.qty,
      thumbnail: productVariant.thumbnail,
    });
  }, [
    form,
    productVariant.active,
    productVariant.id,
    productVariant.name,
    productVariant.price,
    productVariant.qty,
    productVariant.thumbnail,
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={productVariant.active}
                  onCheckedChange={(e) => {
                    field.onChange(e);
                    form.handleSubmit(onSubmit)();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

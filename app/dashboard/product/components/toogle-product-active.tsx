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
import Product from "@/type/product";
import UpdateProductSchema from "./schema/update-product-schema";
import updateProduct from "@/service/product/update-product";

type Props = {
  product: Product;
};

export default function ToogleProductActive({ product }: Props) {
  const form = useForm<z.infer<typeof UpdateProductSchema>>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      active: product.active,
      name: product.name,
      id: `${product.id}`,
      thumbnail: product.thumbnail,
    },
  });

  const session = useSession();

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof UpdateProductSchema>) {
    await updateProduct({
      data,
      token: session.data!.jwtToken,
    });

    router.refresh();

    toast({
      title: "Data Berhasil Di-update",
      description: "Data telah berhasil di-update ke dalam aplikasi.",
    });

    // form.reset();
  }

  useEffect(() => {
    form.reset({
      active: product.active,
      name: product.name,
      id: `${product.id}`,
      thumbnail: product.thumbnail,
    });
  }, [form, product.active, product.id, product.name, product.thumbnail]);

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
                  checked={product.active}
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

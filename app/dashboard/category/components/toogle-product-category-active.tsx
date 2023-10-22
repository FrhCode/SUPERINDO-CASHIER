"use client";
import { Switch } from "@/components/ui/switch";
import ProductCategory from "@/type/product-category";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import updateProductCategory from "@/service/product_category/update-product-category";
import UpdateProductCategorySchema from "./schema/update-product-category-schema";

type Props = {
  productCategory: ProductCategory;
};

export default function ToogleProductCategoryActive({
  productCategory,
}: Props) {
  const form = useForm<z.infer<typeof UpdateProductCategorySchema>>({
    resolver: zodResolver(UpdateProductCategorySchema),
    defaultValues: {
      active: productCategory.active,
      name: productCategory.name,
      id: `${productCategory.id}`,
    },
  });

  const session = useSession();

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof UpdateProductCategorySchema>) {
    await updateProductCategory({
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
      active: productCategory.active,
      name: productCategory.name,
      id: `${productCategory.id}`,
    });
  }, [form, productCategory.active, productCategory.id, productCategory.name]);

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
                  checked={productCategory.active}
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

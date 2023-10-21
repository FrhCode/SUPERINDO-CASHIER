"use client";
import { Switch } from "@/components/ui/switch";
import ProductCategory from "@/type/product-category";
import React from "react";
import { useForm } from "react-hook-form";
import editProductCategory from "./schema/update-product-category";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import updateProductCategory from "@/service/product_category/update-product-category";

type Props = {
  productCategory: ProductCategory;
};

export default function ToogleProductCategoryActive({
  productCategory,
}: Props) {
  const form = useForm<z.infer<typeof editProductCategory>>({
    resolver: zodResolver(editProductCategory),
    defaultValues: {
      active: productCategory.active,
      name: productCategory.name,
      id: `${productCategory.id}`,
    },
  });

  const session = useSession();

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof editProductCategory>) {
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
                  checked={field.value}
                  onCheckedChange={(e) => {
                    field.onChange(e);
                    form.handleSubmit(onSubmit)();
                  }}
                  // onChange={(e) => {
                  //   console.log(e);
                  // }}
                  onClick={(e) => {
                    // const active = !e.currentTarget.value;
                    // console.log(e.currentTarget.value);
                    // field.onChange(active);
                    // form.handleSubmit(onSubmit)();
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

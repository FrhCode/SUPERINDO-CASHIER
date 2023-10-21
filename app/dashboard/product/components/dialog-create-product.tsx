"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import CreateProductSchema from "./schema/create-product-schema";
import createProduct from "@/service/product/create-product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { paginateProductCategory } from "@/service/product_category/paginate-product-category";
import ProductCategory from "@/type/product-category";

type Props = {
  productCategory: ProductCategory[];
};

export default function DialogCreateProduct({ productCategory }: Props) {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      active: false,
      name: "",
      plu: "",
      productCategoryId: undefined,
    },
  });

  const selectRef = useRef<HTMLButtonElement>(null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    form.reset();
  }, [form, isModalOpen]);

  async function onSubmit(data: z.infer<typeof CreateProductSchema>) {
    await createProduct({ data, token: session!.jwtToken });

    toast({
      title: "Data Berhasil Ditambahkan",
      description: "Data telah berhasil ditambahkan ke dalam aplikasi.",
    });

    router.refresh();

    setIsModalOpen(false);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full justify-end space-y-6"
      >
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex h-8 w-full gap-1 sm:w-auto"
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Produk baru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form menambahkan produk</DialogTitle>
              <DialogDescription>
                Aksi ini akan menambahkan produk kedalam sistem, setelah data
                disimpan data tidak akan dapat dihapus
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="plu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PLU</FormLabel>
                  <FormControl>
                    <Input placeholder="PDCT0000006" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="makanan hangat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        ref={selectRef}
                        className="text-left [&>span:first-child]:line-clamp-1"
                      >
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[200px] rounded-md">
                        {productCategory.map(({ id: value, name: label }) => {
                          return (
                            <SelectItem
                              key={`${value}`}
                              value={`${value}`}
                              style={{
                                width: selectRef.current?.offsetWidth,
                              }}
                            >
                              {label}
                            </SelectItem>
                          );
                        })}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>
                      Jika produk tidak aktif, maka sistem tidak akan menampikan
                      item ini kepada customer.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}

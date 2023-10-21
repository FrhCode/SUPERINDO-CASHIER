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
import CreateProductCategorySchema from "./schema/create-product-category";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import createProductCategory from "@/service/product_category/create-product-category";

export default function DialogCreateProductCategory() {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof CreateProductCategorySchema>>({
    resolver: zodResolver(CreateProductCategorySchema),
    defaultValues: {
      active: false,
      name: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    form.reset();
  }, [form, isModalOpen]);

  async function onSubmit(data: z.infer<typeof CreateProductCategorySchema>) {
    await createProductCategory({ data, token: session!.jwtToken });

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
              Kategori baru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form menambahkan kategori</DialogTitle>
              <DialogDescription>
                Aksi ini akan menambahkan kategori kedalam sistem, setelah data
                disimpan data tidak akan dapat dihapus
              </DialogDescription>
            </DialogHeader>
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
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>
                      Jika kategori tidak aktif, maka sistem tidak akan
                      menampikan item ini kepada customer.
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

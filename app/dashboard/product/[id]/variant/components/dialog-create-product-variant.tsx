"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import uploadImage from "@/service/upload/upload-image";
import CreateProductVariantSchema from "./schema/create-product-variant-schema";
import createProductVariant from "@/service/product_variant/create-product-variant";
import { PlusCircledIcon } from "@radix-ui/react-icons";

interface Props {
  productId: string;
}

export default function DialogCreateProductVariant({ productId }: Props) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateProductVariantSchema>>({
    resolver: zodResolver(CreateProductVariantSchema),
    defaultValues: {
      code: "",
      name: "",
      qty: 0,
      price: 0,
      thumbnail: "",
      active: false,
    },
  });

  async function onSubmit(data: z.infer<typeof CreateProductVariantSchema>) {
    // await updateProductVariant({
    //   data,
    //   token: session!.jwtToken,
    // });

    await createProductVariant({
      data,
      token: session!.jwtToken,
      id: productId,
    });

    router.refresh();

    toast({
      title: "Data Berhasil Di-update",
      description: "Data telah berhasil di-update ke dalam aplikasi.",
    });

    setOpen(false);
  }

  useEffect(() => {
    form.reset({
      code: "",
      name: "",
      qty: 0,
      price: 0,
      thumbnail: "",
      active: false,
    });
  }, [form, open]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex h-8 w-full gap-1 sm:w-auto"
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Varian baru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form mengupdate variant</DialogTitle>
              <DialogDescription>
                Aksi ini akan mengubah mengubah variant, Mohon perhatikan data
                yang Di-inputkan.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
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
                    <Input placeholder="Indomie ayam geprek" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qty</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="100"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue("qty", parseInt(e.currentTarget.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="100000"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue("price", parseInt(e.currentTarget.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      id="picture"
                      type="file"
                      onChange={async (e) => {
                        const file = e.currentTarget.files![0];

                        const isImage = file.type.startsWith("image/");

                        if (!isImage) {
                          form.setError("thumbnail", {
                            message: "harus gambar",
                          });
                          return;
                        }

                        const { message: uploadPath } = await uploadImage({
                          file,
                          token: session!.jwtToken,
                        });

                        form.setValue("thumbnail", uploadPath);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Kosongkan jika tidak ingin dirubah.
                  </FormDescription>
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

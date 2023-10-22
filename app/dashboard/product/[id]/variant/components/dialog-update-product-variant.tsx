import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import ProductVariant from "@/type/product-variant";
import uploadImage from "@/service/upload/upload-image";
import UpdateProductVariantSchema from "./schema/update-product-variant-schema";
import updateProductVariant from "@/service/product_variant/update-product-variant";

interface Props {
  productVariant: ProductVariant;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DialogUpdateProductVariant({
  productVariant,
  open,
  setIsOpen,
}: Props) {
  const { data: session } = useSession();

  const router = useRouter();
  const form = useForm<z.infer<typeof UpdateProductVariantSchema>>({
    resolver: zodResolver(UpdateProductVariantSchema),
    defaultValues: {
      active: productVariant.active,
      id: `${productVariant.id}`,
      name: productVariant.name,
      price: productVariant.price,
      qty: productVariant.qty,
      thumbnail: productVariant.thumbnail,
    },
  });

  async function onSubmit(data: z.infer<typeof UpdateProductVariantSchema>) {
    await updateProductVariant({
      data,
      token: session!.jwtToken,
    });

    router.refresh();

    toast({
      title: "Data Berhasil Di-update",
      description: "Data telah berhasil di-update ke dalam aplikasi.",
    });

    setIsOpen(false);
  }

  useEffect(() => {
    form.reset({
      active: productVariant.active,
      id: `${productVariant.id}`,
      name: productVariant.name,
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
    productVariant.thumbnail,
    productVariant.qty,
    open,
  ]);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <FormLabel>Harga</FormLabel>
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
        </form>
      </Form>
    </Dialog>
  );
}

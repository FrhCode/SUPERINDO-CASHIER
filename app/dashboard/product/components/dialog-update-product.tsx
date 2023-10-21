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
import Product from "@/type/product";
import UpdateProductSchema from "./schema/update-product-schema";
import updateProduct from "@/service/product/update-product";

interface Props {
  product: Product;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DialogUpdateProduct({
  product,
  open,
  setIsOpen,
}: Props) {
  const { data: session } = useSession();

  const router = useRouter();
  const form = useForm<z.infer<typeof UpdateProductSchema>>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      active: product.active,
      id: `${product.id}`,
      name: product.name,
    },
  });

  async function onSubmit(data: z.infer<typeof UpdateProductSchema>) {
    await updateProduct({
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
      active: product.active,
      name: product.name,
      id: `${product.id}`,
    });
  }, [form, product.active, product.id, product.name]);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form mengupdate product</DialogTitle>
              <DialogDescription>
                Aksi ini akan mengubah mengubah kategori, Mohon perhatikan data
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

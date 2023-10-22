import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Container from "@/components/ui/container/Container";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { paginateProductVariant } from "@/service/product_variant/paginate-product-variant";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import Shop from "./components/shop";

type Props = {
  params: { id: string };
  // searchParams: Partial<PaginateProductVariant>;
};

export default async function Page({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  const { content } = await paginateProductVariant({
    page: "0",
    productId: id,
    query: "",
    size: "100",
    sortBy: "",
    sortDirection: "DESC",
    token: session!.jwtToken,
  });

  return (
    <>
      <Shop productVariants={content} />
    </>
  );
}

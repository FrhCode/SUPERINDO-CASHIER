import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { paginateProductVariant } from "@/service/product_variant/paginate-product-variant";
import { getServerSession } from "next-auth";
import React from "react";
import Shop from "./components/shop";
import Container from "@/components/ui/container/Container";
import noData from "@/public/no-data-deposit.svg";
import Image from "next/image";
import Link from "next/link";

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
      {content.length > 0 ? (
        <Shop productVariants={content} />
      ) : (
        <Container.Root className="mt-5">
          <Container.Content className="">
            <div className="pt-20">
              <div className="relative h-80 w-full">
                <Image
                  src={noData}
                  fill
                  style={{ objectFit: "contain" }}
                  alt="lele icon"
                />
              </div>
              <p className="text-center">
                Belum ada variant yang tersedia,{" "}
                <Link href={"/"} className="text-blue-500 underline">
                  Yuk belanja yang lain
                </Link>
              </p>
            </div>
          </Container.Content>
        </Container.Root>
      )}
    </>
  );
}

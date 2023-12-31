"use client";
import { Input } from "@/components/ui/input";
import PaginateProductCategoryRequest from "@/type/paginate-product-category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import DialogCreateProductCategory from "../../category/components/dialog-create-product-category";
import DialogCreateProduct from "./dialog-create-product";
import { useSession } from "next-auth/react";
import { paginateProductCategory } from "@/service/product_category/paginate-product-category";
import ProductCategory from "@/type/product-category";

export default function DataTableToolbar() {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [text, setText] = useState(() => searchParams.get("query") ?? "");
  const [value] = useDebounce(text, 100);
  const [productCategory, setProductCategory] = useState<ProductCategory[]>([]);
  const query: PaginateProductCategoryRequest = {
    page: searchParams.get("page") ?? "0",
    size: searchParams.get("size") ?? "10",
    query: searchParams.get("query") ?? "",
    sortBy: searchParams.get("sortBy") ?? "",
    sortDirection:
      ((searchParams.get("sortDirection") as "ASC") || "DESC") ?? "ASC",
  };

  useEffect(() => {
    const newQuery: PaginateProductCategoryRequest = {
      ...query,
      query: value,
    };

    router.push(`${pathname}?${new URLSearchParams(newQuery)}`);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (session?.jwtToken) {
      paginateProductCategory({
        page: "0",
        query: "",
        size: "100",
        token: session.jwtToken,
        sortBy: "",
        sortDirection: "ASC",
      }).then((data) => {
        setProductCategory(data.content);
      });
    }
    return () => {};
  }, [session?.jwtToken]);

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <Input
        type="text"
        placeholder="Filter categori..."
        className="h-8 w-full sm:w-[150px] lg:w-[250px]"
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
      />

      <DialogCreateProduct productCategory={productCategory} />
    </div>
  );
}

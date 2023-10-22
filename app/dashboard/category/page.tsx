import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { paginateProductCategory } from "@/service/product_category/paginate-product-category";
import DataTablePagination from "./components/data-table-pagination";
import PaginateProductCategoryRequest from "@/type/paginate-product-category";
import DataTableToolbar from "./components/data-table-toolbar";
import ToogleProductCategoryActive from "./components/toogle-product-category-active";
import DataTableRowAction from "./components/data-table-row-action";
import NullSessionException from "@/exception/NullSessionException";

type Props = {
  searchParams: Partial<PaginateProductCategoryRequest>;
};

export default async function page({
  searchParams: { size, page, query, sortBy, sortDirection },
}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new NullSessionException();
  }

  const data = await paginateProductCategory({
    token: session.jwtToken,
    page: page ?? "0",
    query: query ?? "",
    size: size ?? "10",
    sortBy: sortBy ?? "",
    sortDirection: sortDirection ?? "DESC",
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar />
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Nama Kategori</TableHead>
            <TableHead>Penanggung Jawab</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.content.map((productCategory) => (
            <TableRow key={productCategory.id}>
              <TableCell className="font-medium">
                <ToogleProductCategoryActive
                  productCategory={productCategory}
                />
              </TableCell>
              <TableCell>{productCategory.name}</TableCell>
              <TableCell>{productCategory.updated_user}</TableCell>
              <TableCell className="flex justify-end">
                <DataTableRowAction productCategory={productCategory} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePagination page={data} />
    </div>
  );
}

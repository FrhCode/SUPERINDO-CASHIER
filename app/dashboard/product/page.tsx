import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import DataTableToolbar from "./components/data-table-toolbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PaginateProduct from "@/type/paginate-product";
import { paginateProduct } from "@/service/product/paginate-product";
import ToogleProductActive from "./components/toogle-product-active";
import DataTableRowAction from "./components/data-table-row-action";
import DataTablePagination from "./components/data-table-pagination";

type Props = {
  searchParams: Partial<PaginateProduct>;
};

export default async function Page({
  searchParams: { size, page, query, sortBy, sortDirection },
}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error();
  }

  const data = await paginateProduct({
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
            <TableHead>Nama Produk</TableHead>
            <TableHead>Penanggung Jawab</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.content.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                <ToogleProductActive product={product} />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.updated_user}</TableCell>
              <TableCell className="flex justify-end">
                <DataTableRowAction product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePagination page={data} />
    </div>
  );
}

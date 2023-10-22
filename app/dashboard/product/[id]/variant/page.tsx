import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";
import DataTableToolbar from "./components/data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginateProductVariant from "@/type/paginate-product-variant";
import { paginateProductVariant } from "@/service/product_variant/paginate-product-variant";
import DataTablePagination from "./components/data-table-pagination";
import DataTableRowAction from "./components/data-table-row-action";
import ToogleProductVariantActive from "./components/toogle-product-variant-active";

type Props = {
  params: { id: string };
  searchParams: Partial<PaginateProductVariant>;
};

export default async function page({
  params: { id },
  searchParams: { page, query, size, sortBy, sortDirection },
}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error();
  }

  const data = await paginateProductVariant({
    token: session.jwtToken,
    page: page ?? "0",
    query: query ?? "",
    size: size ?? "10",
    sortBy: sortBy ?? "",
    sortDirection: sortDirection ?? "DESC",
    productId: id,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar id={id} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Nama Produk</TableHead>
            <TableHead>Penanggung Jawab</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.content.map((productVariant) => (
            <TableRow key={productVariant.id}>
              <TableCell className="font-medium">
                <ToogleProductVariantActive productVariant={productVariant} />
              </TableCell>
              <TableCell>{productVariant.name}</TableCell>
              <TableCell>{productVariant.updated_user}</TableCell>
              <TableCell className="flex justify-end">
                <DataTableRowAction productVariant={productVariant} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePagination page={data} />
    </div>
  );
}

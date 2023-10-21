import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import PaginateProductCategoryRequest from "@/type/paginate-product-category";
import DataTableToolbar from "./components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import ToogleProductCategoryActive from "./components/toogle-product-category-active";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

type Props = {
  searchParams: Partial<PaginateProductCategoryRequest>;
};

export default async function page({
  searchParams: { size, page, query, sortBy, sortDirection },
}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error();
  }

  const data = await paginateProductCategory({
    token: session.jwtToken,
    page: page ?? "0",
    query: query ?? "",
    size: size ?? "10",
    sortBy: sortBy ?? "",
    sortDirection: sortDirection ?? "ASC",
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar />
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Nama Categori</TableHead>
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
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePagination page={data} />
    </div>
  );
}

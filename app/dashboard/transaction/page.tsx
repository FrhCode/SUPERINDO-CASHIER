import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NullSessionException from "@/exception/NullSessionException";
import { paginateTransaction } from "@/service/transaction/paginate-transaction";
import PaginateTransaction from "@/type/paginate-transaction";
import { getServerSession } from "next-auth";
import React from "react";
import DataTablePagination from "./components/data-table-pagination";
import Link from "next/link";

type Props = {
  searchParams: Partial<PaginateTransaction>;
};

export default async function Page({
  searchParams: { page, query, size, sortBy, sortDirection },
}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new NullSessionException();
  }

  const data = await paginateTransaction({
    token: session.jwtToken,
    page: page ?? "0",
    query: query ?? "",
    size: size ?? "10",
    sortBy: sortBy ?? "",
    sortDirection: sortDirection ?? "DESC",
  });

  return (
    <div className="space-y-4">
      {/* <DataTableToolbar /> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Waktu</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.content.map((transaction, index) => (
            <TableRow key={transaction.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{transaction.created_user}</TableCell>
              <TableCell>
                IDR {transaction.totalAmount.toLocaleString()}
              </TableCell>
              <TableCell>{transaction.created_date}</TableCell>
              <TableCell className="flex justify-end">
                <Link
                  href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/checkout/${transaction.id}/download`}
                  target="_blank"
                >
                  <Button variant={"outline"} size={"sm"}>
                    Download
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePagination page={data} />
    </div>
  );
}

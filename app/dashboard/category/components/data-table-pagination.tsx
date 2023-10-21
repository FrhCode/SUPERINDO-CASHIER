"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PaginateProductCategoryRequest from "@/type/paginate-product-category";
import Page from "@/type/page";
import useTablePagination from "@/hook/use-table-pagination";
import Paginate from "@/type/paginate";

type Props = {
  page: Page<any>;
};

export default function DataTablePagination({ page }: Props) {
  const table = useTablePagination(page);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query: Paginate = {
    page: searchParams.get("page") ?? "0",
    size: searchParams.get("size") ?? "10",
    query: searchParams.get("query") ?? "",
    sortBy: searchParams.get("sortBy") ?? "",
    sortDirection:
      ((searchParams.get("sortDirection") as "ASC") || "DESC") ?? "ASC",
  };

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex w-full flex-col items-center gap-3 space-x-6 sm:flex-row sm:justify-between lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${query.size}`}
            onValueChange={(value) => {
              const newQuery: PaginateProductCategoryRequest = {
                ...query,
                size: value,
              };
              router.push(`${pathname}?${new URLSearchParams(newQuery)}`);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={1} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getCurrentPageIndex()} of{" "}
            {table.getCurrentLastPageIndex()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              // disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              // disabled={!table.getCanPreviousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              // disabled={!table.getCanNextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                table.setPageIndex(table.getLastPageIndexNumber());
              }}
              // disabled={!table.getCanNextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

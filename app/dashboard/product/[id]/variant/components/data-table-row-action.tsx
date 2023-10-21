"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import ProductVariant from "@/type/product-variant";
import DialogUpdateProductVariant from "./dialog-update-product-variant";

type Props = {
  productVariant: ProductVariant;
};

export default function DataTableRowAction({ productVariant }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setTimeout(() => {
                  setIsEditModalOpen(true);
                }, 1);
              }}
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DialogUpdateProductVariant
        open={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        productVariant={productVariant}
      />
    </>
  );
}

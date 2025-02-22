"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Edit, Trash } from "lucide-react";
import { MainInvoices } from "@/data/zod-schemas";
import { Button } from "@/components/ui/button";
import { useMainInvoices } from "@/providers";
import { Row } from "@tanstack/react-table";

interface MainInvoicesRowActionsProps {
  row: Row<MainInvoices>;
}

export function MainInvoicesRowActions({ row }: MainInvoicesRowActionsProps) {
  const { setOpen, setCurrentRow } = useMainInvoices();
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <ChevronDown size={16} />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original);
              setOpen("view");
            }}
          >
            Details
            <DropdownMenuShortcut>
              <Edit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original);
              setOpen("download");
            }}
            className="!text-red-500"
          >
            Delete
            <DropdownMenuShortcut>
              <Trash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
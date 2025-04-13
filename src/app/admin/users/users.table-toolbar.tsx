import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { userTypes } from "./users.data";
import { Search, X } from "lucide-react";

interface UsersTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UsersTableToolbar<TData>({
  table,
}: UsersTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter !== "";

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <div className="relative w-[150px] lg:w-[250px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={table.getState().globalFilter}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-8 pl-8 w-full border-muted-foreground/20 focus:border-primary"
          />
        </div>
        <div className="flex gap-x-2">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Banned", value: "banned" },
              ]}
            />
          )}
          {table.getColumn("role") && (
            <DataTableFacetedFilter
              column={table.getColumn("role")}
              title="Role"
              options={userTypes.map((t) => ({ ...t }))}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
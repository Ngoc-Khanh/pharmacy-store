import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, MoreHorizontal, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMedicine } from "@/providers";

export function MedicinesPrimaryButtons() {
  const { setOpen } = useMedicine();
  
  return (
    <div className="flex items-center gap-2">
      <Button
        className="gap-1.5 bg-primary/90 hover:bg-primary"
        onClick={() => setOpen("add")}
      >
        <Plus size={17} />
        <span>Add Medicine</span>
      </Button>

      <div className="hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem className="cursor-pointer gap-2">
              <Download className="h-4 w-4" />
              <span>Export Users</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2">
              <Upload className="h-4 w-4" />
              <span>Import Users</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Generate Report</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
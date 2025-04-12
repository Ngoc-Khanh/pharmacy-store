import { useUsers } from "@/providers/users.provider";
import { Button } from "@/components/ui/button";
import { UserPlus, Download, Upload, MoreHorizontal, FileSpreadsheet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers();
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        className="gap-1.5 bg-primary/90 hover:bg-primary" 
        onClick={() => setOpen("add")}
      >
        <UserPlus size={17} />
        <span>Add User</span>
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
  )
}

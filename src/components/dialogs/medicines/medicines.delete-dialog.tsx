import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Medicine } from "@/data/interfaces";
import { MedicineAPI } from "@/services/api/medicine.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { motion } from 'framer-motion';
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  currentMedicine: Medicine;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MedicinesDeleteDialog({ currentMedicine, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");

  const deleteMedicineMutation = useMutation({
    mutationFn: (id: string) => MedicineAPI.MedicineDelete(id),
    onSuccess: () => {
      toast.success("Đã xóa thuốc thành công");
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
    onError: (error) => {
      toast.error(error.message || "Không thể xóa thuốc. Vui lòng thử lại sau.");
    },
  })

  const handleDelete = () => {
    if (value.trim() === currentMedicine.name) deleteMedicineMutation.mutate(currentMedicine.id);
    else toast.error("Tên thuốc không khớp");
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(state) => {
        if (!deleteMedicineMutation.isPending) {
          onOpenChange(state);
          if (!state) setValue("");
        }
      }}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentMedicine.name || deleteMedicineMutation.isPending}
      title={
        <motion.div
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2 text-destructive"
        >
          <Trash className="h-5 w-5 stroke-destructive" /> Xóa thuốc
        </motion.div>
      }
      desc={
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 relative"
        >
          {deleteMedicineMutation.isPending && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-md z-50">
              <div className="flex flex-col items-center gap-2 p-4">
                <Loader2 className="h-8 w-8 animate-spin text-destructive" />
                <p className="text-sm font-medium text-destructive">Đang xóa thuốc...</p>
              </div>
            </div>
          )}
          
          <p className="text-muted-foreground">
            Bạn có chắc chắn muốn xóa thuốc <span className="font-medium text-foreground">{currentMedicine.name}</span>?
            Hành động này không thể hoàn tác và sẽ xóa vĩnh viễn thuốc này khỏi hệ thống.
          </p>

          <div className="border p-3 rounded-md bg-muted/30">
            <Label htmlFor="medicine-name-confirm" className="text-sm font-medium">
              Nhập tên thuốc <span className="text-destructive">"{currentMedicine.name}"</span> để xác nhận xóa:
            </Label>
            <Input
              id="medicine-name-confirm"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={currentMedicine.name}
              className="mt-2"
              autoComplete="off"
              disabled={deleteMedicineMutation.isPending}
            />
          </div>
        </motion.div>
      }
      confirmText={
        deleteMedicineMutation.isPending ? (
          <span className="flex items-center gap-1">
            <Loader2 className="h-4 w-4 animate-spin" /> 
            Đang xóa...
          </span>
        ) : "Xóa thuốc"
      }
      destructive
    />
  )
}
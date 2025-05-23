import { useMedicinesDialog } from "@/atoms/dialog.atom";
import { Button } from "@/components/ui/button";
import { routes } from "@/config";
import { Medicine } from "@/data/interfaces";
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MedicinesAdminDetailToolbarProps {
  medicine?: Medicine;
}

export function MedicinesAdminDetailToolbar({ medicine }: MedicinesAdminDetailToolbarProps) {
  const navigate = useNavigate();
  const { setOpen, setCurrentMedicine } = useMedicinesDialog();
  
  const handleEdit = () => {
    if (medicine) {
      setCurrentMedicine(medicine);
      setOpen("edit");
    }
  };
  
  const handleDelete = () => {
    if (medicine) {
      setCurrentMedicine(medicine);
      setOpen("delete");
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/30"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-teal-200 dark:border-teal-800/30 hover:bg-teal-50 hover:border-teal-300 dark:hover:bg-teal-900/20 transition-all shadow-sm"
            onClick={() => navigate(routes.admin.medicines)}
          >
            <ArrowLeft className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </Button>
        </motion.div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-400">Chi tiết thuốc</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Xem và quản lý thông tin sản phẩm</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="outline"
            className="gap-2 border-teal-200 hover:border-teal-300 hover:bg-teal-50 text-teal-600 dark:border-teal-800/30 dark:hover:bg-teal-900/20 dark:text-teal-400 shadow-sm rounded-lg h-10 px-4"
            onClick={handleEdit}
            disabled={!medicine}
          >
            <Edit size={16} className="stroke-[2.5px]" />
            <span>Chỉnh sửa</span>
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="outline"
            className="gap-2 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 dark:border-red-800/30 dark:hover:bg-red-900/20 dark:text-red-400 shadow-sm rounded-lg h-10 px-4"
            onClick={handleDelete}
            disabled={!medicine}
          >
            <Trash size={16} className="stroke-[2.5px]" />
            <span>Xóa</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

import { ShieldCheck, Stethoscope, UserCircle2 } from "lucide-react";
import { UserStatus } from "@/data/zod-schemas";

export const statusTypes = new Map<UserStatus, string>([
  ["active", "bg-green-50/80 text-green-600 dark:text-green-400 border-green-200 font-medium ring-1 ring-green-200/80 shadow-sm dark:bg-green-900/20 dark:border-green-700 dark:ring-green-800/30"],
  ["inactive", "bg-blue-50/80 text-blue-600 dark:text-blue-400 border-blue-200 font-medium ring-1 ring-blue-200/80 shadow-sm dark:bg-blue-900/20 dark:border-blue-700 dark:ring-blue-800/30"],
  ["banned", "bg-rose-50/80 text-rose-600 dark:text-rose-400 border-rose-200 font-medium ring-1 ring-rose-200/80 shadow-sm dark:bg-rose-900/20 dark:border-rose-700 dark:ring-rose-800/30"],
]);

export const userTypes = [
  {
    label: "Admin",
    value: "admin",
    icon: ShieldCheck,
    color: "text-indigo-500 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20",
  },
  {
    label: "Pharmacist",
    value: "pharmacist",
    icon: Stethoscope,
    color: "text-teal-500 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-900/20",
  },
  {
    label: "Customer",
    value: "customer",
    icon: UserCircle2,
    color: "text-amber-500 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/20",
  },
];
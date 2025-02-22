import { format } from "date-fns";

export const dateVNFormat = (date: Date): string => {
  return format(new Date(date), "dd/MM/yyyy") || "N/A";
};

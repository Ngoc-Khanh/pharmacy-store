import { InvoiceStatus } from "@/data/enums";
import { InvoiceResponse } from "@/data/interfaces";
import { useMemo, useState } from "react";

export function useInvoice(invoices: InvoiceResponse[] | undefined) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredInvoices = useMemo(() => {
    return invoices?.filter(invoice => {
      const matchesSearch = searchTerm === "" ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchTerm, statusFilter]);

  // Categorize invoices by status
  const pendingInvoices = useMemo(() => 
    invoices?.filter(i => i.status === InvoiceStatus.PENDING), 
    [invoices]
  );
  
  const paidInvoices = useMemo(() => 
    invoices?.filter(i => i.status === InvoiceStatus.PAID), 
    [invoices]
  );
  
  const cancelledInvoices = useMemo(() => 
    invoices?.filter(i => i.status === InvoiceStatus.CANCELLED), 
    [invoices]
  );

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredInvoices,
    pendingInvoices,
    paidInvoices,
    cancelledInvoices,
    clearFilters: () => {
      setSearchTerm("");
      setStatusFilter("all");
    }
  };
} 
"use client";

import { routes, siteConfig } from "@/config";
import { InvoiceDetails } from "@/data/interfaces";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";
import { motion, Variants } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import ErrorState from "./[id].error-state";
import InvoiceHeader from "./[id].header";
import LoadingState from "./[id].loading-state";
import InvoiceProducts from "./[id].products";
import InvoiceSummary from "./[id].summary";

export default function InvoiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: invoice, isLoading, error } = useQuery<InvoiceDetails>({
    queryKey: ['invoice', id],
    queryFn: () => StoreAPI.InvoiceDetails(id || ''),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const goBack = () => {
    navigate(routes.store.account.invoices);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  };

  if (isLoading) return <LoadingState />;
  if (error || !invoice) return <ErrorState error={error} onBack={goBack} />;

  return (
    <>
      <Helmet>
        <title>{`Hóa đơn #${invoice.invoiceNumber} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="py-8 px-4 max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-white to-gray-50/50">
        <InvoiceHeader invoiceNumber={invoice.invoiceNumber} onBack={goBack} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Invoice Summary */}
          <motion.div variants={itemVariants as Variants} className="lg:col-span-1 space-y-6">
            <InvoiceSummary invoice={invoice} />
          </motion.div>

          {/* Right Column - Invoice Items & Details */}
          <motion.div variants={itemVariants as Variants} className="lg:col-span-2">
            <InvoiceProducts invoice={invoice} />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
} 
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainInvoicesDialogs } from "@/components/dialogs/invoices-main.dialog";
import { Progress } from "@/components/custom/progress";
import { InvoiceAPI } from "@/services/api/invoice.api";
import { MainInvoicesTable } from "./invoices.table";
import { mainInvoicesColumns } from "@/data/columns";
import { MainInvoicesProvider } from "@/providers";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function InvoicesPage() {
  const { data: invoicesList = [], isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: InvoiceAPI.getUserInvoices,
  })
  const invoiceData = invoicesList || []

  const statusCounts = invoiceData.reduce(
    (acc, invoice) => {
      acc[invoice.status] = (acc[invoice.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const totalInvoices = invoiceData.length
  const paidPercentage = ((statusCounts["paid"] || 0) / totalInvoices) * 100
  const draftPercentage = ((statusCounts["draft"] || 0) / totalInvoices) * 100
  const pendingPercentage = ((statusCounts["pending"] || 0) / totalInvoices) * 100
  const cancelledPercentage = ((statusCounts["cancelled"] || 0) / totalInvoices) * 100

  return (
    <MainInvoicesProvider>
      <div className="flex-col min-h-screen md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Invoices List</h2>
              <p className="text-muted-foreground">All your invoices and their details here.</p>
            </div>
            {/* <ProductsPrimaryButtons /> */}
          </div>

          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card className="rounded-lg shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Draft</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={draftPercentage} className="-mt-4 mb-2" />
                <p className="text-sm">{statusCounts["draft"] || 0} invoices</p>
              </CardContent>
            </Card>
            <Card className="rounded-lg shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={pendingPercentage} className="-mt-4 mb-2" />
                <p className="text-sm">{statusCounts["pending"] || 0} invoices</p>
              </CardContent>
            </Card>
            <Card className="rounded-lg shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={paidPercentage} className="-mt-4 mb-2" />
                <p className="text-sm">{statusCounts["paid"] || 0} invoices</p>
              </CardContent>
            </Card>
            <Card className="rounded-lg shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Cancelled</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={cancelledPercentage} className="-mt-4 mb-2" />
                <p className="text-sm">{statusCounts["cancelled"] || 0} invoices</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            {isLoading ? (
              <div className="flex h-[70vh] items-center justify-center gap-3">
                <Loader2 size={40} className="animate-spin" />
                <span className="text-xl text-bold">Loading...</span>
              </div>
            ) : (
              <MainInvoicesTable columns={mainInvoicesColumns} data={invoiceData} />
            )}
            <MainInvoicesDialogs />
          </div>
        </div>
      </div>
    </MainInvoicesProvider>
  )
}
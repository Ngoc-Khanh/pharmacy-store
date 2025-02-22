import { MainInvoicesDetailDialog } from "@/page/main/account/invoices/invoices.detail-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useMainInvoices } from "@/providers";

export function MainInvoicesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useMainInvoices();

  return (
    <>
      {currentRow ? (
        <MainInvoicesDetailDialog
        key={`view-details-${currentRow.id}`}
        open={open === "view"}
        onOpenChange={() => {
          setOpen("view");
          setTimeout(() => {
            setCurrentRow(null);
          }, 500);
        }}
        currentRow={currentRow}
      />
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Select an invoice to view details
          </CardContent>
        </Card>
      )}
    </>
  )
}
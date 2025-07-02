import { StepFiveActionButtons, StepFiveDeliveryInfo, StepFiveErrorState, StepFiveFeedbackSection, StepFiveInvoiceSection, StepFiveLoadingState, StepFiveSuccessHeader } from "@/components/pages/store/consultation";
import { routes } from "@/config";
import { InvoiceDetails } from "@/data/interfaces";
import { useStep5 } from "@/hooks/use-step-consultation";
import { StoreAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const ConsultationStepFine = () => {
  const navigate = useNavigate();
  const { placedOrder, selectedPaymentMethod, nextStep } = useStep5();

  // Fetch invoice details using the placed order ID
  const { data: invoice, isLoading: isLoadingInvoice, error: invoiceError } = useQuery<InvoiceDetails>({
    queryKey: ['invoice-details', placedOrder?.id],
    queryFn: () => StoreAPI.InvoiceDetailsWithOrderId(placedOrder!.id),
    enabled: !!placedOrder?.id,
    refetchOnWindowFocus: false,
  });

  // Event handlers
  const handleGoHome = () => navigate(routes.store.root);
  const handleViewOrders = () => navigate(routes.store.account.orders);
  const handleContinueShopping = () => navigate(routes.store.medicines);
  const handleDownloadInvoice = () => {
    console.log("[ConsultationStepFine] Download invoice for order:", placedOrder?.id);
    // TODO: Implement invoice download functionality
  };

  // Loading state
  if (isLoadingInvoice) {
    return <StepFiveLoadingState />;
  }

  // Error state
  if (invoiceError || !placedOrder) {
    return <StepFiveErrorState onGoHome={handleGoHome} />;
  }

  return (
    <div className="py-12 space-y-10 max-w-5xl mx-auto px-4">
      {/* Success Header */}
      <StepFiveSuccessHeader
        invoiceNumber={invoice?.invoiceNumber}
        orderId={placedOrder.id}
      />

      {/* Invoice Details - Temporarily commented out */}
      <StepFiveInvoiceSection
        invoice={invoice}
        placedOrder={placedOrder}
        selectedPaymentMethod={selectedPaymentMethod}
        onDownloadInvoice={handleDownloadInvoice}
      />

      {/* Delivery Information */}
      <StepFiveDeliveryInfo />

      {/* Action Buttons */}
      <StepFiveActionButtons
        onViewOrders={handleViewOrders}
        onContinueShopping={handleContinueShopping}
        onGoHome={handleGoHome}
        onNextStep={nextStep}
      />

      {/* Feedback Section */}
      <StepFiveFeedbackSection />
    </div>
  );
};

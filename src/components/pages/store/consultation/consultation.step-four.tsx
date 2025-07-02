import { PlaceOrderDto } from "@/data/dto";
import { useStep2, useStep3, useStep5 } from "@/hooks/use-step-consultation";
import { StoreAPI } from "@/services/v1";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  StepFourActionButtons,
  StepFourFeedbackSection,
  StepFourNextSteps,
  StepFourOrderSummary,
  StepFourSuccessHeader
} from ".";

export const ConsultationStepFour = () => {
  const navigate = useNavigate();
  const { selectedMedicines, prevStep } = useStep2();
  const { selectedAddressId, selectedPaymentMethod } = useStep3();
  const { setPlacedOrder, nextStep } = useStep5();

  // Calculate total price
  const totalPrice = selectedMedicines.reduce((sum, medicine) => sum + medicine.variants.price, 0);

  // Place order mutation
  const placeOrderMutation = useMutation({
    mutationFn: StoreAPI.PlaceOrder,
    onSuccess: (order) => {
      setPlacedOrder(order);
      nextStep(); // Go to step 5 to show invoice
    },
    onError: (error: Error) => {
      console.error('[Step4Confirmation] Place order error:', error);
    },
  });

  // Event handlers
  const handlePlaceOrder = () => {
    if (!selectedAddressId || !selectedPaymentMethod) {
      console.warn('[Step4Confirmation] Missing required data for order placement');
      return;
    }

    const orderData: PlaceOrderDto = {
      shippingAddressId: selectedAddressId,
      paymentMethod: selectedPaymentMethod,
    };

    placeOrderMutation.mutate(orderData);
  };

  const handleViewCart = () => navigate("/cart");
  const handleContinueShopping = () => navigate("/medicines");
  const handleBackToConsultation = () => prevStep();
  const handleGoHome = () => navigate("/");

  const isDisabled = !selectedAddressId || !selectedPaymentMethod;

  return (
    <div className="py-12 space-y-8 max-w-3xl mx-auto px-4">
      {/* Success Header */}
      <StepFourSuccessHeader />

      {/* Order Summary */}
      <StepFourOrderSummary 
        selectedMedicines={selectedMedicines}
        totalPrice={totalPrice}
      />

      {/* Next Steps Guide */}
      <StepFourNextSteps />

      {/* Action Buttons */}
      <StepFourActionButtons
        isLoading={placeOrderMutation.isPending}
        disabled={isDisabled}
        onPlaceOrder={handlePlaceOrder}
        onViewCart={handleViewCart}
        onBackToConsultation={handleBackToConsultation}
        onContinueShopping={handleContinueShopping}
        onGoHome={handleGoHome}
      />

      {/* Feedback Section */}
      <StepFourFeedbackSection />
    </div>
  );
};

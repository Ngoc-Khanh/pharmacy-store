import { useStep6 } from "@/hooks/use-step-consultation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  StepSixSuccessSummary,
  StepSixRatingSection,
  StepSixNextSteps,
  StepSixActionButtons,
  StepSixThankYou
} from ".";

export const ConsultationStepSix = () => {
  const navigate = useNavigate();
  const { 
    feedbackRating, 
    setFeedbackRating, 
    feedbackComment, 
    setFeedbackComment,
    isValid,
    placedOrder 
  } = useStep6();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Event handlers
  const handleSubmitFeedback = async () => {
    if (!isValid) {
      toast.error("Vui lòng đánh giá dịch vụ trước khi gửi");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement feedback submission API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success("🎉 Cảm ơn bạn đã góp ý! Ý kiến của bạn rất quan trọng với chúng tôi.");
    } catch {
      toast.error("Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNewConsultation = () => {
    toast.success("🤖 Bắt đầu tư vấn AI mới");
    // TODO: Reset consultation flow and navigate to step 1
    navigate("/consultation");
  };

  const handleGoHome = () => navigate("/");
  const handleViewOrders = () => navigate("/profile/orders");
  const handleContinueShopping = () => navigate("/medicines");

  return (
    <div className="py-12 space-y-10 max-w-5xl mx-auto px-4">
      {/* Success Summary */}
      <StepSixSuccessSummary placedOrder={placedOrder || undefined} />

      {/* Rating Section */}
      <StepSixRatingSection
        feedbackRating={feedbackRating}
        setFeedbackRating={setFeedbackRating}
        feedbackComment={feedbackComment}
        setFeedbackComment={setFeedbackComment}
        onSubmitFeedback={handleSubmitFeedback}
        isValid={isValid}
        isSubmitting={isSubmitting}
      />

      {/* Next Steps */}
      <StepSixNextSteps onStartNewConsultation={handleStartNewConsultation} />

      {/* Action Buttons */}
      <StepSixActionButtons
        onViewOrders={handleViewOrders}
        onContinueShopping={handleContinueShopping}
        onGoHome={handleGoHome}
      />

      {/* Thank You Message */}
      <StepSixThankYou />
    </div>
  );
};

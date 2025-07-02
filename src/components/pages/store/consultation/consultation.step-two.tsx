import { TextShimmer } from "@/components/custom/text-shimmer";
import { DiagnosisSummary, ImportantNotice, LoadingSkeleton, MedicineCard, SelectionSummary } from "@/components/pages/store/consultation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AiMedicineSuggestionResponse } from "@/data/interfaces";
import { useStep2 } from "@/hooks/use-step-consultation";
import { AiAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Info, Package, Pill } from "lucide-react";

// Main Component
export const ConsultationStepTwo = () => {
  const { consultationId, selectedMedicines, setSelectedMedicines, nextStep, prevStep, isValid } = useStep2();

  const { data: MedicineSuggestion, isLoading } = useQuery<AiMedicineSuggestionResponse>({
    queryKey: ["medicine-suggestion", consultationId],
    queryFn: () => AiAPI.AiMedicineSuggestion(consultationId!),
    enabled: !!consultationId,
  });

  const handleMedicineToggle = (medicineId: string) => {
    const isSelected = selectedMedicines.some(medicine => medicine.id === medicineId);
    if (isSelected) {
      setSelectedMedicines(selectedMedicines.filter(medicine => medicine.id !== medicineId));
    } else {
      const medicineToAdd = MedicineSuggestion?.recommendedMedicines.find(med => med.id === medicineId);
      if (medicineToAdd) setSelectedMedicines([...selectedMedicines, medicineToAdd]);
    }
  };

  const isMedicineSelected = (medicineId: string) => {
    return selectedMedicines.some(medicine => medicine.id === medicineId);
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Pill className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
          Gợi ý thuốc phù hợp
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Dựa trên chẩn đoán AI, chúng tôi đề xuất các loại thuốc phù hợp
        </p>
      </div>

      {/* Diagnosis Summary */}
      {MedicineSuggestion && <DiagnosisSummary data={MedicineSuggestion} />}

      {/* Medicine List Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Thuốc được đề xuất</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isLoading ? (
                <TextShimmer duration={2}>Đang tải danh sách thuốc...</TextShimmer>
              ) : (
                `${MedicineSuggestion?.recommendedMedicines.length || 0} sản phẩm phù hợp`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Medicine List */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : !MedicineSuggestion?.recommendedMedicines.length ? (
        <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-2">
              Chưa có thuốc phù hợp
            </h3>
            <p className="text-orange-600 dark:text-orange-400">
              Vui lòng tham khảo ý kiến bác sĩ chuyên khoa
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {MedicineSuggestion.recommendedMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              isSelected={isMedicineSelected(medicine.id)}
              onToggle={() => handleMedicineToggle(medicine.id)}
            />
          ))}
        </div>
      )}

      {/* Selection Summary */}
      <SelectionSummary medicines={selectedMedicines} />

      {/* Important Notice */}
      <ImportantNotice />

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Button>

        <div className="text-center">
          <p className={`text-sm mb-2 ${selectedMedicines.length === 0 ? 'text-gray-500' : 'text-teal-600 dark:text-teal-400'}`}>
            {selectedMedicines.length === 0 
              ? 'Vui lòng chọn ít nhất một loại thuốc'
              : `✓ Đã chọn ${selectedMedicines.length} loại thuốc`
            }
          </p>
        </div>

        <Button
          onClick={() => isValid && nextStep()}
          disabled={!isValid || isLoading}
          className={`flex items-center gap-2 ${
            isValid 
              ? 'bg-teal-600 hover:bg-teal-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Tiếp tục
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
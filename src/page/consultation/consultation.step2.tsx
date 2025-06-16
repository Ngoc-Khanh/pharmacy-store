import { TextShimmer } from "@/components/custom/text-shimmer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SeverityLevel, StockStatus } from "@/data/enum";
import { AiMedicineSuggestionResponse } from "@/data/interfaces";
import { useStep2 } from "@/hooks/use-step-form";
import { AiAPI } from "@/services/api/ai.api";
import { useQuery } from "@tanstack/react-query";
import { Activity, AlertTriangle, ArrowLeft, ArrowRight, CheckCircle, Clock, DollarSign, Info, Package, Pill, Shield, Star, TrendingUp } from "lucide-react";

export const Step2MedicineSuggestion = () => {
  const { consultationId, selectedMedicines, setSelectedMedicines, nextStep, prevStep, isValid } = useStep2();

  const { data: MedicineSuggestion, isLoading } = useQuery<AiMedicineSuggestionResponse>({
    queryKey: ["medicine-suggestion", consultationId],
    queryFn: () => AiAPI.AiMedicineSuggestion(consultationId!),
    enabled: !!consultationId,
  })

  // Handler for toggling medicine selection
  const handleMedicineToggle = (medicineId: string) => {
    const isSelected = selectedMedicines.some(medicine => medicine.id === medicineId);

    if (isSelected) {
      // Remove medicine from selection
      setSelectedMedicines(selectedMedicines.filter(medicine => medicine.id !== medicineId));
    } else {
      // Add medicine to selection
      const medicineToAdd = MedicineSuggestion?.recommendedMedicines.find(med => med.id === medicineId);
      if (medicineToAdd) {
        setSelectedMedicines([...selectedMedicines, medicineToAdd]);
      }
    }
  };

  // Helper function to check if medicine is selected
  const isMedicineSelected = (medicineId: string) => {
    return selectedMedicines.some(medicine => medicine.id === medicineId);
  };

  const handleNextStep = () => {
    if (!isValid) {
      // Show error toast or message
      return;
    }
    nextStep();
  };

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Enhanced Header */}
      <div className="text-center relative">
        <div className="relative inline-flex items-center justify-center w-14 h-14 mb-3">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl opacity-20 animate-pulse"></div>
          <div className="relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
            <Pill className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Gợi ý thuốc phù hợp
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Dựa trên chẩn đoán AI, chúng tôi đề xuất các loại thuốc phù hợp với tình trạng của bạn
        </p>
      </div>

      {/* Debug Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="p-3">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2 text-sm">Debug Info:</h4>
            <pre className="text-xs text-blue-600 dark:text-blue-400 overflow-auto">
              {JSON.stringify({
                hasAiResponse: !!MedicineSuggestion,
                primaryDiagnosis: MedicineSuggestion?.consultationInfo.primaryDiagnosis.name || 'None',
                loadedMedicines: MedicineSuggestion?.recommendedMedicines.length,
                isLoading,
                selectedMedicinesCount: selectedMedicines.length
              }, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Enhanced AI Diagnosis Summary */}
      {MedicineSuggestion && (
        <Card className="border-2 border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/20 shadow-lg backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-400/5" />
          <CardHeader className="relative pb-2">
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-bold flex items-center gap-1">
                    <Activity className="w-4 h-4" />
                    Chẩn đoán: {MedicineSuggestion.consultationInfo.primaryDiagnosis.name}
                  </span>
                  <Badge className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {MedicineSuggestion.consultationInfo.primaryDiagnosis.confidence}%
                  </Badge>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Dựa trên chẩn đoán từ AI Pharmacity
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 relative">
            <div className="p-3 bg-white/70 dark:bg-gray-900/70 rounded-lg border border-green-200 dark:border-green-800/50 backdrop-blur-sm">
              <p className="text-foreground leading-relaxed text-sm">
                {MedicineSuggestion.consultationInfo.primaryDiagnosis.description}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${MedicineSuggestion.consultationInfo.severityLevel === SeverityLevel.HIGH ? 'bg-red-500' :
                  MedicineSuggestion.consultationInfo.severityLevel === SeverityLevel.MEDIUM ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                  <span className="text-white font-bold text-xs">
                    {MedicineSuggestion.consultationInfo.severityLevel === SeverityLevel.LOW ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-medium">Mức độ:</span>
                  <Badge
                    variant="outline"
                    className={`ml-1 font-semibold text-xs ${MedicineSuggestion.consultationInfo.severityLevel === SeverityLevel.HIGH ? 'text-red-600 border-red-600' :
                      MedicineSuggestion.consultationInfo.severityLevel === SeverityLevel.MEDIUM ? 'text-yellow-600 border-yellow-600' :
                        'text-green-600 border-green-600'
                      }`}
                  >
                    {MedicineSuggestion.consultationInfo.severityLevel === SeverityLevel.LOW && 'Nhẹ'}
                    {MedicineSuggestion.consultationInfo.severityLevel === SeverityLevel.MEDIUM && 'Trung bình'}
                    {MedicineSuggestion.consultationInfo.severityLevel === SeverityLevel.HIGH && 'Nghiêm trọng'}
                  </Badge>
                </div>
              </div>

              {MedicineSuggestion.consultationInfo.severityLevel === SeverityLevel.HIGH && (
                <Alert className="flex-1 border-red-300 dark:border-red-700/50 bg-red-50 dark:bg-red-950/20 p-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-700 dark:text-red-300 font-medium text-xs">
                    <strong>Khuyến nghị:</strong> Gặp bác sĩ chuyên khoa ngay lập tức
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Medicine Recommendations */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
              <Package className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Thuốc được đề xuất
              </h3>
              <p className="text-xs text-muted-foreground">
                {isLoading
                  ?
                  <TextShimmer className="font-default text-sm" duration={2}>
                    Ai đang tải danh sách thuốc phù hợp...
                  </TextShimmer>
                  : `${MedicineSuggestion?.recommendedMedicines.length || 0} sản phẩm phù hợp với chẩn đoán`
                }
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
              <TextShimmer className="font-default text-sm" duration={2}>
                Đang tải...
              </TextShimmer>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-green-200 dark:border-green-800/50 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="animate-pulse space-y-3">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/50 dark:to-purple-800/50 rounded-lg w-32"></div>
                      <div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/50 dark:to-purple-800/50 rounded-md w-24"></div>
                    </div>
                    <div className="h-8 bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800/50 dark:to-emerald-800/50 rounded-lg w-20"></div>
                  </div>
                  <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : MedicineSuggestion?.recommendedMedicines.length === 0 ? (
        <Card className="border-orange-200 dark:border-orange-800/50 bg-orange-50 dark:bg-orange-950/20 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Info className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-2">
              Chưa có thuốc phù hợp
            </h3>
            <p className="text-orange-600 dark:text-orange-400 text-sm">
              Hệ thống chưa tìm thấy thuốc phù hợp với chẩn đoán hiện tại. Vui lòng tham khảo ý kiến bác sĩ.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {MedicineSuggestion?.recommendedMedicines.map((medicine) => (
            <Card
              key={medicine.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-green-200 dark:border-green-800/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden ${isMedicineSelected(medicine.id)
                ? 'ring-2 ring-green-400/50 dark:ring-green-500/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30'
                : 'hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20'
                }`}
              onClick={() => handleMedicineToggle(medicine.id)}
            >
              <CardContent className="p-3 relative">
                {/* Header with checkbox and selection badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="relative">
                    <Checkbox
                      checked={isMedicineSelected(medicine.id)}
                      onChange={() => handleMedicineToggle(medicine.id)}
                      className="w-4 h-4 border-2 border-green-400 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                  </div>
                  {isMedicineSelected(medicine.id) && (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 text-xs px-2 py-0.5">
                      <Star className="w-3 h-3 mr-1" />
                      Đã chọn
                    </Badge>
                  )}
                </div>

                {/* Medicine image and basic info */}
                <div className="flex gap-3 mb-3">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={medicine.thumbnail.url}
                      alt={medicine.thumbnail.alt || medicine.name}
                      className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-medicine.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-foreground mb-1 line-clamp-2 leading-tight">
                      {medicine.name}
                    </h4>
                    <Badge variant="outline" className="text-xs border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30 px-1.5 py-0.5">
                      <Pill className="w-3 h-3 mr-1" />
                      <span className="truncate">{medicine.usageguide.dosage.adult}</span>
                    </Badge>
                  </div>
                </div>

                {/* Price and stock status */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {medicine.variants.price.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                  {medicine.variants.stockStatus === StockStatus.IN_STOCK ? (
                    <Badge className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs px-1.5 py-0.5">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Còn hàng
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Hết hàng
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <div className="mb-2 p-2 bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-950/20 rounded-md border border-gray-200 dark:border-gray-700/50">
                  <p className="text-foreground leading-relaxed text-xs line-clamp-2">
                    {medicine.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Selection Summary */}
      {selectedMedicines.length > 0 && (
        <Card className="border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-950/20 shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-green-700 dark:text-green-300">
                    Đã chọn {selectedMedicines.length} thuốc
                  </h4>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Tổng giá trị: {selectedMedicines.reduce((total, med) => total + med.variants.price, 0).toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-sm px-3 py-1">
                <Star className="w-4 h-4 mr-1" />
                Đã chọn
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Important Notice */}
      <Card className="border-red-200 dark:border-red-800/50 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-base font-bold text-red-700 dark:text-red-300">
              Lưu ý quan trọng
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-md">
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle className="w-2 h-2 text-white" />
                </div>
                <span className="text-xs text-red-700 dark:text-red-300 leading-tight">
                  Đây chỉ là gợi ý từ AI, không thay thế lời khuyên của bác sĩ chuyên khoa
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-md">
                <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-2 h-2 text-white" />
                </div>
                <span className="text-xs text-red-700 dark:text-red-300 leading-tight">
                  Vui lòng đọc kỹ hướng dẫn sử dụng và cảnh báo trước khi dùng thuốc
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-md">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-2 h-2 text-white" />
                </div>
                <span className="text-xs text-red-700 dark:text-red-300 leading-tight">
                  Nếu triệu chứng nghiêm trọng hoặc kéo dài, hãy đến gặp bác sĩ ngay
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-md">
                <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-2 h-2 text-white" />
                </div>
                <span className="text-xs text-red-700 dark:text-red-300 leading-tight">
                  Ngưng sử dụng và tham khảo bác sĩ nếu có phản ứng bất thường
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="outline"
          onClick={prevStep}
          className="flex items-center gap-2 border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Button>

        <div className="text-center">
          {selectedMedicines.length === 0 ? (
            <p className="text-sm text-muted-foreground mb-2">
              Vui lòng chọn ít nhất một loại thuốc để tiếp tục
            </p>
          ) : (
            <p className="text-sm text-green-600 dark:text-green-400 mb-2">
              ✓ Đã chọn {selectedMedicines.length} loại thuốc
            </p>
          )}
        </div>

        <Button
          onClick={handleNextStep}
          disabled={!isValid || isLoading}
          className={`flex items-center gap-2 ${isValid
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
            }`}
        >
          Tiếp tục
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

    </div>
  )
}
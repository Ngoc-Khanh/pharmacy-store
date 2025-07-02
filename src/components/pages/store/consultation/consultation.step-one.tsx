import { StepOneInputArea, StepOnePatientInformation } from "@/components/pages/store/consultation";
import { Button } from "@/components/ui/button";
import { AiConsultationResponse } from "@/data/interfaces";
import { useAuth } from "@/hooks/use-auth";
import { useStep1 } from "@/hooks/use-step-consultation";
import { AIApi } from "@/services/v1";
import { useMutation } from "@tanstack/react-query";
import { Bot, BotMessageSquare, Brain, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ConsultationStepOne() {
  const { user } = useAuth();
  const { symptoms, patientAge, patientGender, nextStep, isValid, setConsultationId } = useStep1()
  const [data, setData] = useState<AiConsultationResponse | null>(null)

  const handleNext = () => {
    nextStep();
  }

  const { mutate: consultationMutation, isPending } = useMutation({
    mutationFn: AIApi.AiConsultation,
    onSuccess: (responseData) => {
      setData(responseData)
      setConsultationId(responseData.consultationId)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const onSubmit = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để sử dụng tính năng chẩn đoán AI")
      return
    }
    consultationMutation({
      userId: user?.id || '',
      symptoms: symptoms,
      patientAge: patientAge,
      patientGender: patientGender,
    })
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center relative">
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl opacity-20 animate-pulse" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
            <BotMessageSquare className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Thông tin chẩn đoán triệu chứng
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Cung cấp thông tin chi tiết để AI có thể phân tích và đưa ra chẩn đoán chính xác nhất
        </p>
      </div>

      {(!data && !isPending) && (
        <>
          {/* Patient Information */}
          <StepOnePatientInformation />

          {/* Enhanced Input Area */}
          <StepOneInputArea />

          <Button
            onClick={onSubmit}
            disabled={!isValid || isPending}
            className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
          >
            <div className="flex items-center justify-center gap-3">
              <Brain className="w-6 h-6 group-hover:animate-pulse" />
              <span>Bắt đầu chẩn đoán AI</span>
              <Bot className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Button>
        </>
      )}



      {data && (
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleNext}
            disabled={!isValid || isPending}
            className="group relative px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
              <span>Xem gợi ý AI</span>
            </div>
          </Button>
          <Button
            onClick={() => setData(null)}
            variant="outline"
            className="group px-8 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              <span>Hỏi lại</span>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
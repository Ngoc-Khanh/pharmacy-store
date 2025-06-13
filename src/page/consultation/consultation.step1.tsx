import { userAtom } from "@/atoms/auth.atom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { PatientGender, SeverityLevel } from "@/data/enum"
import { AiConsultationResponse } from "@/data/interfaces"
import { useStep1 } from "@/hooks/use-step-form"
import { AiAPI } from "@/services/api/ai.api"
import { useMutation } from "@tanstack/react-query"
import { useAtomValue } from "jotai"
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bot,
  BotMessageSquare,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  Info,
  Lightbulb,
  Loader2,
  RotateCcw,
  Shield,
  Sparkles,
  Star,
  Stethoscope,
  Target,
  TrendingUp,
  User,
  Zap,
  Search,
  Eye,
  Thermometer
} from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"

export const Step1InputSymptom = () => {
  const user = useAtomValue(userAtom)
  const { symptoms, setSymptoms, patientAge, setPatientAge, patientGender, setPatientGender, nextStep, isValid } = useStep1()
  const [data, setData] = useState<AiConsultationResponse | null>(null)

  const handleNext = () => {
    nextStep();
  };

  const { mutate: consultationMutation, isPending } = useMutation({
    mutationFn: AiAPI.AiConsultation,
    onSuccess: (responseData) => {
      setData(responseData)
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

  const getSeverityConfig = (level: SeverityLevel) => {
    switch (level) {
      case SeverityLevel.VERY_HIGH:
        return {
          color: 'from-red-600 to-red-700',
          bgColor: 'from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30',
          borderColor: 'border-red-300 dark:border-red-700',
          textColor: 'text-red-700 dark:text-red-300',
          badgeColor: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700',
          icon: AlertTriangle,
          label: 'Rất nghiêm trọng',
          description: 'Cần cấp cứu ngay lập tức',
          emoji: '🚨'
        }
      case SeverityLevel.HIGH:
        return {
          color: 'from-orange-500 to-red-500',
          bgColor: 'from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30',
          borderColor: 'border-orange-300 dark:border-orange-700',
          textColor: 'text-orange-700 dark:text-orange-300',
          badgeColor: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700',
          icon: AlertTriangle,
          label: 'Nghiêm trọng',
          description: 'Cần gặp bác sĩ ngay lập tức',
          emoji: '⚠️'
        }
      case SeverityLevel.MEDIUM:
        return {
          color: 'from-yellow-500 to-orange-500',
          bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30',
          borderColor: 'border-yellow-300 dark:border-yellow-700',
          textColor: 'text-yellow-700 dark:text-yellow-300',
          badgeColor: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
          icon: AlertCircle,
          label: 'Trung bình',
          description: 'Theo dõi và có thể cần gặp bác sĩ',
          emoji: '⚠️'
        }
      default:
        return {
          color: 'from-green-500 to-emerald-500',
          bgColor: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
          borderColor: 'border-green-300 dark:border-green-700',
          textColor: 'text-green-700 dark:text-green-300',
          badgeColor: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700',
          icon: CheckCircle2,
          label: 'Nhẹ',
          description: 'Có thể tự điều trị tại nhà',
          emoji: '✅'
        }
    }
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center relative">
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl opacity-20 animate-pulse"></div>
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
          <Card className="border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Thông tin bệnh nhân
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    Tuổi
                  </label>
                  <Input
                    type="number"
                    placeholder="Nhập tuổi của bạn"
                    value={patientAge || ''}
                    onChange={(e) => setPatientAge(parseInt(e.target.value) || 0)}
                    min="1"
                    max="120"
                    className="border-2 border-blue-200 dark:border-blue-800/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    Giới tính
                  </label>
                  <Select value={patientGender} onValueChange={(value: PatientGender) => setPatientGender(value)}>
                    <SelectTrigger className="border-2 border-blue-200 dark:border-blue-800/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PatientGender.MALE}>Nam</SelectItem>
                      <SelectItem value={PatientGender.FEMALE}>Nữ</SelectItem>
                      <SelectItem value={PatientGender.OTHER}>Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Input Area */}
          <Card className="border-green-200 dark:border-green-800/50 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-900 dark:to-green-950/20 shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Mô tả triệu chứng
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Textarea
                  placeholder="Ví dụ: Tôi bị đau đầu từ sáng nay, cảm thấy chóng mặt và hơi buồn nôn. Đau tập trung ở vùng thái dương và tăng lên khi di chuyển. Mức độ đau khoảng 7/10..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="min-h-40 text-base resize-none border-2 border-green-200 dark:border-green-800/50 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 transition-all duration-300 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  maxLength={1000}
                />

                {/* Character count and status */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <Badge variant="outline" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-green-800">
                    {symptoms.length}/1000
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

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

      {
        (isPending || data) && (
          <Card className="border-green-200 dark:border-green-800/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 shadow-xl backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3 text-green-700 dark:text-green-300">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    {isPending ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <Brain className="w-6 h-6 text-white" />
                    )}
                  </div>
                  {!isPending && data && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      AI Pharmacity - Chẩn đoán
                    </span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative">
              {isPending ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce animation-delay-100" />
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce animation-delay-200" />
                    <span className="ml-2">Đang phân tích triệu chứng và chẩn đoán...</span>
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="w-full h-52 rounded-sm" />
                  </div>
                </div>
              ) : data && data.primaryDiagnosis ? (
                <div className="space-y-6">
                  {/* Primary Diagnosis */}
                  <div className="relative p-6 bg-white/70 dark:bg-gray-900/70 rounded-2xl border-2 border-green-200 dark:border-green-800/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl"></div>
                    <div className="relative">
                      <h4 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          Chẩn đoán chính: {data.primaryDiagnosis.diagnosisName}
                        </span>
                      </h4>
                      <p className="text-foreground leading-relaxed text-base mb-4">
                        {data.primaryDiagnosis.description}
                      </p>
                      {data.primaryDiagnosis.reasons && data.primaryDiagnosis.reasons.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-semibold text-sm text-green-700 dark:text-green-300">Lý do chẩn đoán:</h5>
                          <ul className="space-y-1">
                            {data.primaryDiagnosis.reasons.map((reason: string, index: number) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Confidence Percentage */}
                      <div className="mt-4 flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700">
                          Độ tin cậy: {data.primaryDiagnosis.confidencePercentage}%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Related Symptoms - NEW SECTION */}
                  {data.relatedSymptoms && data.relatedSymptoms.length > 0 && (
                    <div className="relative p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-2xl border-2 border-cyan-200 dark:border-cyan-800/50 shadow-lg backdrop-blur-sm overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 dark:from-cyan-800/10 dark:to-blue-800/10 animate-pulse"></div>

                      <div className="relative">
                        <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Search className="w-5 h-5 text-white" />
                          </div>
                          <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            Triệu chứng liên quan
                          </span>
                        </h4>

                        <div className="grid gap-3">
                          {data.relatedSymptoms.map((symptom, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-white/70 dark:bg-gray-900/50 rounded-xl border border-cyan-200 dark:border-cyan-800/50 shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300">
                              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Eye className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <span className="text-foreground leading-relaxed font-medium">{symptom}</span>
                              </div>
                              <Thermometer className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Alternative Diagnoses */}
                  {data.alternativeDiagnoses && data.alternativeDiagnoses.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Info className="w-5 h-5 text-orange-600" />
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          Chẩn đoán thay thế có thể
                        </span>
                      </h4>
                      <div className="grid gap-4">
                        {data.alternativeDiagnoses.map((diagnosis, index) => (
                          <div key={index} className="relative p-5 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-2xl border-2 border-orange-200 dark:border-orange-800/50 shadow-lg backdrop-blur-sm overflow-hidden">
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-red-200/20 dark:from-orange-800/10 dark:to-red-800/10 animate-pulse"></div>

                            <div className="relative">
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-bold text-lg text-orange-700 dark:text-orange-300 flex items-center gap-2">
                                  <Target className="w-5 h-5" />
                                  {diagnosis.diagnosisName}
                                </h5>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700 font-semibold">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    {diagnosis.confidencePercentage}%
                                  </Badge>
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mb-4 leading-relaxed bg-white/50 dark:bg-gray-900/30 p-3 rounded-lg border border-orange-200/50 dark:border-orange-800/30">
                                {diagnosis.description}
                              </p>

                              {diagnosis.reasons && diagnosis.reasons.length > 0 && (
                                <div className="space-y-2">
                                  <h6 className="font-semibold text-sm text-orange-700 dark:text-orange-300 flex items-center gap-1">
                                    <Stethoscope className="w-4 h-4" />
                                    Lý do:
                                  </h6>
                                  <ul className="space-y-1">
                                    {diagnosis.reasons.map((reason, reasonIndex) => (
                                      <li key={reasonIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="leading-relaxed">{reason}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* General Advice */}
                  {data.generalAdvice && data.generalAdvice.length > 0 && (
                    <div className="relative p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800/50 shadow-lg backdrop-blur-sm overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 dark:from-blue-800/10 dark:to-cyan-800/10 animate-pulse"></div>

                      <div className="relative">
                        <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Lightbulb className="w-5 h-5 text-white" />
                          </div>
                          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Lời khuyên chung
                          </span>
                        </h4>

                        <div className="grid gap-3">
                          {data.generalAdvice.map((advice, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-white/70 dark:bg-gray-900/50 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                <span className="text-white text-xs font-bold">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <span className="text-foreground leading-relaxed font-medium">{advice}</span>
                              </div>
                              <Heart className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommended Actions */}
                  {data.recommendedActions && data.recommendedActions.length > 0 && (
                    <div className="relative p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800/50 shadow-lg backdrop-blur-sm overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 to-pink-200/20 dark:from-purple-800/10 dark:to-pink-800/10 animate-pulse"></div>

                      <div className="relative">
                        <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Hành động được khuyến nghị
                          </span>
                        </h4>

                        <div className="grid gap-3">
                          {data.recommendedActions.map((action, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-white/70 dark:bg-gray-900/50 rounded-xl border border-purple-200 dark:border-purple-800/50 shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <span className="text-foreground leading-relaxed font-medium">{action}</span>
                              </div>
                              <div className="flex items-center gap-1 text-purple-500 text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                                <span>Bước {index + 1}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Severity Level Indicator */}
                  {data.severityLevel && (
                    <div className={`relative p-6 rounded-2xl border-2 shadow-lg backdrop-blur-sm overflow-hidden ${getSeverityConfig(data.severityLevel).borderColor}`}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${getSeverityConfig(data.severityLevel).bgColor} animate-pulse`}></div>

                      <div className="relative flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl bg-gradient-to-br ${getSeverityConfig(data.severityLevel).color}`}>
                          {(() => {
                            const IconComponent = getSeverityConfig(data.severityLevel).icon;
                            return <IconComponent className="w-8 h-8 text-white" />;
                          })()}
                        </div>

                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-foreground">Mức độ nghiêm trọng</h4>
                          <p className={`text-lg font-bold ${getSeverityConfig(data.severityLevel).textColor}`}>
                            {getSeverityConfig(data.severityLevel).label}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {getSeverityConfig(data.severityLevel).description}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Badge
                            variant="outline"
                            className={`font-bold text-lg px-4 py-2 ${getSeverityConfig(data.severityLevel).badgeColor}`}
                          >
                            {getSeverityConfig(data.severityLevel).emoji}
                            <Star className="w-4 h-4 inline ml-1" />
                          </Badge>
                          <div className={`flex items-center gap-1 text-xs font-medium ${getSeverityConfig(data.severityLevel).textColor}`}>
                            <Zap className="w-3 h-3" />
                            <span>Mức độ {data.severityLevel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : data ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Không thể phân tích được triệu chứng. Vui lòng thử lại.</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )
      }

      {data && (
        <div className="flex justify-center gap-2 pt-6">
          <Button
            onClick={handleNext}
            disabled={!isValid || isPending}
            size="lg"
            className="px-12 py-4 text-lg bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 disabled:opacity-50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl"
          >
            <Sparkles className="w-5 h-5 mr-3" />
            Xem gợi ý thuốc từ AI
          </Button>
          <Button
            onClick={() => setData(null)}
            variant="outline"
            size="lg"
            className="px-12 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl"
          >
            <RotateCcw className="w-5 h-5 mr-3" />
            Hỏi lại từ đầu
          </Button>
        </div>
      )}

      {/* Enhanced Tips */}
      <Card className="border-green-200 dark:border-green-800/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-foreground">
              Mẹo để nhận được chẩn đoán chính xác
            </h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <span className="text-sm">Mô tả cụ thể vị trí đau và cảm giác</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">Cho biết thời gian và tần suất xuất hiện</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">Đề cập mức độ nghiêm trọng (1-10)</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">Cung cấp thông tin tuổi và giới tính chính xác</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div >
  )
}

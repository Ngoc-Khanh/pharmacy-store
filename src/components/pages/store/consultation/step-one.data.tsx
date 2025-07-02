import { TextShimmer } from "@/components/custom/text-shimmer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { SeverityLevel } from "@/data/enums"
import { AiConsultationResponse } from "@/data/interfaces"
import { Activity, AlertCircle, AlertTriangle, ArrowRight, Brain, CheckCircle2, FileText, Heart, Info, Lightbulb, Loader2, Search, Shield, Star, Stethoscope, Target } from "lucide-react"

interface Props {
  data: AiConsultationResponse | null
  isPending: boolean
}

const getConfidenceColor = (percentage: number) => {
  if (percentage >= 70) {
    return {
      bg: 'bg-emerald-50 dark:bg-emerald-900/30',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-300 dark:border-emerald-700',
      icon: CheckCircle2
    }
  } else if (percentage >= 50) {
    return {
      bg: 'bg-amber-50 dark:bg-amber-900/30',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-300 dark:border-amber-700',
      icon: AlertTriangle
    }
  } else if (percentage >= 30) {
    return {
      bg: 'bg-orange-50 dark:bg-orange-900/30',
      text: 'text-orange-700 dark:text-orange-300',
      border: 'border-orange-300 dark:border-orange-700',
      icon: AlertCircle
    }
  } else {
    return {
      bg: 'bg-red-50 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-300 dark:border-red-700',
      icon: AlertCircle
    }
  }
}

export const StepOneData = ({ data, isPending }: Props) => {
  const getSeverityConfig = (level: SeverityLevel) => {
    switch (level) {
      case SeverityLevel.VERY_HIGH:
        return {
          color: 'bg-red-500',
          bgColor: 'bg-red-50 dark:bg-red-950/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-700 dark:text-red-300',
          badgeColor: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
          icon: AlertTriangle,
          label: 'Rất nghiêm trọng',
          description: 'Cần cấp cứu ngay lập tức'
        }
      case SeverityLevel.HIGH:
        return {
          color: 'bg-orange-500',
          bgColor: 'bg-orange-50 dark:bg-orange-950/20',
          borderColor: 'border-orange-200 dark:border-orange-800',
          textColor: 'text-orange-700 dark:text-orange-300',
          badgeColor: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
          icon: AlertTriangle,
          label: 'Nghiêm trọng',
          description: 'Cần gặp bác sĩ ngay lập tức'
        }
      case SeverityLevel.MEDIUM:
        return {
          color: 'bg-amber-500',
          bgColor: 'bg-amber-50 dark:bg-amber-950/20',
          borderColor: 'border-amber-200 dark:border-amber-800',
          textColor: 'text-amber-700 dark:text-amber-300',
          badgeColor: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
          icon: AlertCircle,
          label: 'Trung bình',
          description: 'Theo dõi và có thể cần gặp bác sĩ'
        }
      default:
        return {
          color: 'bg-emerald-500',
          bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
          borderColor: 'border-emerald-200 dark:border-emerald-800',
          textColor: 'text-emerald-700 dark:text-emerald-300',
          badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
          icon: CheckCircle2,
          label: 'Nhẹ',
          description: 'Có thể tự điều trị tại nhà'
        }
    }
  }

  return (
    <Card className="border-teal-200 dark:border-teal-800 bg-gradient-to-br from-teal-50/60 to-emerald-50/60 dark:from-teal-950/30 dark:to-emerald-950/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-teal-700 dark:text-teal-300">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            {isPending ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : (
              <Brain className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span className="text-xl font-bold">AI Pharmacity</span>
              <span className="text-lg text-gray-500 dark:text-gray-400">- Chẩn đoán</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
              Phân tích triệu chứng bằng trí tuệ nhân tạo
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {isPending ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce" />
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
              <div className="font-medium text-teal-700 dark:text-teal-300">
                <TextShimmer 
                  className="text-sm font-medium"
                  duration={2}
                  spread={3}
                >
                  Đang phân tích triệu chứng và đưa ra chẩn đoán...
                </TextShimmer>
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="w-full h-24 rounded-xl" />
              <Skeleton className="w-full h-20 rounded-xl" />
              <Skeleton className="w-3/4 h-16 rounded-xl" />
            </div>
          </div>
        ) : data && data.primaryDiagnosis ? (
          <div className="space-y-6">
            {/* Primary Diagnosis */}
            <div className="p-6 bg-white/95 dark:bg-gray-900/70 rounded-xl border-2 border-teal-200 dark:border-teal-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      Chẩn đoán chính
                    </h4>
                    {(() => {
                      const confidenceConfig = getConfidenceColor(data.primaryDiagnosis.confidencePercentage)
                      const IconComponent = confidenceConfig.icon
                      return (
                        <Badge
                          variant="outline"
                          className={`${confidenceConfig.bg} ${confidenceConfig.text} ${confidenceConfig.border} text-sm px-3 py-1.5 font-semibold shadow-sm`}
                        >
                          <IconComponent className="w-3.5 h-3.5 mr-1.5" />
                          {data.primaryDiagnosis.confidencePercentage}% tin cậy
                        </Badge>
                      )
                    })()}
                  </div>

                  <h5 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-3">
                    {data.primaryDiagnosis.diagnosisName}
                  </h5>

                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                    {data.primaryDiagnosis.description}
                  </div>

                  {data.primaryDiagnosis.reasons && data.primaryDiagnosis.reasons.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 mb-3">
                        <FileText className="w-4 h-4" />
                        Căn cứ chẩn đoán:
                      </div>
                      <div className="space-y-2">
                        {data.primaryDiagnosis.reasons.map((reason: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-2 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-lg">
                            <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {reason}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Related Symptoms */}
            {data.relatedSymptoms && data.relatedSymptoms.length > 0 && (
              <div className="p-6 bg-cyan-50/95 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-cyan-700 dark:text-cyan-300">Triệu chứng liên quan</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {data.relatedSymptoms.map((symptom, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/60 dark:bg-gray-900/30 rounded-lg border border-cyan-200/50 dark:border-cyan-800/50">
                      <ArrowRight className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {symptom}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alternative Diagnoses */}
            {data.alternativeDiagnoses && data.alternativeDiagnoses.length > 0 && (
              <div className="p-6 bg-orange-50/95 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-800 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-orange-700 dark:text-orange-300">Chẩn đoán khác có thể</h4>
                </div>
                <div className="space-y-4">
                  {data.alternativeDiagnoses.map((diagnosis, index) => (
                    <div key={index} className="p-4 bg-white/80 dark:bg-gray-900/40 rounded-xl border border-orange-200/50 dark:border-orange-800/50 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-base font-bold text-orange-700 dark:text-orange-300">
                          {diagnosis.diagnosisName}
                        </h5>
                        {(() => {
                          const confidenceConfig = getConfidenceColor(diagnosis.confidencePercentage)
                          const IconComponent = confidenceConfig.icon
                          return (
                            <Badge
                              variant="outline"
                              className={`${confidenceConfig.bg} ${confidenceConfig.text} ${confidenceConfig.border} text-xs font-semibold`}
                            >
                              <IconComponent className="w-3 h-3 mr-1" />
                              {diagnosis.confidencePercentage}%
                            </Badge>
                          )
                        })()}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 p-3 bg-orange-50/50 dark:bg-orange-900/20 rounded-lg">
                        {diagnosis.description}
                      </p>
                      {diagnosis.reasons && diagnosis.reasons.length > 0 && (
                        <div className="space-y-2">
                          {diagnosis.reasons.map((reason, reasonIndex) => (
                            <div key={reasonIndex} className="flex items-start gap-3 p-2 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg">
                              <ArrowRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{reason}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General Advice */}
            {data.generalAdvice && data.generalAdvice.length > 0 && (
              <div className="p-6 bg-blue-50/95 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-700 dark:text-blue-300">Lời khuyên chung</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.generalAdvice.map((advice, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/60 dark:bg-gray-900/30 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                      <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{advice}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Actions */}
            {data.recommendedActions && data.recommendedActions.length > 0 && (
              <div className="p-6 bg-purple-50/95 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-purple-700 dark:text-purple-300">Hành động khuyến nghị</h4>
                </div>
                <div className="space-y-3">
                  {data.recommendedActions.map((action, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/60 dark:bg-gray-900/30 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
                      <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Severity Level */}
            {data.severityLevel && (
              <div className={`p-6 rounded-xl border-2 shadow-lg ${getSeverityConfig(data.severityLevel).borderColor} ${getSeverityConfig(data.severityLevel).bgColor}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${getSeverityConfig(data.severityLevel).color}`}>
                    {(() => {
                      const IconComponent = getSeverityConfig(data.severityLevel).icon;
                      return <IconComponent className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      Mức độ nghiêm trọng
                    </h4>
                    <p className={`text-xl font-bold ${getSeverityConfig(data.severityLevel).textColor} mb-2`}>
                      {getSeverityConfig(data.severityLevel).label}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getSeverityConfig(data.severityLevel).description}
                    </p>
                  </div>
                  <Badge variant="outline" className={`${getSeverityConfig(data.severityLevel).badgeColor} font-semibold px-4 py-2 text-sm`}>
                    <Star className="w-4 h-4 mr-1.5" />
                    Mức {data.severityLevel}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        ) : data ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Không thể phân tích</h3>
            <p className="text-gray-500 dark:text-gray-400">Không thể phân tích được triệu chứng. Vui lòng thử lại với mô tả chi tiết hơn.</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
import { TextShimmer } from "@/components/custom/text-shimmer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { SeverityLevel } from "@/data/enum"
import { AiConsultationResponse } from "@/data/interfaces"
import { Activity, AlertCircle, AlertTriangle, ArrowRight, Brain, CheckCircle2, FileText, Lightbulb, Loader2, Search, Shield, Star, Target, TrendingUp } from "lucide-react"

interface Props {
  data: AiConsultationResponse | null
  isPending: boolean
}

const getConfidenceColor = (percentage: number) => {
  if (percentage >= 70) {
    return {
      bg: 'bg-green-100 dark:bg-green-900/50',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-300 dark:border-green-700',
      icon: CheckCircle2
    }
  } else if (percentage >= 40) {
    return {
      bg: 'bg-yellow-100 dark:bg-yellow-900/50',
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-yellow-300 dark:border-yellow-700',
      icon: AlertTriangle
    }
  } else {
    return {
      bg: 'bg-red-100 dark:bg-red-900/50',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-300 dark:border-red-700',
      icon: AlertCircle
    }
  }
}

export const Step1Data = ({ data, isPending }: Props) => {
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
          color: 'bg-yellow-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-700 dark:text-yellow-300',
          badgeColor: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
          icon: AlertCircle,
          label: 'Trung bình',
          description: 'Theo dõi và có thể cần gặp bác sĩ'
        }
      default:
        return {
          color: 'bg-green-500',
          bgColor: 'bg-green-50 dark:bg-green-950/20',
          borderColor: 'border-green-200 dark:border-green-800',
          textColor: 'text-green-700 dark:text-green-300',
          badgeColor: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
          icon: CheckCircle2,
          label: 'Nhẹ',
          description: 'Có thể tự điều trị tại nhà'
        }
    }
  }

  return (
    <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-green-700 dark:text-green-300">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
            {isPending ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : (
              <Brain className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-5 h-5" />
              AI Pharmacity - Chẩn đoán
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {isPending ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
              <TextShimmer className='font-default text-sm' duration={2}>
                Đang phân tích triệu chứng và chẩn đoán...
              </TextShimmer>
            </div>
            <Skeleton className="w-full h-20 rounded-lg" />
          </div>
        ) : data && data.primaryDiagnosis ? (
          <div className="space-y-6">
            {/* Primary Diagnosis */}
            <div className="p-6 bg-white/90 dark:bg-gray-900/60 rounded-xl border border-green-200 dark:border-green-800 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-foreground">Chẩn đoán chính</h4>
                    {(() => {
                      const confidenceConfig = getConfidenceColor(data.primaryDiagnosis.confidencePercentage)
                      const IconComponent = confidenceConfig.icon
                      return (
                        <Badge
                          variant="outline"
                          className={`${confidenceConfig.bg} ${confidenceConfig.text} ${confidenceConfig.border} text-sm px-3 py-1 font-semibold`}
                        >
                          <IconComponent className="w-3 h-3 mr-1" />
                          {data.primaryDiagnosis.confidencePercentage}%
                        </Badge>
                      )
                    })()}
                  </div>

                  <h5 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">
                    {data.primaryDiagnosis.diagnosisName}
                  </h5>

                  <div className="text-sm text-muted-foreground leading-relaxed mb-4">
                    <div className="flex items-center gap-2">
                      {data.primaryDiagnosis.description}
                    </div>
                  </div>

                  {data.primaryDiagnosis.reasons && data.primaryDiagnosis.reasons.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 mb-3">
                        <FileText className="w-4 h-4" />
                        Lý do chẩn đoán:
                      </div>
                      <div>
                        {data.primaryDiagnosis.reasons.map((reason: string, index: number) => (
                          <div key={index} className="mb-2">
                            <div className="flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground leading-relaxed">
                                {reason}
                              </span>
                            </div>
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
              <div className="p-6 bg-cyan-50/90 dark:bg-cyan-950/30 rounded-xl border border-cyan-200 dark:border-cyan-800 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-cyan-700 dark:text-cyan-300">Triệu chứng liên quan</h4>
                </div>
                <div className="space-y-3">
                  {data.relatedSymptoms.map((symptom, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {symptom}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alternative Diagnoses */}
            {data.alternativeDiagnoses && data.alternativeDiagnoses.length > 0 && (
              <div className="p-6 bg-orange-50/90 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-800 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-orange-700 dark:text-orange-300">Chẩn đoán thay thế</h4>
                </div>
                <div className="space-y-4">
                  {data.alternativeDiagnoses.map((diagnosis, index) => (
                    <div key={index} className="p-4 bg-white/80 dark:bg-gray-900/40 rounded-lg border border-orange-200/50 dark:border-orange-800/50 shadow-sm">
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
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {diagnosis.confidencePercentage}%
                            </Badge>
                          )
                        })()}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {diagnosis.description}
                      </p>
                      {diagnosis.reasons && diagnosis.reasons.length > 0 && (
                        <div>
                          {diagnosis.reasons.map((reason, reasonIndex) => (
                            <div key={reasonIndex} className="mb-2">
                              <div className="flex items-start gap-2">
                                <ArrowRight className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground leading-relaxed">{reason}</span>
                              </div>
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
              <div className="p-6 bg-blue-50/90 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-700 dark:text-blue-300">Lời khuyên chung</h4>
                </div>
                <div className="space-y-3">
                  {data.generalAdvice.map((advice, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{advice}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Actions */}
            {data.recommendedActions && data.recommendedActions.length > 0 && (
              <div className="p-6 bg-purple-50/90 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-purple-700 dark:text-purple-300">Hành động khuyến nghị</h4>
                </div>
                <div className="space-y-3">
                  {data.recommendedActions.map((action, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {action}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Severity Level */}
            {data.severityLevel && (
              <div className={`p-6 rounded-xl border shadow-md ${getSeverityConfig(data.severityLevel).borderColor} ${getSeverityConfig(data.severityLevel).bgColor}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${getSeverityConfig(data.severityLevel).color}`}>
                    {(() => {
                      const IconComponent = getSeverityConfig(data.severityLevel).icon;
                      return <IconComponent className="w-7 h-7 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-1">Mức độ nghiêm trọng</h4>
                    <p className={`text-base font-bold ${getSeverityConfig(data.severityLevel).textColor} mb-1`}>
                      {getSeverityConfig(data.severityLevel).label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getSeverityConfig(data.severityLevel).description}
                    </p>
                  </div>
                  <Badge variant="outline" className={`${getSeverityConfig(data.severityLevel).badgeColor} font-semibold px-4 py-2`}>
                    <Star className="w-4 h-4 mr-1" />
                    Mức {data.severityLevel}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        ) : data ? (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Không thể phân tích được triệu chứng. Vui lòng thử lại.</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
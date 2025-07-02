import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeverityLevel } from "@/data/enums";
import { AiMedicineSuggestionResponse } from "@/data/interfaces";
import { AlertTriangle, CheckCircle, Stethoscope, TrendingUp } from "lucide-react";

export const StepTwoDiagnosisSummary = ({ data }: { data: AiMedicineSuggestionResponse }) => {
  const getSeverityConfig = (level: SeverityLevel) => {
    switch (level) {
      case SeverityLevel.HIGH:
        return { color: 'bg-red-500', text: 'text-red-600', border: 'border-red-600', label: 'Nghiêm trọng' };
      case SeverityLevel.MEDIUM:
        return { color: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-600', label: 'Trung bình' };
      default:
        return { color: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-600', label: 'Nhẹ' };
    }
  };

  const config = getSeverityConfig(data.consultationInfo.severityLevel);

  return (
    <Card className="border-2 border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50/80 to-emerald-50/80 dark:from-teal-950/30 dark:to-emerald-950/20 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-teal-700 dark:text-teal-300">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg font-bold">
                {data.consultationInfo.primaryDiagnosis.name}
              </span>
              <Badge className="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                {data.consultationInfo.primaryDiagnosis.confidence}%
              </Badge>
            </div>
            <p className="text-sm text-teal-600 dark:text-teal-400">
              Chẩn đoán từ AI Pharmacity
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-white/80 dark:bg-gray-900/60 rounded-lg border border-teal-200 dark:border-teal-800">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {data.consultationInfo.primaryDiagnosis.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.color}`}>
            {data.consultationInfo.severityLevel === SeverityLevel.LOW ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-white" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Mức độ:</span>
            <Badge variant="outline" className={`${config.text} ${config.border} font-semibold`}>
              {config.label}
            </Badge>
          </div>
        </div>

        {data.consultationInfo.severityLevel === SeverityLevel.HIGH && (
          <Alert className="border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 dark:text-red-300 font-medium">
              <strong>Khuyến nghị:</strong> Gặp bác sĩ chuyên khoa ngay lập tức
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
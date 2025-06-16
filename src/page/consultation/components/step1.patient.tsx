import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PatientGender } from "@/data/enum"
import { useStep1 } from "@/hooks/use-step-form"
import { User } from "lucide-react"

export const Step1PatientInformation = () => {
  const { patientAge, setPatientAge, patientGender, setPatientGender } = useStep1()

  return (
    <Card className="border-blue-100 dark:border-blue-900/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-blue-700 dark:text-blue-300 font-semibold">
            Thông tin bệnh nhân
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">
              Tuổi
            </label>
            <Input
              type="number"
              placeholder="Nhập tuổi"
              value={patientAge || ''}
              onChange={(e) => setPatientAge(parseInt(e.target.value) || 0)}
              min="1"
              max="120"
              className="h-10 border border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-400/30 transition-colors rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">
              Giới tính
            </label>
            <Select value={patientGender} onValueChange={(value: PatientGender) => setPatientGender(value)}>
              <SelectTrigger className="h-10 border border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-400/30 transition-colors rounded-lg">
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
  )
}
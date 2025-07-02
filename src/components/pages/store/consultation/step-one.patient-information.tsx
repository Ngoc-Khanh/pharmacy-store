import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientGender } from "@/data/enums";
import { useStep1 } from "@/hooks/use-step-consultation";
import { Calendar, User, Users, UserCheck } from "lucide-react";

export function StepOnePatientInformation() {
  const { patientAge, setPatientAge, patientGender, setPatientGender } = useStep1()

  return (
    <Card className="border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50/70 to-emerald-50/70 dark:from-teal-950/40 dark:to-emerald-950/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-teal-700 dark:text-teal-300 font-semibold">
              Thông tin bệnh nhân
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
              Vui lòng cung cấp thông tin cơ bản
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tuổi */}
          <div className="space-y-2">
            <Label htmlFor="patient-age" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Tuổi
            </Label>
            <Input
              id="patient-age"
              type="number"
              placeholder="Nhập tuổi"
              value={patientAge || ''}
              onChange={(e) => setPatientAge(parseInt(e.target.value) || 0)}
              min="1"
              max="120"
              className="h-12 border-2 border-teal-200 dark:border-teal-700 focus:border-teal-400 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 rounded-xl text-base"
            />
          </div>

          {/* Giới tính */}
          <div className="space-y-2">
            <Label htmlFor="patient-gender" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Giới tính
            </Label>
            <Select value={patientGender} onValueChange={(value: PatientGender) => setPatientGender(value)}>
              <SelectTrigger 
                id="patient-gender"
                className="h-12 border-2 border-teal-200 dark:border-teal-700 focus:border-teal-400 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 rounded-xl text-base"
              >
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-teal-200 dark:border-teal-700">
                <SelectItem value={PatientGender.MALE} className="text-base py-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Nam</span>
                  </div>
                </SelectItem>
                <SelectItem value={PatientGender.FEMALE} className="text-base py-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-4 h-4 text-pink-600" />
                    <span>Nữ</span>
                  </div>
                </SelectItem>
                <SelectItem value={PatientGender.OTHER} className="text-base py-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span>Khác</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
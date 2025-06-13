import { PatientGender, SeverityLevel } from "../enum";

export interface Step1FormData {
  symptoms: string;
  patientAge: number;
  patientGender: PatientGender;
  aiResponse?: AiConsultationResponse;
}

export interface AiConsultationResponse {
  primaryDiagnosis: PrimaryDiagnosis;
  alternativeDiagnoses: PrimaryDiagnosis[];
  generalAdvice: string[];
  severityLevel: SeverityLevel;
  relatedSymptoms: string[];
  recommendedActions: string[];
}

export interface PrimaryDiagnosis {
  diagnosisName: string;
  confidencePercentage: number;
  description: string;
  reasons: string[];
}
import { PatientGender, SeverityLevel } from "../enum";
import { Medicine } from "./medicine.interface";

export interface Step1FormData {
  symptoms: string;
  patientAge: number;
  patientGender: PatientGender;
  aiResponse?: AiConsultationResponse;
}

export interface PrimaryDiagnosis {
  diagnosisName: string;
  confidencePercentage: number;
  description: string;
  reasons: string[];
}

export interface AiConsultationResponse {
  consultationId: string;
  primaryDiagnosis: PrimaryDiagnosis;
  alternativeDiagnoses: PrimaryDiagnosis[];
  generalAdvice: string[];
  severityLevel: SeverityLevel;
  relatedSymptoms: string[];
  recommendedActions: string[];
}

export interface ConsultationInfo {
  primaryDiagnosis: {
    name: string;
    confidence: number;
    description: string;
  };
  symptoms: string;
  severityLevel: SeverityLevel;
}

export interface AiMedicineSuggestionResponse {
  consultationId: string;
  consultationInfo: ConsultationInfo;
  recommendedMedicines: Medicine[];
  totalFound: number;
  searchQuery: string;
}

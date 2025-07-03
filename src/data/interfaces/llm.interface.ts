import { PatientGender, SeverityLevel } from "@/data/enums";
import { MedicineResponse, Thumbnail, Variant } from "@/data/interfaces";

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
  recommendedMedicines: MedicineResponse[];
  totalFound: number;
  searchQuery: string;
}

export interface AiMedicineSimilarityResponse {
  originalMedicine: OriginalMedicine;
  similarMedicines: SimilarMedicine[];
  totalFound: number;
  searchStrategy: string;
  queryUsed: string;
}

export interface OriginalMedicine {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  variants: Variant;
}

export interface SimilarMedicine extends MedicineResponse {
  similarityScore: number;
  similarityRanking: number;
}
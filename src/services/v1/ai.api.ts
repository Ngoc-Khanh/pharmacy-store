import { AiConsultationDto } from "@/data/dto";
import { AiConsultationResponse, AiMedicineSuggestionResponse } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { aiApiGet, aiApiPost } from "@/services/api";

export const AIApi = {
  async AiConsultation(dto: AiConsultationDto) {
    const res = await aiApiPost<AiConsultationDto, SRO<AiConsultationResponse>>("v1/consultation/diagnose", dto)
    return res.data.data;
  },

  async AiMedicineSuggestion(consultationId: string) {
    const res = await aiApiGet<SRO<AiMedicineSuggestionResponse>>(`v1/consultation/recommend-medicines/${consultationId}`)
    return res.data.data;
  },
}
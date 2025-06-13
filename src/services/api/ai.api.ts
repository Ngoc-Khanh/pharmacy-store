import { AiConsultationDto } from "@/data/dto"
import { AiConsultationResponse } from "@/data/interfaces"
import { SRO } from "@/data/sro"
import { aiApiPost } from "../api"

export const AiAPI = {
  async AiConsultation(dto: AiConsultationDto) {
    const res = await aiApiPost<AiConsultationDto, SRO<AiConsultationResponse>>("v1/consultation/diagnose", dto)
    return res.data.data;
  }
}
import { DashboardStats } from "@/data/interfaces"
import { SRO } from "@/data/sro"
import { apiGet } from "../api"

export const DashboardAPI = {
  async DashboardStats() {
    const res = await apiGet<SRO<DashboardStats>>("v1/admin/statistics/dashboard")
    return res.data.data
  }
}
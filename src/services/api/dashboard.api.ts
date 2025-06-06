import { DashboardChartData, DashboardChartOrdersStatus, DashboardStats } from "@/data/interfaces"
import { SRO } from "@/data/sro"
import { apiGet } from "../api"

export const DashboardAPI = {
  async DashboardStats() {
    const res = await apiGet<SRO<DashboardStats>>("v1/admin/statistics/overview")
    return res.data.data
  },

  async DashboardChartWithSelectYear(year: number) {
    const res = await apiGet<SRO<DashboardChartData[]>>(`v1/admin/statistics/monthly-revenue?y=${year}`)
    return res.data.data
  },

  async DashboardChartOrdersStatus() {
    const res = await apiGet<SRO<DashboardChartOrdersStatus[]>>("v1/admin/statistics/order-status")
    return res.data.data
  }
}
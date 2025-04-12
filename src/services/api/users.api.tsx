import { Users } from "@/data/zod-schemas";
import { apiGet } from "@/services/api";
import { SROList } from "@/data/sro";

export const UsersAPI = {
  async getAllUsers() {
    const res = await apiGet<SROList<Users>>("v2/users/admin/users-list")
    return res.data.data
  }
}
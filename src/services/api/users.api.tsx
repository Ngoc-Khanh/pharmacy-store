import { apiDelete, apiGet, apiPost } from "@/services/api";
import { Users } from "@/data/zod-schemas";
import { SRO, SROList } from "@/data/sro";
import { AddUserDto } from "@/data/dto";

export const UsersAPI = {
  async getAllUsers() {
    const res = await apiGet<SROList<Users>>("v2/users/admin/users-list")
    return res.data.data
  },

  async addNewUsers(data: AddUserDto) {
    const res = await apiPost<AddUserDto, SRO<Users>>("v2/users/admin/add-users", data)
    return res.data.data
  },

  async deleteUser(id: string) {
    const res = await apiDelete<SRO<Users>>(`v2/users/admin/delete-users/${id}`)
    return res.data.data
  }
}
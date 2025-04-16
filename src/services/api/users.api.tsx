import { apiDelete, apiGet, apiPatch, apiPost } from "@/services/api";
import { Users } from "@/data/zod-schemas";
import { SRO, SROList } from "@/data/sro";
import { AddUserDto } from "@/data/dto";
import { ChangeStatusUserDto } from "@/data/dto/users.dto";

export const UsersAPI = {
  async getAllUsers() {
    const res = await apiGet<SROList<Users>>("v2/users/admin/users-list")
    return res.data.data
  },

  async addNewUsers(data: AddUserDto) {
    const res = await apiPost<AddUserDto, SRO<Users>>("v2/users/admin/add-users", data)
    return res.data.data
  },

  async updateUsers(id: string, data: AddUserDto) {
    const res = await apiPatch<AddUserDto, SRO<Users>>(`v2/users/admin/update-user/${id}`, data)
    return res.data.data
  },

  async deleteUser(id: string) {
    const res = await apiDelete<SRO<Users>>(`v2/users/admin/delete-users/${id}`)
    return res.data.data
  },

  async changeStatusUser(id: string, data: ChangeStatusUserDto) {
    const res = await apiPost<ChangeStatusUserDto, SRO<Users>>(`v2/users/admin/change-user-status/${id}`, data)
    return res.data.data
  },
}
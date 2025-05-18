import { AddUserDto } from "@/data/dto";
import { User } from "@/data/interfaces";
import { Paginated, SRO } from "@/data/sro";
import { apiGet, apiPatch, apiPost } from "../api";

export const UsersAPI = {
  async UsersList() {
    const res = await apiGet<SRO<Paginated<User>>>("/v1/admin/users");
    return res.data.data;
  },

  async UserAdd(data: AddUserDto) {
    const res = await apiPost<AddUserDto ,SRO<User>>("/v1/admin/users/add", data);
    return res.data.data;
  },
  
  async UserUpdate(id: string, data: AddUserDto) {
    const res = await apiPatch<AddUserDto ,SRO<User>>(`/v1/admin/users/update/${id}`, data);
    return res.data.data;
  },
};

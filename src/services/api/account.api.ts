import { UpdateProfileDto } from "@/data/dto";
import { User } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiPatch } from "../api";

export const AccountAPI = {
  async updateProfile(data: UpdateProfileDto) {
    const res = await apiPatch<UpdateProfileDto, SRO<User>>("v1/store/account/profile/update", data);
    return res.data.data;
  }
}
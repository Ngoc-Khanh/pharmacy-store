import { apiDelete, apiGet, apiPatch, apiPost } from "@/services/api";
import { AddAddressDto, EditProfileDto } from "@/data/dto";
import { User, UserAddress } from "@/data/interfaces";
import { SRO } from "@/data/sro";

export const AccountAPI = {
  async editProfile(data: EditProfileDto) {
    const res = await apiPatch<EditProfileDto, SRO<User>>("v2/users/update-profile", data);
    return res.data.data;
  },

  async getAddresses() {
    const res = await apiGet<SRO<UserAddress[]>>("v2/users/addresses");
    return res.data.data;
  },

  async addAddress(data: AddAddressDto) {
    const res = await apiPost<AddAddressDto, SRO<UserAddress>>("v2/users/add-addresses", data);
    return res.data.data;
  },

  async editAddress(id: string, data: AddAddressDto) {
    const res = await apiPatch<AddAddressDto, SRO<UserAddress>>(`v2/users/update-address/${id}`, data);
    return res.data.data;
  },

  async deleteAddress(id: string) {
    const res = await apiDelete<SRO<UserAddress>>(`v2/users/delete-address/${id}`);
    return res.data.data;
  },

  async setDefaultAddress(id: string) {
    const res = await apiPost<null, SRO<UserAddress>>(`v2/users/set-default-address/${id}`, null);
    return res.data.data;
  },
};
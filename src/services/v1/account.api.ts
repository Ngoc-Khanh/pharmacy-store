import { AddAddressDto, CartItemDto, ChangePasswordDto, UpdateProfileDto } from "@/data/dto";
import { CartResponse, UserAddress, UserResponse } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/services/api";

export const AccountAPI = {
  async updateProfile(data: UpdateProfileDto) {
    const res = await apiPatch<UpdateProfileDto, SRO<UserResponse>>("v1/store/account/profile/update", data);
    return res.data.data;
  },
  
  async getAddresses() {
    const res = await apiGet<SRO<UserAddress[]>>("v1/store/account/addresses");
    return res.data.data;
  },

  async addAddress(data: AddAddressDto) {
    const res = await apiPost<AddAddressDto, SRO<UserAddress>>("v1/store/account/addresses/add", data);
    return res.data.data;
  },

  async editAddress(id: string, data: AddAddressDto) {
    const res = await apiPatch<AddAddressDto, SRO<UserAddress>>(`v1/store/account/addresses/update/${id}`, data);
    return res.data.data;
  },

  async deleteAddress(id: string) {
    const res = await apiDelete<SRO<UserAddress>>(`v1/store/account/addresses/delete/${id}`);
    return res.data.data;
  },

  async setDefaultAddress(id: string) {
    const res = await apiPost<null, SRO<UserAddress>>(`v1/store/account/addresses/set-default-address/${id}`, null);
    return res.data.data;
  },

  async changePassword(data: ChangePasswordDto) {
    const res = await apiPatch<ChangePasswordDto, SRO<UserResponse>>("v1/store/account/profile/change-password", data);
    return res.data.data;
  },

  async CartList() {
    const res = await apiGet<SRO<CartResponse>>("v1/store/account/carts");
    return res.data.data;
  },

  async AddToCart(data: CartItemDto) {
    const res = await apiPost<CartItemDto, SRO<CartResponse>>("v1/store/account/carts/add", data);
    return res.data.data;
  },

  async RemoveFromCart(id: string) {
    const res = await apiDelete<SRO<CartResponse>>(`v1/store/account/carts/remove/${id}`);
    return res.data.data;
  }
}
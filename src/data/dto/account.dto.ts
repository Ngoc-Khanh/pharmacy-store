export type AddAddressDto = {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state?: string | null;
  country: string;
  postalCode: string;
  isDefault: boolean;
};

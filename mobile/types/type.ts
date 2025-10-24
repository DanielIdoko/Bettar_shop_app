export interface TabBarIconProps {
  focused: boolean;
  Icon: any;
  title: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  street: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  addresses: [Address];
  preferences: {
    theme: "light" | "dark";
    language: string;
  };
  wishlist: [];
  isAdmin: boolean
}

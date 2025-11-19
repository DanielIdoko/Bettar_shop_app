export type CustomButtonProps = {
  onPress?: () => void;
  title?: string;
  style: Object;
  textStyle?: Object;
  rightIcon?: any;
  isLoading?: boolean;
};

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
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  country: string;
  addresses: [Address] | [];
  preferences: {
    theme: "light" | "dark";
    language: { type: string; default: "en" };
  };
  wishlist: [];
  isAdmin: boolean;
  twoFactorEnabled?: boolean;
  isEmailVerified?: boolean;  
}

export interface ProductMetadata {
  screenSize: string;
  resolution: string;
  ports: number;
  smartFeatures: boolean;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  discount: number;
  stock: number;
  sku: string;
  category: string; // or a Category type if you model it separately
  brand: string;
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  ratingsAverage: number;
  ratingsCount: number;
  createdBy: string;
  metadata: ProductMetadata;
  createdAt?: string;
  updatedAt?: string;
}

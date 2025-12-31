
export enum Category {
  MEN = 'Men',
  WOMEN = 'Women',
  NEW_ARRIVALS = 'New Arrivals',
  BEST_SELLERS = 'Best Sellers'
}

export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  DELIVERED = 'Delivered',
  CANCELED = 'Canceled'
}

export enum UserRole {
  USER = 'User',
  ADMIN = 'Admin'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  address?: string;
  phone?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  address: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

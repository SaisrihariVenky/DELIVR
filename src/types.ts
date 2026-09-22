export type ScreenType =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'search'
  | 'restaurant_list'
  | 'restaurant_detail'
  | 'food_detail'
  | 'cart'
  | 'checkout'
  | 'tracking'
  | 'orders'
  | 'profile'
  | 'edit_profile';

export interface CartItem {
  id: string;
  dishId: string;
  restaurantId: string;
  name: string;
  price: number;
  quantity: number;
  size: 'regular' | 'family';
  spiceLevel: 'mild' | 'medium' | 'spicy';
  addons: string[];
  imageUrl: string;
  customizationText?: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  ratingCount: number;
  isVeg: boolean;
  category: string;
  isBestseller?: boolean;
  isMustTry?: boolean;
  imageUrl: string;
  prepTime: string;
  ingredients: string[];
  spiceLevel?: 'mild' | 'medium' | 'hot';
}

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  ratingCount: string;
  deliveryTime: string;
  distance: string;
  costForTwo: number;
  offerText: string;
  imageUrl: string;
  isFavorite?: boolean;
  isFreeDelivery?: boolean;
  address: string;
  lat: number;
  lng: number;
  menu: MenuItem[];
}

export type OrderStatus =
  | 'confirmed'
  | 'preparing'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface OrderProgressStep {
  id: OrderStatus;
  label: string;
  subtitle: string;
  time: string;
  completed: boolean;
  current: boolean;
}

export interface DeliveryDriver {
  id: string;
  name: string;
  vehicle: string;
  phone: string;
  photoUrl: string;
  rating: number;
  deliveryCount: number;
  currentLocation: {
    lat: number;
    lng: number;
    heading: number;
    speed: number;
    addressDescription: string;
  };
}

export interface ChatMessage {
  id: string;
  orderId: string;
  sender: 'user' | 'driver' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ActiveOrder {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantImage: string;
  placedAt: string;
  estimatedDeliveryTime: string;
  remainingMinutes: number;
  status: OrderStatus;
  items: CartItem[];
  itemTotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  taxes: number;
  totalToPay: number;
  deliveryAddress: string;
  deliveryInstructions?: string;
  paymentMethod: string;
  driver: DeliveryDriver;
  progressSteps: OrderProgressStep[];
  chatMessages: ChatMessage[];
  routeCoordinates: [number, number][]; // [x, y] percentage on map 0-100
  driverProgressPercent: number; // 0 to 100% along route
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  isGoldVip: boolean;
  tier?: string;
  totalDeliveredOrders: number;
  totalSavedAmount: number;
  favoritesCount: number;
  couponsCount: number;
  addresses: {
    id: string;
    tag: string;
    isDefault: boolean;
    fullAddress: string;
  }[];
}

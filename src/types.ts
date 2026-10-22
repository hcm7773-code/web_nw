export type AppPage = 'brand' | 'menu' | 'experience';

export type BrandBlockId = 'brand-hero' | 'brand-heritage' | 'brand-space';
export type MenuBlockId = 'menu-broths' | 'menu-meats' | 'menu-drinks';
export type ExpBlockId = 'exp-booking' | 'exp-takeout' | 'exp-locations';

export type BlockId = BrandBlockId | MenuBlockId | ExpBlockId;

export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'boiled-fish' | 'broth' | 'meat' | 'seafood' | 'tapas' | 'drink';
  price: number;
  description: string;
  spiciness: number; // 0 to 4
  numbing: number;   // 0 to 4
  tags: string[];
  pairingAdvice?: string;
  image?: string;
  isSignature?: boolean;
}

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  spiciness: string;
  numbing: string;
  notes?: string;
}

export interface ReservationState {
  date: string;
  timeSlot: string;
  guests: number;
  seatingType: 'hall' | 'window' | 'vip';
  name: string;
  phone: string;
  email: string;
  spiceTolerance: string;
  specialRequests: string;
  preSelectedPot: string;
  confirmed?: boolean;
  bookingCode?: string;
}

export interface ChefPairingRecommendation {
  mainDishId: string;
  title: string;
  slogan: string;
  culinaryPrinciple: string;
  recommendedSides: {
    dishId: string;
    pairingRole: string;
    whyItPairs: string;
  }[];
  recommendedBeverages: {
    dishId: string;
    pairingRole: string;
    whyItPairs: string;
  }[];
}


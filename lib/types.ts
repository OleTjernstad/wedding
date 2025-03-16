export interface Gift {
  id: string;
  name: string;
  description: string;
  quantity: number;
  reservedQuantity: number;
  categoryId: string;
  link: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Reservation {
  id: string;
  giftId: string;
  quantity: number;
  guestName: string;
  guestEmail: string;
  date: string;
  gift?: Gift;
}

export interface GiftWithCategory extends Gift {
  category: Category;
}

export interface GiftStats {
  totalGifts: number;
  availableGifts: number;
  fullyReservedGifts: number;
  partiallyReservedGifts: number;
  categoryData: {
    name: string;
    available: number;
    reserved: number;
  }[];
}

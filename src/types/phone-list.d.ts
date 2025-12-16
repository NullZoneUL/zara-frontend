declare type PhoneList = PhoneListItem[];

declare interface PhoneListItem {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

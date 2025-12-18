declare type CartList = CartItem[];

declare interface CartItem {
  id: string;
  selectedColor: string;
  selectedStorage: string;
}

declare interface ParsedCartItemInterface {
  id: string;
  image: string;
  name: string;
  storage: string;
  color: string;
  price: number;
}

declare interface PhoneItem {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: Specs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: PhoneList;
}

declare interface Specs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

declare interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

declare interface StorageOption {
  capacity: string;
  price: number;
}

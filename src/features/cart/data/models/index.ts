export interface CartItem {
  id: string;
  brand: string;
  tagLine: string;
  imageUrl?: string;
  price: number;
  quantity: number;
  volume?: string;
  type: string;
}

export interface ApiCartItem {
  id: string;
  brand: string;
  tag_line: string;
  image_url?: string;
  price: number;
  quantity_in_cart: number;
  product_volume?: string;
  product_type: string;
}

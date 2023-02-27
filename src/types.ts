export interface CategoryType {
  id: number;
  name: string;
}
export interface ProductType {
  id: number;
  name: string;
  code: string;
  category: string;
  price: number;
  img: string;
}
export interface CartProductDetails {
  product: ProductType;
  quantity: number;
}

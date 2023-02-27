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
    img:string;
  }
  export interface CartProduct {
    productId:number;
   quantity:number;
  }
  export interface CartProductDetails {
    product:ProductType|undefined;
   quantity:number;
  }
  export interface CartType {
    id: number;
    time: string;
    products: CartProduct[];
    tax: number;
    closed: boolean;
    total:number;
  }
// Define the expected category structure
export interface Category {
  catId: number;
  categoryslug: string;
  istakeoutavailable?: boolean;
  isdeliveryavailable?: boolean;
  [key: string]: any;
}
// types/menu.ts

export interface MenuItemType {
  catId: number;
  itemId: number;
  itemName: string;
  [key: string]: any; // expand as per actual structure
}

export interface CategoryType {
  catId: number;
  categoryslug: string;
  istakeoutavailable?: boolean;
  isdeliveryavailable?: boolean;
  [key: string]: any;
}

export interface MenuItemSearchResponse {
  categories: CategoryType[];
  menuItems: MenuItemType[];
  [key: string]: any;
}

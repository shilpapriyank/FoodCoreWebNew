// types/menu.ts

export interface MenuItemType {
  catId: number;
  itemId: number;
  itemName: string;
  [key: string]: string | number | boolean | undefined | null;
}

export interface CategoryType {
  catId: number;
  categoryslug: string;
  istakeoutavailable?: boolean;
  isdeliveryavailable?: boolean;
  [key: string]: string | number | boolean | undefined;

}

export interface MenuItemSearchResponse {
  categories: CategoryType[];
  menuItems: MenuItemType[];
  [key: string]: any;

}

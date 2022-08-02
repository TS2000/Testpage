export interface ShoppingItem {
  id: string;
  name: string;
  picked: boolean;
}

export type ShoppingItemDraft = Omit<ShoppingItem, "id">;

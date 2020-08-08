import React from "react";
export interface Item {
  id: number;
  content: string;
  addedAt: Date;
}
export interface TodoState {
  list: Item[];
  draggedId: number;
}
export interface TodoFormState {
  content: string;
}
export interface TodoFormProp {
  onSubmit(content: string);
}

export interface TodoItemProp {
  item: Item;
  onDelete?: (id: number) => void;
  onDrag?: (id: number) => void;
  type?: ItemType;
  itemRef?: any;
}
export const ItemTypes = {
  float: "float",
  fake: "fake",
  normal: "normal",
} as const;
export type ItemType = typeof ItemTypes[keyof typeof ItemTypes];

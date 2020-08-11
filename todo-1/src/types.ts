import React from "react";
export interface Item {
  id: number;
  content: string;
  addedAt: Date;
}
export interface Point {
  x: number;
  y: number;
}
export interface TodoState {
  list: Item[];
  floatItemId: number;
  fakeItemIdx: number;
  now: Date;
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
  onDrag?: (id: number, offset: Point) => void;
  type?: ItemType;
  itemRef?: any;
}
export const ItemTypes = {
  float: "float",
  fake: "fake",
  normal: "normal",
} as const;
export type ItemType = typeof ItemTypes[keyof typeof ItemTypes];

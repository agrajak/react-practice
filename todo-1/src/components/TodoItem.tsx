import React from "react";
import { Item } from "../types";
interface TodoItemProp {
  item: Item;
}
export class TodoItem extends React.Component<TodoItemProp> {
  render() {
    const { item } = this.props;
    return (
      <div>
        {item.id} {item.contents}
      </div>
    );
  }
}

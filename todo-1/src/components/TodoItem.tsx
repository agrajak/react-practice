import React from "react";
import { Item } from "../types";
interface TodoItemProp {
  item: Item;
}
export class TodoItem extends React.Component<TodoItemProp> {
  render() {
    const { item } = this.props;
    return (
      <div className="todo-item">
        {item.id} {item.content}
      </div>
    );
  }
}

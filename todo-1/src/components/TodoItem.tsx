import React from "react";
import { Item } from "../types";
interface TodoItemProp {
  item: Item;
}
function getPrettyDate(date: Date) {
  const now = +new Date();
  const timeDiff = (now - +date) / 1000;
  if (timeDiff < 60) {
    return "방금 전";
  }
  if (timeDiff < 3600) {
    return Math.floor(timeDiff / 60) + "분 전";
  }
  return "오래 전";
}
export class TodoItem extends React.Component<TodoItemProp> {
  render() {
    const { item } = this.props;
    const { content, addedAt } = item;
    return (
      <div className="todo-item">
        <div>{item.content}</div>
        <div className="item-added-at">{getPrettyDate(addedAt)}</div>
      </div>
    );
  }
}

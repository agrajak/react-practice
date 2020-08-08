import React from "react";
import { Item } from "../types";
interface TodoItemProp {
  item: Item;
  onDelete?: (id: number) => void;
  onDrag?: (id: number) => void;
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
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }
  handleDelete() {
    if (!this.props.onDelete) return;
    this.props.onDelete(this.props.item.id);
  }
  handleDrag(event) {
    if (!this.props.onDrag) return;
    if (event.target.closest("button")) return;
    this.props.onDrag(this.props.item.id);
  }
  render() {
    const { item } = this.props;
    return (
      <div onMouseDown={this.handleDrag} className="todo-item">
        <div>{item.content}</div>
        <div className="item-added-at">{getPrettyDate(item.addedAt)}</div>
        <button onClick={this.handleDelete}>X</button>
      </div>
    );
  }
}

import React from "react";
import { TodoItemProp, Item, ItemType, ItemTypes } from "../types";

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

export class _TodoItem extends React.Component<TodoItemProp> {
  static defaultProps = {
    type: ItemTypes.normal,
  };
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }
  handleDelete() {
    if (!this.props.onDelete) return;
    this.props.onDelete(this.props.item.id);
  }
  handleDrag(event: React.MouseEvent) {
    if (!this.props.onDrag) return;
    if (!(event.target instanceof HTMLDivElement)) return;
    if (event.target.closest("button")) return;
    const $itemBox = event.target.closest(".todo-item") as HTMLDivElement;
    const { left, top } = $itemBox.getBoundingClientRect();

    this.props.onDrag(
      this.props.item.id,
      event.clientX - left,
      event.clientY - top
    );
  }
  getClassName() {
    const { type } = this.props;
    const baseName = "todo-item ";
    if (type === ItemTypes.fake) return baseName + "fake";
    if (type === ItemTypes.float) return baseName + "float hidden";
    return baseName;
  }
  render() {
    const { item, type, itemRef } = this.props;
    return (
      <div
        ref={itemRef}
        onMouseDown={this.handleDrag}
        item-id={item.id}
        className={this.getClassName()}
      >
        <div>{item.content}</div>
        <div className="item-added-at">{getPrettyDate(item.addedAt)}</div>
        <button onClick={this.handleDelete}>X</button>
      </div>
    );
  }
}
export const TodoItem = React.forwardRef((props: TodoItemProp, ref) => (
  <_TodoItem {...props} itemRef={ref}></_TodoItem>
));

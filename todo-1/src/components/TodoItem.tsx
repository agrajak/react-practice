import React from "react";
import { TodoItemProp, ItemTypes } from "../types";

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
function getClassName(type) {
  const baseName = "todo-item ";
  if (type === ItemTypes.fake) return baseName + "fake";
  if (type === ItemTypes.float) return baseName + "float hidden";
  return baseName + "normal";
}
function getItemClientRect(event: React.MouseEvent) {
  const { target, clientX, clientY } = event;
  if (!(target instanceof HTMLDivElement)) return;
  if (target.closest("button")) return;
  const $itemBox = target.closest(".todo-item") as HTMLDivElement;
  const { left, top } = $itemBox.getBoundingClientRect();
  return {
    x: clientX - left,
    y: clientY - top,
  };
}
const handleMouseDown = ({ onDrag = undefined, item }) => (event) => {
  if (!onDrag) return;
  const { x, y } = getItemClientRect(event);
  onDrag(item.id, x, y);
};
const handleDelete = ({ onDelete = undefined, item }) => () => {
  if (!onDelete) return;
  onDelete(item.id);
};
const _TodoItem: React.FC<TodoItemProp> = (props) => {
  const { type = ItemTypes.normal, item, itemRef } = props;
  return (
    <div
      ref={itemRef}
      onMouseDown={handleMouseDown(props)}
      className={getClassName(type)}
    >
      <div>{item.content}</div>
      <div className="item-added-at">{getPrettyDate(item.addedAt)}</div>
      <button onClick={handleDelete(props)}>X</button>
    </div>
  );
};

export const TodoItem = React.forwardRef((props: TodoItemProp, ref) => (
  <_TodoItem {...props} itemRef={ref}></_TodoItem>
));

import React from "react";
import { TodoItemProp, ItemTypes } from "../types";
import styled from "styled-components";
import { Theme } from "../../style";

const Container = styled.div<Partial<TodoItemProp>>`
  position: relative;
  width: 300px;
  border: 1px solid grey;
  border-radius: ${Theme.borderRadius};
  padding: 10px;
  margin-bottom: ${Theme.itemGap};
  box-sizing: content-box;
  background-color: white;
  ${(props) =>
    props.type === ItemTypes.float &&
    `
    position: absolute;
    z-index: 2;
    opacity: 0.9;
    box-shadow: 2px 2px 2px lightblue;
  }`}
`;

const CloseButton = styled.button`
  font-size: 0.8rem;
  position: absolute;
  right: ${Theme.itemGap};
  top: ${Theme.itemGap};
  background-color: transparent;
  border: none;
`;

const ItemAddedAt = styled.div`
  margin-top: ${Theme.itemGap};
  font-size: 0.8rem;
`;

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
  if (type === ItemTypes.float) return baseName + "hidden";
  return baseName + "normal";
}
/**
 * 아이템의 어느 부분을 클릭했을 때, 아이템 상단 좌측 기준으로 상대적인 클릭 좌표를 반환한다. (끄트머리 잡고 드래그하면 끄트머리가 끌리게 하기 위함)
 * @param event
 */
function getItemClickOffset(event: React.MouseEvent) {
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
const handleMouseDown = ({ onDrag, item }: TodoItemProp) => (
  event: React.MouseEvent
) => {
  const { target } = event;
  if (!onDrag) return;
  if (!(target instanceof HTMLElement)) return;
  if (target.closest("button")) return;
  onDrag(item.id, getItemClickOffset(event));
};
const handleDelete = ({ onDelete, item }: TodoItemProp) => () => {
  if (!onDelete) return;
  onDelete(item.id);
};
const _TodoItem: React.FC<TodoItemProp> = (props) => {
  const { type = ItemTypes.normal, item, itemRef } = props;
  return (
    <Container
      ref={itemRef}
      onMouseDown={handleMouseDown(props)}
      className={getClassName(type)}
    >
      <div>{item.content}</div>
      <ItemAddedAt>{getPrettyDate(item.addedAt)}</ItemAddedAt>
      <CloseButton onClick={handleDelete(props)}>X</CloseButton>
    </Container>
  );
};

export const TodoItem = React.forwardRef((props: TodoItemProp, ref) => (
  <_TodoItem {...props} itemRef={ref}></_TodoItem>
));

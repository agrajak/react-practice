import React, { RefObject } from "react";
import { TodoForm } from "./TodoForm";
import { Item, ItemTypes, TodoState } from "../types";
import { mockupData } from "../mockup";
import { TodoItem } from "./TodoItem";
import { RefManager } from "../RefManager";
/**
 * Float Item: 둥둥 떠있는 Item
 * Fake Item: 드래그 앤 드랍시 어느 위치에 놓일 예정인지 시각화해주는 Item
 */
class TodoList extends React.Component<{}, TodoState> {
  dragOffset: { x: number; y: number } = null;
  ref: RefManager = new RefManager();
  floatRef: RefObject<HTMLDivElement> = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      draggedId: null,
      fakeItemIdx: null,
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.dragItem = this.dragItem.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  componentDidMount() {
    mockupData.forEach(({ content, addedAt }) => {
      this.addItem(content, addedAt);
    });
  }
  addItem(content: string, date?: Date) {
    this.setState((prevState) => {
      const { list } = prevState;
      const getLastId = Math.max(...list.map((x) => x.id), 0);
      const item: Item = {
        id: getLastId + 1,
        content,
        addedAt: date ? date : new Date(),
      };
      this.ref.add(item.id);
      return {
        list: [...list, item],
      };
    });
  }
  removeItem(id: number) {
    const { list } = this.state;
    this.ref.remove(id);
    this.setState({ list: list.filter((x) => x.id !== id) });
  }
  dragItem(id: number, offsetX: number, offsetY: number) {
    const { list } = this.state;
    this.setState({
      draggedId: id,
      fakeItemIdx: list.map((x) => x.id).indexOf(id),
    });
    this.dragOffset = {
      x: offsetX,
      y: offsetY,
    };
  }
  handleMouseUp() {
    const { draggedId } = this.state;
    if (draggedId !== null)
      this.setState({ draggedId: null, fakeItemIdx: null });
  }
  setFakeItemPosition(x, y) {
    const $item = document
      .elementsFromPoint(x, y)
      .find(($element) => $element.classList.contains("normal"));
    if (!$item) return;
    const idx = Array.from($item.parentElement.children).indexOf($item);
    this.setState({ fakeItemIdx: idx });
  }
  handleMouseMove(event: React.MouseEvent) {
    if (this.state.draggedId === null) return;
    const { clientX, clientY } = event;
    const { x, y } = this.dragOffset;
    this.moveFloatItem(clientX - x, clientY - y);
    this.setFakeItemPosition(clientX, clientY);
  }
  moveFloatItem(x, y) {
    const $item = this.floatRef.current;
    $item.classList.remove("hidden");
    $item.style.left = x;
    $item.style.top = y;
  }
  render() {
    const { list, draggedId, fakeItemIdx } = this.state;
    const draggedItem = list.find((x) => x.id === draggedId);
    const todoList = list
      .filter((x) => x.id != draggedId)
      .map((item) => {
        return (
          <TodoItem
            key={item.id}
            ref={this.ref.get(item.id)}
            item={item}
            onDrag={this.dragItem}
            onDelete={this.removeItem}
          ></TodoItem>
        );
      });
    if (fakeItemIdx !== null) {
      todoList.splice(
        fakeItemIdx,
        0,
        <TodoItem key="fake" type="fake" item={draggedItem}></TodoItem>
      );
    }
    return (
      <div
        id="todo-app"
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <TodoForm onSubmit={this.addItem} />
        {draggedId !== null && (
          <TodoItem
            ref={this.floatRef}
            type={ItemTypes.float}
            item={draggedItem}
          ></TodoItem>
        )}
        <div id="todo-list">{todoList}</div>
      </div>
    );
  }
}
export default TodoList;

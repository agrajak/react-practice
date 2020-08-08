import React from "react";
import { TodoForm } from "./TodoForm";
import { Item, ItemTypes, TodoState } from "../types";
import { mockupData } from "../mockup";
import { TodoItem } from "./TodoItem";
class TodoList extends React.Component<{}, TodoState> {
  refMap: Map<string | number, React.RefObject<unknown>> = new Map();
  dragOffset: { x: number; y: number } = null;
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
    this.addRef("float");
  }
  componentDidMount() {
    mockupData.forEach(({ content, addedAt }) => {
      this.addItem(content, addedAt);
    });
  }
  addRef(name: string | number) {
    const refObj = React.createRef();
    this.refMap[name] = refObj;
    return refObj;
  }
  getRef(name: string | number) {
    if (name in this.refMap) return this.refMap[name];
  }
  removeRef(name: string | number) {
    if (name in this.refMap) delete this.refMap[name];
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
      this.addRef(item.id);
      return {
        list: [...list, item],
      };
    });
  }
  removeItem(id: number) {
    const { list } = this.state;
    this.removeRef(id);
    this.setState({ list: list.filter((x) => x.id !== id) });
  }
  dragItem(id: number, offsetX: number, offsetY: number) {
    this.setState({ draggedId: id });
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
  getDraggedItem(): Item {
    const { list, draggedId } = this.state;
    return list.find((x) => x.id === draggedId);
  }
  getItemHeightById(id: number) {
    if (!(id in this.refMap)) return 0;
    return this.refMap[id].current.getBoundingClientRect().top;
  }
  getItemElements() {
    return Object.entries(this.refMap)
      .filter((x) => x[0] != "float" && x[1] != "fake" && x[1])
      .map(([id, element]) => ({ id, element }));
  }
  getItemIdxById(id: number) {
    return this.state.list.map((x) => x.id).indexOf(id);
  }
  calcFakeItemPosition(x, y) {
    const { list, draggedId } = this.state;
    const $elements = document.elementsFromPoint(x, y);
    const $item = $elements.find(
      ($element) =>
        $element.classList.contains("todo-item") &&
        !$element.classList.contains("float")
    );
    if (!$item) return;
    const idx = this.getItemIdxById(+$item.getAttribute("item-id"));
    this.setState({ fakeItemIdx: idx });
  }
  handleMouseMove(event: React.MouseEvent) {
    if (this.state.draggedId === null) return;
    const { clientX, clientY } = event;
    const $item = this.getRef("float").current;
    $item.classList.remove("hidden");
    $item.style.left = clientX - this.dragOffset.x;
    $item.style.top = clientY - this.dragOffset.y;
    this.calcFakeItemPosition(clientX, clientY);
  }
  render() {
    const { list, draggedId, fakeItemIdx } = this.state;
    const todoList = list
      .filter((x) => x.id != draggedId)
      .map((item) => {
        return (
          <TodoItem
            key={item.id}
            ref={this.getRef(item.id)}
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
        <TodoItem
          key="fake"
          type="fake"
          item={this.getDraggedItem()}
        ></TodoItem>
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
            ref={this.getRef("float")}
            type={ItemTypes.float}
            item={this.getDraggedItem()}
          ></TodoItem>
        )}
        <div id="todo-list">{todoList}</div>
      </div>
    );
  }
}
export default TodoList;

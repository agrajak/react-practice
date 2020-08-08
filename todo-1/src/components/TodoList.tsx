import React from "react";
import { TodoForm } from "./TodoForm";
import { Item, ItemTypes, TodoState } from "../types";
import { mockupData } from "../mockup";
import { TodoItem, TodoItemForwardingRef } from "./TodoItem";
class TodoList extends React.Component<{}, TodoState> {
  refMap: Map<string | number, React.RefObject<unknown>> = new Map();
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      draggedId: null,
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.dragItem = this.dragItem.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.addRef("float");
  }
  componentDidMount() {
    // mockupData.forEach(({ content, addedAt }) => {
    //   this.addItem(content, addedAt);
    // });
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
    const { list } = this.state;
    const getLastId = Math.max(...list.map((x) => x.id), 0);
    const item: Item = {
      id: getLastId + 1,
      content,
      addedAt: date ? date : new Date(),
    };
    this.addRef(item.id);
    this.setState({ list: [...list, item] });
  }
  removeItem(id: number) {
    const { list } = this.state;
    this.removeRef(id);
    this.setState({ list: list.filter((x) => x.id !== id) });
  }
  dragItem(id: number) {
    this.setState({ draggedId: id });
  }
  handleMouseUp() {
    const { draggedId } = this.state;
    if (draggedId !== null) this.setState({ draggedId: null });
  }
  getDraggedItem() {
    const { list, draggedId } = this.state;
    return list.find((x) => x.id === draggedId);
  }
  handleMouseMove(event: React.MouseEvent) {
    if (this.state.draggedId === null) return;
    const { clientX, clientY } = event;
    const $item = this.getRef("float").current;
    $item.style.left = clientX;
    $item.style.top = clientY;
  }
  render() {
    const { list, draggedId } = this.state;
    return (
      <div
        id="todo-app"
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <TodoForm onSubmit={this.addItem} />
        {draggedId !== null && (
          <TodoItemForwardingRef
            ref={this.getRef("float")}
            type={ItemTypes.float}
            item={this.getDraggedItem()}
          ></TodoItemForwardingRef>
        )}
        <div id="todo-list">
          {list.map((item) => (
            <TodoItemForwardingRef
              key={item.id}
              ref={this.getRef(item.id)}
              item={item}
              onDrag={this.dragItem}
              onDelete={this.removeItem}
            ></TodoItemForwardingRef>
          ))}
        </div>
      </div>
    );
  }
}
export default TodoList;

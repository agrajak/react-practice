import React from "react";
import { TodoForm } from "./TodoForm";
import { Item, ItemTypes, TodoState } from "../types";
import { mockupData } from "../mockup";
import { TodoItem } from "./TodoItem";
class TodoList extends React.Component<{}, TodoState> {
  constructor(props) {
    super(props);
    this.state = {
      list: mockupData,
      draggedId: null,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  handleAdd(content: string) {
    const { list } = this.state;
    const getLastId = Math.max(...list.map((x) => x.id), 0);
    const item: Item = {
      id: getLastId + 1,
      content,
      addedAt: new Date(),
    };
    this.setState({ list: [...list, item] });
  }
  handleDelete(id: number) {
    const { list } = this.state;
    this.setState({ list: list.filter((x) => x.id !== id) });
  }
  handleDrag(id: number) {
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
  handleMouseMove(event) {}
  render() {
    const { list, draggedId } = this.state;
    return (
      <div
        id="todo-app"
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <TodoForm onSubmit={this.handleAdd} />
        {draggedId !== null && (
          <TodoItem
            type={ItemTypes.float}
            item={this.getDraggedItem()}
          ></TodoItem>
        )}
        <div id="todo-list">
          {list.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onDrag={this.handleDrag}
              onDelete={this.handleDelete}
            ></TodoItem>
          ))}
        </div>
      </div>
    );
  }
}
export default TodoList;

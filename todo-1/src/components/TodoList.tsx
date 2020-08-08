import React from "react";
import { TodoForm } from "./TodoForm";
import { Item } from "../types";
import { mockupData } from "../mockup";
import { TodoItem } from "./TodoItem";
interface TodoState {
  list: Item[];
}
class TodoList extends React.Component<{}, TodoState> {
  constructor(props) {
    super(props);
    this.state = {
      list: mockupData,
    };
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleAdd(content: string) {
    const { list } = this.state;
    const getLastId = Math.max(...list.map((x) => x.id), 0);
    const item = {
      id: getLastId + 1,
      content,
      addedAt: new Date(),
    };
    this.setState({ list: [...list, item] });
  }
  handleDelete(id: number) {}
  render() {
    const { list } = this.state;
    return (
      <div id="todo-app">
        <TodoForm onSubmit={this.handleAdd} />

        <div id="todo-list">
          {list.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onDelete={this.handleDelete}
            ></TodoItem>
          ))}
        </div>
      </div>
    );
  }
}
export default TodoList;

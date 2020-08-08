import React from "react";
import { TodoList } from "./TodoList";
import { TodoForm } from "./TodoForm";
import { Item } from "../types";
import { mockupData } from "../mockup";
interface TodoState {
  list: Item[];
}
class TodoApp extends React.Component<{}, TodoState> {
  constructor(props) {
    super(props);
    this.state = {
      list: mockupData,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(content: string) {
    const getLastId = Math.max(...this.state.list.map((x) => x.id), 0);
    this.addItem({
      id: getLastId + 1,
      content,
      addedAt: new Date(),
    });
  }
  addItem(item: Item) {
    const { list } = this.state;
    this.setState({ list: [...list, item] });
  }
  render() {
    return (
      <div id="todo-app">
        <TodoForm onSubmit={this.onSubmit} />
        <TodoList list={this.state.list} />
      </div>
    );
  }
}
export default TodoApp;

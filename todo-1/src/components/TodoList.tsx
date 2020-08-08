import React from "react";
import { Item } from "../types";
import { TodoItem } from "./TodoItem";
interface TodoListProp {
  list: Item[];
}
export class TodoList extends React.Component<TodoListProp> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="todo-list">
        {this.props.list.map((item) => (
          <TodoItem key={item.id} item={item}></TodoItem>
        ))}
      </div>
    );
  }
}

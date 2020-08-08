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
      <div>
        {this.props.list.map((item) => (
          <TodoItem item={item}></TodoItem>
        ))}
      </div>
    );
  }
}

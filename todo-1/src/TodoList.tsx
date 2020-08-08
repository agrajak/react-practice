import { range } from "./utils";
import React from "react";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  return (
    <div>
      {range(10).map((x) => (
        <TodoItem></TodoItem>
      ))}
    </div>
  );
}

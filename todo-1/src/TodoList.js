import { range } from "./utils";
import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  return (
    <div>
      {range(10).map((x) => (
        <TodoItem></TodoItem>
      ))}
    </div>
  );
};

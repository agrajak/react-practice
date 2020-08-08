import React from "react";
import { TodoList } from "./TodoList";
import { Item } from "../types";
import { mockupData } from "../mockup";
class App extends React.Component {
  render() {
    const list: Item[] = mockupData;
    return (
      <div id="app">
        <TodoList list={list} />
      </div>
    );
  }
}
export default App;

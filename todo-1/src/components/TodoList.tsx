import React, { RefObject } from "react";
import { TodoForm } from "./TodoForm";
import { Item, ItemTypes, TodoState, Point } from "../types";
import { mockupData } from "../mockup";
import { TodoItem } from "./TodoItem";
import { RefManager } from "../RefManager";
export const DateContext = React.createContext(new Date());
/**
 * Float Item: 마우스를 따라다니는 둥둥 떠있는 Item
 * Fake Item: 드래그 앤 드랍시 어느 위치에 놓일 예정인지 시각화해주는 Item
 */
function pushAtIdx(arr, idx, element) {
  const newArr = arr.slice();
  newArr.splice(idx, 0, element);
  return newArr;
}

class TodoList extends React.Component<{}, TodoState> {
  dragOffset?: Point = null;
  ref: RefManager = new RefManager();
  floatRef: RefObject<HTMLDivElement> = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      floatItemId: null,
      fakeItemIdx: null,
      now: new Date(),
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.dragItem = this.dragItem.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  componentDidMount() {
    mockupData.forEach(({ content, addedAt }) => {
      this.addItem(content, addedAt);
    });
    this.tick();
  }
  tick() {
    this.setState(() => ({
      now: new Date(),
    }));
    console.log("tick!");
    setTimeout(this.tick.bind(this), 1000);
  }
  addItem(content: string, date?: Date) {
    this.setState(({ list }) => {
      const getLastId = Math.max(...list.map((x) => x.id), 0);
      const item: Item = {
        id: getLastId + 1,
        content,
        addedAt: date ? date : new Date(),
      };
      this.ref.add(item.id);
      return {
        list: [...list, item],
      };
    });
  }
  removeItem(id: number) {
    this.setState(({ list }) => {
      this.ref.remove(id);
      return {
        list: list.filter((x) => x.id !== id),
      };
    });
  }
  dragItem(id: number, dragOffset: Point) {
    const { list } = this.state;
    this.dragOffset = dragOffset;
    this.setState({
      floatItemId: id,
      fakeItemIdx: list.map((item) => item.id).indexOf(id),
    });
  }
  handleMouseUp() {
    const { floatItemId } = this.state;
    if (floatItemId === null) return;
    this.setState(({ list, floatItemId, fakeItemIdx }) => {
      const item = list.find((x) => x.id === floatItemId);
      const newList = pushAtIdx(
        list.filter((x) => x.id !== floatItemId),
        fakeItemIdx,
        item
      );

      return {
        floatItemId: null,
        fakeItemIdx: null,
        list: newList,
      };
    });
  }
  setFakeItemIdx(x, y) {
    const $item = document
      .elementsFromPoint(x, y)
      .find(($element) => $element.classList.contains("normal"));
    if (!$item) return;
    const idx = Array.from($item.parentElement.children).indexOf($item);
    this.setState({ fakeItemIdx: idx });
  }
  handleMouseMove(event: React.MouseEvent) {
    if (this.state.floatItemId === null) return;
    const { clientX, clientY } = event;
    const { x, y } = this.dragOffset;
    this.moveFloatItem(clientX - x, clientY - y);
    this.setFakeItemIdx(clientX, clientY);
  }
  moveFloatItem(x, y) {
    const $item = this.floatRef.current;
    $item.classList.remove("hidden");
    $item.style.left = x;
    $item.style.top = y;
  }
  render() {
    const { list, floatItemId, fakeItemIdx, now } = this.state;
    const draggedItem = list.find((x) => x.id === floatItemId);
    const todoList = list
      .filter((x) => x.id != floatItemId)
      .map((item) => {
        return (
          <TodoItem
            key={item.id}
            ref={this.ref.get(item.id)}
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
        <TodoItem key="fake" type="fake" item={draggedItem}></TodoItem>
      );
    }
    return (
      <div
        id="todo-app"
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <DateContext.Provider value={now}>
          <TodoForm onSubmit={this.addItem} />
          {floatItemId !== null && (
            <TodoItem
              ref={this.floatRef}
              type={ItemTypes.float}
              item={draggedItem}
            ></TodoItem>
          )}
          <div id="todo-list">{todoList}</div>
        </DateContext.Provider>
      </div>
    );
  }
}
export default TodoList;

import React from "react";

export class RefManager<T = HTMLDivElement> {
  map: Map<string | number, React.RefObject<T>> = new Map();
  add(name: string | number) {
    if (name in this.map) return;
    const refObj = React.createRef();
    this.map[name] = refObj;
    return refObj;
  }
  get(name: string | number) {
    if (name in this.map) return this.map[name];
  }
  remove(name: string | number) {
    if (name in this.map) delete this.map[name];
  }
}

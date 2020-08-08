import React, { FormEvent } from "react";
import { TodoFormState, TodoFormProp } from "../types";
export class TodoForm extends React.Component<TodoFormProp, TodoFormState> {
  state: TodoFormState = { content: "" };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: FormEvent) {
    const { content } = this.state;
    event.preventDefault();

    if (content === "") return;
    this.props.onSubmit(content);
    this.setState({ content: "" });
  }
  handleChange(event) {
    this.setState({ content: event.target.value });
  }
  render() {
    const { content } = this.state;
    return (
      <form id="todo-form" onSubmit={this.handleSubmit}>
        <input value={content} onChange={this.handleChange} />
        <input type="submit" value="추가" />
      </form>
    );
  }
}

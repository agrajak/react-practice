import React, { FormEvent } from "react";
interface TodoFormState {
  content: string;
}
interface TodoFormProp {
  onSubmit(content: string);
}
export class TodoForm extends React.Component<TodoFormProp, TodoFormState> {
  state: TodoFormState = { content: "" };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: FormEvent) {
    this.props.onSubmit(this.state.content);
    this.setState({ content: "" });
    event.preventDefault();
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

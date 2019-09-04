import React, { Component } from "react";
import shortid from "shortid";
import { Input, Form } from "semantic-ui-react";

export default class ToDoForm extends Component {
  state = {
    text: ""
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      text: this.state.text,
      pomodoros: 0,
      complete: false,
      picked: false
    });
    this.setState({
      text: ""
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          fluid
          input={this.state.text}
          action={{ icon: "plus" }}
          placeholder="Добавить задачу"
          onChange={this.handleChange}
          value={this.state.text}
        />
      </Form>
    );
  }
}

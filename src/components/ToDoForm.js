import React, { Component } from "react";
import shortid from "shortid";
import { Input } from "semantic-ui-react";

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
      complete: false
    });
    this.setState({
      text: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          input={this.state.text}
          action={{ icon: "plus" }}
          placeholder="Добавить задачу"
          onChange={this.handleChange}
          value={this.state.text}
        />
      </form>
    );
  }
}

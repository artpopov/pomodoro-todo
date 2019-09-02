import React, { Component } from "react";
import ToDoForm from "./ToDoForm";
import Todo from "./Todo";
import { List, Button, Icon } from "semantic-ui-react";

export default class ToDoList extends Component {
  state = {
    todos: [{ id: 1, text: "Пойти на курсы React в ЛАД", completed: false }],
    filter: "all"
  };

  addTodo = todo => {
    this.setState({
      todos: [...this.state.todos, todo]
    });
  };

  toggleComplete = id => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (id === todo.id) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    }));
  };

  changeFilter = filter => {
    this.setState({
      filter
    });
  };

  handleDeleteTodo = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };

  render() {
    let visibleTodos = [];
    switch (this.state.filter) {
      case "all":
        visibleTodos = this.state.todos;
        break;
      case "active":
        visibleTodos = this.state.todos.filter(todo => !todo.complete);
        break;
      case "completed":
        visibleTodos = this.state.todos.filter(todo => todo.complete);
        break;
      default:
        break;
    }
    return (
      <div>
        <ToDoForm onSubmit={this.addTodo} />
        <List celled verticalAlign="middle">
          {visibleTodos.map(todo => (
            <List.Item key={todo.id}>
              <List.Content floated="left">
                <Button onClick={() => this.toggleComplete(todo.id)}>
                  <Icon name="trash alternate" />
                </Button>
              </List.Content>
              <List.Content>
                <Todo
                  toggleComplete={() => this.toggleComplete(todo.id)}
                  todo={todo}
                />
              </List.Content>
              <List.Content floated="right">
                <Button onClick={() => this.handleDeleteTodo(todo.id)}>
                  <Icon name="trash alternate" />
                </Button>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <div>
          <button onClick={() => this.changeFilter("all")}>all</button>
          <button onClick={() => this.changeFilter("active")}>active</button>
          <button onClick={() => this.changeFilter("completed")}>
            completed
          </button>
        </div>
      </div>
    );
  }
}

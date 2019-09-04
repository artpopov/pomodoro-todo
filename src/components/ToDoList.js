import React, { Component } from "react";
import ToDoForm from "./ToDoForm";
import Todo from "./Todo";
import { List, Button, Icon, Container } from "semantic-ui-react";

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
      <>
        <Container>
          <ToDoForm onSubmit={this.addTodo} />
          <List incelled verticalAlign="middle">
            {visibleTodos.map(todo => (
              <List.Item key={todo.id}>
                <List.Content floated="left">
                  <Icon
                    style={{ cursor: "Pointer" }}
                    onClick={() => this.toggleComplete(todo.id)}
                    name={todo.complete ? "check circle" : "circle outline"}
                  />
                  <Todo todo={todo} />
                </List.Content>
                <List.Content floated="right">
                  <Button icon onClick={() => this.handleDeleteTodo(todo.id)}>
                    <Icon name="trash alternate" />
                  </Button>
                </List.Content>
              </List.Item>
            ))}
          </List>
          <div>
            <Button onClick={() => this.changeFilter("all")}>Все</Button>
            <Button onClick={() => this.changeFilter("active")}>
              Активные
            </Button>
            <Button onClick={() => this.changeFilter("completed")}>
              Завершенные
            </Button>
          </div>
        </Container>
      </>
    );
  }
}

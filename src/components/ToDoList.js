import React, { Component } from "react";
import ToDoForm from "./ToDoForm";
import Todo from "./Todo";
import { List, Button, Icon, Container } from "semantic-ui-react";
import Pomodoro from "./Pomodoro";

export default class ToDoList extends Component {
  state = {
    todos: [
      {
        id: 1,
        text: "Сделать тестовое для курсов ЛАД",
        complete: false,
        picked: false,
        pomodoros: 0
      }
    ],
    filter: "all"
  };

  addTodo = todo => {
    this.setState({
      todos: [todo, ...this.state.todos]
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

  togglePicked = id => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (id === todo.id) {
          return {
            ...todo,
            picked: !todo.picked
          };
        } else {
          return { ...todo, picked: false };
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

  countPoms = (id, value) => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (id === todo.id) {
          return {
            ...todo,
            pomodoros: todo.pomodoros + value
          };
        } else {
          return { ...todo };
        }
      })
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
    let active;
    if (visibleTodos.filter(todo => todo.picked).length > 0) {
      active = visibleTodos.filter(todo => todo.picked)[0].id;
    }
    console.log(active);
    return (
      <>
        <Container>
          <Pomodoro active={active} sendTick={this.countPoms} />
          <ToDoForm onSubmit={this.addTodo} />
          <List celled verticalAlign="middle">
            {visibleTodos.map(todo => (
              <List.Item key={todo.id}>
                <List.Content floated="left" verticalAlign="middle">
                  <Icon
                    style={{ cursor: "Pointer" }}
                    onClick={() => this.toggleComplete(todo.id)}
                    name={todo.complete ? "check circle" : "circle outline"}
                  />
                  <Todo togglePicked={this.togglePicked} todo={todo} />
                </List.Content>
                <List.Content floated="right" verticalAlign="middle">
                  <span>
                    {todo.pomodoros}
                    <Button icon onClick={() => this.handleDeleteTodo(todo.id)}>
                      <Icon name="trash alternate" />
                    </Button>
                  </span>
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

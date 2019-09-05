import React, { Component } from "react";
import ToDoForm from "./ToDoForm";
import Todo from "./Todo";
import { List, Button, Icon, Container } from "semantic-ui-react";
import Pomodoro from "./Pomodoro";

import tomato from "./tomato-icon.png";

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
          <List divided relaxed verticalAlign="middle">
            {visibleTodos.map(todo => (
              <List.Item key={todo.id}>
                <List.Icon
                  style={{ cursor: "Pointer" }}
                  onClick={() => this.toggleComplete(todo.id)}
                  name={todo.complete ? "check circle" : "circle outline"}
                  verticalAlign="middle"
                />
                <List.Content verticalAlign="middle">
                  <Todo togglePicked={this.togglePicked} todo={todo} />
                  <Button
                    style={{ display: "flex", float: "right" }}
                    icon
                    onClick={() => this.handleDeleteTodo(todo.id)}
                  >
                    <Icon name="trash alternate" />
                  </Button>
                  {todo.pomodoros > 0 && (
                    <span style={{ display: "flex", float: "right" }}>
                      <span style={{ paddingTop: "10px" }}>
                        {todo.pomodoros.toFixed(2)}
                      </span>
                      <img src={tomato} height="30px" alt="tomato" />
                    </span>
                  )}
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

import React from "react";
import "./App.css";
import ToDoList from "./components/ToDoList";
import "semantic-ui-css/semantic.min.css";
import Pomodoro from "./components/Pomodoro";

function App() {
  return (
    <div className="App">
      <Pomodoro />
      <ToDoList />
    </div>
  );
}

export default App;

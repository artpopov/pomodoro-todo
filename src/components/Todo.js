import React from "react";

export default props => (
  <span
    onClick={() => props.togglePicked(props.todo.id)}
    style={{
      width: "150px",
      textDecoration: props.todo.complete ? "line-through" : "",
      color: props.todo.picked ? "green" : "black",
      fontSize: props.todo.picked ? 18 : 16,
      cursor: "pointer"
    }}
  >
    {props.todo.text}
  </span>
);

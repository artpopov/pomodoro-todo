import React from "react";

export default props => (
  <span
    style={{
      //   display: "flex",
      //   justifyContent: "start",
      textDecoration: props.todo.complete ? "line-through" : "",
      fontSize: 16
    }}
  >
    {props.todo.text}
  </span>
);

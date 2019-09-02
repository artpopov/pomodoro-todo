import React from "react";

export default props => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      textDecoration: props.todo.complete ? "line-through" : ""
    }}
  >
    {props.todo.text}
  </div>
);

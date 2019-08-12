import React from "react";

export function Grid(props) {
  const { click, piece, color, id } = props;
  return (
    <div
      className={"grid" + id}
      style={{
        backgroundColor: color,
        height: "60px",
        width: "60px",
        borderWidth: "5px",
        borderColor: "black",
        display: "inline-block",
        margin: 1,
        verticalAlign: "top"
      }}
      onClick={click}
    >
      {piece}
    </div>
  );
}

import React from "react";
import { GameBoardContainer } from "../containers/GameBoardContainer";

export function RootView(props) {
  const { turn, checkMate, check } = props;

  let header;
  let checkMessage = null
  if (checkMate) {
    header = <p>{`Game Over ${turn} Wins!`.toUpperCase()}</p>;
  } else {
    header = <p>{`${turn} TURN`.toUpperCase()}</p>;
  }
  if (check){
    checkMessage = "CHECK"
  }

  return (
    <div
      className="chess-container"
      style={{ textAlign: "center", display: "inline-block" }}
    >
      <div className="chess-header">
        <h1>CHESS GAME!</h1>
        {header}
        {checkMessage}
      </div>
      <div className="chess-board">
        <GameBoardContainer />
      </div>
    </div>
  );
}

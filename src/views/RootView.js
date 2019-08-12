import React from "react";
import GameBoard from "./gameboard";
import { isCheckMate } from "../board";

export function RootView(props) {
  const { currentPlayer, nextPlayer, board, playerChecked, gameOver } = props;

  let header;
  if (gameOver) {
    header = <p>Game Over {currentPlayer.name} Wins!</p>;
  } else {
    header = <p>{currentPlayer}'s Turn</p>;
  }

  //we can deal with this.state.board.playerChecked?
  if (playerChecked) {
    //we can check if the checkmate, if not we switch players and let current player know they're being checked.
    if (isCheckMate(nextPlayer)) {
      //tell current player they've been check mated game over
      alert(`CHECK MATE, GAME OVER. ${this.state.currentPlayer} WINS!`);
      this.setState({ gameOver: true });//dispatch gameover
    }
    //so the current player is checked.
  } else {
    //switch players dispatch
    this.setState({
      currentPlayer: this.state.nextPlayer,
      nextPlayer: this.state.currentPlayer
    });
  }

  return (
    <div
      className="chess-container"
      style={{ textAlign: "center", display: "inline-block" }}
    >
      <div className="chess-header">
        <h1>CHESS GAME!</h1>
        {header}
      </div>
      <div className="chess-board">
        <GameBoard
          board={this.state.board}
          switchPlayers={this.switchTurns.bind(this)}
          turn={this.state.currentPlayer}
        />
      </div>
    </div>
  );
}

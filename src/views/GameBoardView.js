import React, { useState } from "react";
import { Grid } from "./GridView";
import { getMoves } from "../helperFunctons/pieceMoves";
import { willMoveCauseCheck } from "../helperFunctons/checkFunctions";

function GameBoard(props) {
  const {
    board,
    turn,
    whitePieces,
    blackPieces,
    moveWhite,
    moveBlack,
    enpassant,
    check
  } = props;
  const [legalMoves, updateMoveOptions] = useState([]);
  const [selectedPiece, changePiece] = useState(null);
  let display = [];
  let x = 0;
  let row = [];
  let flip = 0;
  let movePiece = turn === "white" ? moveWhite : moveBlack;
  let opponentPiece = turn === "white" ? blackPieces : whitePieces;
  console.log({
    board,
    turn,
    whitePieces,
    blackPieces,
    moveWhite,
    moveBlack,
    enpassant,
    check
  });
  for (let i = 0; i < board.length; i++) {
    let element;
    let color;
    let click;
    color = i % 2 === flip ? "white" : "blue";

    let image = board[i].piece ? board[i].piece.image : null;

    if (board[i].piece) {
      //if it's white's turn we want only white to have click and vice versa.
      if (turn === "white") {
        click =
          board[i].piece.color === "white"
            ? () => {
                changePiece(i);
                updateMoveOptions(getMoves(i, board, enpassant, check));
              }
            : () => null;
      } else {
        click =
          board[i].piece.color === "black"
            ? () => {
                changePiece(i);
                updateMoveOptions(getMoves(i, board, enpassant, check));
              }
            : () => null;
      }
    }
    if (legalMoves.includes(i)) {
      let targetMove = i;
      color = "green";
      click = () => {
        let causesCheck = willMoveCauseCheck(
          board,
          selectedPiece,
          targetMove,
          opponentPiece
        );
        if (!causesCheck) {
          movePiece(selectedPiece, i); // this will be a dispatch
          updateMoveOptions([]);
        } else {
          alert("This move will cause you to be checked.");
        }
      };
    }
    element = <Grid key={i} id={i} color={color} piece={image} click={click} />;

    row.push(element);
    if (row.length === 8) {
      display.push(<li key={x}>{row}</li>);
      x += 1;
      row = [];
      flip = flip === 0 ? 1 : 0;
    }
  }
  return (
    <div className="gameboard" style={{ backgroundColor: "black" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{display}</ul>
    </div>
  );
}

export default GameBoard;
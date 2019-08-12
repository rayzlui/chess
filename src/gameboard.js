import React, { useState } from "react";
import Grid from "./views/GridView";
import getMoves from "./helperFunctons/pieceMoves";
import { willMoveCauseCheck } from "./board";

function GameBoard(props) {
  const { board } = props;
  const [legalMoves, updateMoveOptions] = useState([]);
  const [selectedPiece, changePiece] = useState(null);
  let display = [];
  let x = 0;
  var row = [];
  let flip = 0;

  for (var i = 0; i < board.length; i++) {
    let element;
    var color;
    let click;
    color = i % 2 === flip ? "white" : "blue";

    var image = board[i].piece ? board[i].piece.image : null;

    if (board[i].piece) {
      //if it's white's turn we want only white to have click and vice versa.
      if (this.props.turn === "white") {
        click =
          board[i].piece.color === "white"
            ? () => {
                changePiece(i);
                updateMoveOptions(getMoves(board[i].piece));
              }
            : () => null;
      } else {
        click =
          board[i].piece.color === "black"
            ? () => {
                changePiece(i);
                updateMoveOptions(getMoves(board[i].piece));
              }
            : () => null;
      }
    }
    if (legalMoves.includes(i)) {
      let targetMove = i
      color = "green";
      click = () => {
        let causesCheck = willMoveCauseCheck(selectedPiece, targetMove)
        if(!causesCheck){
          movePiece(board, selectedPiece, i); // this will be a dispatch
          updateMoveOptions(null);
        }else{
          alert('This move will cause you to be checked.')
        }
      }
      element = (
        <Grid key={i} id={i} color={color} piece={image} click={click} />
      );

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
}

export default GameBoard;

import { BLACK_MOVE, WHITE_MOVE } from "../actions/actionTypes";
import { rankUpPawn } from "../helperFunctons/pawnRankUp";
import { copyBoard } from "../helperFunctons/copiesBoard";
import { isCheck, isCheckMate } from "../helperFunctons/checkFunctions";
import {
  startingPieceLocations,
  setupPlayingBoard
} from "../helperFunctons/setupStart";

const initialState = {
  board: setupPlayingBoard(),
  enpassant: null,
  check: false,
  blackPieces: startingPieceLocations("black"),
  whitePieces: startingPieceLocations("white"),
  checkMate: false
};

export function boardReducer(state = initialState, action) {
  const { previous, target } = action;
  let whitePieces;
  let blackPieces;
  let board;
  let piece;
  let updatedEnpassant = null;
  let copyPiece;
  let index;
  let check = state.check;
  let checkMate = state.checkMate;
  let pieceAtPrevious;
  let pieceAtTarget;
  let kingsLanding;
  let rooksLanding;
  let enpassant = state.enpassant;
  switch (action.type) {
    case WHITE_MOVE:
      board = copyBoard(state.board);
      blackPieces = state.blackPieces.slice();
      whitePieces = state.whitePieces.slice();
      piece = board[previous].piece;
      copyPiece = Object.assign({}, piece);

      pieceAtPrevious = state.board[previous].piece;
      pieceAtTarget = state.board[target].piece;
      if (
        pieceAtPrevious.name === "King" &&
        pieceAtTarget &&
        pieceAtTarget.color === "white" &&
        pieceAtTarget.name === "Rook"
      ) {
        //this is broken when it attacks opposite rook
        //king move should have handled this to make sure the move is allowed
        let isLeft = target % 8 === 0 ? 1 : -1; //if target%8=== means its on the left because all nums are divisible by 8. Therefore when we move from kings spot, we're subtracting to move.
        kingsLanding = target + isLeft;
        rooksLanding = target + isLeft * 2;
        board[kingsLanding].piece = pieceAtPrevious;
        board[rooksLanding].piece = pieceAtTarget;
        board[previous].piece = null;
        board[target].piece = null;
        whitePieces[whitePieces.indexOf(previous)] = kingsLanding;
        whitePieces[whitePieces.indexOf(target)] = rooksLanding;
      } else {
        index = blackPieces.indexOf(target);
        if (index !== -1) {
          blackPieces.splice(index, 1);
        }

        if (copyPiece.name === "King" || copyPiece.name === "Rook") {
          copyPiece.castle = false;
        }

        if (copyPiece.name === "Pawn") {
          copyPiece = rankUpPawn(copyPiece, target, board);
          if (target === enpassant - 8) {
            index = blackPieces.indexOf(enpassant);
            blackPieces.splice(index, 1);
            board[enpassant].piece = null;
          }
          if (Math.abs(previous - target) === 16) {
            updatedEnpassant = target;
          }
        }
        //update own pieces
        index = whitePieces.indexOf(previous);
        whitePieces.splice(index, 1, target);
        board[previous].piece = null;
        board[target].piece = copyPiece;
      }
      if (isCheck(whitePieces, board)) {
        check = true;
        if (isCheckMate(whitePieces, board, blackPieces)) {
          checkMate = true;
        }
      }
      return Object.assign({}, state, {
        board: board,
        enpassant: updatedEnpassant,
        whitePieces: whitePieces,
        blackPieces: blackPieces,
        check: check,
        checkMate: checkMate
      });

    case BLACK_MOVE:
      //if previous === king and target === rook of same color, we run castle
      //move which is run the move on board without the nulling of the previous and we swap player index.

      blackPieces = state.blackPieces.slice();
      whitePieces = state.whitePieces.slice();
      board = copyBoard(state.board);
      piece = board[previous].piece;
      copyPiece = Object.assign({}, piece);

      pieceAtPrevious = state.board[previous].piece;
      pieceAtTarget = state.board[target].piece;
      if (
        pieceAtPrevious.name === "King" &&
        pieceAtTarget &&
        pieceAtTarget.color === "black" &&
        pieceAtTarget.name === "Rook"
      ) {
        //king move should have handled this to make sure the move is allowed
        let isLeft = target % 8 === 0 ? 1 : -1; //if target%8=== means its on the left because all nums are divisible by 8. Therefore when we move from kings spot, we're subtracting to move.
        kingsLanding = target + isLeft;
        rooksLanding = target + isLeft * 2;
        board[kingsLanding].piece = pieceAtPrevious;
        board[rooksLanding].piece = pieceAtTarget;
        board[previous].piece = null;
        board[target].piece = null;
        blackPieces[blackPieces.indexOf(previous)] = kingsLanding;
        blackPieces[blackPieces.indexOf(target)] = rooksLanding;
      } else {
        //if piece was removed
        index = whitePieces.indexOf(target);
        if (index !== -1) {
          whitePieces.splice(index, 1);
        }

        //if king or rook was moved

        if (copyPiece.name === "King" || copyPiece.name === "Rook") {
          copyPiece.castle = false;
        }

        enpassant = state.enpassant;
        if (copyPiece.name === "Pawn") {
          //if move was enpassant
          if (target === enpassant + 8) {
            //enpassant value is where the defending pawn is. pawn moves determines the spot for the attacking pawn to land for enpassant.
            index = whitePieces.indexOf(enpassant);
            whitePieces.splice(index, 1);
            board[enpassant].piece = null;
          }
          //if pawn leveled up
          copyPiece = rankUpPawn(copyPiece, target, board);
          if (Math.abs(previous - target) === 16) {
            //if pawn moved forward two which would allow it to be enpassant
            updatedEnpassant = target;
          }
        }
        //update board to reflect piece move
        //update index of piece moved
        index = blackPieces.indexOf(previous);
        blackPieces.splice(index, 1, target);
        board[previous].piece = null;
        board[target].piece = copyPiece;
      }

      //check
      if (isCheck(blackPieces, board)) {
        check = true;
        //checkmate
        if (isCheckMate(blackPieces, board, whitePieces)) {
          checkMate = true;
        }
      }
      return Object.assign({}, state, {
        board: board,
        enpassant: updatedEnpassant,
        whitePieces: whitePieces,
        blackPieces: blackPieces,
        check: check,
        checkMate: checkMate
      });

    default:
      return state;
  }
}

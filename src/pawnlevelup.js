import {Queen, Bishop, Rook, Knight} from './chess_pieces'
function pawnCrossing(chosenpiece, id, board){
    var boardEnd = chosenpiece.color === "white" ? [0,1,2,3,4,5,6,7] : [56,57,58,59,60,61,62,63]
    if (chosenpiece.name === "Pawn" && boardEnd.includes(id)){
        //a pawn can never go backwards on to its own back row so no need to check for color.
        var newPiece = pawnLevelUp(chosenpiece.color)
        board[id].piece = newPiece
    }
}

function pawnLevelUp(color){
    var newPiece
    var piecename = prompt("YOUR PAWN HAS BEEN COMPLETED ITS JOURNEY, PLEASE WHAT IT SHALL NOW BECOME", "Queen Bishop Knight Rook")

    let piece = piecename.toLowerCase().trim()
    while (!["queen", "knight", "rook", "bishop"].includes(piece)){
        prompt("YOUR PAWN HAS BEEN COMPLETED ITS JOURNEY, TYPE IN WHICH PIECE YOU WOULD LIKE IT TO BECOME", "Queen Bishop Knight Rook")
        piece = piece.toLowerCase().trim()
    }

    switch(piece){
        case "queen":
            newPiece = new Queen(color)
            break;
        case "bishop":
            newPiece = new Bishop(color)
            break;
        case "rook":
            newPiece = new Rook(color) 
            break;
        case "knight":
            newPiece = new Knight(color) 
            break;
        
        default :
            break;
    }
    return newPiece
}

export default pawnCrossing
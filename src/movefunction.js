
function runMove(chosenpiece, board, id, pieceid, ownpieces, rivalpieces, enpassant){

    var dir = chosenpiece.color === "white" ? -1 : 1
    if (canCastling(chosenpiece, board, id)){
        var leftright = id%8 === 0 ? -1 : 1
        //ONLY KING WILL HAVE CASTLING OPTION.
        castlingMove(board, id, pieceid)
        removePiece(ownpieces,pieceid)
        removePiece(ownpieces,id)
        addPiece(ownpieces, pieceid+(leftright*2))
        addPiece(ownpieces,pieceid+leftright)
    
    }else if (canEnpassant(chosenpiece, pieceid, dir, id, enpassant)){
        enpassantMove(board, id, pieceid, chosenpiece, enpassant)
        removePiece(rivalpieces, enpassant)
        removePiece(ownpieces, pieceid)
        addPiece(ownpieces,id)
    }else{
        if (board[id].piece !== null){
            removePiece(rivalpieces,id)
        }
        //this removes the piece from opposing players pieces there was an "eating" action
        completeMove(board, id, pieceid, chosenpiece)
        removePiece(ownpieces,pieceid)
        addPiece(ownpieces,id)
    }
}


function completeMove(board, id, pieceid, chosenpiece){
    board[id].piece = chosenpiece 
    board[pieceid].piece = null
}

function removePiece(pieces, id){
    pieces.splice(pieces.indexOf(id),1)
}
function addPiece(pieces, id){
    pieces.push(id)
}

function removePieceFromGrid(board, id){
    board[id].piece = null
}

function placePieceOnBoard(board, id, piece){
    board[id].piece = piece 
}

function canCastling(piece, board, id ){
    return piece.name === "King" && piece.castle === true && board[id].piece && board[id].piece.name === "Rook" && board[id].piece.castle === true && board[id].piece.color === piece.color
}

function castlingMove(board, id, pieceid){
    var leftright = id%8 === 0 ? -1 : 1
    let rook = board[id].piece
    let king = board[pieceid].piece
    removePieceFromGrid(board,pieceid)
    removePieceFromGrid(board,id)
    let kingspot = pieceid+(leftright*2)
    let rookspot = pieceid+leftright
    placePieceOnBoard(board, kingspot, king)
    placePieceOnBoard(board, rookspot, rook)
}


function canEnpassant(piece, pieceid, dir, id, enpassant){
    return piece.name === "Pawn" && (Math.abs(pieceid-enpassant) === 1) && (enpassant + (dir * 8) === id)
}

function enpassantMove(board, id, pieceid, chosenpiece, enpassant){
    completeMove(board, id, pieceid, chosenpiece)
    removePieceFromGrid(board, enpassant)
}

export default runMove





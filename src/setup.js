import {King, Queen, Rook, Knight, Bishop, Pawn} from './chess_pieces'

function setPawn(color, board){
    for (var i = 0 ; i < 8; i ++){     
        var x = color === "white" ? 48 : 8
        var spot = i + x
        board.placePiece(color, Pawn, spot)
    }
}

function setRook(color, board){
   setHigherLevel(color, Rook, [0,7], board)
}

function setKnight(color, board){
    setHigherLevel(color, Knight, [1,6], board)
}

function setBishop(color, board){
    setHigherLevel(color, Bishop, [2,5], board)
}

function setQueen(color, board){
    var spot = color === "white" ? [3] : [4]
    setHigherLevel(color, Queen, spot, board)
}

function setKing(color, board){
    var spot = color === "white" ? [4] : [3]
    setHigherLevel(color, King, spot, board)
}


function setHigherLevel(color, type, spot, board){
    var x = color === "white" ? 56 : 0
    var spots = spot.map(y => y + x)
    spots.forEach(spot => {
        //you can put class into function input
        board.placePiece(color, type, spot)
        
    })
}

export {setKing, setQueen, setBishop, setRook, setPawn, setKnight}
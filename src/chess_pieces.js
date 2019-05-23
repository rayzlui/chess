class Pawn {
    constructor(color){
        this.name = "Pawn"
        this.color = color
        var pieceImgs = ["whitepaw" , "blackpaw"]
        this.image = color === "white" ? pieceImgs[0] : pieceImgs[1]
    }
}

class King {
    constructor(color){
        this.name = "King"
        this.color = color
        var pieceImgs = ["whitekin" , "blackkin"]
        this.image = color === "white" ? pieceImgs[0] : pieceImgs[1]
    }
}

class Queen {
    constructor(color){
        this.name = "Queen"
        this.color = color
        var pieceImgs = ["whiteque" , "blackque"]
        this.image = color === "white" ? pieceImgs[0] : pieceImgs[1]
    }
}

class Rook {
    constructor(color){
        this.name = "Rook"
        this.color = color
        var pieceImgs = ["whiteroo" , "blackroo"]
        this.image = color === "white" ? pieceImgs[0] : pieceImgs[1]
    }
}

class Bishop {
    constructor(color){
        this.name = "Bishop"
        this.color = color
        var pieceImgs = ["whitebis" , "blackbis"]
        this.image = color === "white" ? pieceImgs[0] : pieceImgs[1]
    }
}

class Knight {
    constructor(color){
        this.name = "Knight"
        this.color = color
        var pieceImgs = ["whitekniht" , "blackknight"]
        this.image = color === "white" ? pieceImgs[0] : pieceImgs[1]
    }
}


export {King, Queen, Knight, Bishop, Rook, Pawn}
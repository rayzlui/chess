class Piece {
    constructor(options){
        this.color = options.color
        this.name = options.name
        const pieceImgs = options.image
        this.image = options.color === "white" ? pieceImgs[1] : pieceImgs[2]
    }


}

class Pawn extends Piece{
    constructor(options){
        super({name: "Pawn", image: ["white" , "black"]})
    }
}

class King extends Piece{
    constructor(options){
        super({name: "King", image: ["white" , "black"]})
    }
}

class Queen extends Piece{
    constructor(options){
        super({name: "Queen", image: ["white" , "black"]})
    }
}

class Rook extends Piece{
    constructor(options){
        super({name: "Rook", image: ["white" , "black"]})
    }
}

class Bishop extends Piece{
    constructor(options){
        super({name: "Bishop", image: ["white" , "black"]})
    }
}

class Knight extends Piece{
    constructor(options){
        super({name: "Knight", image: ["white" , "black"]})
    }
}

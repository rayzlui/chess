export function Pawn(color) {
  return {
    name: 'Pawn',
    color: color,
    image: color === 'white' ? 'whitepawn' : 'blackpawn',
  };
}

export function King(color) {
  return {
    name: 'King',
    color: color,
    image: color === 'white' ? 'whitekin' : 'blackkin',
    castle: true,
  };
}

export function Queen(color) {
  return {
    name: 'Queen',
    color: color,
    image: color === 'white' ? 'whiteque' : 'blackque',
  };
}

export function Rook(color) {
  return {
    name: 'Rook',
    color: color,
    image: color === 'white' ? 'whiteroo' : 'blackroo',
    castle: true,
  };
}

export function Bishop(color) {
  return {
    name: 'Bishop',
    color: color,
    image: color === 'white' ? 'whitebis' : 'blackbis',
  };
}

export function Knight(color) {
  return {
    name: 'Knight',
    color: color,
    image: color === 'white' ? 'whitekniht' : 'blackknight',
  };
}

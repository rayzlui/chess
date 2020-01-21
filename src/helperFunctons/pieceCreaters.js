import React from 'react';

function ImageCreator(name, url) {
  return <img className={`${name}`} src={`${url}`} alt={`${name}`} />;
}

export function Pawn(color) {
  return {
    name: 'Pawn',
    color: color,
    image:
      color === 'white'
        ? ImageCreator(
            'white__pawn',
            'https://images.cdn2.stockunlimited.net/clipart/chess-piece_1489848.jpg',
          )
        : ImageCreator(
            'blackpawn',
            'https://cdn3.iconfinder.com/data/icons/chess-7/100/black_pawn-512.png',
          ),
  };
}

export function King(color) {
  return {
    name: 'King',
    color: color,
    image:
      color === 'white'
        ? ImageCreator(
            'white king',
            'https://cdn2.iconfinder.com/data/icons/chess-set-pieces/100/Chess_Set_01-White-Classic-King-512.png',
          )
        : ImageCreator(
            'blackking',
            'https://c7.uihere.com/files/941/949/299/battle-chess-chess-piece-bishop-king-chess-pieces.jpg',
          ),
    castle: true,
  };
}

export function Queen(color) {
  return {
    name: 'Queen',
    color: color,
    image:
      color === 'white'
        ? ImageCreator(
            'whitequeen',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQStyqGa8IPghZxLXe7CzwwSkI3xolt4ZwWtoDgg0I9fGef3aPlw&s',
          )
        : ImageCreator(
            'blackqueen',
            'https://p7.hiclipart.com/preview/532/888/1/battle-chess-queen-chess-piece-king-chess-game.jpg',
          ),
  };
}

export function Rook(color) {
  return {
    name: 'Rook',
    color: color,
    image:
      color === 'white'
        ? ImageCreator(
            'whiterook',
            'https://www.netclipart.com/pp/m/66-669058_chess-castle-tower-figure-piece-white-game-play.png',
          )
        : ImageCreator(
            'blackrook',
            'https://cdn.clipart.email/f7622d8973944f3c9bde0f6ed6b4b1cb_chess-piece-rook-icon-iconexperience-professional-icons-o-_512-512.png',
          ),
    castle: true,
  };
}

export function Bishop(color) {
  return {
    name: 'Bishop',
    color: color,
    image:
      color === 'white'
        ? ImageCreator(
            'whitebis',
            'https://cdn.clipart.email/a350502c54942d259683b1eedd076a1e_chess-battle-figure-game-checkmate-bishop-icon_512-512.png',
          )
        : ImageCreator(
            'blackbis',
            'https://cdn.iconscout.com/icon/premium/png-512-thumb/bishop-black-games-battle-checkmate-chess-camel-figure-58246.png',
          ),
  };
}

export function Knight(color) {
  return {
    name: 'Knight',
    color: color,
    image:
      color === 'white'
        ? ImageCreator(
            'whiteknight',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGuH1y85WNKVYXMcxF25Izj-lS6xf-dNTfkfVW8HeRepfx2Bn71g&s',
          )
        : ImageCreator(
            'blackknight',
            'https://png.pngtree.com/png-vector/20190505/ourlarge/pngtree-chess-knight--horse--logo-illustration-png-image_1021838.jpg',
          ),
  };
}

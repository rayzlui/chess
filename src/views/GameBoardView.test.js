import { shallow } from 'enzyme';
import React from 'react';
import {
  setupPlayingBoard,
  startingPieceLocations,
} from '../helperFunctons/setupStart';
import GameBoard from './GameBoardView';

describe('GameBoard', () => {
  describe('white turn', () => {
    const mockBoard = setupPlayingBoard();
    const mockTurn = 'white';
    const mockOpponentPiece = startingPieceLocations('black');
    const movePiece = jest.fn();
    const mockEnpassant = null;
    const mockCheck = null;
    const wrapper = shallow(
      <GameBoard
        board={mockBoard}
        turn={mockTurn}
        opponentPiece={mockOpponentPiece}
        enpassant={mockEnpassant}
        check={mockCheck}
      />,
    );
    const grids = wrapper.find('Grid');
    it('should be 8 x 8', () => {
      const listElement = wrapper.find('li');
      expect(listElement).toHaveLength(8);
      expect(listElement.at(0).find('Grid')).toHaveLength(8);
      expect(grids).toHaveLength(64);
      for (let i = 0; i < grids.length; i++) {
        if (i % 2 === 0) {
          expect(grids.at(i).props().color).toEqual('white');
        } else {
          expect(grids.at(i).props().color).toEqual('blue');
        }
      }
    });
    it('should run function', () => {
      //test for state changes by clicking on grids and checking for green background
      //color, then check the click for background color by checking the mockMovePiece
      const pawn = grids.at(8);
      pawn.simulate('click');
      const newGrids = wrapper.find('Grid');
      const highlightOne = newGrids.at(16);
      expect(highlightOne.props().color).toEqual('green');
      const highlightTwo = newGrids.at(24);
      expect(highlightTwo.props().color).toEqual('green');
      highlightTwo.simulate('click');
      expect(movePiece).toHaveBeenCalled();
      const newerGrids = wrapper.find('Grid');
      const moved = newerGrids.at(24);
      expect(moved.props().image).not.toEqual(null); //there's a piece there
      const oldSpot = newerGrids.at(8);
      expect(oldSpot.props().image).toEqual(null); //there's not a piece there
      for (let i = 0; i < 64; i++) {
        expect(newerGrids.at(i).props().color).not.toEqual('green');
      }
    });

    it('should not run function', () => {
      const oppPawn = grids.at(48);
      oppPawn.simulate('click');
      const newGrids = wrapper.find('Grid');
      for (let i = 0; i < 64; i++) {
        expect(newGrids.at(i).props().color).not.toEqual('green');
      }
    });
  });

  describe('black turn', () => {
    const mockBoard = setupPlayingBoard();
    const mockTurn = 'black';
    const mockOpponentPiece = startingPieceLocations('white');
    const movePiece = jest.fn();
    const mockEnpassant = null;
    const mockCheck = null;
    const wrapper = shallow(
      <GameBoard
        board={mockBoard}
        turn={mockTurn}
        opponentPiece={mockOpponentPiece}
        enpassant={mockEnpassant}
        check={mockCheck}
      />,
    );
    const grids = wrapper.find('Grid');
    it('should run function', () => {
      //test for state changes by clicking on grids and checking for green background
      //color, then check the click for background color by checking the mockMovePiece
      const pawn = grids.at(48);
      pawn.simulate('click');
      const newGrids = wrapper.find('Grid');
      const highlightOne = newGrids.at(40);
      expect(highlightOne.props().color).toEqual('green');
      const highlightTwo = newGrids.at(32);
      expect(highlightTwo.props().color).toEqual('green');
      highlightTwo.simulate('click');
      expect(movePiece).toHaveBeenCalled();
      const newerGrids = wrapper.find('Grid');
      const moved = newerGrids.at(32);
      expect(moved.props().image).not.toEqual(null); //there's a piece there
      const oldSpot = newerGrids.at(48);
      expect(oldSpot.props().image).toEqual(null); //there's not a piece there
      for (let i = 0; i < 64; i++) {
        expect(newerGrids.at(i).props().color).not.toEqual('green');
      }
    });

    it('should not run function', () => {
      const oppPawn = grids.at(8);
      oppPawn.simulate('click');
      const newGrids = wrapper.find('Grid');
      for (let i = 0; i < 64; i++) {
        expect(newGrids.at(i).props().color).not.toEqual('green');
      }
    });
  });
});

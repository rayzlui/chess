import { shallow } from 'enzyme';
import React from 'react';
import { RootView } from './RootView';

describe('RootView', () => {
  describe('not check/checkMate, white turn', () => {
    it('should return component', () => {
      const mockTurn = 'white';
      const mockCheckMate = false;
      const mockCheck = false;
      const wrapper = shallow(
        <RootView
          turn={mockTurn}
          checkMate={mockCheckMate}
          check={mockCheck}
        />,
      );
      const header = wrapper.find('h1');
      expect(header).toEqual('CHESS GAME!');
      const turn = wrapper.find('.turn');
      expect(turn).toEqual('WHITE TURN');
      const check = wrapper.find('.check');
      expect(check).toEqual(null);
      const board = wrapper.find('GameBoardContainer');
      expect(board).toHaveLength(1);
    });
  });

  describe('not check/checkMate, black turn', () => {
    it('should return component', () => {
      const mockTurn = 'black';
      const mockCheckMate = false;
      const mockCheck = false;
      const wrapper = shallow(
        <RootView
          turn={mockTurn}
          checkMate={mockCheckMate}
          check={mockCheck}
        />,
      );
      const header = wrapper.find('h1');
      expect(header).toEqual('CHESS GAME!');
      const turn = wrapper.find('.turn');
      expect(turn).toEqual('BLACK TURN');
      const check = wrapper.find('.check');
      expect(check).toEqual(null);
      const board = wrapper.find('GameBoardContainer');
      expect(board).toHaveLength(1);
    });
  });

  describe('check, not checkMate, white turn', () => {
    it('should return component', () => {
      const mockTurn = 'white';
      const mockCheckMate = false;
      const mockCheck = true;
      const wrapper = shallow(
        <RootView
          turn={mockTurn}
          checkMate={mockCheckMate}
          check={mockCheck}
        />,
      );
      const header = wrapper.find('h1');
      expect(header).toEqual('CHESS GAME!');
      const turn = wrapper.find('.turn');
      expect(turn).toEqual('WHITE TURN');
      const check = wrapper.find('.check');
      expect(check).toEqual('CHECK');
      const board = wrapper.find('GameBoardContainer');
      expect(board).toHaveLength(1);
    });
  });

  describe('check, checkMate, white turn', () => {
    it('should return component', () => {
      const mockTurn = 'white';
      const mockCheckMate = true;
      const mockCheck = true;
      const wrapper = shallow(
        <RootView
          turn={mockTurn}
          checkMate={mockCheckMate}
          check={mockCheck}
        />,
      );
      const header = wrapper.find('h1');
      expect(header).toEqual('CHESS GAME!');
      const turn = wrapper.find('.turn');
      expect(turn).toEqual('GAME OVER WHITE WINS!');
      const check = wrapper.find('.check');
      expect(check).toEqual('CHECK');
      const board = wrapper.find('GameBoardContainer');
      expect(board).toHaveLength(1);
    });
  });
});

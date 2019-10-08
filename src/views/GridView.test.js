import { shallow } from 'enzyme';
import React from 'react';
import { Queen, King } from '../helperFunctons/pieceCreaters';
import { Grid } from './GridView';

describe('Grid', () => {
  it('should return component', () => {
    const mockClick = jest.fn();
    const mockPiece = null;
    const mockColor = 'white';
    const mockId = 44;
    const wrapper = shallow(
      <Grid click={null} piece={mockPiece} color={mockColor} id={mockId} />,
    );
    wrapper.simulate('click');
    expect(mockClick).not.toHaveBeenCalled();
    expect(wrapper.props().style.backgroundColor).toEqual(mockColor);
    expect(wrapper.children()).toEqual(mockPiece);
  });

  it('should return component', () => {
    const mockClick = jest.fn();
    const mockPiece = Queen('white');
    const mockColor = 'blue';
    const mockId = 60;
    const wrapper = shallow(
      <Grid
        click={mockClick}
        piece={mockPiece}
        color={mockColor}
        id={mockId}
      />,
    );
    wrapper.simulate('click');
    expect(mockClick).toHaveBeenCalled();
    expect(wrapper.props().style.backgroundColor).toEqual(mockColor);
    expect(wrapper.children()).toEqual(mockPiece);
  });

  it('should return component', () => {
    const mockClick = null;
    const mockPiece = King('black');
    const mockColor = 'blue';
    const mockId = 3;
    const wrapper = shallow(
      <Grid
        click={mockClick}
        piece={mockPiece}
        color={mockColor}
        id={mockId}
      />,
    );
    wrapper.simulate('click');
    expect(mockClick).toHaveBeenCalled();
    expect(wrapper.props().style.backgroundColor).toEqual(mockColor);
    expect(wrapper.children()).toEqual(mockPiece);
  });
});

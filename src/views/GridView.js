import React from 'react';
import PropTypes from 'prop-types';

export function Grid(props) {
  const { click, piece, color, id } = props;
  return (
    <div
      className={'grid' + id}
      style={{
        backgroundColor: color,
        height: '60px',
        width: '60px',
        borderWidth: '5px',
        borderColor: 'black',
        display: 'inline-block',
        margin: 1,
        verticalAlign: 'top',
      }}
      onClick={click}
    >
      {piece}
    </div>
  );
}

Grid.propTypes = {
  click: PropTypes.func,
  piece: PropTypes.object,
  color: PropTypes.string,
  id: PropTypes.number,
};

import React from 'react';
import PropTypes from 'prop-types';

export function Grid(props) {
  const { click, piece, color, id } = props;
  return (
    <section className={`grid ${id} ${color}`} key={id} onClick={click}>
      {piece}
    </section>
  );
}

Grid.propTypes = {
  click: PropTypes.func,
  piece: PropTypes.object,
  color: PropTypes.string,
  id: PropTypes.number,
};

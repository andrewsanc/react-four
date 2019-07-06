import React from 'react';
import Cell from './Cell';

const Row = (props) => {
  const { row, move } = props;
  return (
    <tr className="z-depth-4">
      {row.map((cell, i) => {
        return (
          <Cell cell={cell} key={i} columnIndex={i} move={move} />
        )
      })}
    </tr>
  );
}

export default Row;
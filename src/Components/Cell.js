import React from 'react';
import './Cell.css';

const Cell = (props) => {
  const { move, columnIndex, cell } = props;
  let color
  if (cell) {
    color = `${cell} z-depth-2 bounce-in-top`;
  }

  return (
    <td className="cell">
      <div onClick={() => move(columnIndex)}>
        <div className="white" >
          <div className={color}></div>
        </div>
      </div>
    </td>
  );
}
 
export default Cell;
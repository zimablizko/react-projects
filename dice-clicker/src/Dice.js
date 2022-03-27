import React from 'react';

function Dice(props) {
  const {
    dice
  } = props;

  return (
    <div className="dice">{dice.diceValue}</div>
  );
}

export default Dice;
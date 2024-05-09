import React from 'react';
import Dice from './Dice';

function DiceBoard({ dices }) {
  return (
    <div className="dice-board">
      {dices.map((dice) => {
        return <Dice key={dice.id} dice={dice} />;
      })}
    </div>
  );
}

export default DiceBoard;

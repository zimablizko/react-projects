import React, {useState} from 'react';
import Dice from "./Dice";

function DiceBoard(props) {
const {dices} = props;

  return (
    <div className="dice-board">
      {dices.map(dice => {
          return <Dice key={dice.id} dice={dice}/>
        }
      )}
    </div>
  );
}

export default DiceBoard;
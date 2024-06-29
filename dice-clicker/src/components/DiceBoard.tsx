import { Dice } from 'model/dice.model';
import DiceElement from './DiceElement';

type DiceBoardProps = {
  dices: Dice[];
};

function DiceBoard({ dices }: DiceBoardProps) {
  return (
    <div className="row dice-board">
      {dices.map((dice) => {
        return <DiceElement key={dice.id} dice={dice} />;
      })}
    </div>
  );
}

export default DiceBoard;

type DiceProps = {
  dice: { diceValue: number };
};

function DiceElement({ dice }: DiceProps) {
  return <div className="dice">{dice.diceValue}</div>;
}

export default DiceElement;

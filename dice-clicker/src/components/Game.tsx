import { Dice } from 'model/dice.model';
import { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameContext } from '../store/game-context';
import DiceBoard from './DiceBoard';
import ResultModal from './ResultModal';

const WIN_CONDITION_POINTS = 10;

export default function Game() {
  const { points, diceAmount, stats, changePoints, changeDiceAmount, changeStats } = useContext(GameContext);
  const winDialog = useRef<any>(null);

  const [dices, setDices] = useState<Dice[]>([]);
  const [upgradeCost, setUpgradeCost] = useState(0);

  const getRollResult = () => Math.floor(Math.random() * 6) + 1;
  const getUpgradeCost = () => diceAmount * 10;
  const checkWinCondition = () => points >= WIN_CONDITION_POINTS;
  const checkUpgradeBtnDisabled = () => points < upgradeCost;

  if (checkWinCondition()) {
    winDialog.current!.open();
  }

  useEffect(() => {
    setUpgradeCost(getUpgradeCost);
  }, [diceAmount, getUpgradeCost]);

  function handleRollClick() {
    const diceArray = [];
    for (let i = 0; i < diceAmount; i++) {
      diceArray.push({ id: uuidv4(), diceValue: getRollResult() });
    }
    setDices(diceArray);
    const res = diceArray.reduce((prev, curr) => prev + curr.diceValue, 0);
    changePoints(res);

    changeStats({
      ...stats,
      diceRolls: stats.diceRolls + 1,
      bestRoll: stats.bestRoll >= res ? stats.bestRoll : res,
    });
  }

  function handleResetClick() {
    changePoints(-points);
    changeDiceAmount(-diceAmount + 1);
    changeStats({ diceRolls: 0, bestRoll: 0 });

    setDices([]);
  }

  function handleUpgradeClick() {
    if (points >= upgradeCost) {
      changeDiceAmount(1);
      changePoints(-upgradeCost);
      setUpgradeCost(getUpgradeCost);
    }
  }
  return (
    <>
      <div className="game-screen" style={{ display: checkWinCondition() ? 'none' : 'flex' }}>
        <div>
          <label>: {points}</label>
          <label className="wincon-label"> ({WIN_CONDITION_POINTS} points for victory)</label>
        </div>
        <div>
          <button className="btn roll-btn" onClick={handleRollClick}>
            Roll
          </button>
          <button className="btn reset-btn" onClick={handleResetClick}>
            Restart
          </button>
        </div>
        <div>
          <label>🎲 amount: {diceAmount}</label>
          <button className="btn upgrade-btn" disabled={checkUpgradeBtnDisabled()} onClick={handleUpgradeClick}>
            +1 🎲 (Cost: {upgradeCost})
          </button>
        </div>
        <DiceBoard dices={dices} />
      </div>
      <ResultModal ref={winDialog} stats={stats} onReset={handleResetClick} />
    </>
  );
}

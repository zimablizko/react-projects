import { Dice } from 'model/dice.model';
import { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GAME_SETTINGS } from '../consts/game-settings.const';
import { GameContext } from '../store/game-context';
import DiceBoard from './DiceBoard';
import ResultModal from './ResultModal';

export default function Game() {
  const { points, diceAmount, stats, rollCooldown, changePoints, changeDiceAmount, changeStats } =
    useContext(GameContext);
  const winDialog = useRef<any>(null);

  const [dices, setDices] = useState<Dice[]>([]);
  const [upgradeCost, setUpgradeCost] = useState(0);
  const [isCooldown, setIsCooldown] = useState(0);

  const getRollResult = () => Math.floor(Math.random() * 6) + 1;
  const getUpgradeCost = () => diceAmount * 10;
  const checkWinCondition = () => points >= GAME_SETTINGS.winCondition;
  const checkUpgradeBtnDisabled = () => points < upgradeCost;
  const checkRollBtnDisabled = () => isCooldown > 0;

  if (checkWinCondition()) {
    winDialog.current!.open();
  }

  useEffect(() => {
    setUpgradeCost(getUpgradeCost);
  }, [diceAmount, getUpgradeCost]);

  useEffect(() => {
    if (isCooldown > 0) {
      const interval = setInterval(() => {
        setIsCooldown(isCooldown - 50);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isCooldown]);

  function handleRollClick() {
    const diceArray = [];
    for (let i = 0; i < diceAmount; i++) {
      diceArray.push({ id: uuidv4(), diceValue: getRollResult() });
    }
    setDices(diceArray);
    const res = diceArray.reduce((prev, curr) => prev + curr.diceValue, 0);
    setIsCooldown(rollCooldown);

    const rollAnimationDelay = GAME_SETTINGS.rollAnimationDelay;

    setTimeout(() => {
      changePoints(res);

      changeStats({
        ...stats,
        diceRolls: stats.diceRolls + 1,
        bestRoll: stats.bestRoll >= res ? stats.bestRoll : res,
      });
    }, rollAnimationDelay);
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
      <div className="game-screen">
        <div className="row">
          <label>🎲 amount: {diceAmount}</label>
          <button className="btn upgrade-btn" disabled={checkUpgradeBtnDisabled()} onClick={handleUpgradeClick}>
            +1 🎲 (Cost: {upgradeCost})
          </button>
        </div>
        <div className="row">
          <p className="points">
            Points: {points}
            <br></br>
            <span className="wincon-label"> ({GAME_SETTINGS.winCondition} points for victory)</span>
          </p>
        </div>

        <DiceBoard dices={dices} />

        <div className="row">
          <button className="btn roll-btn" onClick={handleRollClick} disabled={checkRollBtnDisabled()}>
            Roll
          </button>
          {/* <button className="btn reset-btn" onClick={handleResetClick}>
            Restart
          </button> */}
        </div>
      </div>
      <ResultModal ref={winDialog} stats={stats} onReset={handleResetClick} />
    </>
  );
}

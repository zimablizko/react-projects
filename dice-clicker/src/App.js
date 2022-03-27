import React, {useState, useEffect} from "react";
import DiceBoard from "./DiceBoard";
import './App.css';
import {v4 as uuidv4} from 'uuid';

const WIN_CONDITION_POINTS = 1000;

function App() {
  const [points, setPoints] = useState(0);
  const [dices, setDices] = useState([]);
  const [diceAmount, setDiceAmount] = useState(1);
  const [upgradeCost, setUpgradeCost] = useState(0);
  const [stats, setStats] = useState({diceRolls: 0, bestRoll:0});

  const getRollResult = () => Math.floor(Math.random() * 6) + 1;
  const getUpgradeCost = () => diceAmount * 10;
  const checkWinCondition = () => points >= WIN_CONDITION_POINTS;
  const checkUpgradeBtnDisabled = () => points < upgradeCost;

  useEffect(() => {
    const res = dices.reduce((prev, curr) => prev + curr.diceValue, 0);
    setPoints(currPoints => currPoints + res);
    setStats(prevState => {
      return {
        ...prevState,
        bestRoll: prevState.bestRoll >= res ? prevState.bestRoll : res
      }
    });
  }, [dices])

  useEffect(() => {
    setUpgradeCost(getUpgradeCost);
  }, [diceAmount]);

  function handleRollClick(e) {
    const diceArray = [];
    for (let i = 0; i < diceAmount; i++) {
      diceArray.push({id: uuidv4(), diceValue: getRollResult()})
    }
    setDices(() => {
      return diceArray
    });
    setStats(prevState => {
      return {
        ...prevState,
        diceRolls: prevState.diceRolls + 1
      }
    });
  }

  function handleResetClick(e) {
    setPoints(0);
    setDices([]);
    setDiceAmount(1);
    setStats({diceRolls: 0,  bestRoll:0});
  }

  function handleUpgradeClick(e) {
    if (points >= upgradeCost) {
      setDiceAmount(prevState => prevState + 1);
      setPoints(prev => prev - upgradeCost);
      setUpgradeCost(getUpgradeCost);
    }
  }

  return (
    <div className="app">
      <div
        className="game-screen"
        style={{display: checkWinCondition() ? 'none' : 'flex'}}>
        <div>
          <label>Points: {points}</label>
          <label className="wincon-label"> ({WIN_CONDITION_POINTS} points for victory)</label>
        </div>
        <div>
          <button className="btn roll-btn" onClick={handleRollClick}>Roll</button>
          <button className="btn reset-btn" onClick={handleResetClick}>Restart</button>
        </div>
        <div>
          <label>Dice amount: {diceAmount}</label>
          <button className="btn upgrade-btn" disabled={checkUpgradeBtnDisabled()} onClick={handleUpgradeClick}>+1 Dice
            (Cost: {upgradeCost})
          </button>
        </div>
        <DiceBoard dices={dices}/>
      </div>
      <div
        className="victory-screen"
        style={{display: checkWinCondition() ? 'flex' : 'none'}}>
        <label>VICTORY!</label>
        <label>Dice rolls: {stats.diceRolls}</label>
        <label>Best roll: {stats.bestRoll}</label>
        <div>
          <button className="btn reset-btn" onClick={handleResetClick}>Restart</button>
        </div>
      </div>
    </div>

  );
}

export default App;

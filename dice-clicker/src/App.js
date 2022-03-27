import React, {useState, useEffect, useRef} from "react";
import DiceBoard from "./DiceBoard";
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [points, setPoints] = useState(0)
  const [dices, setDices] = useState([]);
  const [diceAmount, setDiceAmount] = useState(1)

  const diceAmountRef = useRef();

  useEffect(() => {
    const res = dices.reduce((prev, curr) => prev + curr.diceValue, 0);
    setPoints(currPoints => currPoints + res);
  }, [dices])

  function handleRollClick(e) {
    const diceArray = [];
    for (let i=0; i<diceAmountRef.current.value; i++) {
      diceArray.push({id: uuidv4(), diceValue: getRollResult()})
    }
    setDices(() => {
      return diceArray
    });
  }

  function handleResetClick(e) {
    setPoints(0);
    setDices([]);
  }


  function getRollResult() {
    let result = Math.floor(Math.random()*6)+1;
    console.log(result);
    return result;
  }

  return (
    <div className="app">
      <div>Points: {points}</div>
      <div>
        <input className="dice-amount-input" type="number" id="diceAmount" min="1" max="5" defaultValue="1" ref={diceAmountRef}/>
        <button className="btn roll-btn" onClick={handleRollClick}>Roll</button>
        <button className="btn reset-btn" onClick={handleResetClick}>Reset</button>
      </div>
      <DiceBoard dices={dices}/>
    </div>
  );
}

export default App;

import React, { createContext, useReducer } from 'react';

export const GameContext = createContext({
  points: 0,
  diceAmount: 1,
  stats: { diceRolls: 0, bestRoll: 0 },
  changePoints: (val) => {
    console.log(val);
  },
  changeDiceAmount: (val) => {
    console.log(val);
  },
  changeStats: (val) => {
    console.log(val);
  },
});

function gameContextReducer(state, action) {
  if (action.type === 'CHANGE_POINTS') {
    const newPoints = state.points + action.value;
    if (newPoints < 0) return state;
    return { ...state, points: newPoints };
  }

  if (action.type === 'CHANGE_DICE_AMOUNT') {
    const newDiceAmount = state.diceAmount + action.value;
    if (newDiceAmount < 1) return state;
    return { ...state, diceAmount: newDiceAmount };
  }

  if (action.type === 'CHANGE_STATS') {
    return { ...state, stats: action.value };
  }

  return state;
}

export default function GameContextProvider({ children }) {
  const [gameState, dispatchGameState] = useReducer(gameContextReducer, {
    points: 0,
    diceAmount: 1,
    stats: { diceRolls: 0, bestRoll: 0 },
  });

  const changePointsHandler = (value) => {
    dispatchGameState({ type: 'CHANGE_POINTS', value });
  };

  const changeDiceAmountHandler = (value) => {
    dispatchGameState({ type: 'CHANGE_DICE_AMOUNT', value });
  };

  const changeStatsHandler = (value) => {
    dispatchGameState({ type: 'CHANGE_STATS', value });
  };

  const ctxValue = {
    points: gameState.points,
    diceAmount: gameState.diceAmount,
    stats: gameState.stats,
    changePoints: changePointsHandler,
    changeDiceAmount: changeDiceAmountHandler,
    changeStats: changeStatsHandler,
  };

  return <GameContext.Provider value={ctxValue}>{children}</GameContext.Provider>;
}

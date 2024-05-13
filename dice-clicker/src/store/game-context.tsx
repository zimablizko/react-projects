import { GameAction, GameContextType, GameState } from 'model/game-context.model';
import { GameStats } from 'model/game-stats.model';
import { createContext, useReducer } from 'react';

const initialState: GameState = {
  points: 0,
  diceAmount: 1,
  rollCooldown: 1500,
  stats: { diceRolls: 0, bestRoll: 0 },
};

export const GameContext = createContext<GameContextType>({
  ...initialState,
  changePoints: (val: number) => {
    console.log(val);
  },
  changeDiceAmount: (val: number) => {
    console.log(val);
  },
  changeStats: (val: GameStats) => {
    console.log(val);
  },
  changeRollCooldown: (val: number) => {
    console.log(val);
  },
});

function gameContextReducer(state: GameState, action: GameAction): GameState {
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

  if (action.type === 'CHANGE_ROLL_COOLDOWN') {
    const newCooldown = state.rollCooldown + action.value;
    if (newCooldown < 0) return state;
    return { ...state, rollCooldown: newCooldown };
  }

  return state;
}

export default function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [gameState, dispatchGameState] = useReducer(gameContextReducer, initialState);

  const changePointsHandler = (value: number) => {
    dispatchGameState({ type: 'CHANGE_POINTS', value });
  };

  const changeDiceAmountHandler = (value: number) => {
    dispatchGameState({ type: 'CHANGE_DICE_AMOUNT', value });
  };

  const changeStatsHandler = (value: GameStats) => {
    dispatchGameState({ type: 'CHANGE_STATS', value });
  };

  const changeRollCooldownHandler = (value: number) => {
    dispatchGameState({ type: 'CHANGE_ROLL_COOLDOWN', value });
  };

  const ctxValue: GameContextType = {
    points: gameState.points,
    diceAmount: gameState.diceAmount,
    stats: gameState.stats,
    rollCooldown: gameState.rollCooldown,
    changePoints: changePointsHandler,
    changeDiceAmount: changeDiceAmountHandler,
    changeStats: changeStatsHandler,
    changeRollCooldown: changeRollCooldownHandler,
  };

  return <GameContext.Provider value={ctxValue}>{children}</GameContext.Provider>;
}

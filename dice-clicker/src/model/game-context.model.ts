import { GameStats } from './game-stats.model';

type ActionType = 'CHANGE_POINTS' | 'CHANGE_DICE_AMOUNT' | 'CHANGE_STATS';

export interface GameState {
  points: number;
  diceAmount: number;
  stats: GameStats;
}

export interface GameContextType extends GameState {
  changePoints: (val: number) => void;
  changeDiceAmount: (val: number) => void;
  changeStats: (val: GameStats) => void;
}

export type GameAction = {
  type: ActionType;
  value: any;
};

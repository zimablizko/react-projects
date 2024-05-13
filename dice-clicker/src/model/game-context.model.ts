import { GameStats } from './game-stats.model';

type ActionType = 'CHANGE_POINTS' | 'CHANGE_DICE_AMOUNT' | 'CHANGE_STATS' | 'CHANGE_ROLL_COOLDOWN';

export interface GameState {
  points: number;
  diceAmount: number;
  rollCooldown: number;
  stats: GameStats;
}

export interface GameContextType extends GameState {
  changePoints: (val: number) => void;
  changeDiceAmount: (val: number) => void;
  changeStats: (val: GameStats) => void;
  changeRollCooldown: (val: number) => void;
}

export type GameAction = {
  type: ActionType;
  value: any;
};

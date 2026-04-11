import { GamePhase } from '@summer/shared';

// The server is the reliable source of truth for the game world's macro-state.
export const worldState = {
  phase: GamePhase.PROLOGUE,
};

export const getPhase = (): GamePhase => {
  return worldState.phase;
};

export const setPhase = (newPhase: GamePhase): void => {
  console.log(`[WorldState] Phase advancing to ${newPhase}`);
  worldState.phase = newPhase;
};

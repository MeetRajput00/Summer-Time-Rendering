export * from './auth.js';
export interface PlayerState {
  id: string;
  x: number;
  y: number;
  currentLoopId: number;
  flipX: boolean;
  anim: string;
}

export interface NpcState {
  id: string;
  npcType: string;
  x: number;
  y: number;
  flipX: boolean;
  anim: string;
}

export enum GamePhase {
  PROLOGUE = 'PROLOGUE',
  SUMMER_FESTIVAL = 'SUMMER_FESTIVAL',
  SHADOW_INVASION = 'SHADOW_INVASION',
  LOOP_RESET = 'LOOP_RESET'
}

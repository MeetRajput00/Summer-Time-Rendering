export * from './auth';
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

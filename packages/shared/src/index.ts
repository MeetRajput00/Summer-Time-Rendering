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

export interface ClientToServerEvents {
  playerMovement: (data: { x: number; y: number; flipX: boolean; anim: string }) => void;
  playerLoopUpdate: (data: { loopId: number }) => void;
}

export interface ServerToClientEvents {
  currentPlayers: (players: Record<string, PlayerState>) => void;
  newPlayer: (player: PlayerState) => void;
  playerMoved: (player: PlayerState) => void;
  playerDisconnect: (id: string) => void;
  
  currentNpcs: (npcs: Record<string, NpcState>) => void;
  npcMoved: (npc: NpcState) => void;
}

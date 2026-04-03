import { describe, it, expect } from 'vitest';
import { PlayerState } from '../src/index';

describe('Shared Logic', () => {
  it('should correctly define player state structure', () => {
    const player: PlayerState = {
      id: 'test-id',
      x: 100,
      y: 200,
      currentLoopId: 1,
      flipX: false,
      anim: 'idle'
    };

    expect(player.id).toBe('test-id');
    expect(player.x).toBe(100);
    expect(player.y).toBe(200);
  });
});

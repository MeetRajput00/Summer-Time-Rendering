import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { app } from '../src/index';

// Set NODE_ENV to test to prevent the server from starting
process.env.NODE_ENV = 'test';

describe('Server API', () => {
  it('should return 200 OK from the health endpoint', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });

  it('should save game state', async () => {
    const response = await request(app)
      .post('/api/save')
      .send({ loopId: 1, position: { x: 100, y: 100 } });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });
});

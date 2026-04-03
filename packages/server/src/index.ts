import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import passport from './auth/passport.js';
import * as authController from './auth/auth.controller.js';
import { PlayerState, NpcState, ClientToServerEvents, ServerToClientEvents } from '@summer/shared';

export const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET || 'summer_time_rendering_jwt_secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', passport.authenticate('local'), authController.login);

// OAuth Routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.oauthCallback);

app.get('/api/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/api/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), authController.oauthCallback);

export const httpServer = createServer(app);
export const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: "*", // allow all in dev
    methods: ["GET", "POST"]
  }
});

const players: Record<string, PlayerState> = {};
const npcs: Record<string, NpcState> = {};
const npcWanderState: Record<string, { dx: number, dy: number, timer: number }> = {};

// Initialize 5 Slimes
for (let i = 0; i < 5; i++) {
  const id = `npc_slime_${i}`;
  npcs[id] = {
    id,
    npcType: 'slime',
    x: 400 + Math.random() * 400 - 200,
    y: 300 + Math.random() * 400 - 200,
    flipX: false,
    anim: 'slime-idle'
  };
  npcWanderState[id] = { dx: 0, dy: 0, timer: 0 };
}

// Server Tick Loop (20Hz)
const TICK_RATE = 50;
setInterval(() => {
  Object.values(npcs).forEach(npc => {
    const state = npcWanderState[npc.id];
    state.timer -= TICK_RATE;

    if (state.timer <= 0) {
      const rand = Math.random();
      
      // Keep track of internal direction text implicitly through past vector, or default 'down'
      let dirStr = 'down';
      if (Math.abs(state.dx) > Math.abs(state.dy)) {
        dirStr = 'right';
      } else if (state.dy < 0) {
        dirStr = 'up';
      } else {
        dirStr = 'down';
      }

      if (rand < 0.5) {
        state.dx = 0;
        state.dy = 0;
        npc.anim = `${npc.npcType}-idle-${dirStr}`;
      } else {
        const angle = Math.random() * Math.PI * 2;
        state.dx = Math.cos(angle);
        state.dy = Math.sin(angle);
        
        let moveDirStr = 'down';
        if (Math.abs(state.dx) > Math.abs(state.dy)) {
          moveDirStr = 'right';
        } else if (state.dy < 0) {
          moveDirStr = 'up';
        }

        npc.anim = `${npc.npcType}-move-${moveDirStr}`;
        npc.flipX = state.dx < 0;
      }
      state.timer = 1000 + Math.random() * 2000;
      io.emit('npcMoved', npc);
    }

    if (state.dx !== 0 || state.dy !== 0) {
      const speed = 100;
      npc.x += state.dx * speed * (TICK_RATE / 1000);
      npc.y += state.dy * speed * (TICK_RATE / 1000);
      
      // Clamp to grass area avoiding water boundaries (32 to 1968)
      npc.x = Math.max(32, Math.min(1968, npc.x));
      npc.y = Math.max(32, Math.min(1968, npc.y));
      
      io.emit('npcMoved', npc);
    }
  });
}, TICK_RATE);

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  players[socket.id] = {
    id: socket.id,
    x: 400,
    y: 300,
    currentLoopId: 0,
    flipX: false,
    anim: 'player-idle'
  };

  socket.emit('currentPlayers', players);
  socket.emit('currentNpcs', npcs); // Sent to only the connecting client

  socket.broadcast.emit('newPlayer', players[socket.id]);

  socket.on('playerMovement', (movementData) => {
    if (players[socket.id]) {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      players[socket.id].flipX = movementData.flipX;
      players[socket.id].anim = movementData.anim;

      socket.broadcast.emit('playerMoved', players[socket.id]);
    }
  });

  socket.on('playerLoopUpdate', (data) => {
    if (players[socket.id]) {
      players[socket.id].currentLoopId = data.loopId;
      console.log(`Player ${socket.id} reset to loop ${data.loopId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit('playerDisconnect', socket.id);
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.post('/api/save', (req: Request, res: Response) => {
  const { loopId, position } = req.body;
  console.log(`Saved game state for loop ${loopId}`);
  res.json({ success: true });
});

if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

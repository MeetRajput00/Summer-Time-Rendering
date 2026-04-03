import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { initGame } from './game/PhaserGame';

const rootElement = document.getElementById('ui-root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Initialize Phaser game after UI mounts
initGame('game-container');

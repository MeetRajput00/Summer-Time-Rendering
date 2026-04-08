import React, { useState, useEffect } from 'react';
import { User } from '@summer/shared';
import { LoginScreen } from './components/LoginScreen';
import { initGame } from './game/PhaserGame';

export const App: React.FC = () => {
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const handleLoginSuccess = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // Listen for custom events from Phaser to update React UI
    const handleDialogueEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      setDialogue(customEvent.detail.text);
    };

    window.addEventListener('show-dialogue', handleDialogueEvent);
    
    return () => {
      window.removeEventListener('show-dialogue', handleDialogueEvent);
    };
  }, []);

  useEffect(() => {
    let game: Phaser.Game | null = null;
    if (user && token) {
      game = initGame('game-container');
    }
    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, [user, token]);

  if (!user || !token) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 16px',
          background: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '4px',
          cursor: 'pointer',
          pointerEvents: 'auto',
          fontSize: '12px'
        }}
      >
        LOGOUT
      </button>

      {dialogue && (
        <div 
          onClick={() => setDialogue(null)}
          style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          border: '2px solid white',
          borderRadius: '8px',
          pointerEvents: 'auto',
          fontFamily: 'monospace',
          fontSize: '18px',
          cursor: 'pointer'
        }}>
          {dialogue}
          <div style={{ textAlign: 'right', fontSize: '14px', marginTop: '10px', color: '#ccc' }}>
            Click to continue...
          </div>
        </div>
      )}
    </div>
  );
};

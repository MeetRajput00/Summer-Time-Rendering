import React, { useState, useEffect } from 'react';

export const App: React.FC = () => {
  const [dialogue, setDialogue] = useState<string | null>(null);

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

  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
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

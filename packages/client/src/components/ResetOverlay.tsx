import React, { useState, useEffect } from 'react';

export const ResetOverlay: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleResetEvent = () => {
            setVisible(true);
            setTimeout(() => setVisible(false), 3000);
        };
        
        window.addEventListener('loop-reset', handleResetEvent);
        return () => window.removeEventListener('loop-reset', handleResetEvent);
    }, []);

    if (!visible) return null;

    return (
        <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(50, 0, 0, 0.9)',
            color: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 9999,
            animation: 'fadeInOut 3s ease-in-out'
        }}>
            <style>
                {`
                    @keyframes fadeInOut {
                        0% { opacity: 0; }
                        20% { opacity: 1; }
                        80% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                `}
            </style>
            <h1 style={{ fontFamily: 'monospace', fontSize: '3rem', textShadow: '2px 2px 8px #000' }}>
                YOU DIED ... REVERTING TO JULY 22ND
            </h1>
        </div>
    );
};

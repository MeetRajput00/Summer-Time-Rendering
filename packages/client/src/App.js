import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { ResetOverlay } from './components/ResetOverlay';
import { initGame } from './game/PhaserGame';
export const App = () => {
    const [dialogue, setDialogue] = useState(null);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const handleLoginSuccess = (user, token) => {
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
        const handleDialogueEvent = (e) => {
            const customEvent = e;
            setDialogue(customEvent.detail.text);
        };
        window.addEventListener('show-dialogue', handleDialogueEvent);
        return () => {
            window.removeEventListener('show-dialogue', handleDialogueEvent);
        };
    }, []);
    useEffect(() => {
        let game = null;
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
        return _jsx(LoginScreen, { onLoginSuccess: handleLoginSuccess });
    }
    return (_jsxs("div", { style: { width: '100%', height: '100%', pointerEvents: 'none' }, children: [_jsx(ResetOverlay, {}), _jsx("button", { onClick: handleLogout, style: {
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
                }, children: "LOGOUT" }), dialogue && (_jsxs("div", { onClick: () => setDialogue(null), style: {
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
                }, children: [dialogue, _jsx("div", { style: { textAlign: 'right', fontSize: '14px', marginTop: '10px', color: '#ccc' }, children: "Click to continue..." })] }))] }));
};

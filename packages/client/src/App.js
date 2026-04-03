import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
export const App = () => {
    const [dialogue, setDialogue] = useState(null);
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
    return (_jsx("div", { style: { width: '100%', height: '100%', pointerEvents: 'none' }, children: dialogue && (_jsxs("div", { onClick: () => setDialogue(null), style: {
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
            }, children: [dialogue, _jsx("div", { style: { textAlign: 'right', fontSize: '14px', marginTop: '10px', color: '#ccc' }, children: "Click to continue..." })] })) }));
};

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginScreen.css';
export const LoginScreen = ({ onLoginSuccess }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';
    useEffect(() => {
        // Handle OAuth callback token in URL fragment
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const token = params.get('token');
            const userId = params.get('userId');
            const username = params.get('username');
            if (token && userId && username) {
                onLoginSuccess({
                    id: userId,
                    username: username,
                    provider: 'google', // Or GitHub, for simplicity we treat it as social
                }, token);
                window.location.hash = ''; // Clear hash
            }
        }
    }, [onLoginSuccess]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const endpoint = isRegistering ? '/auth/register' : '/auth/login';
            const payload = isRegistering
                ? { username, password, email }
                : { username, password };
            const response = await axios.post(`${API_URL}${endpoint}`, payload);
            onLoginSuccess(response.data.user, response.data.token);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const handleOAuth = (provider) => {
        window.location.href = `${API_URL}/auth/${provider}`;
    };
    return (_jsx("div", { className: "auth-container", children: _jsxs("div", { className: "auth-card", children: [_jsxs("div", { className: "auth-header", children: [_jsx("h1", { children: "Summer Time Rendering" }), _jsx("p", { children: isRegistering ? 'Join the Loop' : 'Continue the Story' })] }), error && _jsx("div", { className: "error-message", children: error }), _jsxs("form", { className: "auth-form", onSubmit: handleSubmit, children: [_jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "username", children: "Username" }), _jsx("input", { id: "username", type: "text", required: true, value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Enter your username" })] }), isRegistering && (_jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter your email" })] })), _jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { id: "password", type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password" })] }), _jsx("button", { className: "auth-button", type: "submit", disabled: loading, children: loading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In') })] }), !isRegistering && (_jsxs(_Fragment, { children: [_jsx("div", { className: "divider", children: "or sign in with" }), _jsxs("div", { className: "social-login", children: [_jsxs("button", { className: "social-button google", onClick: () => handleOAuth('google'), children: [_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", children: [_jsx("path", { fill: "currentColor", d: "M21.35 11.1h-9.17v2.73h5.14c-.22 1.2-1.12 2.22-2.71 3.01l4.38 3.41c2.56-2.36 4.04-5.83 4.04-9.15 0-.81-.07-1.62-.21-2.43z" }), _jsx("path", { fill: "currentColor", d: "M12.18 21c2.43 0 4.47-.81 5.96-2.18l-4.38-3.41c-.63.42-1.44.67-2.31.67-2.31 0-4.27-1.56-4.97-3.66l-4.51 3.5C3.39 19.34 7.42 21 12.18 21z" }), _jsx("path", { fill: "currentColor", d: "M7.21 12.42c-.17-.51-.27-1.05-.27-1.61s.1-1.1.27-1.61l-4.51-3.5C2.26 6.69 2 8.31 2 10.81s.26 4.12.7 6.11l4.51-3.5z" }), _jsx("path", { fill: "currentColor", d: "M12.18 4.75c1.32 0 2.51.46 3.44 1.35l2.58-2.58C16.65 2.1 14.54 1 12.18 1 7.42 1 3.39 2.66 2.7 6.11l4.51 3.5c.7-2.1 2.66-3.66 4.97-3.66z" })] }), "Google"] }), _jsxs("button", { className: "social-button facebook", onClick: () => handleOAuth('facebook'), children: [_jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", children: _jsx("path", { fill: "currentColor", d: "M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .593 23.407 0 22.676 0" }) }), "Facebook"] }), _jsxs("button", { className: "social-button github", onClick: () => handleOAuth('github'), children: [_jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", children: _jsx("path", { fill: "currentColor", d: "M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.292 24 17.81 24 12.5 24 5.87 18.625.5 12 .5" }) }), "GitHub"] })] })] })), _jsx("div", { className: "auth-footer", children: isRegistering ? (_jsxs(_Fragment, { children: ["Already have an account? ", _jsx("a", { href: "#", onClick: (e) => { e.preventDefault(); setIsRegistering(false); }, children: "Sign In" })] })) : (_jsxs(_Fragment, { children: ["New to the loop? ", _jsx("a", { href: "#", onClick: (e) => { e.preventDefault(); setIsRegistering(true); }, children: "Register" }), _jsx("br", {}), _jsx("a", { href: "#", className: "forgot-password", onClick: (e) => { e.preventDefault(); alert('Password reset coming soon!'); }, children: "Forgot Password?" })] })) })] }) }));
};

import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
const rootElement = document.getElementById('ui-root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
}

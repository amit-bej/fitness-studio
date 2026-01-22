import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log("Index.js is loading!");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    React.createElement(React.StrictMode, null,
        React.createElement(App, null)
    )
);

reportWebVitals();

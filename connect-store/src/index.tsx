import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!); // Use non-null assertion if you're sure #root exists
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Check WebGPU support
const checkWebGPUSupport = (): boolean => {
  return navigator.gpu !== undefined;
};

// Initialize the application
const initializeApp = () => {
  // Check for WebGPU support
  const hasWebGPUSupport = checkWebGPUSupport();
  
  // Mount the React application
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element not found. Please check your HTML file.');
  }
  
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App hasWebGPUSupport={hasWebGPUSupport} />
    </React.StrictMode>
  );
};

// Start the application
initializeApp();

// Register service worker for PWA support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

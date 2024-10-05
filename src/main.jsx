import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WebApp from './webapp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebApp/>
    <App />
  </StrictMode>,
)
// Service Worker registration
if ('serviceWorker' in navigator) {
  console.log("Installing service worker...", import.meta.env.VITE_PUBLIC_URL);
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.VITE_PUBLIC_URL}/service-worker.js`)
    // navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
      .then(registration => {
        console.log('Service Worker registered with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

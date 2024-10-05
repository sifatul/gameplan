import React, { useCallback, useEffect, useState } from 'react';
function WebApp(){
    const [installPromptVisible, setInstallPromptVisible] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = e => {
          e.preventDefault(); // Prevent the default install prompt
          setDeferredPrompt(e); // Store the event for later
          setInstallPromptVisible(true); // Show your custom install button
        };
    
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
        return () => {
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
      }, []);

      const handleInstallClick = () => {
        if (deferredPrompt) {
          setInstallPromptVisible(false); // Hide the prompt
          deferredPrompt.prompt(); // Show the install prompt
          deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
            setDeferredPrompt(null); // Clear the prompt
          });
        }
      };
    return <>
      {installPromptVisible && (
        <div
          id="installBanner"
          style={{ position: 'fixed', bottom: 0, width: '100%', background: '#333', color: 'white', textAlign: 'center', padding: '10px' }}
          role="alert"
        >
          <p>Install our app for a better experience!</p>
          <button onClick={handleInstallClick} aria-label="Install Game Plan App">
            Install
          </button>
        </div>
      )}
    </>
}
export default WebApp
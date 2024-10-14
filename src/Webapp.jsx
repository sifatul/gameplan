import React, { useCallback, useEffect, useState } from 'react';

function WebApp() {
    const [installPromptVisible, setInstallPromptVisible] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    // useEffect(()=>{
    //     if ('serviceWorker' in navigator) {
    //         navigator.serviceWorker.register('/gameplan/service-worker.js').then(registration => {
    //           registration.onupdatefound = () => {
    //             const installingWorker = registration.installing;
    //             installingWorker.onstatechange = () => {
    //               if (installingWorker.state === 'installed') {
    //                 // The updated content is available; reload the app
    //                 if (navigator.serviceWorker.controller) {
    //                   // Show a message to the user or automatically reload
    //                   window.location.reload(); // Reload to fetch the latest content
    //                 }
    //               }
    //             };
    //           };
    //         }).catch(error => {
    //           console.error('Error during service worker registration:', error);
    //         });
    //       }
          
    // },[navigator])

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

    return (
        <>
            {installPromptVisible && (
                <div
                    id="installBanner"
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        background: '#14213D', // Dark Blue
                        color: 'white',
                        textAlign: 'center',
                        padding: '10px',
                        zIndex: 1000, // Ensure the install banner stays on top
                    }}
                    role="banner"
                >
                    <p>Maximize your experience! Install our app for a smoother journey tailored just for you.!</p>
                    <button
                        id="installButton"
                        onClick={handleInstallClick}
                        aria-label="Install App"
                        style={{
                            padding: '10px 20px',
                            background: '#FCA311', // Orange
                            color: '#333',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '10px',
                            transition: 'background 0.3s', // Smooth hover transition
                        }}
                        onMouseOver={e => (e.currentTarget.style.background = '#E69508')}
                        onMouseOut={e => (e.currentTarget.style.background = '#FCA311')}
                    >
                        Install
                    </button>
                    <button
                        onClick={() => setInstallPromptVisible(false)} // Close button
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '20px',
                            position: 'absolute',
                            top: '-2px',
                            right: '10px',
                            cursor: 'pointer',
                        }}
                        aria-label="Close install prompt"
                    >
                        &times; {/* Close icon */}
                    </button>
                </div>
            )}
        </>
    );
}

export default WebApp;

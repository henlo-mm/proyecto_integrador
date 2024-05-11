import React, { useEffect } from 'react';

export function LevelCompletedMessage() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/profile";
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            backgroundColor: '#540000',
            color: 'white',
            padding: '20px 40px',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}>
            <h1>¡Felicitaciones, has superado el nivel!</h1>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import '../styles/checkpoint.css';

export function CheckpointMessage() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            backgroundColor: '#4CAF50', 
            color: 'white', 
            padding: '15px 30px',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            animation: 'slidein 0.5s, fadeout 0.5s 4.5s', 
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', 
        }}>
            <p style={{ fontWeight: 'bold', margin: 0 }}>
                <i style={{ paddingRight: '10px' }}>💾</i> 
                ¡Checkpoint alcanzado! ¡Se ha guardado exitosamente tu estado en el juego!
            </p>
            <button onClick={handleClose} style={{
                marginLeft: '20px',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px'
            }}>X</button>
        </div>
    );
}

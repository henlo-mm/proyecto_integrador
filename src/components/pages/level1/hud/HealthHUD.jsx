export function HealthHUD({ collectedLives}) {
    const lifeIcon = "/assets/icons/life-bar.png";
    const initialLives = Math.max(collectedLives, 0); 

    return (
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: '5px', zIndex: 1000  }}>
            {Array.from({ length: initialLives }, (_, index) =>
                <img
                    key={index}
                    src={lifeIcon}
                    alt="Life Icon"
                    style={{ width: '45px', height: '45px' }} 
                />
            )}
        </div>
    );
}
